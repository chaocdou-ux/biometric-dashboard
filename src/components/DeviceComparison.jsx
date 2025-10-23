import { Fragment } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DeviceComparison({ data }) {
  const appleWatchData = data.allSessions.filter(s => s.device_category === 'Apple Watch');
  const otherDevicesData = data.allSessions.filter(s => s.device_category !== 'Apple Watch');

  const calculateMetrics = (dataset) => {
    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const results = {};

    metricNames.forEach(metric => {
      const validData = dataset.filter(
        s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null
      );

      if (validData.length > 0) {
        const preAvg = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
        const postAvg = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
        const preMed = median(validData.map(s => s[`pre_${metric}`]));
        const postMed = median(validData.map(s => s[`post_${metric}`]));
        const preSD = standardDeviation(validData.map(s => s[`pre_${metric}`]));
        const postSD = standardDeviation(validData.map(s => s[`post_${metric}`]));

        results[metric] = {
          pre_mean: preAvg,
          post_mean: postAvg,
          pre_median: preMed,
          post_median: postMed,
          pre_sd: preSD,
          post_sd: postSD,
          count: validData.length,
          change: postAvg - preAvg
        };
      }
    });

    return results;
  };

  const median = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  };

  const standardDeviation = (arr) => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
  };

  const appleMetrics = calculateMetrics(appleWatchData);
  const otherMetrics = calculateMetrics(otherDevicesData);

  const comparisonData = Object.keys(appleMetrics).map(metric => ({
    metric: metric.charAt(0).toUpperCase() + metric.slice(1).replace('_', ' '),
    'Apple Watch (Pre)': appleMetrics[metric]?.pre_mean || 0,
    'Apple Watch (Post)': appleMetrics[metric]?.post_mean || 0,
    'Other Devices (Pre)': otherMetrics[metric]?.pre_mean || 0,
    'Other Devices (Post)': otherMetrics[metric]?.post_mean || 0
  }));

  const changeComparisonData = Object.keys(appleMetrics).map(metric => ({
    metric: metric.charAt(0).toUpperCase() + metric.slice(1).replace('_', ' '),
    'Apple Watch': appleMetrics[metric]?.change || 0,
    'Other Devices': otherMetrics[metric]?.change || 0
  }));

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
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-2xl" style={{ color: '#0f172a' }}>Device Comparison Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <p className="leading-relaxed mb-4" style={{ color: '#1e293b' }}>
              This analysis compares outcomes between participants using Apple Watch devices and those using other wearable devices (Oura Ring, Ring Conn, Muse). Device differentiation helps validate measurement consistency, understand potential capture differences across device types, and assess whether therapeutic effects are independent of tracking technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <Card className="metric-card">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#0f172a' }}>Apple Watch Users</h3>
                  <p className="stat-value" style={{ color: '#A8C8DA' }}>{appleWatchData.length}</p>
                  <p className="text-sm" style={{ color: '#1e293b', opacity: 0.85 }}>Total observations</p>
                </CardContent>
              </Card>
              <Card className="metric-card">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#0f172a' }}>Other Device Users</h3>
                  <p className="stat-value" style={{ color: '#50604F' }}>{otherDevicesData.length}</p>
                  <p className="text-sm" style={{ color: '#1e293b', opacity: 0.85 }}>Total observations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <h2 className="section-header">Pre vs Post Comparison by Device Type</h2>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E5DF" opacity={0.5} />
              <XAxis
                dataKey="metric"
                tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 600 }}
                angle={-15}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#0f172a', fontSize: 10, fontWeight: 500 }} domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
              <Bar dataKey="Apple Watch (Pre)" fill="#7D8D74" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Apple Watch (Post)" fill="#3d4a3c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Devices (Pre)" fill="#B8A389" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Devices (Post)" fill="#8a6d59" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <h2 className="section-header">Average Change by Device Type</h2>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={changeComparisonData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E5DF" opacity={0.5} />
              <XAxis
                dataKey="metric"
                tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 600 }}
                angle={-15}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#0f172a', fontSize: 10, fontWeight: 500 }} domain={[-2, 2]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
              <Bar dataKey="Apple Watch" fill="#7D8D74" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Devices" fill="#8a6d59" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <h2 className="section-header">Detailed Statistical Comparison</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(15, 23, 42, 0.2)', background: 'rgba(168, 200, 218, 0.15)' }}>
                  <th className="text-left p-3 font-semibold" style={{ color: '#0f172a' }}>Metric</th>
                  <th className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>Device</th>
                  <th className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>Pre (Mean ± SD)</th>
                  <th className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>Post (Mean ± SD)</th>
                  <th className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>Median Pre→Post</th>
                  <th className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>Change</th>
                  <th className="text-center p-3 font-semibold" style={{ color: '#0f172a' }}>N</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(appleMetrics).map(([ metric, appleData], idx) => {
                  const otherData = otherMetrics[metric] || {};
                  return (
                    <Fragment key={metric}>
                      <tr style={{
                        borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
                        background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                      }}>
                        <td className="p-3 font-semibold text-slate-800" rowSpan="2">
                          {metric.charAt(0).toUpperCase() + metric.slice(1).replace('_', ' ')}
                        </td>
                        <td className="text-center p-3 font-semibold" style={{ color: '#7D8D74' }}>
                          Apple Watch
                        </td>
                        <td className="text-center p-3 text-slate-700">
                          {appleData.pre_mean?.toFixed(2)} ± {appleData.pre_sd?.toFixed(2)}
                        </td>
                        <td className="text-center p-3 text-slate-700">
                          {appleData.post_mean?.toFixed(2)} ± {appleData.post_sd?.toFixed(2)}
                        </td>
                        <td className="text-center p-3 text-slate-700">
                          {appleData.pre_median?.toFixed(2)} → {appleData.post_median?.toFixed(2)}
                        </td>
                        <td className={`text-center p-3 font-semibold ${appleData.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {appleData.change > 0 ? '+' : ''}{appleData.change?.toFixed(2)}
                        </td>
                        <td className="text-center p-3 text-slate-700">{appleData.count}</td>
                      </tr>
                      <tr style={{
                        borderBottom: '2px solid rgba(15, 23, 42, 0.15)',
                        background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                      }}>
                        <td className="text-center p-3 font-semibold" style={{ color: '#8a6d59' }}>
                          Other Devices
                        </td>
                        <td className="text-center p-3 text-slate-700">
                          {otherData.pre_mean?.toFixed(2)} ± {otherData.pre_sd?.toFixed(2)}
                        </td>
                        <td className="text-center p-3 text-slate-700">
                          {otherData.post_mean?.toFixed(2)} ± {otherData.post_sd?.toFixed(2)}
                        </td>
                        <td className="text-center p-3 text-slate-700">
                          {otherData.pre_median?.toFixed(2)} → {otherData.post_median?.toFixed(2)}
                        </td>
                        <td className={`text-center p-3 font-semibold ${otherData.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {otherData.change > 0 ? '+' : ''}{otherData.change?.toFixed(2)}
                        </td>
                        <td className="text-center p-3 text-slate-700">{otherData.count}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.15)', border: '1px solid rgba(168, 200, 218, 0.25)' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#0f172a' }}>
              <strong>Note:</strong> All metrics are calculated on a 1 to 5 scale, with 5 representing the most positive outcome.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <h3 className="text-lg font-semibold" style={{ color: '#0f172a', marginBottom: '1rem' }}>Key Findings</h3>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(appleMetrics).map(([metric, appleData]) => {
              const otherData = otherMetrics[metric] || {};
              const diff = Math.abs(appleData.change - (otherData.change || 0));
              if (diff > 0.3) {
                return (
                  <div key={metric} className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(168, 200, 218, 0.1)' }}>
                    <span className="font-bold" style={{ color: '#50604F' }}>•</span>
                    <span style={{ color: '#1e293b' }}>
                      <strong style={{ color: '#0f172a' }}>{metric.charAt(0).toUpperCase() + metric.slice(1).replace('_', ' ')}:</strong>{' '}
                      Apple Watch users showed a {appleData.change > (otherData.change || 0) ? 'larger' : 'smaller'} change
                      (<span className={appleData.change > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{appleData.change > 0 ? '+' : ''}{appleData.change.toFixed(2)}</span>) compared to other devices
                      (<span className={otherData.change > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{otherData.change > 0 ? '+' : ''}{(otherData.change || 0).toFixed(2)}</span>)
                    </span>
                  </div>
                );
              }
              return null;
            }).filter(Boolean)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
