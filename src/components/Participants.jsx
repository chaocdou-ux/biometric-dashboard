import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function Participants({ data }) {
  const calculateAttendance = () => {
    const attendance = {};

    data.baseline.forEach(participant => {
      let attended = 0;
      Object.values(data.sessions).forEach(session => {
        if (session.some(s => s.participant === participant.participant)) {
          attended++;
        }
      });

      attendance[participant.participant] = {
        attended,
        total: 4,
        rate: ((attended / 4) * 100).toFixed(0)
      };
    });

    return attendance;
  };

  const attendance = calculateAttendance();

  const getDeviceIcon = (device) => {
    if (!device) return '';
    if (device.toLowerCase().includes('oura') || device.toLowerCase().includes('ring')) return '💍';
    if (device.toLowerCase().includes('apple') || device.toLowerCase().includes('watch')) return '⌚';
    return '📱';
  };

  const getActivityColor = (level) => {
    if (!level) return 'bg-slate-100 text-slate-700';
    if (level.toLowerCase().includes('very active')) return 'bg-green-100 text-green-700 border-green-300';
    if (level.toLowerCase().includes('moderately')) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (level.toLowerCase().includes('lightly')) return 'bg-purple-100 text-purple-700 border-purple-300';
    return 'bg-slate-100 text-slate-700';
  };

  const getStressColor = (stress) => {
    if (!stress) return 'bg-slate-100 text-slate-700';
    if (stress.toLowerCase().includes('high')) return 'bg-red-100 text-red-700 border-red-300';
    if (stress.toLowerCase().includes('moderate')) return 'bg-orange-100 text-orange-700 border-orange-300';
    if (stress.toLowerCase().includes('mild')) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-2xl" style={{ color: '#0f172a' }}>Participant Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(15, 23, 42, 0.2)', background: 'rgba(168, 200, 218, 0.15)' }}>
                  <th className="text-left p-3 font-semibold" style={{ color: '#0f172a' }}>Participant</th>
                  <th className="text-left p-3 font-semibold" style={{ color: '#0f172a' }}>Device</th>
                  <th className="text-left p-3 font-semibold" style={{ color: '#0f172a' }}>Activity Level</th>
                  <th className="text-left p-3 font-semibold" style={{ color: '#0f172a' }}>Baseline Stress</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {data.baseline.map((participant, idx) => {
                  const att = attendance[participant.participant];
                  return (
                    <tr
                      key={participant.participant}
                      style={{
                        borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
                        background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(168, 200, 218, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
                    >
                      <td className="p-3 font-semibold text-slate-800">{participant.participant}</td>
                      <td className="p-3 text-slate-700">
                        <span className="mr-2">{getDeviceIcon(participant.device)}</span>
                        {participant.device || 'N/A'}
                      </td>
                      <td className="p-3">
                        <Badge className={getActivityColor(participant.activity_level)}>
                          {participant.activity_level ? participant.activity_level.split('(')[0].trim() : 'N/A'}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getStressColor(participant.baseline_stress)}>
                          {participant.baseline_stress || 'N/A'}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge
                          className={
                            att.attended === 4
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : att.attended >= 3
                              ? 'bg-blue-100 text-blue-700 border-blue-300'
                              : 'bg-slate-100 text-slate-700'
                          }
                        >
                          {att.attended}/4 ({att.rate}%)
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: '#0f172a' }}>Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value" style={{ color: '#2d5016' }}>{data.baseline.length}</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: '#0f172a' }}>Full Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value" style={{ color: '#50604F' }}>
              {Object.values(attendance).filter(a => a.attended === 4).length}
            </p>
            <p className="text-sm mt-1" style={{ color: '#1e293b', opacity: 0.85 }}>Completed all 4 sessions</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: '#0f172a' }}>Avg Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value" style={{ color: '#F3C77B' }}>
              {(Object.values(attendance).reduce((sum, a) => sum + parseInt(a.rate), 0) / data.baseline.length).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
