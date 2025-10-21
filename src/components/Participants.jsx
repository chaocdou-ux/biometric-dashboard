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
      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">Participant Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-gradient-to-r from-blue-50 to-purple-50">
                  <th className="text-left p-3 font-semibold text-slate-700">Participant</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Device</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Activity Level</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Baseline Stress</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {data.baseline.map((participant, idx) => {
                  const att = attendance[participant.participant];
                  return (
                    <tr
                      key={participant.participant}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
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
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{data.baseline.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-600">Full Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">
              {Object.values(attendance).filter(a => a.attended === 4).length}
            </p>
            <p className="text-sm text-slate-600 mt-1">Completed all 4 sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">Avg Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {(Object.values(attendance).reduce((sum, a) => sum + parseInt(a.rate), 0) / data.baseline.length).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-600">Baseline Reflections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.baseline
              .filter(p => p.reflection && p.reflection.trim())
              .map(participant => (
                <div
                  key={participant.participant}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
                >
                  <p className="font-semibold text-slate-800 mb-2">{participant.participant}</p>
                  <p className="text-slate-700 text-sm italic leading-relaxed">{participant.reflection}</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
