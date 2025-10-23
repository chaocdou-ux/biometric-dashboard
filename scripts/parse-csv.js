import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvDir = join(__dirname, '../Biometric CSVs');

function parseRating(value) {
  if (!value) return null;
  const mapping = {
    'Very positive': 4, 'Positive': 3, 'Negative': 2, 'Very negative': 1,
    'Vibrant': 4, 'Energized': 3, 'Sluggish': 2, 'Depleted': 1,
    'Very relaxed': 4, 'Relaxed': 3, 'Tense': 2, 'Very tense': 1,
    'Extremely stressed': 1, 'Stressed': 2, 'Mild': 3, 'No stress': 4,
    'Very sharp': 4, 'Clear': 3, 'Unclear': 2, 'Very unclear': 1,
    'Deeply Connected': 4, 'Connected': 3, 'Disconnected': 2, 'Very disconnected': 1
  };
  return mapping[value] || null;
}

function parseStress(value) {
  if (!value) return null;
  const mapping = {
    'High stress': 4,
    'Moderate stress': 3,
    'Mild stress': 2,
    'None': 1
  };
  return mapping[value] || null;
}

function parseHeartRate(value) {
  if (!value || value === 'N/A' || value === 'N/a' || value === 'na' || value === 'NA') return null;
  const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  return isNaN(num) ? null : Math.round(num);
}

function parseArray(value) {
  if (!value || value === 'N/A' || value.trim() === '') return [];
  return value.split(/[;,]/).map(s => s.trim()).filter(s => s);
}

function parseBaseline() {
  const file = join(csvDir, 'Biometric 1_Baseline_Participants.csv');
  const content = readFileSync(file, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true });

  return records.map(row => {
    const participant = row['Please add your first and last name'];
    if (!participant || participant.trim() === '') return null;

    return {
      participant,
      timestamp: row['Timestamp'],
      device: row['Which device(s) will you be using for this study?'],
      activity_level: row['How would you describe your typical daily activity level?  '],
      device_usage: parseArray(row['How much do you use your device to monitor your activity, health, or wellness on a regular basis?  (please select all that apply)']),
      baseline_stress: row['In the past 30 days, have you experienced any major life stresses (for example: job changes, relationship shifts, illness, financial strain, or loss)? '],
      baseline_stress_level: parseStress(row['In the past 30 days, have you experienced any major life stresses (for example: job changes, relationship shifts, illness, financial strain, or loss)? ']),
      reflection: row["This is your space to tell us about what you're going through right now, in your own words. Share as much or as little as feels right. We'll return to these reflections at the end of the study to see how these practices may have supported your journey. "]
    };
  }).filter(Boolean);
}

function categorizeDevice(device) {
  if (!device) return 'Other';
  const deviceLower = device.toLowerCase();
  if (deviceLower.includes('apple') || deviceLower.includes('watch')) return 'Apple Watch';
  if (deviceLower.includes('oura') || deviceLower.includes('ring')) return 'Other';
  if (deviceLower.includes('muse')) return 'Other';
  return 'Other';
}

function parseCombinedSessions() {
  const file = join(csvDir, 'Biometric 1_Combined_Participants.csv');
  const content = readFileSync(file, 'utf-8');
  const records = parse(content, { columns: false, skip_empty_lines: true, relax_column_count: true });

  // Skip header row
  const dataRows = records.slice(1);

  return dataRows.map(row => {
    const sessionNum = row[0];
    const participant = row[2];
    if (!participant || !sessionNum) return null;

    return {
      session: sessionNum,
      participant,
      timestamp: row[1],

      pre_emotional_words: row[3],
      pre_emotional: parseRating(row[4]),
      pre_energy: parseRating(row[5]),
      pre_tension: parseRating(row[6]),
      pre_stress: parseRating(row[7]),
      pre_clarity: parseRating(row[8]),
      pre_spiritual: parseRating(row[9]),
      pre_heart_rate: parseHeartRate(row[10]),
      pre_spo2: parseHeartRate(row[11]),
      pre_o2: parseHeartRate(row[15]),
      pre_rhr: parseHeartRate(row[16]),

      post_emotional_words: row[20],
      post_emotional: parseRating(row[21]),
      post_energy: parseRating(row[22]),
      post_tension: parseRating(row[23]),
      post_stress: parseRating(row[24]),
      post_clarity: parseRating(row[25]),
      post_spiritual: parseRating(row[26]),
      post_heart_rate: parseHeartRate(row[27]),
      post_spo2: parseHeartRate(row[28]),
      post_o2: parseHeartRate(row[32]),
      post_rhr: parseHeartRate(row[33]),

      sensations: parseArray(row[37]),
      experience: parseArray(row[38]),
      post_feelings: parseArray(row[39]),
      violin_influence: parseArray(row[40]),
      comments: row[41]
    };
  }).filter(Boolean);
}

const baseline = parseBaseline();
const allSessions = parseCombinedSessions();

// Add device information to sessions from baseline
allSessions.forEach(session => {
  const participantBaseline = baseline.find(b => b.participant === session.participant);
  if (participantBaseline) {
    session.device = participantBaseline.device;
    session.device_category = categorizeDevice(participantBaseline.device);
  }
});

const sessions = {
  session_1: allSessions.filter(s => s.session === 'Session 1'),
  session_2: allSessions.filter(s => s.session === 'Session 2'),
  session_3: allSessions.filter(s => s.session === 'Session 3'),
  session_4: allSessions.filter(s => s.session === 'Session 4')
};

const data = {
  baseline,
  sessions,
  allSessions
};

const outputPath = join(__dirname, '../src/data/processed-data.json');
writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('✅ CSV data parsed successfully!');
console.log(`📊 Total baseline participants: ${baseline.length}`);
console.log(`📈 Session 1: ${sessions.session_1.length} entries`);
console.log(`📈 Session 2: ${sessions.session_2.length} entries`);
console.log(`📈 Session 3: ${sessions.session_3.length} entries`);
console.log(`📈 Session 4: ${sessions.session_4.length} entries`);
