import { colors, metricLabels, calculateImprovement } from '../../lib/designSystem';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';

const activityDescriptions = {
  activity_1: {
    title: 'Activity 1 - Initial State',
    description: 'Baseline measurement followed by first intervention.',
    timing: 'Morning Session'
  },
  activity_2: {
    title: 'Activity 2 - Mid Session',
    description: 'Pre and post measurements for second intervention.',
    timing: 'Mid-Morning Session'
  },
  activity_3: {
    title: 'Activity 3 - Final Session',
    description: 'Pre and post measurements for final intervention.',
    timing: 'Late Morning Session'
  }
};

export default function ActivitiesPhase2({ data }) {
  const processActivities = (dayKey, dayMeasurements) => {
    const activitySummaries = [];

    // Group measurements by participant
    const participantGroups = dayMeasurements.reduce((acc, m) => {
      if (!acc[m.participant]) acc[m.participant] = [];
      acc[m.participant].push(m);
      return acc;
    }, {});

    // Process each activity (pairs of measurements)
    for (let activityNum = 1; activityNum <= 3; activityNum++) {
      const preMeasurementPoint = (activityNum * 2) - 1;
      const postMeasurementPoint = activityNum * 2;
      const activityKey = `activity_${activityNum}`;
      const activityInfo = activityDescriptions[activityKey];

      const activityData = [];

      // Collect pre/post pairs for each participant
      Object.values(participantGroups).forEach(participantMeasurements => {
        const preMeasurement = participantMeasurements.find(m => m.measurement_point === preMeasurementPoint);
        const postMeasurement = participantMeasurements.find(m => m.measurement_point === postMeasurementPoint);

        if (preMeasurement && postMeasurement) {
          activityData.push({
            pre: preMeasurement,
            post: postMeasurement
          });
        }
      });

      if (activityData.length === 0) continue;

      // Calculate metric summaries
      const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
      const metrics = {};

      metricNames.forEach(metric => {
        const validPairs = activityData.filter(
          pair => pair.pre[metric] !== null && pair.post[metric] !== null
        );

        if (validPairs.length > 0) {
          const preAvg = validPairs.reduce((sum, pair) => sum + pair.pre[metric], 0) / validPairs.length;
          const postAvg = validPairs.reduce((sum, pair) => sum + pair.post[metric], 0) / validPairs.length;
          const improvement = calculateImprovement(preAvg, postAvg, metric);

          metrics[metric] = {
            pre: preAvg,
            post: postAvg,
            change: improvement,
            count: validPairs.length
          };
        }
      });

      // Calculate PANAS changes
      const validPanasPairs = activityData.filter(
        pair => pair.pre.panas_positive !== null && pair.post.panas_positive !== null
      );

      let panasMetrics = null;
      if (validPanasPairs.length > 0) {
        const prePositiveAvg = validPanasPairs.reduce((sum, pair) => sum + pair.pre.panas_positive, 0) / validPanasPairs.length;
        const postPositiveAvg = validPanasPairs.reduce((sum, pair) => sum + pair.post.panas_positive, 0) / validPanasPairs.length;
        const preNegativeAvg = validPanasPairs.reduce((sum, pair) => sum + pair.pre.panas_negative, 0) / validPanasPairs.length;
        const postNegativeAvg = validPanasPairs.reduce((sum, pair) => sum + pair.post.panas_negative, 0) / validPanasPairs.length;

        panasMetrics = {
          positive: {
            pre: prePositiveAvg,
            post: postPositiveAvg,
            change: calculateImprovement(prePositiveAvg, postPositiveAvg, 'panas_positive')
          },
          negative: {
            pre: preNegativeAvg,
            post: postNegativeAvg,
            change: calculateImprovement(preNegativeAvg, postNegativeAvg, 'panas_negative')
          }
        };
      }

      activitySummaries.push({
        activityKey,
        activityInfo,
        dayKey,
        participantCount: activityData.length,
        metrics,
        panasMetrics
      });
    }

    return activitySummaries;
  };

  const day1Activities = processActivities('day_1', data.days.day_1);
  const day2Activities = processActivities('day_2', data.days.day_2);
  const allActivities = [...day1Activities, ...day2Activities];

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

  const chartData = allActivities.map(summary => ({
    activity: `${summary.dayKey === 'day_1' ? 'Day 1' : 'Day 2'} - ${summary.activityInfo.title.split(' - ')[0]}`,
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
        <h2 className="section-header">Activity Outcomes Summary</h2>
        <p className="mb-6" style={{ color: '#0f172a', fontSize: '16px' }}>
          Comparison of pre and post measurements for each activity, showing percent change across all metrics.
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="activity"
              tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 600 }}
              stroke="#475569"
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
              label={{ value: '% Change', angle: -90, position: 'insideLeft', style: { fill: '#0f172a', fontSize: 16, fontWeight: 600 } }}
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

      {['day_1', 'day_2'].map(dayKey => {
        const dayActivities = dayKey === 'day_1' ? day1Activities : day2Activities;
        const dayLabel = dayKey === 'day_1' ? 'Day 1' : 'Day 2';

        return (
          <section key={dayKey} className="glass-card">
            <h2 className="section-header">{dayLabel} - Activity Details</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayActivities.map((summary) => (
                <div
                  key={summary.activityKey}
                  className="p-6 rounded-lg"
                  style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(168, 200, 218, 0.3)' }}
                >
                  <div className="mb-4">
                    <h3 className="font-bold mb-1" style={{ fontSize: '20px', color: '#0f172a' }}>
                      {summary.activityInfo.title}
                    </h3>
                    <p className="mb-2 font-semibold" style={{ fontSize: '15px', color: '#64748b' }}>
                      {summary.activityInfo.timing}
                    </p>
                    <p className="leading-relaxed mb-3" style={{ fontSize: '16px', color: '#0f172a' }}>
                      {summary.activityInfo.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full font-medium" style={{ fontSize: '14px', backgroundColor: 'rgba(125, 141, 116, 0.2)', color: '#0f172a' }}>
                        <Users className="w-3 h-3" />
                        {summary.participantCount} participants
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full font-medium" style={{ fontSize: '14px', backgroundColor: 'rgba(168, 200, 218, 0.2)', color: '#0f172a' }}>
                        <Activity className="w-3 h-3" />
                        Pre/Post
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold mb-3" style={{ fontSize: '16px', color: '#0f172a' }}>
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
                          <span className="font-semibold" style={{ fontSize: '15px', color: '#0f172a' }}>
                            {metricLabels[metricKey]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '14px', color: '#0f172a', opacity: 0.7 }}>
                            n={metricData.count}
                          </span>
                          <div className="flex items-center gap-1">
                            {metricData.change > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : metricData.change < 0 ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : null}
                            <span
                              className="font-bold"
                              style={{ fontSize: '16px', color: metricData.change > 0 ? '#16a34a' : metricData.change < 0 ? '#dc2626' : '#0f172a' }}
                            >
                              {metricData.change > 0 ? '+' : ''}{metricData.change.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {summary.panasMetrics && (
                      <>
                        <div
                          className="flex items-center justify-between p-3 rounded"
                          style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                            <span className="font-semibold" style={{ fontSize: '15px', color: '#0f172a' }}>
                              Positive Affect
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {summary.panasMetrics.positive.change > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : summary.panasMetrics.positive.change < 0 ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : null}
                            <span
                              className="font-bold"
                              style={{ fontSize: '16px', color: summary.panasMetrics.positive.change > 0 ? '#16a34a' : summary.panasMetrics.positive.change < 0 ? '#dc2626' : '#0f172a' }}
                            >
                              {summary.panasMetrics.positive.change > 0 ? '+' : ''}{summary.panasMetrics.positive.change.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        <div
                          className="flex items-center justify-between p-3 rounded"
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                            <span className="font-semibold" style={{ fontSize: '15px', color: '#0f172a' }}>
                              Negative Affect
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {summary.panasMetrics.negative.change > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : summary.panasMetrics.negative.change < 0 ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : null}
                            <span
                              className="font-bold"
                              style={{ fontSize: '16px', color: summary.panasMetrics.negative.change > 0 ? '#16a34a' : summary.panasMetrics.negative.change < 0 ? '#dc2626' : '#0f172a' }}
                            >
                              {summary.panasMetrics.negative.change > 0 ? '+' : ''}{summary.panasMetrics.negative.change.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
