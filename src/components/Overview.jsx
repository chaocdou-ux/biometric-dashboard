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

        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(168, 200, 218, 0.1)' }}>
          <p className="text-sm font-medium mb-2" style={{ color: '#50604F' }}>
            What is a Feasibility Study?
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#333430' }}>
            A feasibility study assesses how practical and achievable a proposed plan, project, or method is before full-scale implementation.
          </p>
        </div>

        <div className="space-y-4 leading-relaxed" style={{ color: '#333430' }}>
          <p>
            This study explores the effects of ancient yogic breathwork (two inhales, one exhale) combined with immersive soundscapes on emotional state, physical energy, and nervous system function. Participants engaged in guided breathwork and sound-based sessions designed to hyper-oxygenate the bloodstream, trigger emotional release, and foster healing.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#50604F' }}>Modalities</h3>
              <ul className="space-y-1 text-sm">
                <li>• Breathwork: Two inhales, one exhale pattern</li>
                <li>• Sound: Live violin (all sessions)</li>
                <li>• Sound bowls (sessions 2-4)</li>
                <li>• Binaural beats via headphones (sessions 3-4)</li>
                <li>• Movement: Ecstatic dance (session 4)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#50604F' }}>Measurement Approach</h3>
              <ul className="space-y-1 text-sm">
                <li>• Baseline assessment before study</li>
                <li>• Pre/post-session self-reports (emotional, physical, mental)</li>
                <li>• Biometric data from wearable devices</li>
                <li>• Attendance: {uniqueParticipants} participants with 2+ sessions</li>
                <li>• Devices: Apple Watch, Oura Ring, Muse, Ring Conn</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Facilitators</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: '#50604F' }}>Nathalie Bonin</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#333430' }}>
              Grammy-winning violinist, artist, and speaker blending live music with inspiring transformation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: '#50604F' }}>Robert Bahedry</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#333430' }}>
              Breathwork facilitator and coach, guiding personal breakthroughs through conscious breathing since 2010.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: '#50604F' }}>Chao Dou</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#333430' }}>
              Experience strategist, designer, and artist integrating architecture, creative experimentation, and multisensory wellness practices.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Key Findings</h2>
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
                    style={{ backgroundColor: '#F53B57' }}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-lg font-semibold" style={{ color: '#333430' }}>
                      {metricLabels[metric]}
                    </div>
                    <div className="text-sm opacity-70" style={{ color: '#333430' }}>
                      n={data.count} responses
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: '#F53B57' }}>
                    +{data.change.toFixed(1)}%
                  </div>
                  <div className="text-xs opacity-70" style={{ color: '#333430' }}>
                    improved on average
                  </div>
                </div>
              </div>

              <div className="relative h-12 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <div
                  className="absolute inset-y-0 left-0 rounded-lg transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.abs(data.change), 100)}%`,
                    backgroundColor: metricColors[metric],
                    opacity: 0.6
                  }}
                />
                <div className="absolute inset-0 flex items-center px-4">
                  <div className="text-xs font-medium" style={{ color: '#333430' }}>
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
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(241, 141, 68, 0.1)' }}>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#F18D44' }}>
            Biometric Study 2
          </h3>
          <p className="text-sm" style={{ color: '#333430' }}>
            Scheduled for November 2025 — Building on insights from this feasibility study to explore deeper patterns in breathwork and sound therapy.
          </p>
        </div>
      </section>
    </div>
  );
}
