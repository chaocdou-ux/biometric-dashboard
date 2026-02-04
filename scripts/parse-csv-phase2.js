import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvDir = join(__dirname, '../Biometric CSVs');

function parseRating(value) {
  if (!value) return null;
  const mapping = {
    'Very positive': 5, 'Positive': 4, 'Neutral': 3, 'Negative': 2, 'Very negative': 1,
    'Vibrant': 5, 'Energized': 4, 'Sluggish': 2, 'Depleted': 1,
    'Very relaxed': 5, 'Relaxed': 4, 'Tense': 2, 'Very tense': 1,
    'No stress': 5, 'Mild': 4, 'Stressed': 2, 'Extremely stressed': 1,
    'Very sharp': 5, 'Clear': 4, 'Unclear': 2, 'Very unclear': 1,
    'Deeply Connected': 5, 'Connected': 4, 'Disconnected': 2, 'Very Disconnected': 1,
    'Unsure': 3,
    'Neither connected, nor disconnected.  Something else I don\'t really have a word for.': 3,
    'In and out due to some stomach discomfort.': 3
  };
  return mapping[value] || null;
}

function parseParticipants() {
  const file = join(csvDir, 'biometric_study_phase_2_participants.csv');
  const content = readFileSync(file, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true });

  const participantMap = new Map();

  records.forEach((row, index) => {
    const originalName = row['Please add your first and last name'];
    if (originalName && originalName.trim() !== '') {
      participantMap.set(originalName.trim(), `Phase 2 Participant ${index + 1}`);
    }
  });

  return participantMap;
}

function categorizeDevice(device) {
  if (!device) return 'Other';
  const deviceLower = device.toLowerCase();
  if (deviceLower.includes('chestband')) return 'Chestband';
  if (deviceLower.includes('emotiv')) return 'Emotiv Headset';
  return 'Other';
}

function parseDayData(filename, day, participantMap) {
  const file = join(csvDir, filename);
  const content = readFileSync(file, 'utf-8');

  // Parse with custom column handler to handle duplicate column names
  const records = parse(content, {
    columns: (header) => {
      const counts = {};
      return header.map((col) => {
        if (!counts[col]) {
          counts[col] = 1;
          return col;
        } else {
          const name = `${col}_${counts[col]}`;
          counts[col]++;
          return name;
        }
      });
    },
    skip_empty_lines: true
  });

  const measurements = [];

  records.forEach(row => {
    const originalName = row['Please add your first and last name'];
    const participant = participantMap.get(originalName?.trim()) || originalName;

    if (!participant) return;

    const timestamp = row['Timestamp'];
    const device = row['What data capture device are you using today?'];
    const chestband = row['What is the number of your chestband (write N/A if not wearing one)'];

    const participantMeasurements = [];

    // All 6 measurements - first has no suffix, duplicates have _1, _2, _3, _4, _5
    for (let i = 1; i <= 6; i++) {
      const suffix = i === 1 ? '' : `_${i - 1}`;
      const emotional_words = row[`Please describe your current emotional state in one to three words (e.g., calm, anxious, joyful)${suffix}`];
      const emotional = parseRating(row[`How would you rate your emotional state right now? ${suffix}`]);
      const energy = parseRating(row[`How would you rate your physical energy right now? ${suffix}`]);
      const tension = parseRating(row[`How would you rate your body tension right now? ${suffix}`]);
      const stress = parseRating(row[`How would you rate your stress level right now? ${suffix}`]);
      const clarity = parseRating(row[`How would you rate your mental clarity right now?${suffix}`]);
      const spiritual = parseRating(row[`How would you rate your spiritual connection right now?${suffix}`]);

      const panas_positive = [
        parseInt(row[`Interested${suffix}`]) || 0,
        parseInt(row[`Excited${suffix}`]) || 0,
        parseInt(row[`Strong${suffix}`]) || 0,
        parseInt(row[`Enthusiastic${suffix}`]) || 0,
        parseInt(row[`Proud${suffix}`]) || 0,
        parseInt(row[`Alert${suffix}`]) || 0,
        parseInt(row[`Inspired${suffix}`]) || 0,
        parseInt(row[`Determined${suffix}`]) || 0,
        parseInt(row[`Attentive${suffix}`]) || 0,
        parseInt(row[`Active${suffix}`]) || 0
      ].reduce((a, b) => a + b, 0);

      const panas_negative = [
        parseInt(row[`Distressed${suffix}`]) || 0,
        parseInt(row[`Upset${suffix}`]) || 0,
        parseInt(row[`Guilty${suffix}`]) || 0,
        parseInt(row[`Scared${suffix}`]) || 0,
        parseInt(row[`Hostile${suffix}`]) || 0,
        parseInt(row[`Irritable${suffix}`]) || 0,
        parseInt(row[`Ashamed${suffix}`]) || 0,
        parseInt(row[`Nervous${suffix}`]) || 0,
        parseInt(row[`Jittery${suffix}`]) || 0,
        parseInt(row[`Afraid${suffix}`]) || 0
      ].reduce((a, b) => a + b, 0);

      if (emotional !== null || energy !== null) {
        const measurement = {
          day,
          participant,
          measurement_point: i,
          timestamp,
          emotional_words,
          emotional,
          energy,
          tension,
          stress,
          clarity,
          spiritual,
          panas_positive,
          panas_negative,
          device,
          chestband
        };

        // Add feedback fields to the last measurement (measurement 6)
        if (i === 6) {
          measurement.highlights = row['What were your highlights from today?'];
          measurement.improvements = row['Which were areas of improvement you would like to see for future studies?'];
          measurement.overall_experience = row['If you\'d like, please share a few words about your overall experience of this session and anything you want us to know. '];
        }

        participantMeasurements.push(measurement);
      }
    }

    measurements.push(...participantMeasurements);
  });

  return measurements;
}

const participantMap = parseParticipants();
const day1Measurements = parseDayData('day_1__biometric_study_phase_2_questionnaire.csv', 'Day 1', participantMap);
const day2Measurements = parseDayData('day_2__biometric_study_phase_2_questionnaire.csv', 'Day 2', participantMap);

const allMeasurements = [...day1Measurements, ...day2Measurements];

// Add device categories
allMeasurements.forEach(m => {
  m.device_category = categorizeDevice(m.device);
});

const data = {
  participants: Array.from(participantMap.values()),
  days: {
    day_1: day1Measurements,
    day_2: day2Measurements
  },
  allMeasurements
};

const outputPath = join(__dirname, '../src/data/processed-data-phase2.json');
writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('✅ Phase 2 CSV data parsed successfully!');
console.log(`📊 Total participants: ${data.participants.length}`);
console.log(`📈 Day 1 measurements: ${day1Measurements.length}`);
console.log(`📈 Day 2 measurements: ${day2Measurements.length}`);
console.log(`📈 Total measurements: ${allMeasurements.length}`);
