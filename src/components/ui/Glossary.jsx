export const biometricTerms = {
  'HRV': {
    term: 'Heart Rate Variability',
    definition: 'The variation in time between consecutive heartbeats, measured in milliseconds. Higher HRV generally indicates better cardiovascular fitness and stress resilience.'
  },
  'RMSSD': {
    term: 'Root Mean Square of Successive Differences',
    definition: 'A key HRV metric that measures short-term heart rate variability. Higher values indicate stronger parasympathetic (rest and digest) nervous system activity.'
  },
  'SDNN': {
    term: 'Standard Deviation of NN intervals',
    definition: 'Measures overall heart rate variability over a period. Reflects both sympathetic and parasympathetic nervous system influences.'
  },
  'Vagus Nerve': {
    term: 'Vagus Nerve',
    definition: 'The longest cranial nerve that connects the brain to major organs. Key player in parasympathetic nervous system regulation, affecting heart rate, digestion, and emotional state.'
  },
  'Parasympathetic': {
    term: 'Parasympathetic Nervous System',
    definition: 'The "rest and digest" branch of the autonomic nervous system. Promotes relaxation, recovery, and restoration.'
  },
  'Sympathetic': {
    term: 'Sympathetic Nervous System',
    definition: 'The "fight or flight" branch of the autonomic nervous system. Activated during stress or physical activity.'
  },
  'SpO2': {
    term: 'Blood Oxygen Saturation',
    definition: 'The percentage of oxygen-carrying red blood cells in the bloodstream. Normal range is 95-100%.'
  },
  'Respiratory Rate': {
    term: 'Respiratory Rate',
    definition: 'The number of breaths taken per minute. Normal resting rate is 12-20 breaths per minute for adults.'
  },
  'Breathwork': {
    term: 'Breathwork',
    definition: 'Conscious control of breathing patterns to influence physical, mental, and emotional states. Can activate or calm the nervous system.'
  },
  'Sound Therapy': {
    term: 'Sound Therapy',
    definition: 'Use of auditory stimuli (music, tones, vibrations) to promote relaxation, healing, and altered states of consciousness.'
  }
};

export default function Glossary() {
  return (
    <div className="space-y-4">
      <h2 className="section-header">Biometric Terms Glossary</h2>
      <div className="grid gap-4">
        {Object.entries(biometricTerms).map(([key, { term, definition }]) => (
          <div key={key} className="glass-panel p-4">
            <h3 className="font-semibold text-base mb-2" style={{ color: '#0f172a' }}>
              {term} ({key})
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
              {definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
