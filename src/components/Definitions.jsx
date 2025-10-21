import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function Definitions() {
  const definitions = [
    {
      metric: 'Emotional State',
      description: 'Self-reported assessment of current emotional wellbeing',
      scale: '1-5 (1=Very Negative, 5=Very Positive)',
      direction: 'Higher scores indicate more positive emotional state',
      normalRange: '3-4 is typical for baseline wellbeing'
    },
    {
      metric: 'Physical Energy',
      description: 'Self-reported level of physical vitality and stamina',
      scale: '1-5 (1=Depleted, 5=Vibrant)',
      direction: 'Higher scores indicate greater physical energy',
      normalRange: '3-4 is typical for normal daily energy'
    },
    {
      metric: 'Body Tension',
      description: 'Self-reported degree of physical tension or relaxation in the body',
      scale: '1-5 (1=Very Relaxed, 5=Very Tense)',
      direction: 'Lower scores indicate less tension (more relaxation)',
      normalRange: '2-3 is typical for relaxed state'
    },
    {
      metric: 'Stress Level',
      description: 'Self-reported perception of current stress',
      scale: '1-5 (1=No Stress, 5=Extremely Stressed)',
      direction: 'Lower scores indicate less stress',
      normalRange: '2-3 is typical for moderate daily stress'
    },
    {
      metric: 'Mental Clarity',
      description: 'Self-reported level of mental focus and cognitive sharpness',
      scale: '1-5 (1=Very Unclear, 5=Very Sharp)',
      direction: 'Higher scores indicate greater mental clarity',
      normalRange: '3-4 is typical for focused state'
    },
    {
      metric: 'Spiritual Connection',
      description: 'Self-reported sense of connection to something greater than oneself',
      scale: '1-5 (1=Very Disconnected, 5=Deeply Connected)',
      direction: 'Higher scores indicate stronger spiritual connection',
      normalRange: '2-4 varies widely by individual practice'
    },
    {
      metric: 'Heart Rate',
      description: 'Number of heartbeats per minute measured by wearable device',
      scale: 'Beats per minute (BPM)',
      direction: 'Lower resting heart rate generally indicates better cardiovascular fitness',
      normalRange: '60-100 BPM is normal; 50-70 BPM typical for healthy adults at rest'
    },
    {
      metric: 'SpO2',
      description: 'Blood oxygen saturation level (percentage of oxygen-carrying hemoglobin)',
      scale: 'Percentage (0-100%)',
      direction: 'Higher is better',
      normalRange: '95-100% is normal; below 90% may indicate concern'
    },
    {
      metric: 'HRV (Heart Rate Variability)',
      description: 'Variation in time intervals between heartbeats, indicating autonomic nervous system balance',
      scale: 'Milliseconds (ms)',
      direction: 'Higher HRV generally indicates better stress resilience and recovery',
      normalRange: '20-200 ms varies by age, fitness, and measurement method'
    },
    {
      metric: 'Resting Heart Rate (RHR)',
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
      normalRange: '12-20 breaths/min for adults at rest'
    },
    {
      metric: 'Body/Skin Temperature',
      description: 'Surface body temperature measured by wearable device',
      scale: 'Celsius (°C) or Fahrenheit (°F)',
      direction: 'Relative changes more important than absolute values',
      normalRange: 'Varies by individual baseline; ±1°C variation is normal'
    }
  ];

  const sessionDescriptions = [
    {
      session: 'Session 1',
      title: 'Baseline with Sound and Breath',
      date: 'August 26, 2025',
      description: 'Initial session establishing baseline measurements. Participants engaged in ancient yogic breathwork (two inhales, one exhale) accompanied by live violin music. This session focused on introducing the breathwork technique and creating a foundation for comparison.',
      elements: ['Guided breathwork instruction', 'Live violin by Nathalie Bonin', 'Pre/post biometric capture', 'Emotional state questionnaires']
    },
    {
      session: 'Session 2',
      title: 'Sound, Breath, and Sound Bowls',
      date: 'September 2, 2025',
      description: 'Building on Session 1, this session added Tibetan singing bowls to the soundscape. The combination of breathwork, violin, and resonant bowl frequencies created a multi-layered sonic environment designed to enhance relaxation and emotional release.',
      elements: ['Continued breathwork practice', 'Live violin', 'Tibetan singing bowls', 'Enhanced sound immersion']
    },
    {
      session: 'Session 3',
      title: 'Sound, Breath, and Binaural Beats',
      date: 'September 9, 2025',
      description: 'Introduced binaural beats through headphones to participants. These precisely calibrated audio frequencies were designed to entrain brainwaves and deepen meditative states while maintaining the core breathwork practice.',
      elements: ['Breathwork with headphones', 'Binaural beat frequencies', 'Live violin accompaniment', 'Brain entrainment focus']
    },
    {
      session: 'Session 4',
      title: 'Sound, Breath, and Movement',
      date: 'September 16, 2025',
      description: 'Final session incorporated gentle movement before breathwork to help participants release physical tension and arrive more fully in their bodies. This preparatory movement enhanced the breathwork experience and emotional processing.',
      elements: ['Pre-breathwork gentle movement', 'Full breathwork session', 'Live music', 'Integration of somatic practices']
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">Data Dictionary & Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed mb-4">
            This section provides detailed explanations of all metrics tracked in the study, including measurement scales,
            scoring direction, and normal ranges for interpretation.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Measured Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {definitions.map((def, idx) => (
              <div
                key={def.metric}
                className={`pb-6 ${idx < definitions.length - 1 ? 'border-b border-slate-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">{def.metric}</h3>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300">{def.scale}</Badge>
                </div>
                <p className="text-slate-700 mb-2">{def.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Scoring Direction</p>
                    <p className="text-sm text-slate-700">{def.direction}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Normal Range</p>
                    <p className="text-sm text-slate-700">{def.normalRange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-600">Session Protocols</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sessionDescriptions.map((session, idx) => (
              <div
                key={session.session}
                className={`pb-6 ${idx < sessionDescriptions.length - 1 ? 'border-b border-slate-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-600">{session.session}</h3>
                    <p className="text-sm font-medium text-slate-600">{session.title}</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300">{session.date}</Badge>
                </div>
                <p className="text-slate-700 mb-3 leading-relaxed">{session.description}</p>
                <div className="flex flex-wrap gap-2">
                  {session.elements.map(element => (
                    <Badge key={element} variant="outline" className="bg-white">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300">
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">Data Collection Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-slate-700 list-disc list-inside">
            <li>All self-reported metrics were collected immediately before and after each session</li>
            <li>Biometric data was captured via personal wearable devices (Apple Watch, Oura Ring, etc.)</li>
            <li>Some participants had incomplete biometric data due to device limitations or connectivity issues</li>
            <li>Missing data is indicated as "N/A" or "No Response" throughout the dashboard</li>
            <li>Statistical analyses use only complete case data for each metric</li>
            <li>Aggregate visualizations compute means and standard deviations from available data</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
