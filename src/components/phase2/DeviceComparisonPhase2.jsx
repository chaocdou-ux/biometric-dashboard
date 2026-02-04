import { colors, metricLabels } from '../../lib/designSystem';

export default function DeviceComparisonPhase2({ data }) {
  const allMeasurements = data.allMeasurements || [];

  const deviceCategories = [...new Set(allMeasurements.map(m => m.device_category))].filter(Boolean);

  const getDeviceMetrics = (deviceCategory) => {
    const deviceMeasurements = allMeasurements.filter(m => m.device_category === deviceCategory);

    const metrics = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const averages = {};

    metrics.forEach(metric => {
      const validData = deviceMeasurements.filter(m => m[metric] !== null);
      if (validData.length > 0) {
        averages[metric] = validData.reduce((sum, m) => sum + m[metric], 0) / validData.length;
      }
    });

    const validPositive = deviceMeasurements.filter(m => m.panas_positive > 0);
    const validNegative = deviceMeasurements.filter(m => m.panas_negative > 0);

    averages.panas_positive = validPositive.length > 0
      ? validPositive.reduce((sum, m) => sum + m.panas_positive, 0) / validPositive.length
      : 0;
    averages.panas_negative = validNegative.length > 0
      ? validNegative.reduce((sum, m) => sum + m.panas_negative, 0) / validNegative.length
      : 0;

    return {
      count: deviceMeasurements.length,
      participants: new Set(deviceMeasurements.map(m => m.participant)).size,
      averages
    };
  };

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Device Comparison</h3>
        <p className="leading-relaxed mb-6" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          Analysis of metrics across different biometric devices used in the study.
        </p>

        <div className="space-y-6">
          {deviceCategories.map(deviceCategory => {
            const deviceData = getDeviceMetrics(deviceCategory);

            return (
              <div key={deviceCategory} className="p-6 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold" style={{ fontSize: '22px', color: '#0f172a' }}>{deviceCategory}</h4>
                  <div className="text-sm" style={{ color: '#64748b' }}>
                    {deviceData.participants} participants • {deviceData.count} measurements
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(metricLabels).map(([metric, label]) => (
                    deviceData.averages[metric] !== undefined && (
                      <div key={metric} className="p-4 rounded-lg bg-white/40">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors.metrics[metric] }}
                          />
                          <span className="text-xs font-medium" style={{ color: '#64748b' }}>
                            {label}
                          </span>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                          {deviceData.averages[metric].toFixed(1)}
                        </div>
                      </div>
                    )
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-green-50/30 border border-green-200/30">
                    <span className="text-xs font-medium block mb-1" style={{ color: '#15803d' }}>Positive Affect</span>
                    <div className="text-2xl font-bold" style={{ color: '#15803d' }}>
                      {deviceData.averages.panas_positive.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50/30 border border-red-200/30">
                    <span className="text-xs font-medium block mb-1" style={{ color: '#dc2626' }}>Negative Affect</span>
                    <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>
                      {deviceData.averages.panas_negative.toFixed(1)}
                    </div>
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
