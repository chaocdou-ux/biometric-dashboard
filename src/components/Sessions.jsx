import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

const sessionDescriptions = {
  session_1: {
    title: 'Session 1 (8/26/25)',
    subtitle: 'Baseline',
    date: '8/26/25',
    description: '90 minutes: Breathwork (2 inhales, 1 exhale) + live violin. Baseline session establishing the core practice.'
  },
  session_2: {
    title: 'Session 2 (9/2/25)',
    subtitle: 'Resonance',
    date: '9/2/25',
    description: '90 minutes: Breathwork + live violin + quartz sound bowls. Introduction of sound bowls for deeper resonance.'
  },
  session_3: {
    title: 'Session 3 (9/9/25)',
    subtitle: 'Brainwave Entrainment',
    date: '9/9/25',
    description: '90 minutes: Breathwork + live violin + binaural beats (headphones). Binaural beats added for enhanced brainwave synchronization.'
  },
  session_4: {
    title: 'Session 4 (9/16/25)',
    subtitle: 'Movement Integration',
    date: '9/16/25',
    description: '90 minutes: Movement + breathwork + live violin. Movement introduced before breathwork for physical energy release.'
  }
};

const ratingLabels = {
  emotional: ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'],
  energy: ['Depleted', 'Sluggish', 'Moderate', 'Energized', 'Vibrant'],
  tension: ['Very Relaxed', 'Relaxed', 'Neutral', 'Tense', 'Very Tense'],
  stress: ['No Stress', 'Mild', 'Moderate', 'Stressed', 'Extremely Stressed'],
  clarity: ['Very Unclear', 'Unclear', 'Moderate', 'Clear', 'Very Sharp'],
  spiritual: ['Very Disconnected', 'Disconnected', 'Neutral', 'Connected', 'Deeply Connected']
};

function MetricComparison({ label, preValue, postValue, inverse = false }) {
  const preLabel = preValue ? ratingLabels[label.toLowerCase()]?.[preValue - 1] || preValue : 'N/A';
  const postLabel = postValue ? ratingLabels[label.toLowerCase()]?.[postValue - 1] || postValue : 'N/A';

  let change = null;
  let changeColor = 'text-slate-600';

  if (preValue && postValue) {
    change = postValue - preValue;
    if (inverse) {
      change = -change;
    }
    if (change > 0) changeColor = 'text-green-600';
    else if (change < 0) changeColor = 'text-red-600';
  }

  return (
    <div className="border-b border-slate-200 pb-3 mb-3 last:border-b-0">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">{label}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500">Pre-Session</p>
          <p className="text-sm font-medium text-slate-800">{preLabel}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Post-Session</p>
          <p className="text-sm font-medium text-slate-800">{postLabel}</p>
          {change !== null && (
            <Badge className={`mt-1 ${changeColor}`} variant="outline">
              {change > 0 ? '+' : ''}{change}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionView({ sessionKey, sessionData }) {
  const desc = sessionDescriptions[sessionKey];

  const aggregateData = (field) => {
    const values = sessionData
      .map(s => s[field])
      .filter(v => v !== null && v !== undefined);
    if (values.length === 0) return null;
    return (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2);
  };

  const metrics = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-blue-600">{desc.title}</CardTitle>
            <p className="text-sm text-slate-600 mt-1">{desc.subtitle}</p>
          </div>
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            {desc.date}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-slate-700 leading-relaxed">{desc.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Aggregate Pre/Post Comparison</h3>
            {metrics.map(metric => (
              <MetricComparison
                key={metric}
                label={metric.charAt(0).toUpperCase() + metric.slice(1)}
                preValue={parseFloat(aggregateData(`pre_${metric}`))}
                postValue={parseFloat(aggregateData(`post_${metric}`))}
                inverse={metric === 'tension' || metric === 'stress'}
              />
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Physical Metrics</h3>
            <div className="space-y-3">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Heart Rate</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Pre</p>
                    <p className="text-sm font-medium">{aggregateData('pre_heart_rate') || 'N/A'} BPM</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Post</p>
                    <p className="text-sm font-medium">{aggregateData('post_heart_rate') || 'N/A'} BPM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Participant Count</h4>
                <p className="text-3xl font-bold text-blue-600">{sessionData.length}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Sessions({ data }) {
  const [activeSession, setActiveSession] = useState('session_1');

  return (
    <div className="space-y-6">
      <div className="glass-card mb-6">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#0f172a' }}>
          Session Protocols
        </h2>
        <p className="text-sm" style={{ color: '#1e293b', opacity: 0.8 }}>
          Each 90-minute session progressively introduced new modalities to explore their combined effects on participant wellbeing.
        </p>
      </div>
      <Tabs value={activeSession} onValueChange={setActiveSession}>
        <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200">
          {Object.entries(sessionDescriptions).map(([key, desc]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              {desc.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(data.sessions).map(([sessionKey, sessionData]) => (
          <TabsContent key={sessionKey} value={sessionKey}>
            <SessionView sessionKey={sessionKey} sessionData={sessionData} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
