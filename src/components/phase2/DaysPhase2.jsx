export default function DaysPhase2({ data }) {
  const days = data.days || {};

  const calculateDayMetrics = (dayMeasurements) => {
    if (!dayMeasurements || dayMeasurements.length === 0) return null;

    const metrics = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const averages = {};

    metrics.forEach(metric => {
      const validData = dayMeasurements.filter(m => m[metric] !== null);
      if (validData.length > 0) {
        averages[metric] = validData.reduce((sum, m) => sum + m[metric], 0) / validData.length;
      }
    });

    const validPositive = dayMeasurements.filter(m => m.panas_positive > 0);
    const validNegative = dayMeasurements.filter(m => m.panas_negative > 0);

    averages.panas_positive = validPositive.length > 0
      ? validPositive.reduce((sum, m) => sum + m.panas_positive, 0) / validPositive.length
      : 0;
    averages.panas_negative = validNegative.length > 0
      ? validNegative.reduce((sum, m) => sum + m.panas_negative, 0) / validNegative.length
      : 0;

    return averages;
  };

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

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Day-by-Day Analysis</h3>
        <p className="leading-relaxed mb-6" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          Comparison of metrics across the two-day study period.
        </p>

        <div className="space-y-8">
          {Object.entries(days).map(([dayKey, dayMeasurements]) => {
            const dayMetrics = calculateDayMetrics(dayMeasurements);
            if (!dayMetrics) return null;

            const dayLabel = dayKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

            return (
              <div key={dayKey} className="p-6 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50">
                <h4 className="font-bold mb-4" style={{ fontSize: '22px', color: '#0f172a' }}>{dayLabel}</h4>
                <p className="text-sm mb-4" style={{ color: '#64748b' }}>
                  {dayMeasurements.length} measurements from {new Set(dayMeasurements.map(m => m.participant)).size} participants
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {Object.entries(metricLabels).map(([metric, label]) => (
                    dayMetrics[metric] !== undefined && (
                      <div key={metric} className="p-3 rounded-lg bg-white/40">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: metricColors[metric] }}
                          />
                          <span className="text-xs font-medium" style={{ color: '#64748b' }}>
                            {label}
                          </span>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                          {dayMetrics[metric].toFixed(1)}
                        </div>
                      </div>
                    )
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-green-50/30 border border-green-200/30">
                    <span className="text-xs font-medium block mb-1" style={{ color: '#15803d' }}>Positive Affect (PANAS)</span>
                    <div className="text-2xl font-bold" style={{ color: '#15803d' }}>
                      {dayMetrics.panas_positive.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50/30 border border-red-200/30">
                    <span className="text-xs font-medium block mb-1" style={{ color: '#dc2626' }}>Negative Affect (PANAS)</span>
                    <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>
                      {dayMetrics.panas_negative.toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-bold mb-3" style={{ fontSize: '18px', color: '#0f172a' }}>Participant Feedback</h5>
                  <div className="space-y-4">
                    {dayMeasurements
                      .filter(m => m.highlights || m.overall_experience)
                      .slice(0, 3)
                      .map((m, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-white/40 border border-gray-200/30">
                          <p className="font-medium mb-2" style={{ fontSize: '14px', color: '#0f172a' }}>
                            {m.participant}
                          </p>
                          {m.highlights && (
                            <p className="text-sm mb-2" style={{ color: '#475569', lineHeight: '1.6' }}>
                              <strong>Highlights:</strong> {m.highlights}
                            </p>
                          )}
                          {m.overall_experience && (
                            <p className="text-sm" style={{ color: '#475569', lineHeight: '1.6' }}>
                              <strong>Experience:</strong> {m.overall_experience}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
