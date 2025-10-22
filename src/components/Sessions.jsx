import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

const sessionDescriptions = {
  session_1: {
    title: 'Session 1 (8/26/25)',
    subtitle: 'Baseline',
    date: '8/26/25',
    description: '90 minutes: Breathwork (2 inhales, 1 exhale) + live violin. Establishes foundational practice.'
  },
  session_2: {
    title: 'Session 2 (9/2/25)',
    subtitle: 'Resonance',
    date: '9/2/25',
    description: '90 minutes: Breathwork + live violin + quartz sound bowls. Sound bowls introduced for deeper resonance by Will Webb.'
  },
  session_3: {
    title: 'Session 3 (9/9/25)',
    subtitle: 'Brainwave Entrainment',
    date: '9/9/25',
    description: '90 minutes: Breathwork + live violin + binaural beats (headphones). Binaural beats added for brainwave synchronization, created by Nathalie Bonin.'
  },
  session_4: {
    title: 'Session 4 (9/16/25)',
    subtitle: 'Movement Integration',
    date: '9/16/25',
    description: '90 minutes: Movement + breathwork + live violin. Movement introduced before breathwork to support physical energy release, led by Atasiea Kenneth L. Ferguson.'
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
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl" style={{ color: '#0f172a' }}>{desc.title}</CardTitle>
            <p className="text-sm text-slate-600 mt-1">{desc.subtitle}</p>
          </div>
          <Badge className="glass-panel px-3 py-1" style={{ background: 'rgba(168, 200, 218, 0.3)', color: '#0f172a', border: '1px solid rgba(168, 200, 218, 0.4)' }}>
            {desc.date}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.2)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
          <p className="leading-relaxed" style={{ color: '#0f172a' }}>{desc.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>Aggregate Pre/Post Comparison</h3>
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
      <Tabs value={activeSession} onValueChange={setActiveSession}>
        <div className="mb-6">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            {Object.entries(sessionDescriptions).map(([key, desc]) => {
              const isActive = activeSession === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSession(key)}
                  className="px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center"
                  style={{
                    background: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.6)',
                    color: isActive ? '#ffffff' : '#0f172a',
                    border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.2)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '14px',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 200, 218, 0.3), 0 0 12px rgba(168, 200, 218, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  aria-label={desc.title}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {desc.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-card mb-6">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: '#0f172a' }}>
            Session Protocols
          </h2>
          <p className="text-sm" style={{ color: '#1e293b', opacity: 0.8 }}>
            Each 90-minute session progressively introduced new modalities to explore their combined effects on participant wellbeing.
          </p>
        </div>

        {Object.entries(data.sessions).map(([sessionKey, sessionData]) => (
          <TabsContent key={sessionKey} value={sessionKey}>
            <SessionView sessionKey={sessionKey} sessionData={sessionData} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
