import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Metrics({ data }) {
  const calculateMetrics = () => {
    const allSessions = data.allSessions || [];
    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const improvements = {};

    metricNames.forEach(metric => {
      const validData = allSessions.filter(
        s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null
      );

      if (validData.length > 0) {
        const preAvg = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
        const postAvg = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;

        improvements[metric] = {
          pre: preAvg,
          post: postAvg,
          count: validData.length
        };
      }
    });

    return improvements;
  };

  const improvements = calculateMetrics();

  const radarData = Object.entries(improvements).map(([metric, values]) => ({
    metric: metric.charAt(0).toUpperCase() + metric.slice(1),
    Pre: parseFloat(values.pre.toFixed(2)),
    Post: parseFloat(values.post.toFixed(2))
  }));

  const comparisonData = Object.entries(improvements).map(([metric, values]) => ({
    metric: metric.charAt(0).toUpperCase() + metric.slice(1),
    Pre: parseFloat(values.pre.toFixed(2)),
    Post: parseFloat(values.post.toFixed(2)),
    Change: parseFloat((values.post - values.pre).toFixed(2))
  }));

  const sessionTrends = Object.entries(data.sessions).map(([sessionKey, sessionData], idx) => {
    const metrics = {};
    ['emotional', 'energy', 'clarity', 'spiritual'].forEach(metric => {
      const validData = sessionData.filter(s => s[`post_${metric}`] !== null);
      if (validData.length > 0) {
        metrics[metric] = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
      }
    });

    return {
      session: `S${idx + 1}`,
      Emotional: metrics.emotional || 0,
      Energy: metrics.energy || 0,
      Clarity: metrics.clarity || 0,
      Spiritual: metrics.spiritual || 0
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-300 rounded-lg shadow-lg">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Overall Pre vs Post Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar
                  name="Pre-Session"
                  dataKey="Pre"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Post-Session"
                  dataKey="Post"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl text-purple-600">Metric Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="metric"
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
                <Bar dataKey="Pre" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Post" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Session Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sessionTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="session" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
              <Line type="monotone" dataKey="Emotional" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="Energy" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="Clarity" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="Spiritual" stroke="#a855f7" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-600">Detailed Metrics Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700">Metric</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Pre-Session Avg</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Post-Session Avg</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Change</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Sample Size</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(improvements).map(([metric, values], idx) => {
                  const change = values.post - values.pre;
                  const changePercent = ((change / values.pre) * 100).toFixed(1);
                  const isPositive = (metric === 'tension' || metric === 'stress') ? change < 0 : change > 0;

                  return (
                    <tr
                      key={metric}
                      className={`border-b border-slate-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                    >
                      <td className="p-3 font-medium text-slate-800">
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </td>
                      <td className="text-center p-3 text-slate-700">{values.pre.toFixed(2)}</td>
                      <td className="text-center p-3 text-slate-700">{values.post.toFixed(2)}</td>
                      <td className={`text-center p-3 font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {change > 0 ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent}%)
                      </td>
                      <td className="text-center p-3 text-slate-700">{values.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
