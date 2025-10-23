import { colors, metricLabels, calculateImprovement } from '../lib/designSystem';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';

const sessionDescriptions = {
  session_1: {
    title: 'Session 1 - Baseline',
    date: '08/26/25',
    description: 'Breathwork + live violin to establish foundational practice.',
    protocol: 'Breathwork + live violin',
    duration: '60 minutes'
  },
  session_2: {
    title: 'Session 2 - Resonance',
    date: '09/02/25',
    description: 'Breathwork + live violin + quartz sound bowls for deeper resonance.',
    protocol: 'Breathwork + live violin + sound bowls',
    duration: '75 minutes'
  },
  session_3: {
    title: 'Session 3 - Brainwave Entrainment',
    date: '09/09/25',
    description: 'Breathwork + live violin + binaural beats (headphones) for brainwave synchronization.',
    protocol: 'Breathwork + live violin + binaural beats',
    duration: '75 minutes'
  },
  session_4: {
    title: 'Session 4 - Movement Integration',
    date: '09/16/25',
    description: 'Movement + breathwork + live violin to support physical energy release.',
    protocol: 'Movement + breathwork + live violin',
    duration: '90 minutes'
  }
};

export default function Sessions({ data }) {
  const sessionSummaries = Object.entries(data.sessions).map(([sessionKey, sessionData]) => {
    const sessionInfo = sessionDescriptions[sessionKey];
    const participantCount = sessionData.length;

    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const metrics = {};

    metricNames.forEach(metric => {
      const validData = sessionData.filter(
        s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null
      );

      if (validData.length > 0) {
        const preAvg = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
        const postAvg = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
        const improvement = calculateImprovement(preAvg, postAvg, metric);

        metrics[metric] = {
          pre: preAvg,
          post: postAvg,
          change: improvement,
          count: validData.length
        };
      }
    });

    return {
      sessionKey,
      sessionInfo,
      participantCount,
      metrics
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
              {entry.name}: {typeof entry.value === 'number' ? `${entry.value.toFixed(1)}%` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartData = sessionSummaries.map(summary => ({
    session: summary.sessionInfo.title.split(' - ')[0],
    'Emotional State': summary.metrics.emotional?.change || 0,
    'Physical Energy': summary.metrics.energy?.change || 0,
    'Body Tension': summary.metrics.tension?.change || 0,
    'Stress Level': summary.metrics.stress?.change || 0,
    'Mental Clarity': summary.metrics.clarity?.change || 0,
    'Spiritual Connection': summary.metrics.spiritual?.change || 0
  }));

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h2 className="section-header">Session Outcomes Summary</h2>
        <p className="text-sm mb-6" style={{ color: colors.pineGreen }}>
          Aggregated percent change for all metrics across each session, showing overall session effectiveness.
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="session"
              tick={{ fill: '#0f172a', fontSize: 13, fontWeight: 500 }}
              stroke={colors.forestMoss}
              angle={0}
            />
            <YAxis
              tick={{ fill: '#0f172a', fontSize: 13, fontWeight: 500 }}
              stroke={colors.forestMoss}
              label={{ value: '% Change', angle: -90, position: 'insideLeft', style: { fill: colors.pineGreen } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
            />
            <Bar dataKey="Emotional State" fill={colors.metrics.emotional} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Physical Energy" fill={colors.metrics.energy} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Body Tension" fill={colors.metrics.tension} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Stress Level" fill={colors.metrics.stress} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Mental Clarity" fill={colors.metrics.clarity} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Spiritual Connection" fill={colors.metrics.spiritual} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Session Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sessionSummaries.map((summary) => (
            <div
              key={summary.sessionKey}
              className="p-6 rounded-lg"
              style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(168, 200, 218, 0.3)' }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1" style={{ color: colors.deepCharcoal }}>
                  {summary.sessionInfo.title}
                </h3>
                <p className="text-sm mb-2" style={{ color: colors.pineGreen }}>
                  {summary.sessionInfo.date}
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: colors.deepCharcoal }}>
                  {summary.sessionInfo.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(125, 141, 116, 0.2)', color: colors.deepCharcoal }}>
                    <Users className="w-3 h-3" />
                    {summary.participantCount} participants
                  </span>
                  <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(168, 200, 218, 0.2)', color: colors.deepCharcoal }}>
                    <Activity className="w-3 h-3" />
                    {summary.sessionInfo.duration}
                  </span>
                </div>

                <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: 'rgba(243, 199, 123, 0.15)', border: '1px solid rgba(243, 199, 123, 0.3)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: colors.deepCharcoal }}>Protocol</p>
                  <p className="text-sm" style={{ color: colors.deepCharcoal }}>{summary.sessionInfo.protocol}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold mb-3" style={{ color: colors.pineGreen }}>
                  Metric Changes
                </h4>
                {Object.entries(summary.metrics).map(([metricKey, metricData]) => (
                  <div
                    key={metricKey}
                    className="flex items-center justify-between p-3 rounded"
                    style={{ backgroundColor: `${colors.metrics[metricKey]}15` }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors.metrics[metricKey] }}
                      />
                      <span className="text-sm font-medium" style={{ color: colors.deepCharcoal }}>
                        {metricLabels[metricKey]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: colors.deepCharcoal, opacity: 0.7 }}>
                        n={metricData.count}
                      </span>
                      <div className="flex items-center gap-1">
                        {metricData.change > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : metricData.change < 0 ? (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        ) : null}
                        <span
                          className="text-sm font-bold"
                          style={{ color: metricData.change > 0 ? '#16a34a' : metricData.change < 0 ? '#dc2626' : colors.deepCharcoal }}
                        >
                          {metricData.change > 0 ? '+' : ''}{metricData.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
