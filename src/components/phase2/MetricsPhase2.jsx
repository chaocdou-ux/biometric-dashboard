import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MetricsPhase2({ data }) {
  const allMeasurements = data.allMeasurements || [];

  const metricLabels = {
    emotional: 'Emotional State',
    energy: 'Physical Energy',
    tension: 'Body Tension',
    stress: 'Stress Level',
    clarity: 'Mental Clarity',
    spiritual: 'Spiritual Connection'
  };

  const metricColors = {
    emotional: '#A8C8DA',
    energy: '#F3C77B',
    tension: '#7D8D74',
    stress: '#C96F4E',
    clarity: '#50604F',
    spiritual: '#B8A389'
  };

  const calculateAverageByDay = () => {
    const dayGroups = {};

    allMeasurements.forEach(m => {
      if (!dayGroups[m.day]) {
        dayGroups[m.day] = {
          emotional: [],
          energy: [],
          tension: [],
          stress: [],
          clarity: [],
          spiritual: [],
          panas_positive: [],
          panas_negative: []
        };
      }

      Object.keys(dayGroups[m.day]).forEach(metric => {
        if (m[metric] !== null && m[metric] !== undefined) {
          dayGroups[m.day][metric].push(m[metric]);
        }
      });
    });

    return Object.entries(dayGroups).map(([day, metrics]) => {
      const result = { day };
      Object.entries(metrics).forEach(([metric, values]) => {
        if (values.length > 0) {
          result[metric] = values.reduce((sum, val) => sum + val, 0) / values.length;
        }
      });
      return result;
    });
  };

  const chartData = calculateAverageByDay();

  const calculateOverallStats = () => {
    const stats = {};

    Object.keys(metricLabels).forEach(metric => {
      const validData = allMeasurements.filter(m => m[metric] !== null);
      if (validData.length > 0) {
        const values = validData.map(m => m[metric]);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);

        stats[metric] = { avg, min, max, count: values.length };
      }
    });

    return stats;
  };

  const stats = calculateOverallStats();

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Metrics Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(stats).map(([metric, data]) => (
            <div key={metric} className="p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: metricColors[metric] }}
                />
                <span className="font-medium text-sm" style={{ color: '#64748b' }}>
                  {metricLabels[metric]}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#0f172a' }}>
                {data.avg.toFixed(1)}
              </div>
              <div className="text-xs" style={{ color: '#94a3b8' }}>
                Range: {data.min.toFixed(1)} - {data.max.toFixed(1)}
              </div>
              <div className="text-xs" style={{ color: '#94a3b8' }}>
                {data.count} measurements
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Metrics by Day</h3>
        <div className="space-y-8">
          {Object.entries(metricLabels).map(([metric, label]) => (
            <div key={metric}>
              <h4 className="font-bold mb-4" style={{ fontSize: '20px', color: '#0f172a' }}>{label}</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="day"
                    style={{ fontSize: '14px', fill: '#64748b' }}
                  />
                  <YAxis
                    domain={[1, 5]}
                    style={{ fontSize: '14px', fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={metric}
                    stroke={metricColors[metric]}
                    strokeWidth={3}
                    dot={{ fill: metricColors[metric], r: 5 }}
                    name={label}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>PANAS Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="day"
              style={{ fontSize: '14px', fill: '#64748b' }}
            />
            <YAxis
              style={{ fontSize: '14px', fill: '#64748b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="panas_positive"
              stroke="#15803d"
              strokeWidth={3}
              dot={{ fill: '#15803d', r: 5 }}
              name="Positive Affect"
            />
            <Line
              type="monotone"
              dataKey="panas_negative"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ fill: '#dc2626', r: 5 }}
              name="Negative Affect"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
