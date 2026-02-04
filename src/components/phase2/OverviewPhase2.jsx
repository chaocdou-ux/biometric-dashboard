import { calculateImprovement } from '../../lib/designSystem';

export default function OverviewPhase2({ data }) {
  const calculateMetrics = () => {
    const allMeasurements = data.allMeasurements || [];
    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const improvements = {};

    metricNames.forEach(metric => {
      const validData = allMeasurements.filter(m => m[metric] !== null);

      if (validData.length > 0) {
        const avg = validData.reduce((sum, m) => sum + m[metric], 0) / validData.length;

        improvements[metric] = {
          avg,
          count: validData.length
        };
      }
    });

    return improvements;
  };

  const calculatePANAS = () => {
    const allMeasurements = data.allMeasurements || [];
    const validPositive = allMeasurements.filter(m => m.panas_positive > 0);
    const validNegative = allMeasurements.filter(m => m.panas_negative > 0);

    return {
      positive_avg: validPositive.length > 0
        ? validPositive.reduce((sum, m) => sum + m.panas_positive, 0) / validPositive.length
        : 0,
      negative_avg: validNegative.length > 0
        ? validNegative.reduce((sum, m) => sum + m.panas_negative, 0) / validNegative.length
        : 0,
      positive_count: validPositive.length,
      negative_count: validNegative.length
    };
  };

  const improvements = calculateMetrics();
  const panas = calculatePANAS();

  const topMetrics = Object.entries(improvements)
    .sort((a, b) => b[1].avg - a[1].avg)
    .slice(0, 5);

  const metricColors = {
    emotional: '#A8C8DA',
    energy: '#F3C77B',
    tension: '#7D8D74',
    stress: '#C96F4E',
    clarity: '#50604F',
    spiritual: '#B8A389'
  };

  const metricLabels = {
    emotional: 'Emotional State',
    energy: 'Physical Energy',
    tension: 'Body Tension',
    stress: 'Stress Level',
    clarity: 'Mental Clarity',
    spiritual: 'Spiritual Connection'
  };

  const totalMeasurements = data.allMeasurements?.length || 0;
  const uniqueParticipants = data.participants?.length || 0;

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Study Overview</h3>

        <div className="mb-6 p-6 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50">
          <p className="leading-relaxed" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
            This immersive two-day biometric study examined the effects of integrating breathwork, live music, binaural beats, and movement on emotional state, energy levels, and nervous system function.
          </p>
        </div>

        <div className="space-y-4 leading-relaxed" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          <p>
            Participants engaged in multiple modalities designed to stimulate vagal tone, enhance heart rate variability, and foster emotional resilience through hyper-oxygenation and sound therapy. The study tracked real-time biometric data and self-reported measures throughout each session.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="font-bold mb-3" style={{ color: '#0f172a', fontSize: '22px' }}>Modalities</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Breathwork: structured breathwork protocols</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Live Violin: immersive soundscapes by Nathalie Bonin</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Binaural Beats: frequency-based audio via headphones</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Movement: integrated physical practices</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Educational Sessions: presentations on creativity and consciousness</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: '#0f172a', fontSize: '22px' }}>Measurement Approach</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Continuous tracking across 2 full days</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Self-reports: emotional, physical, and mental states</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>PANAS Assessment: validated affect measurement tool</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Biometric Data: heart rate, HRV via chest band sensors and EEG headsets</span></li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" /><span style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6' }}>Participants: {uniqueParticipants} participants completed the 2-day study</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Key Facilitators</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="font-bold" style={{ color: '#0f172a', fontSize: '22px' }}>Nathalie Bonin</h4>
            <p className="leading-relaxed" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
              Internationally acclaimed violinist, Grammy-winning artist, and inspirational speaker combining live music and storytelling for transformation.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold" style={{ color: '#0f172a', fontSize: '22px' }}>Robert Bahedry</h4>
            <p className="leading-relaxed" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
              Two-time Emmy-winning host, certified breathwork practitioner and transformational coach, specialized in conscious breathing for meaningful transformation.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold" style={{ color: '#0f172a', fontSize: '22px' }}>Dr. Mitchell Abraham</h4>
            <p className="leading-relaxed" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
              Researcher and educator exploring the intersections of neuroscience, creativity, and consciousness with presentations on the science of sound and cognition.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Average Metric Scores</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topMetrics.map(([metric, data]) => (
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
              <div className="text-3xl font-bold" style={{ color: '#0f172a' }}>
                {data.avg.toFixed(1)}
              </div>
              <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                avg across {data.count} measurements
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>PANAS Scores</h3>
        <p className="leading-relaxed mb-6" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          The Positive and Negative Affect Schedule (PANAS) measures emotional states through 20 descriptive terms (10 positive, 10 negative), rated on a scale of 1-5.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-green-50/50 border border-green-200/50">
            <h4 className="font-bold mb-2" style={{ fontSize: '22px', color: '#0f172a' }}>Positive Affect</h4>
            <div className="text-4xl font-bold mb-2" style={{ color: '#15803d' }}>
              {panas.positive_avg.toFixed(1)}
            </div>
            <p className="text-sm" style={{ color: '#475569' }}>Average score (max: 50)</p>
          </div>
          <div className="p-6 rounded-lg bg-red-50/50 border border-red-200/50">
            <h4 className="font-bold mb-2" style={{ fontSize: '22px', color: '#0f172a' }}>Negative Affect</h4>
            <div className="text-4xl font-bold mb-2" style={{ color: '#dc2626' }}>
              {panas.negative_avg.toFixed(1)}
            </div>
            <p className="text-sm" style={{ color: '#475569' }}>Average score (max: 50)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
