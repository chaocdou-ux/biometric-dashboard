import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

const sessionDescriptions = {
  session_1: {
    title: 'Session 1 - Baseline',
    subtitle: 'Session 1',
    date: '08/26/25',
    fullDescription: 'Breathwork + live violin to establish foundational practice.'
  },
  session_2: {
    title: 'Session 2 - Resonance',
    subtitle: 'Session 2',
    date: '09/02/25',
    fullDescription: 'Breathwork + live violin + quartz sound bowls for deeper resonance.'
  },
  session_3: {
    title: 'Session 3 - Brainwave Entrainment',
    subtitle: 'Session 3',
    date: '09/09/25',
    fullDescription: 'Breathwork + live violin + binaural beats (headphones) for brainwave synchronization.'
  },
  session_4: {
    title: 'Session 4 - Movement Integration',
    subtitle: 'Session 4',
    date: '09/16/25',
    fullDescription: 'Movement + breathwork + live violin to support physical energy release.'
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
              {change > 0 ? '+' : ''}{change.toFixed(2)}
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.2)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
          <p className="font-semibold mb-1" style={{ color: '#0f172a' }}>{desc.title}</p>
          <p className="text-sm mb-2" style={{ color: '#1e293b' }}>{desc.date}</p>
          <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>{desc.fullDescription}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>Aggregate Pre/Post Comparison</h3>
            <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.15)', border: '1px solid rgba(168, 200, 218, 0.25)' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#0f172a' }}>
                <strong>Note:</strong> All metrics are calculated on a 1 to 5 scale, with 5 representing the most positive outcome.
              </p>
            </div>
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
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>Physical Metrics</h3>
            <div className="space-y-3">
              <div className="border-b pb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.2)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>Heart Rate</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs" style={{ color: '#1e293b', opacity: 0.7 }}>Pre</p>
                    <p className="text-sm font-medium" style={{ color: '#0f172a' }}>{aggregateData('pre_heart_rate') || 'N/A'} BPM</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#1e293b', opacity: 0.7 }}>Post</p>
                    <p className="text-sm font-medium" style={{ color: '#0f172a' }}>{aggregateData('post_heart_rate') || 'N/A'} BPM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>Participant Count</h4>
                <p className="text-3xl font-bold" style={{ color: '#50604F' }}>{sessionData.length}</p>
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
                    background: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.7)',
                    color: isActive ? '#ffffff' : '#0f172a',
                    border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.2)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '14px',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 200, 218, 0.3), 0 0 12px rgba(168, 200, 218, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  aria-label={desc.title}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {desc.subtitle}
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
