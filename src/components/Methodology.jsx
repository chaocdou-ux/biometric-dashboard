import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function Methodology() {
  const surveyQuestions = [
    {
      metric: "Emotional State",
      question: "How would you describe your current emotional state?",
      options: ["Very Negative", "Negative", "Positive", "Very Positive"],
      scale: "1 (Very Negative) to 4 (Very Positive)"
    },
    {
      metric: "Physical Energy",
      question: "How would you describe your current physical energy level?",
      options: ["Depleted", "Sluggish", "Energized", "Vibrant"],
      scale: "1 (Depleted) to 4 (Vibrant)"
    },
    {
      metric: "Body Tension",
      question: "How would you describe your current level of body tension?",
      options: ["Very Tense", "Tense", "Relaxed", "Very Relaxed"],
      scale: "1 (Very Tense) to 4 (Very Relaxed)"
    },
    {
      metric: "Stress Level",
      question: "How would you describe your current stress level?",
      options: ["Extremely Stressed", "Stressed", "Mild", "No Stress"],
      scale: "1 (Extremely Stressed) to 4 (No Stress)"
    },
    {
      metric: "Mental Clarity",
      question: "How would you describe your current mental clarity?",
      options: ["Very Foggy", "Unclear", "Clear", "Very Sharp"],
      scale: "1 (Very Foggy) to 4 (Very Sharp)"
    },
    {
      metric: "Spiritual Connection",
      question: "How would you describe your current sense of spiritual connection?",
      options: ["Very Disconnected", "Disconnected", "Connected", "Deeply Connected"],
      scale: "1 (Very Disconnected) to 4 (Deeply Connected)"
    }
  ];

  const openEndedQuestions = [
    {
      question: "Please describe your current emotional state in one to three words (e.g., calm, anxious, joyful).",
      timing: "Asked both pre-session and post-session",
      type: "Text response"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-2xl" style={{ color: '#0f172a' }}>Research Methodology</CardTitle>
          <p className="text-sm mt-2" style={{ color: '#64748b' }}>
            Complete survey structure and response options used throughout the study
          </p>
        </CardHeader>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-xl" style={{ color: '#0f172a' }}>Survey Questions & Response Options</CardTitle>
          <p className="text-sm mt-2" style={{ color: '#64748b' }}>
            All questions were asked both pre-session and post-session. Responses are measured on a 4-point scale.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {surveyQuestions.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-lg border"
                style={{
                  background: 'rgba(168, 200, 218, 0.1)',
                  borderColor: 'rgba(168, 200, 218, 0.3)'
                }}
              >
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1" style={{ color: '#0f172a' }}>
                    {item.metric}
                  </h3>
                  <p className="text-sm italic" style={{ color: '#475569' }}>
                    "{item.question}"
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: '#64748b' }}>
                    Response Scale: {item.scale}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {item.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="p-3 rounded-lg text-center border"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderColor: 'rgba(125, 141, 116, 0.3)'
                      }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: '#64748b' }}>
                        Score: {optIndex + 1}
                      </div>
                      <div className="font-medium text-sm" style={{ color: '#0f172a' }}>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-xl" style={{ color: '#0f172a' }}>Open-Ended Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openEndedQuestions.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border"
                style={{
                  background: 'rgba(168, 200, 218, 0.1)',
                  borderColor: 'rgba(168, 200, 218, 0.3)'
                }}
              >
                <p className="text-sm italic mb-2" style={{ color: '#475569' }}>
                  "{item.question}"
                </p>
                <div className="flex gap-4 text-xs" style={{ color: '#64748b' }}>
                  <span><strong>Timing:</strong> {item.timing}</span>
                  <span><strong>Type:</strong> {item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-xl" style={{ color: '#0f172a' }}>Biometric Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className="p-4 rounded-lg border"
              style={{
                background: 'rgba(168, 200, 218, 0.1)',
                borderColor: 'rgba(168, 200, 218, 0.3)'
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: '#0f172a' }}>Pre-Session & Post-Session Vitals</h3>
              <p className="text-sm mb-3" style={{ color: '#475569' }}>
                Biometric data collected before and after each session using wearable devices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="text-sm font-semibold" style={{ color: '#0f172a' }}>Heart Rate</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>Beats per minute (BPM)</div>
                </div>
                <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="text-sm font-semibold" style={{ color: '#0f172a' }}>SpO2</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>Blood oxygen saturation (%)</div>
                </div>
                <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="text-sm font-semibold" style={{ color: '#0f172a' }}>O2 Level</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>Oxygen measurement</div>
                </div>
                <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="text-sm font-semibold" style={{ color: '#0f172a' }}>RHR</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>Resting heart rate</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-xl" style={{ color: '#0f172a' }}>Data Collection Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'rgba(125, 141, 116, 0.2)', color: '#0f172a' }}>
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>Baseline Survey</h4>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Initial assessment including demographics, activity level, and baseline stress
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'rgba(125, 141, 116, 0.2)', color: '#0f172a' }}>
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>Pre-Session Assessment</h4>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Self-reported metrics and biometric measurements taken before each session
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'rgba(125, 141, 116, 0.2)', color: '#0f172a' }}>
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>Session Experience</h4>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Participants engage in breathwork and artistic performance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'rgba(125, 141, 116, 0.2)', color: '#0f172a' }}>
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>Post-Session Assessment</h4>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Self-reported metrics, biometric measurements, and additional feedback collected after each session
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
