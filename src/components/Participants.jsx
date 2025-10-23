import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Table as TableIcon, Grid, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function Participants({ data }) {
  const [viewMode, setViewMode] = useState('cards');
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedSession, setSelectedSession] = useState('session_1');
  const [filterDevice, setFilterDevice] = useState('all');
  const [sortBy, setSortBy] = useState('participant');

  const sortedParticipants = [...data.baseline].sort((a, b) => {
    const numA = parseInt(a.participant.replace('Participant ', ''));
    const numB = parseInt(b.participant.replace('Participant ', ''));

    if (sortBy === 'participant') return numA - numB;
    if (sortBy === 'device') return (a.device || '').localeCompare(b.device || '');
    if (sortBy === 'activity') return (a.activity_level || '').localeCompare(b.activity_level || '');
    if (sortBy === 'stress') return (a.baseline_stress_level || 0) - (b.baseline_stress_level || 0);

    return numA - numB;
  });

  const filteredParticipants = filterDevice === 'all'
    ? sortedParticipants
    : sortedParticipants.filter(p => p.device?.toLowerCase().includes(filterDevice.toLowerCase()));

  const toggleCard = (participantId) => {
    setExpandedCards(prev => ({
      ...prev,
      [participantId]: !prev[participantId]
    }));
  };

  const getSessionData = (participant, sessionKey) => {
    return data.sessions[sessionKey]?.find(s => s.participant === participant);
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

  const SessionMetricsCard = ({ participant, sessionKey, sessionNumber }) => {
    const sessionData = getSessionData(participant.participant, sessionKey);

    if (!sessionData) {
      return (
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-sm text-slate-500 text-center">Participant did not attend this session</p>
        </div>
      );
    }

    const metrics = [
      { key: 'emotional', label: 'Emotional State', pre: sessionData.pre_emotional, post: sessionData.post_emotional },
      { key: 'energy', label: 'Physical Energy', pre: sessionData.pre_energy, post: sessionData.post_energy },
      { key: 'tension', label: 'Body Tension', pre: sessionData.pre_tension, post: sessionData.post_tension },
      { key: 'stress', label: 'Stress Level', pre: sessionData.pre_stress, post: sessionData.post_stress },
      { key: 'clarity', label: 'Mental Clarity', pre: sessionData.pre_clarity, post: sessionData.post_clarity },
      { key: 'spiritual', label: 'Spiritual Connection', pre: sessionData.pre_spiritual, post: sessionData.post_spiritual }
    ];

    return (
      <div className="p-4 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.15)', border: '1px solid rgba(168, 200, 218, 0.3)' }}>
        <h4 className="font-semibold mb-3" style={{ color: '#0f172a' }}>Session {sessionNumber}</h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#50604F' }}>Pre-Session</h5>
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
            <h5 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#7D8D74' }}>Post-Session</h5>
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
      </div>
    );
  };

  const ParticipantCard = ({ participant }) => {
    const participantId = participant.participant;
    const isExpanded = expandedCards[participantId];
    const attendance = calculateAttendance(participant.participant);

    return (
      <Card className="glass-panel">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2" style={{ color: '#0f172a' }}>
                {participant.participant.replace('Participant ', 'Participant ')}
              </CardTitle>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium" style={{ color: '#64748b' }}>Device</p>
                  <Badge className="text-xs" style={{ background: 'rgba(125, 141, 116, 0.2)', color: '#0f172a', border: '1px solid rgba(125, 141, 116, 0.3)' }}>
                    {participant.device || 'N/A'}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium" style={{ color: '#64748b' }}>Activity Level</p>
                  <p className="text-sm font-medium" style={{ color: '#0f172a' }}>
                    {participant.activity_level?.split('(')[0].trim() || 'N/A'}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium" style={{ color: '#64748b' }}>Baseline Stress</p>
                  <Badge className="text-xs" style={{
                    background: participant.baseline_stress?.includes('High') ? 'rgba(239, 68, 68, 0.2)' :
                               participant.baseline_stress?.includes('Moderate') ? 'rgba(249, 115, 22, 0.2)' :
                               'rgba(34, 197, 94, 0.2)',
                    color: '#0f172a',
                    border: `1px solid ${participant.baseline_stress?.includes('High') ? 'rgba(239, 68, 68, 0.3)' :
                            participant.baseline_stress?.includes('Moderate') ? 'rgba(249, 115, 22, 0.3)' :
                            'rgba(34, 197, 94, 0.3)'}`
                  }}>
                    {participant.baseline_stress || 'N/A'}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium" style={{ color: '#64748b' }}>Attendance</p>
                  <Badge className="text-xs" style={{
                    background: attendance.attended === 4 ? 'rgba(34, 197, 94, 0.2)' :
                               attendance.attended >= 3 ? 'rgba(59, 130, 246, 0.2)' :
                               'rgba(148, 163, 184, 0.2)',
                    color: '#0f172a',
                    border: `1px solid ${attendance.attended === 4 ? 'rgba(34, 197, 94, 0.3)' :
                            attendance.attended >= 3 ? 'rgba(59, 130, 246, 0.3)' :
                            'rgba(148, 163, 184, 0.3)'}`
                  }}>
                    {attendance.attended}/4 sessions
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard(participantId)}
              className="ml-4"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <SessionMetricsCard participant={participant} sessionKey="session_1" sessionNumber="1" />
              <SessionMetricsCard participant={participant} sessionKey="session_2" sessionNumber="2" />
              <SessionMetricsCard participant={participant} sessionKey="session_3" sessionNumber="3" />
              <SessionMetricsCard participant={participant} sessionKey="session_4" sessionNumber="4" />
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const calculateAttendance = (participantName) => {
    let attended = 0;
    Object.values(data.sessions).forEach(session => {
      if (session.some(s => s.participant === participantName)) {
        attended++;
      }
    });
    return { attended, total: 4 };
  };

  const MatrixView = () => {
    const sessionKey = selectedSession;
    const sessionNumber = sessionKey.replace('session_', '');
    const metrics = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const metricLabels = {
      emotional: 'Emotion',
      energy: 'Energy',
      tension: 'Tension',
      stress: 'Stress',
      clarity: 'Clarity',
      spiritual: 'Spiritual'
    };

    return (
      <Card className="glass-panel">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-xl" style={{ color: '#0f172a' }}>
              Session {sessionNumber} - All Participants Comparison
            </CardTitle>
            <div className="flex gap-2">
              {['session_1', 'session_2', 'session_3', 'session_4'].map((key, idx) => (
                <Button
                  key={key}
                  variant={selectedSession === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSession(key)}
                  style={selectedSession === key ? {
                    background: 'rgba(125, 141, 116, 0.3)',
                    color: '#0f172a',
                    border: '1px solid rgba(125, 141, 116, 0.5)'
                  } : {}}
                >
                  S{idx + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(15, 23, 42, 0.2)', background: 'rgba(168, 200, 218, 0.15)' }}>
                  <th className="text-left p-3 font-semibold" style={{ color: '#0f172a' }}>Participant</th>
                  {metrics.map(metric => (
                    <th key={metric} className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>
                      <MetricTooltip label={metricLabels[metric]} description={metricDescriptions[metric]} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant, idx) => {
                  const sessionData = getSessionData(participant.participant, sessionKey);
                  return (
                    <tr key={participant.participant} style={{
                      borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
                      background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                    }}>
                      <td className="p-3 font-medium" style={{ color: '#0f172a' }}>
                        {participant.participant.replace('Participant ', 'P')}
                      </td>
                      {metrics.map(metric => {
                        const pre = sessionData?.[`pre_${metric}`];
                        const post = sessionData?.[`post_${metric}`];
                        const change = calculateChange(pre, post);

                        return (
                          <td key={metric} className="p-3 text-center">
                            {sessionData ? (
                              <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs" style={{ color: '#64748b' }}>{pre}</span>
                                  <span style={{ color: '#0f172a' }}>→</span>
                                  <span className="text-xs font-semibold" style={{ color: '#0f172a' }}>{post}</span>
                                </div>
                                {change !== null && (
                                  <span className={`text-xs font-medium ${getChangeColor(change)}`}>
                                    {change > 0 ? '+' : ''}{change.toFixed(1)}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span style={{ color: '#cbd5e1' }}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl" style={{ color: '#0f172a' }}>Participants</CardTitle>

            <div className="flex flex-wrap gap-3">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  style={viewMode === 'cards' ? {
                    background: 'rgba(125, 141, 116, 0.3)',
                    color: '#0f172a',
                    border: '1px solid rgba(125, 141, 116, 0.5)'
                  } : {}}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Cards
                </Button>
                <Button
                  variant={viewMode === 'matrix' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('matrix')}
                  style={viewMode === 'matrix' ? {
                    background: 'rgba(125, 141, 116, 0.3)',
                    color: '#0f172a',
                    border: '1px solid rgba(125, 141, 116, 0.5)'
                  } : {}}
                >
                  <TableIcon className="w-4 h-4 mr-2" />
                  Matrix
                </Button>
              </div>

              <select
                value={filterDevice}
                onChange={(e) => setFilterDevice(e.target.value)}
                className="px-3 py-1.5 text-sm rounded border border-slate-300 bg-white"
                style={{ color: '#0f172a' }}
              >
                <option value="all">All Devices</option>
                <option value="apple">Apple Watch</option>
                <option value="oura">Oura Ring</option>
                <option value="muse">Muse</option>
                <option value="ring conn">Ring Conn</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-sm rounded border border-slate-300 bg-white"
                style={{ color: '#0f172a' }}
              >
                <option value="participant">Sort by ID</option>
                <option value="device">Sort by Device</option>
                <option value="activity">Sort by Activity</option>
                <option value="stress">Sort by Stress</option>
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {viewMode === 'cards' ? (
        <div className="space-y-4">
          {filteredParticipants.map(participant => (
            <ParticipantCard key={participant.participant} participant={participant} />
          ))}
        </div>
      ) : (
        <MatrixView />
      )}
    </div>
  );
}
