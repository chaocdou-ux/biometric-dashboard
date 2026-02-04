export default function ParticipantsPhase2({ data }) {
  const participants = data.participants || [];
  const allMeasurements = data.allMeasurements || [];

  const getParticipantData = (participant) => {
    const participantMeasurements = allMeasurements.filter(m => m.participant === participant);

    if (participantMeasurements.length === 0) return null;

    const metrics = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    const averages = {};

    metrics.forEach(metric => {
      const validData = participantMeasurements.filter(m => m[metric] !== null);
      if (validData.length > 0) {
        averages[metric] = validData.reduce((sum, m) => sum + m[metric], 0) / validData.length;
      }
    });

    const validPositive = participantMeasurements.filter(m => m.panas_positive > 0);
    const validNegative = participantMeasurements.filter(m => m.panas_negative > 0);

    averages.panas_positive = validPositive.length > 0
      ? validPositive.reduce((sum, m) => sum + m.panas_positive, 0) / validPositive.length
      : 0;
    averages.panas_negative = validNegative.length > 0
      ? validNegative.reduce((sum, m) => sum + m.panas_negative, 0) / validNegative.length
      : 0;

    const days = [...new Set(participantMeasurements.map(m => m.day))];

    return {
      measurements: participantMeasurements,
      averages,
      days,
      device: participantMeasurements[0]?.device || 'N/A',
      chestband: participantMeasurements[0]?.chestband || 'N/A'
    };
  };

  const metricLabels = {
    emotional: 'Emotional',
    energy: 'Energy',
    tension: 'Tension',
    stress: 'Stress',
    clarity: 'Clarity',
    spiritual: 'Spiritual'
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
    <div className="space-y-6">
      <section className="glass-card">
        <h3 className="font-bold mb-6" style={{ fontSize: '28px', color: '#0f172a' }}>Participant Analysis</h3>
        <p className="leading-relaxed mb-6" style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          Individual participant metrics and progress throughout the study.
        </p>

        <div className="space-y-6">
          {participants.map(participant => {
            const participantData = getParticipantData(participant);
            if (!participantData) return null;

            return (
              <div key={participant} className="p-6 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h4 className="font-bold" style={{ fontSize: '20px', color: '#0f172a' }}>{participant}</h4>
                  <div className="text-sm mt-2 md:mt-0" style={{ color: '#64748b' }}>
                    {participantData.days.length} days • Device: {participantData.device}
                    {participantData.chestband !== 'N/A' && ` • Band #${participantData.chestband}`}
                  </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {Object.entries(metricLabels).map(([metric, label]) => (
                    participantData.averages[metric] !== undefined && (
                      <div key={metric} className="text-center p-3 rounded-lg bg-white/40">
                        <div
                          className="w-2 h-2 rounded-full mx-auto mb-1"
                          style={{ backgroundColor: metricColors[metric] }}
                        />
                        <div className="text-xs mb-1" style={{ color: '#64748b' }}>{label}</div>
                        <div className="font-bold" style={{ fontSize: '18px', color: '#0f172a' }}>
                          {participantData.averages[metric].toFixed(1)}
                        </div>
                      </div>
                    )
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-green-50/30 border border-green-200/30 text-center">
                    <div className="text-xs mb-1" style={{ color: '#15803d' }}>Positive Affect</div>
                    <div className="font-bold" style={{ fontSize: '18px', color: '#15803d' }}>
                      {participantData.averages.panas_positive.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50/30 border border-red-200/30 text-center">
                    <div className="text-xs mb-1" style={{ color: '#dc2626' }}>Negative Affect</div>
                    <div className="font-bold" style={{ fontSize: '18px', color: '#dc2626' }}>
                      {participantData.averages.panas_negative.toFixed(1)}
                    </div>
                  </div>
                </div>

                {participantData.measurements.some(m => m.emotional_words) && (
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    <div className="text-sm font-medium mb-2" style={{ color: '#0f172a' }}>Emotional States:</div>
                    <div className="flex flex-wrap gap-2">
                      {participantData.measurements
                        .filter(m => m.emotional_words)
                        .map((m, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{ backgroundColor: '#f1f5f9', color: '#475569' }}
                          >
                            {m.emotional_words}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
