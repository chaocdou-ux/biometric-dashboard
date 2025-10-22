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

    return improvements;
  };

  const improvements = calculateMetrics();

  const topMetrics = Object.entries(improvements)
    .sort((a, b) => b[1].change - a[1].change)
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

  const totalSessions = data.allSessions?.length || 0;
  const uniqueParticipants = new Set(data.allSessions?.map(s => s.participant)).size;

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <h2 className="section-header">Study Overview</h2>

        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
            This was a feasibility study designed to assess the practicality and achievability of the proposed therapeutic plan and method before full-scale implementation.
          </p>
        </div>

        <div className="space-y-4 leading-relaxed" style={{ color: '#1e293b' }}>
          <p>
            This study examined how guided breathwork (using a two-inhale, one-exhale pattern) combined with immersive live violin soundscapes influenced emotional state, physical energy, and nervous system function. Participants engaged in sessions blending structured breathwork and sound, aiming to hyper-oxygenate the bloodstream, prompt emotional release, and foster healing. Protocols were designed to stimulate the vagus nerve and heart rate variability, supporting both physiological and emotional resilience.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#0f172a' }}>Modalities</h3>
              <ul className="space-y-1 text-sm">
                <li>• Breathwork: Two inhales followed by one exhale per cycle</li>
                <li>• Sound: Live violin at every session</li>
                <li>• Sound Bowls: Added in session 2 for resonance and relaxation</li>
                <li>• Binaural Beats: Introduced via headphones in session 3</li>
                <li>• Movement: Incorporated before breathwork in session 4 to facilitate energy release</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#0f172a' }}>Measurement Approach</h3>
              <ul className="space-y-1 text-sm">
                <li>• Baseline assessment prior to study</li>
                <li>• Pre- and post-session self-reports for emotional, physical, and mental states</li>
                <li>• Biometric data from wearable devices</li>
                <li>• Attendance: {uniqueParticipants} participants completed at least 2 sessions</li>
                <li>• Devices used: Apple Watch, Oura Ring, Muse, Ring Conn</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Key Facilitators</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: '#0f172a' }}>Nathalie Bonin</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
              Internationally acclaimed violinist, Grammy-winning artist, and inspirational speaker who blends live music and storytelling to ignite transformation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: '#0f172a' }}>Robert Bahedry</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
              Certified breathwork practitioner and transformational coach, based in Los Angeles. Known for creating safe, welcoming environments since 2010, Robert specializes in conscious breathing for meaningful transformation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: '#0f172a' }}>Chao Dou</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
              Experience strategist, designer, and artist exploring the intersections of art, wellness, and sensory experimentation to deepen presence and connection.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Key Findings</h2>
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
          <p className="text-base font-semibold" style={{ color: '#0f172a' }}>
            +33.7% Improvement in Spiritual Connection
          </p>
          <p className="text-sm mt-1" style={{ color: '#1e293b' }}>
            Average increase in self-reported spiritual connection across all sessions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="stat-value">{totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
          <div className="metric-card">
            <div className="stat-value">{uniqueParticipants}</div>
            <div className="stat-label">Participants</div>
          </div>
          <div className="metric-card">
            <div className="stat-value">
              {topMetrics.length > 0 ? `+${topMetrics[0][1].change.toFixed(1)}%` : 'N/A'}
            </div>
            <div className="stat-label">Top Improvement</div>
          </div>
          <div className="metric-card">
            <div className="stat-value">4</div>
            <div className="stat-label">Weeks</div>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header mb-6">Top 5 Improvements</h2>
        <div className="space-y-8">
          {topMetrics.map(([metric, data], index) => (
            <div key={metric} className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div
                    className="data-point"
                    style={{ backgroundColor: '#0f172a' }}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-lg font-semibold" style={{ color: '#0f172a' }}>
                      {metricLabels[metric]}
                    </div>
                    <div className="text-sm opacity-70" style={{ color: '#1e293b' }}>
                      n={data.count} responses
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                    +{data.change.toFixed(1)}%
                  </div>
                  <div className="text-xs opacity-70" style={{ color: '#1e293b' }}>
                    improved on average
                  </div>
                </div>
              </div>

              <div className="relative h-12 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <div
                  className="absolute inset-y-0 left-0 rounded-lg transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.abs(data.change), 100)}%`,
                    backgroundColor: metricColors[metric],
                    opacity: 0.7
                  }}
                />
                <div className="absolute inset-0 flex items-center px-4">
                  <div className="text-xs font-medium" style={{ color: '#0f172a' }}>
                    Pre: {data.pre.toFixed(1)} → Post: {data.post.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Next Steps</h2>
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#0f172a' }}>
            Biometric Study 2
          </h3>
          <p className="text-sm" style={{ color: '#1e293b' }}>
            Scheduled for November 2025 — Building on insights from this feasibility study to explore deeper patterns in breathwork and sound therapy.
          </p>
        </div>
      </section>
    </div>
  );
}
