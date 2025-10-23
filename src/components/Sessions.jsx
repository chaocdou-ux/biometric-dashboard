import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const sessionDescriptions = {
  session_1: {
    title: 'Session 1 - Baseline',
    date: '08/26/25',
    description: 'Breathwork + live violin to establish foundational practice.'
  },
  session_2: {
    title: 'Session 2 - Resonance',
    date: '09/02/25',
    description: 'Breathwork + live violin + quartz sound bowls for deeper resonance.'
  },
  session_3: {
    title: 'Session 3 - Brainwave Entrainment',
    date: '09/09/25',
    description: 'Breathwork + live violin + binaural beats (headphones) for brainwave synchronization.'
  },
  session_4: {
    title: 'Session 4 - Movement Integration',
    date: '09/16/25',
    description: 'Movement + breathwork + live violin to support physical energy release.'
  }
};

export default function Sessions({ data }) {
  const [expandedSessions, setExpandedSessions] = useState({});

  const toggleSession = (sessionKey) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionKey]: !prev[sessionKey]
    }));
  };

  const calculateChange = (pre, post) => {
    if (!pre || !post) return null;
    return post - pre;
  };

  const getChangeIcon = (change) => {
    if (change === null || change === 0) return <Minus className="w-3 h-3 text-slate-400" />;
    if (change > 0) return <TrendingUp className="w-3 h-3 text-green-600" />;
    return <TrendingDown className="w-3 h-3 text-red-600" />;
  };

  const getChangeColor = (change) => {
    if (change === null || change === 0) return 'text-slate-600';
    if (change > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const MetricTooltip = ({ label, description }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <span className="relative inline-block">
        <span
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className="cursor-help border-b border-dotted border-slate-400"
        >
          {label}
        </span>

        {isVisible && (
          <div
            className="absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg"
            style={{
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#ffffff',
              backdropFilter: 'blur(10px)',
              minWidth: '200px',
              maxWidth: '300px',
              whiteSpace: 'normal'
            }}
          >
            {description}
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '8px',
                height: '8px',
                background: 'rgba(15, 23, 42, 0.95)'
              }}
            />
          </div>
        )}
      </span>
    );
  };

  const metricDescriptions = {
    emotional: "Self-reported emotional state on a scale of 1-5, where 5 represents the most positive emotional state",
    energy: "Physical energy level on a scale of 1-5, where 5 represents highest energy",
    tension: "Body tension level on a scale of 1-5, where 5 represents highest tension",
    stress: "Perceived stress level on a scale of 1-5, where 5 represents highest stress",
    clarity: "Mental clarity and focus on a scale of 1-5, where 5 represents highest clarity",
    spiritual: "Sense of spiritual connection on a scale of 1-5, where 5 represents strongest connection"
  };

  const ParticipantRow = ({ participantData }) => {
    const metrics = [
      { key: 'emotional', label: 'Emotional State', pre: participantData.pre_emotional, post: participantData.post_emotional },
      { key: 'energy', label: 'Physical Energy', pre: participantData.pre_energy, post: participantData.post_energy },
      { key: 'tension', label: 'Body Tension', pre: participantData.pre_tension, post: participantData.post_tension },
      { key: 'stress', label: 'Stress Level', pre: participantData.pre_stress, post: participantData.post_stress },
      { key: 'clarity', label: 'Mental Clarity', pre: participantData.pre_clarity, post: participantData.post_clarity },
      { key: 'spiritual', label: 'Spiritual Connection', pre: participantData.pre_spiritual, post: participantData.post_spiritual }
    ];

    return (
      <div className="p-4 rounded-lg mb-3" style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
        <div className="flex justify-between items-center mb-3">
          <h5 className="font-semibold" style={{ color: '#0f172a' }}>{participantData.participant}</h5>
          <Badge className="text-xs" style={{ background: 'rgba(125, 141, 116, 0.2)', color: '#0f172a', border: '1px solid rgba(125, 141, 116, 0.3)' }}>
            {participantData.device || 'N/A'}
          </Badge>
        </div>

        {participantData.pre_emotional_words && (
          <div className="p-3 rounded-lg mb-3" style={{ background: 'rgba(168, 200, 218, 0.2)', border: '1px solid rgba(168, 200, 218, 0.4)' }}>
            <h6 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#0f172a' }}>Emotional Description</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <p className="text-xs mb-1" style={{ color: '#64748b' }}>Pre-Session:</p>
                <p className="text-sm italic" style={{ color: '#1e293b' }}>"{participantData.pre_emotional_words}"</p>
              </div>
              {participantData.post_emotional_words && (
                <div>
                  <p className="text-xs mb-1" style={{ color: '#64748b' }}>Post-Session:</p>
                  <p className="text-sm italic" style={{ color: '#1e293b' }}>"{participantData.post_emotional_words}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h6 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#50604F' }}>Pre-Session Metrics</h6>
            {metrics.map(metric => (
              <div key={`pre-${metric.key}`} className="flex justify-between items-center p-2 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                <span className="text-sm" style={{ color: '#1e293b' }}>
                  <MetricTooltip label={metric.label} description={metricDescriptions[metric.key]} />
                </span>
                <span className="text-sm font-semibold" style={{ color: '#0f172a' }}>{metric.pre || '—'}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h6 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#7D8D74' }}>Post-Session Metrics</h6>
            {metrics.map(metric => {
              const change = calculateChange(metric.pre, metric.post);
              return (
                <div key={`post-${metric.key}`} className="flex justify-between items-center p-2 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  <span className="text-sm" style={{ color: '#1e293b' }}>{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: '#0f172a' }}>{metric.post || '—'}</span>
                    {change !== null && (
                      <div className="flex items-center gap-1">
                        {getChangeIcon(change)}
                        <span className={`text-xs font-medium ${getChangeColor(change)}`}>
                          {change > 0 ? '+' : ''}{change.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
            <h6 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#0f172a' }}>Pre-Session Vitals</h6>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>Heart Rate:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.pre_heart_rate ? `${participantData.pre_heart_rate} BPM` : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>SpO2:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.pre_spo2 ? `${participantData.pre_spo2}%` : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>O2 Level:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.pre_o2 || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>Resting HR:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.pre_rhr ? `${participantData.pre_rhr} BPM` : '—'}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
            <h6 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#0f172a' }}>Post-Session Vitals</h6>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>Heart Rate:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.post_heart_rate ? `${participantData.post_heart_rate} BPM` : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>SpO2:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.post_spo2 ? `${participantData.post_spo2}%` : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>O2 Level:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.post_o2 || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#64748b' }}>Resting HR:</span>
                <span className="font-medium" style={{ color: '#0f172a' }}>{participantData.post_rhr ? `${participantData.post_rhr} BPM` : '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {(participantData.sensations || participantData.experience || participantData.post_feelings || participantData.violin_influence || participantData.comments) && (
          <div className="p-3 rounded-lg space-y-3 mt-4" style={{ background: 'rgba(125, 141, 116, 0.1)', border: '1px solid rgba(125, 141, 116, 0.3)' }}>
            <h6 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#0f172a' }}>Post-Session Details</h6>

            {participantData.sensations && participantData.sensations.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>Physical Sensations:</p>
                <ul className="list-disc list-inside text-sm space-y-0.5" style={{ color: '#1e293b' }}>
                  {participantData.sensations.map((sensation, idx) => (
                    <li key={idx}>{sensation}</li>
                  ))}
                </ul>
              </div>
            )}

            {participantData.experience && participantData.experience.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>Experience Description:</p>
                <div className="flex flex-wrap gap-2">
                  {participantData.experience.map((exp, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(255, 255, 255, 0.6)', color: '#0f172a' }}>
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {participantData.post_feelings && participantData.post_feelings.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>Post-Session Feelings:</p>
                <div className="flex flex-wrap gap-2">
                  {participantData.post_feelings.map((feeling, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(255, 255, 255, 0.6)', color: '#0f172a' }}>
                      {feeling}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {participantData.violin_influence && participantData.violin_influence.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>Violin's Influence:</p>
                <div className="flex flex-wrap gap-2">
                  {participantData.violin_influence.map((influence, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(255, 255, 255, 0.6)', color: '#0f172a' }}>
                      {influence}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {participantData.comments && (
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>Additional Comments:</p>
                <p className="text-sm italic" style={{ color: '#1e293b' }}>"{participantData.comments}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const SessionCard = ({ sessionKey, sessionInfo }) => {
    const sessionData = data.sessions[sessionKey] || [];
    const isExpanded = expandedSessions[sessionKey];
    const attendanceCount = sessionData.length;

    return (
      <Card className="glass-panel">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2" style={{ color: '#0f172a' }}>
                {sessionInfo.title}
              </CardTitle>
              <p className="text-sm mb-3" style={{ color: '#64748b' }}>
                {sessionInfo.description}
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <Badge className="text-xs" style={{ background: 'rgba(168, 200, 218, 0.2)', color: '#0f172a', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
                  {sessionInfo.date}
                </Badge>
                <Badge className="text-xs" style={{
                  background: attendanceCount === data.baseline.length ? 'rgba(34, 197, 94, 0.2)' :
                             attendanceCount >= data.baseline.length * 0.75 ? 'rgba(59, 130, 246, 0.2)' :
                             'rgba(148, 163, 184, 0.2)',
                  color: '#0f172a',
                  border: `1px solid ${attendanceCount === data.baseline.length ? 'rgba(34, 197, 94, 0.3)' :
                          attendanceCount >= data.baseline.length * 0.75 ? 'rgba(59, 130, 246, 0.3)' :
                          'rgba(148, 163, 184, 0.3)'}`
                }}>
                  {attendanceCount} Participants
                </Badge>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSession(sessionKey)}
              className="ml-4"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-0">
              {sessionData.map((participantData, idx) => (
                <ParticipantRow key={idx} participantData={participantData} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-2xl" style={{ color: '#0f172a' }}>Sessions</CardTitle>
          <p className="text-sm mt-2" style={{ color: '#64748b' }}>
            Detailed participant data for each session
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {Object.entries(sessionDescriptions).map(([key, info]) => (
          <SessionCard key={key} sessionKey={key} sessionInfo={info} />
        ))}
      </div>
    </div>
  );
}
