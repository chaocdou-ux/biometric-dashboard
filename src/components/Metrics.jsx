import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors, metricLabels, calculateImprovement } from '../lib/designSystem';

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
        const improvement = calculateImprovement(preAvg, postAvg, metric);

        improvements[metric] = {
          pre: preAvg,
          post: postAvg,
          change: improvement,
          count: validData.length
        };
      }
    });

    return improvements;
  };

  const improvements = calculateMetrics();

  const radarData = Object.entries(improvements).map(([metric, values]) => ({
    metric: metricLabels[metric],
    Pre: parseFloat(values.pre.toFixed(2)),
    Post: parseFloat(values.post.toFixed(2)),
    fullMark: 5
  }));

  const percentChangeData = Object.entries(improvements).map(([metric, values]) => ({
    name: metricLabels[metric],
    change: parseFloat(values.change.toFixed(1)),
    color: colors.metrics[metric],
    n: values.count
  }));

  const sessionTrends = Object.entries(data.sessions).map(([sessionKey, sessionData], idx) => {
    const metrics = {};
    ['emotional', 'energy', 'clarity', 'spiritual', 'tension', 'stress'].forEach(metric => {
      const validData = sessionData.filter(s => s[`post_${metric}`] !== null && s[`pre_${metric}`] !== null);
      if (validData.length > 0) {
        const preAvg = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
        const postAvg = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
        const change = calculateImprovement(preAvg, postAvg, metric);
        metrics[metric] = change;
      }
    });

    return {
      session: `Session ${idx + 1}`,
      Emotional: metrics.emotional || 0,
      Energy: metrics.energy || 0,
      Clarity: metrics.clarity || 0,
      Spiritual: metrics.spiritual || 0,
      Tension: metrics.tension || 0,
      Stress: metrics.stress || 0
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 shadow-xl">
          <p className="font-semibold mb-2" style={{ color: colors.deepCharcoal }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? `${entry.value.toFixed(1)}${entry.name === 'change' ? '%' : ''}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={colors.accentRed}
        stroke="white"
        strokeWidth={2}
        style={{ filter: 'drop-shadow(0 0 4px rgba(245, 59, 87, 0.4))' }}
      />
    );
  };

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h2 className="section-header">Pre vs Post Comparison</h2>
        <p className="text-sm mb-4" style={{ color: '#1e293b' }}>
          Radial chart showing average pre-session and post-session values across all six metrics.
        </p>
        <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.15)', border: '1px solid rgba(168, 200, 218, 0.25)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#0f172a' }}>
            <strong>Note:</strong> All metrics are calculated on a 1 to 5 scale, with 5 representing the most positive outcome.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke={colors.cloudGrey} strokeWidth={1} />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 4]}
              tick={false}
              tickCount={5}
            />
            <Radar
              name="Pre-Session"
              dataKey="Pre"
              stroke={colors.darkYellow}
              fill={colors.darkYellow}
              fillOpacity={0.4}
              strokeWidth={3}
            />
            <Radar
              name="Post-Session"
              dataKey="Post"
              stroke="#8b5cf6"
              fill="#a78bfa"
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span style={{ color: colors.deepCharcoal, fontWeight: 500 }}>{value}</span>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Metric Evolution</h2>
        <p className="text-sm mb-6" style={{ color: colors.pineGreen }}>
          Tracks how all six metrics changed across the four sessions: emotional state, physical energy, mental clarity, spiritual connection, body tension, and stress level.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sessionTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="session"
              tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 500 }}
              stroke={colors.forestMoss}
            />
            <YAxis
              tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 500 }}
              stroke={colors.forestMoss}
              label={{ value: '% Change', angle: -90, position: 'insideLeft', style: { fill: colors.pineGreen } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => (
                <span style={{ color: colors.deepCharcoal, fontWeight: 500 }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="Emotional"
              stroke={colors.metrics.emotional}
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Energy"
              stroke={colors.metrics.energy}
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Clarity"
              stroke={colors.metrics.clarity}
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Spiritual"
              stroke={colors.metrics.spiritual}
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Tension"
              stroke={colors.metrics.tension}
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Stress"
              stroke={colors.metrics.stress}
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Average Change</h2>
        <p className="text-sm mb-6" style={{ color: colors.pineGreen }}>
          Average percent change for each metric across all four sessions.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={percentChangeData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#0f172a', fontSize: 13, fontWeight: 500 }}
              angle={-45}
              textAnchor="end"
              height={80}
              stroke={colors.forestMoss}
            />
            <YAxis
              tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 500 }}
              stroke={colors.forestMoss}
              label={{ value: '% Change', angle: -90, position: 'insideLeft', style: { fill: colors.pineGreen } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="change"
              radius={[8, 8, 0, 0]}
            >
              {percentChangeData.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Statistical Summary</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(improvements).map(([metric, values]) => (
            <div key={metric} className="p-4 rounded-lg" style={{ backgroundColor: `${colors.metrics[metric]}15` }}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="data-point"
                  style={{ backgroundColor: colors.metrics[metric] }}
                />
                <h3 className="font-semibold" style={{ color: colors.deepCharcoal }}>
                  {metricLabels[metric]}
                </h3>
              </div>
              <div className="space-y-1 text-sm" style={{ color: colors.deepCharcoal }}>
                <p>Pre-session avg: {values.pre.toFixed(2)}</p>
                <p>Post-session avg: {values.post.toFixed(2)}</p>
                <p className="font-semibold" style={{ color: values.change > 0 ? '#16a34a' : '#dc2626' }}>
                  Change: {values.change > 0 ? '+' : ''}{values.change.toFixed(1)}%
                </p>
                <p className="text-xs opacity-70">n = {values.count} responses</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.15)', border: '1px solid rgba(168, 200, 218, 0.25)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#0f172a' }}>
            <strong>Note:</strong> All metrics are calculated on a 1 to 5 scale, with 5 representing the most positive outcome.
          </p>
        </div>
      </section>
    </div>
  );
}
