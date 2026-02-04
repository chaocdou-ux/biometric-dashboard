import { colors, metricLabels } from '../../lib/designSystem';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Activity } from 'lucide-react';

const dayDescriptions = {
  day_1: {
    title: 'Day 1 - Initial Assessment',
    date: 'February 3, 2025',
    description: 'First day of the two-day Phase 2 biometric study with multiple measurements throughout the day.',
    protocol: 'Six measurement points with continuous biometric monitoring',
    duration: 'Full day'
  },
  day_2: {
    title: 'Day 2 - Follow-up Assessment',
    date: 'February 4, 2025',
    description: 'Second day of measurements to track progression and changes in biometric responses.',
    protocol: 'Six measurement points with continuous biometric monitoring',
    duration: 'Full day'
  }
};

export default function DaysPhase2({ data }) {
  const days = data.days || {};

  const calculateDayMetrics = (dayMeasurements) => {
    if (!dayMeasurements || dayMeasurements.length === 0) return null;

    const metrics = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const averages = {};

    metrics.forEach(metric => {
      const validData = dayMeasurements.filter(m => m[metric] !== null && m[metric] !== undefined);
      if (validData.length > 0) {
        averages[metric] = validData.reduce((sum, m) => sum + m[metric], 0) / validData.length;
      }
    });

    const validPositive = dayMeasurements.filter(m => m.panas_positive !== null && m.panas_positive !== undefined);
    const validNegative = dayMeasurements.filter(m => m.panas_negative !== null && m.panas_negative !== undefined);

    averages.panas_positive = validPositive.length > 0
      ? validPositive.reduce((sum, m) => sum + m.panas_positive, 0) / validPositive.length
      : 0;
    averages.panas_negative = validNegative.length > 0
      ? validNegative.reduce((sum, m) => sum + m.panas_negative, 0) / validNegative.length
      : 0;

    return averages;
  };

  // Calculate summaries for each day - mirrors Phase 1's session summaries
  const daySummaries = Object.entries(days).map(([dayKey, dayMeasurements]) => {
    const dayInfo = dayDescriptions[dayKey];
    const participantCount = new Set(dayMeasurements.map(m => m.participant)).size;
    const measurementCount = dayMeasurements.length;

    const dayMetrics = calculateDayMetrics(dayMeasurements);

    return {
      dayKey,
      dayInfo,
      participantCount,
      measurementCount,
      metrics: dayMetrics
    };
  });

  // Chart data for grouped bar chart - mirrors Phase 1's Session Outcomes Summary
  const chartData = daySummaries.map(summary => ({
    day: summary.dayInfo.title.split(' - ')[0],
    'Emotional State': summary.metrics?.emotional || 0,
    'Physical Energy': summary.metrics?.energy || 0,
    'Body Tension': summary.metrics?.tension || 0,
    'Stress Level': summary.metrics?.stress || 0,
    'Mental Clarity': summary.metrics?.clarity || 0,
    'Spiritual Connection': summary.metrics?.spiritual || 0
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 shadow-xl">
          <p className="font-semibold mb-2" style={{ color: colors.deepCharcoal }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Chart 1: Day Outcomes Summary - mirrors Phase 1's Session Outcomes Summary */}
      <section className="glass-card">
        <h2 className="section-header">Day Outcomes Summary</h2>
        <p className="mb-6" style={{ color: '#0f172a', fontSize: '16px' }}>
          Aggregated average scores for all metrics across each day, showing overall daily patterns.
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
              angle={0}
            />
            <YAxis
              domain={[0, 5]}
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
              label={{ value: 'Average Score (1-5)', angle: -90, position: 'insideLeft', style: { fill: '#0f172a', fontSize: 16, fontWeight: 600 } }}
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

      {/* Chart 2: Day Details - mirrors Phase 1's Session Details */}
      <section className="glass-card">
        <h2 className="section-header">Day Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {daySummaries.map((summary) => (
            <div
              key={summary.dayKey}
              className="p-6 rounded-lg"
              style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(168, 200, 218, 0.3)' }}
            >
              <div className="mb-4">
                <h3 className="font-bold mb-1" style={{ fontSize: '20px', color: '#0f172a' }}>
                  {summary.dayInfo.title}
                </h3>
                <p className="mb-2 font-semibold" style={{ fontSize: '15px', color: '#64748b' }}>
                  {summary.dayInfo.date}
                </p>
                <p className="leading-relaxed mb-3" style={{ fontSize: '16px', color: '#0f172a' }}>
                  {summary.dayInfo.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full font-medium" style={{ fontSize: '14px', backgroundColor: 'rgba(125, 141, 116, 0.2)', color: '#0f172a' }}>
                    <Users className="w-3 h-3" />
                    {summary.participantCount} participants
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full font-medium" style={{ fontSize: '14px', backgroundColor: 'rgba(168, 200, 218, 0.2)', color: '#0f172a' }}>
                    <Activity className="w-3 h-3" />
                    {summary.measurementCount} measurements
                  </span>
                </div>

                <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: 'rgba(243, 199, 123, 0.12)', border: '1px solid rgba(243, 199, 123, 0.25)' }}>
                  <p className="font-bold mb-1" style={{ fontSize: '14px', color: '#0f172a' }}>Protocol</p>
                  <p style={{ fontSize: '16px', color: '#0f172a' }}>{summary.dayInfo.protocol}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold mb-3" style={{ fontSize: '16px', color: '#0f172a' }}>
                  Metric Averages
                </h4>
                {Object.entries(metricLabels).map(([metricKey, metricLabel]) => {
                  const value = summary.metrics?.[metricKey];
                  if (value === undefined) return null;

                  return (
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
                        <span className="font-semibold" style={{ fontSize: '15px', color: '#0f172a' }}>
                          {metricLabel}
                        </span>
                      </div>
                      <span
                        className="font-bold"
                        style={{ fontSize: '16px', color: '#0f172a' }}
                      >
                        {value.toFixed(2)}
                      </span>
                    </div>
                  );
                })}

                {/* PANAS Scores */}
                {summary.metrics?.panas_positive !== undefined && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-lg bg-green-50/30 border border-green-200/30">
                      <span className="text-xs font-medium block mb-1" style={{ color: '#15803d' }}>Positive Affect</span>
                      <div className="text-xl font-bold" style={{ color: '#15803d' }}>
                        {summary.metrics.panas_positive.toFixed(1)}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-50/30 border border-red-200/30">
                      <span className="text-xs font-medium block mb-1" style={{ color: '#dc2626' }}>Negative Affect</span>
                      <div className="text-xl font-bold" style={{ color: '#dc2626' }}>
                        {summary.metrics.panas_negative.toFixed(1)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Participant Feedback */}
              <div className="mt-6">
                <h5 className="font-bold mb-3" style={{ fontSize: '16px', color: '#0f172a' }}>Selected Participant Feedback</h5>
                <div className="space-y-3">
                  {days[summary.dayKey]
                    ?.filter(m => m.highlights || m.overall_experience)
                    .slice(0, 2)
                    .map((m, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/40 border border-gray-200/30">
                        <p className="font-medium mb-1 text-xs" style={{ color: '#64748b' }}>
                          {m.participant}
                        </p>
                        {m.highlights && (
                          <p className="text-sm mb-1" style={{ color: '#475569', lineHeight: '1.5' }}>
                            <strong>Highlights:</strong> {m.highlights}
                          </p>
                        )}
                        {m.overall_experience && (
                          <p className="text-sm" style={{ color: '#475569', lineHeight: '1.5' }}>
                            <strong>Experience:</strong> {m.overall_experience}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
