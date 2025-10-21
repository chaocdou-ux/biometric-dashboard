import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvDir = join(__dirname, '../Biometric CSVs');

// Mapping of actual names to anonymized participant numbers
const participantMap = new Map();
let participantCounter = 1;

function getParticipantNumber(name) {
  if (!name || name === 'N/A' || name.trim() === '') return null;
  
  const cleanName = name.trim().toLowerCase();
  if (!participantMap.has(cleanName)) {
    participantMap.set(cleanName, `Participant ${participantCounter++}`);
  }
  return participantMap.get(cleanName);
}

function parseRating(value) {
  if (!value) return null;
  const mapping = {
    'Very positive': 5, 'Positive': 4, 'Negative': 2, 'Very negative': 1,
    'Vibrant': 5, 'Energized': 4, 'Sluggish': 2, 'Depleted': 1,
    'Very relaxed': 1, 'Relaxed': 2, 'Tense': 4, 'Very tense': 5,
    'Stressed': 4, 'Mild': 3, 'No stress': 1,
    'Very sharp': 5, 'Clear': 4, 'Unclear': 2, 'Very unclear': 1,
    'Deeply Connected': 5, 'Connected': 4, 'Disconnected': 2, 'Very disconnected': 1
  };
  return mapping[value] || null;
}

function parseHeartRate(value) {
  if (!value || value === 'N/A' || value === 'N/a' || value === 'na') return null;
  const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  return isNaN(num) ? null : Math.round(num);
}

function parseArray(value) {
  if (!value || value === 'N/A' || value.trim() === '') return [];
  return value.split(/[;,]/).map(s => s.trim().toLowerCase()).filter(s => s);
}

function parseBaseline() {
  const file = join(csvDir, 'Biometric 1_Baseline Questionnaire.csv');
  const content = readFileSync(file, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true });
  
  return records.map(row => {
    const name = row['Please add your first and last name'];
    const participant = getParticipantNumber(name);
    if (!participant) return null;
    
    return {
      participant,
      device: (row['What device do you use to measure your biometric health data'] || '').toLowerCase(),
      activity_level: (row['How would you describe your activity level?'] || '').toLowerCase(),
      baseline_stress: (row['How would you describe your current stress level?'] || '').toLowerCase()
    };
  }).filter(Boolean);
}

function parseSession(filename) {
  const file = join(csvDir, filename);
  const content = readFileSync(file, 'utf-8');
  const records = parse(content, { columns: false, skip_empty_lines: true, relax_column_count: true, relax_quotes: true });
  
  // First row is header
  const header = records[0];
  
  return records.slice(1).map(row => {
    const name = row[1]; // Column B
    const participant = getParticipantNumber(name);
    if (!participant) return null;
    
    // Pre-session columns (columns 3-12 approximately)
    const pre_emotional = parseRating(row[3]);
    const pre_energy = parseRating(row[4]);
    const pre_tension = parseRating(row[5]);
    const pre_stress = parseRating(row[6]);
    const pre_clarity = parseRating(row[7]);
    const pre_spiritual = parseRating(row[8]);
    
    // Pre heart rate (column 9)
    const pre_heart_rate = parseHeartRate(row[9]);
    
    // Post-session columns (columns 19-28 approximately)
    const post_emotional = parseRating(row[20]);
    const post_energy = parseRating(row[21]);
    const post_tension = parseRating(row[22]);
    const post_stress = parseRating(row[23]);
    const post_clarity = parseRating(row[24]);
    const post_spiritual = parseRating(row[25]);
    
    // Post heart rate (column 26)
    const post_heart_rate = parseHeartRate(row[26]);
    
    // Sensations and experience (columns 36-37 approximately)
    const sensations = parseArray(row[36]);
    const experience = parseArray(row[37]);
    
    return {
      participant,
      pre_emotional,
      post_emotional,
      pre_energy,
      post_energy,
      pre_tension,
      post_tension,
      pre_stress,
      post_stress,
      pre_clarity,
      post_clarity,
      pre_spiritual,
      post_spiritual,
      pre_heart_rate,
      post_heart_rate,
      sensations,
      experience
    };
  }).filter(Boolean);
}

// Parse all data
const data = {
  baseline: parseBaseline(),
  sessions: {
    session_1: parseSession('Biometric 1_Session 1 - Questionnaire.csv'),
    session_2: parseSession('Biometric 1_Session 2 - Questionnaire.csv'),
    session_3: parseSession('Biometric 1_Session 3 - Questionnaire.csv'),
    session_4: parseSession('Biometric 1_Session 4 - Questionnaire.csv')
  }
};

// Ensure baseline has all participants from sessions
const allParticipants = new Set();
Object.values(data.sessions).forEach(session => {
  session.forEach(entry => {
    if (entry.participant) {
      allParticipants.add(entry.participant);
    }
  });
});

// Fill in missing baseline entries with defaults
const baselineParticipants = new Set(data.baseline.map(b => b.participant));
allParticipants.forEach(participant => {
  if (!baselineParticipants.has(participant)) {
    data.baseline.push({
      participant,
      device: 'wearable device',
      activity_level: 'active',
      baseline_stress: 'moderate'
    });
  }
});

// Sort baseline by participant number
data.baseline.sort((a, b) => {
  const numA = parseInt(a.participant.replace('Participant ', ''));
  const numB = parseInt(b.participant.replace('Participant ', ''));
  return numA - numB;
});

// Write processed data
const outputPath = join(__dirname, '../src/data/processed-data.json');
writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('✅ CSV data parsed successfully!');
console.log(`📊 Total participants: ${participantMap.size}`);
console.log(`📈 Total data points: ${Object.values(data.sessions).flat().length}`);
