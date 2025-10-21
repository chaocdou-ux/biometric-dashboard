import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, Activity, Heart } from 'lucide-react';

export default function Overview({ data }) {
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

        let improvement;
        if (metric === 'tension' || metric === 'stress') {
          improvement = ((preAvg - postAvg) / preAvg * 100);
        } else {
          improvement = ((postAvg - preAvg) / preAvg * 100);
        }

        improvements[metric] = {
          pre: preAvg,
          post: postAvg,
          change: improvement,
          count: validData.length
        };
      }
    });

    const heartRateData = allSessions.filter(s => s.pre_heart_rate && s.post_heart_rate);
    const avgHRChange = heartRateData.length > 0
      ? heartRateData.reduce((sum, s) => sum + (s.pre_heart_rate - s.post_heart_rate), 0) / heartRateData.length
      : 0;

    return { improvements, avgHRChange };
  };

  const { improvements, avgHRChange } = calculateMetrics();

  const topImprovement = Object.entries(improvements)
    .sort((a, b) => b[1].change - a[1].change)[0];

  const sensationCounts = {};
  data.allSessions.forEach(session => {
    session.sensations?.forEach(s => {
      sensationCounts[s] = (sensationCounts[s] || 0) + 1;
    });
  });

  const topSensation = Object.entries(sensationCounts)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Study Overview</h3>
          <p className="text-slate-700 leading-relaxed">
            This study explores the effects of ancient yogic breathwork (two inhales, one exhale) combined with immersive soundscapes on emotional state, physical energy, and nervous system function. Participants engaged in guided breathwork and sound-based sessions designed to hyper-oxygenate the bloodstream, trigger emotional release, and foster healing.
          </p>

          <h3 className="text-lg font-semibold text-blue-600 mb-3 mt-6">Facilitators</h3>
          <ul className="space-y-2 text-slate-700">
            <li><strong>Nathalie Bonin:</strong> Grammy-winning violinist, artist, speaker blending live music with inspiring transformation</li>
            <li><strong>Robert Bahedry:</strong> Breathwork facilitator and coach, guiding personal breakthroughs through conscious breathing since 2010</li>
            <li><strong>Chao Dou:</strong> Experience strategist, designer, artist integrating architecture, creative experimentation, and multisensory wellness practices</li>
          </ul>

          <h3 className="text-lg font-semibold text-blue-600 mb-3 mt-6">Key Findings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-slate-800">Top Improvement</h4>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {topImprovement ? topImprovement[0].charAt(0).toUpperCase() + topImprovement[0].slice(1) : 'N/A'}
                </p>
                <p className="text-sm text-slate-600">
                  {topImprovement ? `+${topImprovement[1].change.toFixed(1)}% improvement` : ''}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-slate-800">Heart Rate Change</h4>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {avgHRChange > 0 ? '-' : '+'}{Math.abs(avgHRChange).toFixed(1)} BPM
                </p>
                <p className="text-sm text-slate-600">Average across all sessions</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-slate-800">Most Common Sensation</h4>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {topSensation ? topSensation[0] : 'N/A'}
                </p>
                <p className="text-sm text-slate-600">
                  {topSensation ? `Reported ${topSensation[1]} times` : ''}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-slate-800">Participants</h4>
                </div>
                <p className="text-3xl font-bold text-purple-600">{data.baseline.length}</p>
                <p className="text-sm text-slate-600">{data.allSessions.length} total observations</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-blue-600 mb-3 mt-6">Top 5 Measurable Trends</h3>
          <ol className="space-y-2 text-slate-700">
            {Object.entries(improvements)
              .sort((a, b) => b[1].change - a[1].change)
              .slice(0, 5)
              .map(([metric, data], idx) => (
                <li key={metric}>
                  <strong>{metric.charAt(0).toUpperCase() + metric.slice(1)}:</strong> Improved by{' '}
                  {data.change.toFixed(1)}% on average (pre: {data.pre.toFixed(2)}, post:{' '}
                  {data.post.toFixed(2)})
                </li>
              ))}
          </ol>

          <h3 className="text-lg font-semibold text-blue-600 mb-3 mt-6">Recommendations</h3>
          <ul className="space-y-2 text-slate-700">
            <li>Continue exploring the integration of breathwork and sound therapy for holistic wellness</li>
            <li>Consider longer-term follow-up studies to assess sustained benefits</li>
            <li>Investigate individual variation in response to different session modalities</li>
            <li>Explore correlations between baseline stress levels and treatment efficacy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
