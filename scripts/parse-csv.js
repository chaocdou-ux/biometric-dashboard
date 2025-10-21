import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvDir = join(__dirname, '../Biometric CSVs');

function parseRating(value) {
  if (!value) return null;
  const mapping = {
    'Extremely stressed': 5,
    'Very positive': 5, 'Positive': 4, 'Negative': 2, 'Very negative': 1,
    'Vibrant': 5, 'Energized': 4, 'Sluggish': 2, 'Depleted': 1,
    'Very relaxed': 5, 'Relaxed': 4, 'Tense': 2, 'Very tense': 1,
    'Stressed': 5, 'Mild': 3, 'No stress': 1,
    'Very sharp': 5, 'Clear': 4, 'Unclear': 2, 'Very unclear': 1,
    'Deeply Connected': 5, 'Connected': 4, 'Disconnected': 2, 'Very disconnected': 1
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
    if (!participant || participant === 'N/A') return null;

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
  if (deviceLower.includes('oura') || deviceLower.includes('ring')) return 'Oura Ring';
  if (deviceLower.includes('muse')) return 'Muse';
  return 'Other';
}

function parseCombinedSessions() {
  const file = join(csvDir, 'Biometric 1_Combined_Participants copy.csv');
  const content = readFileSync(file, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, relax_column_count: true });

  return records.map(row => {
    const session = row['Session'];
    const participant = row['Participant'];
    const device = row['Device'];
    if (!participant || participant === 'N/A' || !session) return null;

    return {
      session,
      timestamp: row['Timestamp'],
      participant,
      device,
      device_category: categorizeDevice(device),

      pre_emotional_words: row['Please describe your current emotional state in one to three words (e.g., calm, anxious, joyful)'],
      pre_emotional: parseRating(row['How would you rate your emotional state right now? ']),
      pre_energy: parseRating(row['How would you rate your physical energy right now? ']),
      pre_tension: parseRating(row['How would you rate your body tension right now? ']),
      pre_stress: parseRating(row['How would you rate your stress level right now? ']),
      pre_clarity: parseRating(row['How would you rate your mental clarity right now?']),
      pre_spiritual: parseRating(row['How would you rate your spiritual connection right now?']),
      pre_heart_rate: parseHeartRate(row['Heart Rate']),
      pre_spo2: parseHeartRate(row['SpO2 (Blood Oxygen Saturation)']),
      pre_o2: parseHeartRate(row['O2 - Oxygen Level']),
      pre_rhr: parseHeartRate(row['RHR - Resting Heart Rate']),

      post_emotional_words: row['Please describe your current emotional state in one to three words (e.g., calm, anxious, joyful).1'],
      post_emotional: parseRating(row['How would you rate your emotional state right now? .1']),
      post_energy: parseRating(row['How would you rate your physical energy right now? .1']),
      post_tension: parseRating(row['How would you rate your body tension right now? .1']),
      post_stress: parseRating(row['How would you rate your stress level right now? .1']),
      post_clarity: parseRating(row['How would you rate your mental clarity right now?.1']),
      post_spiritual: parseRating(row['How would you rate your spiritual connection right now?.1']),
      post_heart_rate: parseHeartRate(row['Heart Rate.1']),
      post_spo2: parseHeartRate(row['SpO2 (Blood Oxygen Saturation).1']),
      post_o2: parseHeartRate(row['O2 - Oxygen Level.1']),
      post_rhr: parseHeartRate(row['RHR - Resting Heart Rate.1']),

      sensations: parseArray(row['Which physical sensations did you experience during the session? (please select all that apply)']),
      experience: parseArray(row['How would you describe your experience during the session? (please select all that apply)']),
      post_feelings: parseArray(row['How do you feel now, immediately following the session? (please select all that apply)']),
      violin_influence: parseArray(row['How did the live violin music influence you during the session? (please select all that apply)  ']),
      comments: row["If you'd like, please share a few words about your overall experience of this session and anything you want us to know. "]
    };
  }).filter(Boolean);
}

const baseline = parseBaseline();
const allSessions = parseCombinedSessions();

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
