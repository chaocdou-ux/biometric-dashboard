import { colors, metricDescriptions } from '../lib/designSystem';

export default function Definitions() {
  const measuredMetrics = [
    {
      metric: 'Emotional State',
      description: metricDescriptions.emotional,
      scale: '1-4 scale',
      direction: 'Higher is better',
      normalRange: '3-4 typical baseline',
      options: 'Very Negative (1) → Negative (2) → Positive (3) → Very Positive (4)'
    },
    {
      metric: 'Physical Energy',
      description: metricDescriptions.energy,
      scale: '1-4 scale',
      direction: 'Higher is better',
      normalRange: '3-4 typical baseline',
      options: 'Depleted (1) → Sluggish (2) → Energized (3) → Vibrant (4)'
    },
    {
      metric: 'Body Tension',
      description: metricDescriptions.tension,
      scale: '1-4 scale',
      direction: 'Lower is better',
      normalRange: '2-3 typical baseline',
      options: 'Very Tense (1) → Tense (2) → Relaxed (3) → Very Relaxed (4)'
    },
    {
      metric: 'Stress Level',
      description: metricDescriptions.stress,
      scale: '1-4 scale',
      direction: 'Lower is better',
      normalRange: '2-3 typical baseline',
      options: 'Extremely Stressed (1) → Stressed (2) → Mild (3) → No Stress (4)'
    },
    {
      metric: 'Mental Clarity',
      description: metricDescriptions.clarity,
      scale: '1-4 scale',
      direction: 'Higher is better',
      normalRange: '3-4 typical baseline',
      options: 'Very Foggy (1) → Unclear (2) → Clear (3) → Very Sharp (4)'
    },
    {
      metric: 'Spiritual Connection',
      description: metricDescriptions.spiritual,
      scale: '1-4 scale',
      direction: 'Higher is better',
      normalRange: '2-4 varies by individual',
      options: 'Very Disconnected (1) → Disconnected (2) → Connected (3) → Deeply Connected (4)'
    }
  ];

  const biometricMetrics = [
    {
      metric: 'Heart Rate',
      description: 'Number of heartbeats per minute measured by wearable device',
      scale: 'Beats per minute (BPM)',
      direction: 'Lower resting HR indicates better cardiovascular fitness',
      normalRange: '60-100 BPM normal; 50-70 BPM typical for healthy adults at rest'
    },
    {
      metric: 'SpO2',
      description: 'Blood oxygen saturation level (percentage of oxygen-carrying hemoglobin)',
      scale: 'Percentage (0-100%)',
      direction: 'Higher is better',
      normalRange: '95-100% normal; below 90% may indicate concern'
    },
    {
      metric: 'HRV',
      description: 'Heart Rate Variability measures variation in time intervals between heartbeats, indicating autonomic nervous system balance',
      scale: 'Milliseconds (ms)',
      direction: 'Higher HRV generally indicates better stress resilience and recovery',
      normalRange: '20-200 ms varies by age, fitness, and measurement method'
    },
    {
      metric: 'Resting Heart Rate',
      description: 'Heart rate measured during complete rest, typically upon waking',
      scale: 'Beats per minute (BPM)',
      direction: 'Lower indicates better cardiovascular fitness',
      normalRange: '50-70 BPM for healthy adults; athletes may be 40-50 BPM'
    },
    {
      metric: 'Respiratory Rate',
      description: 'Number of breaths per minute',
      scale: 'Breaths per minute',
      direction: 'Lower rates often indicate deeper, more efficient breathing',
      normalRange: '12-20 breaths/min normal for adults'
    }
  ];

  const sessionProtocols = [
    {
      session: 'Session 1 (8/26/25)',
      subtitle: 'Baseline',
      protocol: 'Breathwork (2 inhales, 1 exhale) + live violin',
      duration: '90 minutes',
      notes: 'Establishes foundational practice'
    },
    {
      session: 'Session 2 (9/2/25)',
      subtitle: 'Resonance',
      protocol: 'Breathwork + live violin + quartz sound bowls',
      duration: '90 minutes',
      notes: 'Sound bowls introduced for deeper resonance by Will Webb'
    },
    {
      session: 'Session 3 (9/9/25)',
      subtitle: 'Brainwave Entrainment',
      protocol: 'Breathwork + live violin + binaural beats (headphones)',
      duration: '90 minutes',
      notes: 'Binaural beats added for brainwave synchronization, created by Nathalie Bonin'
    },
    {
      session: 'Session 4 (9/16/25)',
      subtitle: 'Movement Integration',
      protocol: 'Movement + breathwork + live violin',
      duration: '90 minutes',
      notes: 'Movement introduced before breathwork to support physical energy release, led by Atasiea Kenneth L. Ferguson'
    }
  ];

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h2 className="section-header">Data Collection Notes</h2>
        <div className="space-y-4 text-sm" style={{ color: colors.deepCharcoal }}>
          <p className="leading-relaxed">
            This study combines subjective self-reported measures with objective biometric data from consumer wearable devices. All participants completed baseline assessments before the study and pre/post-session questionnaires for each attended session.
          </p>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(241, 141, 68, 0.1)' }}>
            <p className="font-semibold mb-2" style={{ color: colors.accentOrange }}>
              Important Data Notes
            </p>
            <ul className="space-y-1 text-sm">
              <li>• Consumer wearables (Apple Watch, Oura Ring, Muse, Ring Conn) used for biometric data</li>
              <li>• Device accuracy varies; all biometric results are indicative and should not be considered clinical-grade</li>
              <li>• Participants with 2+ sessions included for longitudinal analysis</li>
              <li>• Missing data handled transparently; sample sizes (n) reported for all metrics</li>
              <li>• Self-reported measures use consistent 1-4 scale across all metrics</li>
              <li>• Response options ordered from lowest (1) to highest (4) for each metric</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Session Protocols</h2>
        <div className="space-y-4">
          {sessionProtocols.map((session, index) => (
            <div
              key={index}
              className="p-6 rounded-lg"
              style={{ backgroundColor: `rgba(168, 200, 218, ${0.1 + index * 0.05})` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: colors.pineGreen }}>
                    {session.session}
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: colors.deepCharcoal, opacity: 0.7 }}>
                    {session.subtitle}
                  </p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: colors.skyBlue, color: 'white' }}>
                  {session.duration}
                </span>
              </div>
              <p className="font-medium mb-2" style={{ color: colors.deepCharcoal }}>
                {session.protocol}
              </p>
              <p className="text-sm opacity-75" style={{ color: colors.deepCharcoal }}>
                {session.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Self-Reported Metrics</h2>
        <p className="text-sm mb-4" style={{ color: colors.pineGreen }}>
          Participants rated these dimensions before and after each session using a consistent 1-4 scale.
        </p>
        <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(168, 200, 218, 0.15)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
          <p className="font-semibold mb-2 text-sm" style={{ color: colors.deepCharcoal }}>
            Scale Methodology
          </p>
          <ul className="space-y-1 text-xs" style={{ color: colors.deepCharcoal }}>
            <li>• All self-reported metrics use a 4-point scale (1-4)</li>
            <li>• Response options are presented in ascending order from lowest (1) to highest (4)</li>
            <li>• For Body Tension and Stress Level: lower scores indicate better outcomes (1 = worst, 4 = best)</li>
            <li>• For all other metrics: higher scores indicate better outcomes (1 = worst, 4 = best)</li>
            <li>• All averages and calculations reflect this consistent 1-4 scale</li>
          </ul>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {measuredMetrics.map((item, index) => (
            <div key={index} className="p-5 rounded-lg" style={{ backgroundColor: 'rgba(80, 96, 79, 0.05)' }}>
              <h3 className="font-semibold mb-2 text-lg" style={{ color: colors.deepCharcoal }}>
                {item.metric}
              </h3>
              <div className="space-y-2 text-sm" style={{ color: colors.deepCharcoal }}>
                <p className="leading-relaxed">{item.description}</p>
                <div className="p-2 rounded text-xs mt-2" style={{ backgroundColor: 'rgba(168, 200, 218, 0.2)' }}>
                  <strong>Response Options:</strong><br />
                  {item.options}
                </div>
                <div className="flex gap-4 pt-2 text-xs">
                  <span className="px-2 py-1 rounded" style={{ backgroundColor: colors.cloudGrey }}>
                    {item.scale}
                  </span>
                  <span className="px-2 py-1 rounded" style={{ backgroundColor: colors.sunriseBeige }}>
                    {item.direction}
                  </span>
                </div>
                <p className="text-xs opacity-70 pt-1">Normal range: {item.normalRange}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Biometric Metrics</h2>
        <p className="text-sm mb-6" style={{ color: colors.pineGreen }}>
          Device-measured physiological data collected before and after sessions.
        </p>
        <div className="space-y-4">
          {biometricMetrics.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-lg"
              style={{ backgroundColor: 'rgba(125, 141, 116, 0.08)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: colors.deepCharcoal }}>
                {item.metric}
              </h3>
              <div className="space-y-2 text-sm" style={{ color: colors.deepCharcoal }}>
                <p className="leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: colors.warmGold, color: 'white' }}>
                    {item.scale}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: colors.richTerracotta, color: 'white' }}>
                    {item.direction}
                  </span>
                </div>
                <p className="text-xs opacity-70 pt-1">
                  <strong>Normal range:</strong> {item.normalRange}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Analysis Methodology</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: colors.deepCharcoal }}>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: colors.pineGreen }}>
              Percent Change Calculation
            </h3>
            <p>
              For positive metrics (emotional state, energy, clarity, spiritual connection):
              <br />
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                % Change = ((Post-Value - Pre-Value) / Pre-Value) × 100
              </code>
            </p>
            <p className="mt-2">
              For negative metrics (tension, stress):
              <br />
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                % Change = ((Pre-Value - Post-Value) / Pre-Value) × 100
              </code>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: colors.pineGreen }}>
              Statistical Transparency
            </h3>
            <ul className="space-y-1">
              <li>• Sample sizes (n) reported for all aggregated metrics</li>
              <li>• Missing data excluded from calculations; no imputation performed</li>
              <li>• Averages calculated only from complete pre/post pairs</li>
              <li>• Device-specific analysis separates Apple Watch from other devices</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: colors.pineGreen }}>
              Limitations
            </h3>
            <ul className="space-y-1">
              <li>• Small sample size (feasibility study)</li>
              <li>• Consumer-grade wearables have accuracy limitations</li>
              <li>• Self-reported measures subject to response bias</li>
              <li>• No control group for comparison</li>
              <li>• Progression effects: modalities added across sessions, preventing isolated effect measurement</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
