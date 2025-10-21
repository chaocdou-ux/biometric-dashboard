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

    const heartRateData = dataset.filter(s => s.pre_heart_rate && s.post_heart_rate);
    if (heartRateData.length > 0) {
      const preHR = heartRateData.map(s => s.pre_heart_rate);
      const postHR = heartRateData.map(s => s.post_heart_rate);

      results.heart_rate = {
        pre_mean: preHR.reduce((a, b) => a + b, 0) / preHR.length,
        post_mean: postHR.reduce((a, b) => a + b, 0) / postHR.length,
        pre_median: median(preHR),
        post_median: median(postHR),
        pre_sd: standardDeviation(preHR),
        post_sd: standardDeviation(postHR),
        count: heartRateData.length,
        change: (postHR.reduce((a, b) => a + b, 0) / postHR.length) - (preHR.reduce((a, b) => a + b, 0) / preHR.length)
      };
    }

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
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">Device Comparison Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              This analysis compares outcomes between participants using Apple Watch devices and those using other wearable devices (Oura Ring, Ring Conn, Muse). Device differentiation helps validate measurement consistency, understand potential capture differences across device types, and assess whether therapeutic effects are independent of tracking technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <Card className="bg-white border-blue-200">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Apple Watch Users</h3>
                  <p className="text-4xl font-bold text-blue-600">{appleWatchData.length}</p>
                  <p className="text-sm text-slate-600">Total observations</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-purple-200">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-purple-600 mb-2">Other Device Users</h3>
                  <p className="text-4xl font-bold text-purple-600">{otherDevicesData.length}</p>
                  <p className="text-sm text-slate-600">Total observations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Pre vs Post Comparison by Device Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="metric"
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                angle={-15}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
              <Bar dataKey="Apple Watch (Pre)" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Apple Watch (Post)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Devices (Pre)" fill="#d8b4fe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Devices (Post)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-600">Average Change by Device Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={changeComparisonData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="metric"
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                angle={-15}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[-2, 2]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
              <Bar dataKey="Apple Watch" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Other Devices" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Detailed Statistical Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-gradient-to-r from-blue-50 to-purple-50">
                  <th className="text-left p-3 font-semibold text-slate-700">Metric</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Device</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Pre (Mean ± SD)</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Post (Mean ± SD)</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Median Pre→Post</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Change</th>
                  <th className="text-center p-3 font-semibold text-slate-700">N</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(appleMetrics).map(([ metric, appleData], idx) => {
                  const otherData = otherMetrics[metric] || {};
                  return (
                    <Fragment key={metric}>
                      <tr className={`border-b border-slate-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <td className="p-3 font-semibold text-slate-800" rowSpan="2">
                          {metric.charAt(0).toUpperCase() + metric.slice(1).replace('_', ' ')}
                        </td>
                        <td className="text-center p-3">
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300">Apple Watch</Badge>
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
                      <tr className={`border-b-2 border-slate-300 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <td className="text-center p-3">
                          <Badge className="bg-purple-100 text-purple-700 border-purple-300">Other Devices</Badge>
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
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300">
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-slate-700">
            {Object.entries(appleMetrics).map(([metric, appleData]) => {
              const otherData = otherMetrics[metric] || {};
              const diff = Math.abs(appleData.change - (otherData.change || 0));
              if (diff > 0.3) {
                return (
                  <li key={metric} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <strong>{metric.charAt(0).toUpperCase() + metric.slice(1).replace('_', ' ')}:</strong>{' '}
                      Apple Watch users showed a {appleData.change > (otherData.change || 0) ? 'larger' : 'smaller'} change
                      ({appleData.change > 0 ? '+' : ''}{appleData.change.toFixed(2)}) compared to other devices
                      ({otherData.change > 0 ? '+' : ''}{(otherData.change || 0).toFixed(2)})
                    </span>
                  </li>
                );
              }
              return null;
            }).filter(Boolean)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
