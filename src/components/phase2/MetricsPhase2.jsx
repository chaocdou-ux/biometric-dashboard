import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors, metricLabels } from '../../lib/designSystem';

export default function MetricsPhase2({ data }) {
  const allMeasurements = data.allMeasurements || [];

  // Calculate average metrics for each day
  const calculateMetrics = () => {
    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const dayAverages = {};

    // Group by day
    const dayGroups = { day_1: [], day_2: [] };
    allMeasurements.forEach(m => {
      if (dayGroups[m.day]) {
        dayGroups[m.day].push(m);
      }
    });

    // Calculate averages per day
    Object.entries(dayGroups).forEach(([dayKey, measurements]) => {
      const averages = {};

      // Core metrics
      metricNames.forEach(metric => {
        const validData = measurements.filter(m => m[metric] !== null && m[metric] !== undefined);
        if (validData.length > 0) {
          averages[metric] = {
            value: validData.reduce((sum, m) => sum + m[metric], 0) / validData.length,
            count: validData.length
          };
        }
      });

      // PANAS metrics
      const validPositive = measurements.filter(m => m.panas_positive !== null && m.panas_positive !== undefined);
      const validNegative = measurements.filter(m => m.panas_negative !== null && m.panas_negative !== undefined);

      if (validPositive.length > 0) {
        averages.panas_positive = {
          value: validPositive.reduce((sum, m) => sum + m.panas_positive, 0) / validPositive.length,
          count: validPositive.length
        };
      }
      if (validNegative.length > 0) {
        averages.panas_negative = {
          value: validNegative.reduce((sum, m) => sum + m.panas_negative, 0) / validNegative.length,
          count: validNegative.length
        };
      }

      dayAverages[dayKey] = averages;
    });

    return dayAverages;
  };

  const dayAverages = calculateMetrics();

  // Radar chart data - mirrors Phase 1's Pre vs Post
  const radarData = Object.entries(metricLabels).map(([metric, label]) => ({
    metric: label,
    'Day 1': dayAverages.day_1?.[metric]?.value ? parseFloat(dayAverages.day_1[metric].value.toFixed(2)) : 0,
    'Day 2': dayAverages.day_2?.[metric]?.value ? parseFloat(dayAverages.day_2[metric].value.toFixed(2)) : 0,
    fullMark: 5
  }));

  // Line chart data - mirrors Phase 1's Metric Evolution
  const lineChartData = [
    {
      day: 'Day 1',
      Emotional: dayAverages.day_1?.emotional?.value || 0,
      Energy: dayAverages.day_1?.energy?.value || 0,
      Clarity: dayAverages.day_1?.clarity?.value || 0,
      Spiritual: dayAverages.day_1?.spiritual?.value || 0,
      Tension: dayAverages.day_1?.tension?.value || 0,
      Stress: dayAverages.day_1?.stress?.value || 0
    },
    {
      day: 'Day 2',
      Emotional: dayAverages.day_2?.emotional?.value || 0,
      Energy: dayAverages.day_2?.energy?.value || 0,
      Clarity: dayAverages.day_2?.clarity?.value || 0,
      Spiritual: dayAverages.day_2?.spiritual?.value || 0,
      Tension: dayAverages.day_2?.tension?.value || 0,
      Stress: dayAverages.day_2?.stress?.value || 0
    }
  ];

  // Bar chart data - mirrors Phase 1's Average Change
  const overallAverages = Object.entries(metricLabels).map(([metric, label]) => {
    const allValues = allMeasurements.filter(m => m[metric] !== null && m[metric] !== undefined);
    const avg = allValues.length > 0
      ? allValues.reduce((sum, m) => sum + m[metric], 0) / allValues.length
      : 0;

    return {
      name: label,
      average: parseFloat(avg.toFixed(2)),
      color: colors.metrics[metric],
      n: allValues.length
    };
  });

  // Statistical summary
  const calculateOverallStats = () => {
    const stats = {};

    Object.keys(metricLabels).forEach(metric => {
      const validData = allMeasurements.filter(m => m[metric] !== null);
      if (validData.length > 0) {
        const values = validData.map(m => m[metric]);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);

        stats[metric] = {
          avg,
          min,
          max,
          count: values.length,
          day1: dayAverages.day_1?.[metric]?.value || null,
          day2: dayAverages.day_2?.[metric]?.value || null
        };
      }
    });

    return stats;
  };

  const stats = calculateOverallStats();

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
      {/* Chart 1: Day 1 vs Day 2 Comparison - mirrors Phase 1's Pre vs Post */}
      <section className="glass-card">
        <h2 className="section-header">Day 1 vs Day 2 Comparison</h2>
        <p className="mb-4" style={{ color: '#0f172a', fontSize: '16px' }}>
          Radial chart showing average Day 1 and Day 2 values across all six metrics.
        </p>
        <div className="mb-4 p-4 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.12)', border: '1px solid rgba(168, 200, 218, 0.2)' }}>
          <p className="leading-relaxed" style={{ color: '#0f172a', fontSize: '16px' }}>
            <strong>Note:</strong> All metrics are calculated on a 1 to 5 scale, with 5 representing the most positive outcome.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke={colors.cloudGrey} strokeWidth={1} />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 4]}
              tick={false}
              tickCount={5}
            />
            <Radar
              name="Day 1"
              dataKey="Day 1"
              stroke={colors.darkYellow}
              fill={colors.darkYellow}
              fillOpacity={0.4}
              strokeWidth={3}
            />
            <Radar
              name="Day 2"
              dataKey="Day 2"
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

      {/* Chart 2: Metric Evolution - mirrors Phase 1's line chart */}
      <section className="glass-card">
        <h2 className="section-header">Metric Evolution</h2>
        <p className="mb-6" style={{ color: '#0f172a', fontSize: '16px' }}>
          Tracks how all six metrics changed across the two days: emotional state, physical energy, mental clarity, spiritual connection, body tension, and stress level.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
            />
            <YAxis
              domain={[0, 5]}
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
              label={{ value: 'Average Score (1-5)', angle: -90, position: 'insideLeft', style: { fill: '#0f172a', fontSize: 16, fontWeight: 600 } }}
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

      {/* Chart 3: Average Scores - mirrors Phase 1's Average Change */}
      <section className="glass-card">
        <h2 className="section-header">Average Scores</h2>
        <p className="mb-6" style={{ color: '#0f172a', fontSize: '16px' }}>
          Average score for each metric across both days.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={overallAverages} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#0f172a', fontSize: 15, fontWeight: 600 }}
              angle={-45}
              textAnchor="end"
              height={80}
              stroke="#475569"
            />
            <YAxis
              domain={[0, 5]}
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
              label={{ value: 'Average Score (1-5)', angle: -90, position: 'insideLeft', style: { fill: '#0f172a', fontSize: 16, fontWeight: 600 } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="average"
              radius={[8, 8, 0, 0]}
            >
              {overallAverages.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Chart 4: Statistical Summary - mirrors Phase 1's stat cards */}
      <section className="glass-card">
        <h2 className="section-header">Statistical Summary</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats).map(([metric, values]) => (
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
              <div className="space-y-1" style={{ color: '#0f172a', fontSize: '16px' }}>
                <p>Average: {values.avg.toFixed(2)}</p>
                <p>Range: {values.min.toFixed(1)} - {values.max.toFixed(1)}</p>
                {values.day1 !== null && <p className="opacity-70">Day 1: {values.day1.toFixed(2)}</p>}
                {values.day2 !== null && <p className="opacity-70">Day 2: {values.day2.toFixed(2)}</p>}
                <p className="opacity-70" style={{ fontSize: '14px' }}>n = {values.count} measurements</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.12)', border: '1px solid rgba(168, 200, 218, 0.2)' }}>
          <p className="leading-relaxed" style={{ color: '#0f172a', fontSize: '16px' }}>
            <strong>Note:</strong> All metrics are calculated on a 1 to 5 scale, with 5 representing the most positive outcome.
          </p>
        </div>
      </section>

      {/* Chart 5: PANAS Trends - Phase 2 specific */}
      <section className="glass-card">
        <h2 className="section-header">PANAS Trends</h2>
        <p className="mb-6" style={{ color: '#0f172a', fontSize: '16px' }}>
          Positive and Negative Affect scores across the two-day study period.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={[
              {
                day: 'Day 1',
                'Positive Affect': dayAverages.day_1?.panas_positive?.value || 0,
                'Negative Affect': dayAverages.day_1?.panas_negative?.value || 0
              },
              {
                day: 'Day 2',
                'Positive Affect': dayAverages.day_2?.panas_positive?.value || 0,
                'Negative Affect': dayAverages.day_2?.panas_negative?.value || 0
              }
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.cloudGrey} opacity={0.5} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
            />
            <YAxis
              domain={[0, 50]}
              tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 600 }}
              stroke="#475569"
              label={{ value: 'PANAS Score (0-50)', angle: -90, position: 'insideLeft', style: { fill: '#0f172a', fontSize: 16, fontWeight: 600 } }}
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
              dataKey="Positive Affect"
              stroke="#15803d"
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Negative Affect"
              stroke="#dc2626"
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
