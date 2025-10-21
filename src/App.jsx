import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter
} from 'recharts';
import { 
  Activity, Heart, TrendingUp, TrendingDown, Users, Calendar,
  CheckCircle, XCircle, Minus
} from 'lucide-react';
import processedData from '@/data/processed-data.json';

const COLORS = {
  earth: '#6b4423',
  sage: '#7a8a6f',
  clay: '#b5651d',
  moss: '#5a6b4a',
  sand: '#d4a574',
  stone: '#78716c',
  charcoal: '#292524',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-50 p-3 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono">
        <p className="font-bold text-xs mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BiometricDashboard() {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [selectedSession, setSelectedSession] = useState('overview');

  const metrics = useMemo(() => {
    const result = {
      improvements: {},
      sessionTrends: [],
      sensations: {},
      experiences: {},
      heartRate: [],
      attendance: {}
    };

    const allSessions = Object.values(processedData.sessions).flat();
    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    
    metricNames.forEach(metric => {
      const validData = allSessions.filter(s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null);
      if (validData.length > 0) {
        const preAvg = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
        const postAvg = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
        
        let improvement;
        if (metric === 'tension' || metric === 'stress') {
          improvement = ((preAvg - postAvg) / preAvg * 100);
        } else {
          improvement = ((postAvg - preAvg) / preAvg * 100);
        }
        
        result.improvements[metric] = {
          pre: preAvg,
          post: postAvg,
          change: improvement,
          count: validData.length
        };
      }
    });

    Object.entries(processedData.sessions).forEach(([session, data], idx) => {
      const sessionMetrics = {
        name: `S${idx + 1}`,
        participants: data.length
      };
      
      metricNames.forEach(metric => {
        const validData = data.filter(s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null);
        if (validData.length > 0) {
          sessionMetrics[`${metric}_pre`] = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
          sessionMetrics[`${metric}_post`] = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
        }
      });
      
      result.sessionTrends.push(sessionMetrics);

      const hrValidData = data.filter(s => s.pre_heart_rate && s.post_heart_rate);
      if (hrValidData.length > 0) {
        const preAvg = hrValidData.reduce((sum, s) => sum + s.pre_heart_rate, 0) / hrValidData.length;
        const postAvg = hrValidData.reduce((sum, s) => sum + s.post_heart_rate, 0) / hrValidData.length;
        
        result.heartRate.push({
          session: `S${idx + 1}`,
          pre: Math.round(preAvg),
          post: Math.round(postAvg),
          change: Math.round(preAvg - postAvg)
        });
      }
    });

    allSessions.forEach(session => {
      session.sensations?.forEach(s => {
        result.sensations[s] = (result.sensations[s] || 0) + 1;
      });
      session.experience?.forEach(e => {
        result.experiences[e] = (result.experiences[e] || 0) + 1;
      });
    });

    processedData.baseline.forEach(participant => {
      let attended = 0;
      Object.values(processedData.sessions).forEach(session => {
        if (session.some(s => s.participant === participant.participant)) attended++;
      });
      result.attendance[participant.participant] = {
        attended,
        total: 4,
        rate: (attended / 4 * 100).toFixed(0)
      };
    });

    return result;
  }, []);

  const radarData = useMemo(() => {
    return Object.entries(metrics.improvements).map(([metric, data]) => ({
      metric: metric.toUpperCase(),
      pre: data.pre.toFixed(1),
      post: data.post.toFixed(1)
    }));
  }, [metrics]);

  const topSensations = useMemo(() => {
    return Object.entries(metrics.sensations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [metrics]);

  const topExperiences = useMemo(() => {
    return Object.entries(metrics.experiences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [metrics]);

  const participantJourney = useMemo(() => {
    if (!selectedParticipant) return [];
    const journey = [];
    Object.entries(processedData.sessions).forEach(([session, data], idx) => {
      const pData = data.find(d => d.participant === selectedParticipant);
      if (pData) {
        journey.push({
          session: `S${idx + 1}`,
          emotional: pData.post_emotional - pData.pre_emotional,
          energy: pData.post_energy - pData.pre_energy,
          clarity: pData.post_clarity - pData.pre_clarity,
          spiritual: pData.post_spiritual - pData.pre_spiritual,
          stress_reduction: pData.pre_stress - pData.post_stress,
          tension_reduction: pData.pre_tension - pData.post_tension,
        });
      }
    });
    return journey;
  }, [selectedParticipant]);

  const avgHRReduction = metrics.heartRate.length > 0 
    ? (metrics.heartRate.reduce((sum, hr) => sum + hr.change, 0) / metrics.heartRate.length).toFixed(1)
    : 0;

  const bestImprovement = Object.entries(metrics.improvements)
    .sort((a, b) => b[1].change - a[1].change)[0];

  return (
    <div className="min-h-screen bg-stone-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-4 border-stone-900 bg-stone-50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-2 tracking-tighter">
            BIOMETRIC STUDY
          </h1>
          <p className="text-lg text-stone-600 uppercase tracking-wide">
            Sound & Breath Analysis Dashboard
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="outline">
              {processedData.baseline.length} PARTICIPANTS
            </Badge>
            <Badge variant="outline">
              {Object.keys(processedData.sessions).length} SESSIONS
            </Badge>
            <Badge variant="outline">
              {Object.values(processedData.sessions).flat().length} DATA POINTS
            </Badge>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5" style={{ color: COLORS.sage }} />
                TOP METRIC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1" style={{ color: COLORS.earth }}>
                {bestImprovement?.[0]?.toUpperCase()}
              </div>
              <div className="text-xl text-stone-600">
                +{bestImprovement?.[1]?.change.toFixed(0)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="w-5 h-5" style={{ color: COLORS.clay }} />
                HEART RATE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1" style={{ color: COLORS.earth }}>
                -{avgHRReduction}
              </div>
              <div className="text-xl text-stone-600">BPM AVG</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="w-5 h-5" style={{ color: COLORS.moss }} />
                SENSATIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1" style={{ color: COLORS.earth }}>
                {topSensations[0]?.name.toUpperCase()}
              </div>
              <div className="text-xl text-stone-600">
                {topSensations[0]?.count}X
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5" style={{ color: COLORS.sand }} />
                COMPLETION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1" style={{ color: COLORS.earth }}>
                {Object.values(metrics.attendance).filter(a => a.attended === 4).length}
              </div>
              <div className="text-xl text-stone-600">FULL SERIES</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedSession} onValueChange={setSelectedSession}>
          <TabsList className="w-full bg-stone-50">
            <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
            <TabsTrigger value="metrics">METRICS</TabsTrigger>
            <TabsTrigger value="participants">PARTICIPANTS</TabsTrigger>
            <TabsTrigger value="sessions">SESSIONS</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>HOLISTIC PROFILE</CardTitle>
                  <CardDescription>PRE VS POST SESSION AVERAGES</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#78716c" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <Radar name="PRE" dataKey="pre" stroke={COLORS.stone} fill={COLORS.stone} fillOpacity={0.3} />
                      <Radar name="POST" dataKey="post" stroke={COLORS.earth} fill={COLORS.earth} fillOpacity={0.5} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Heart Rate Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>CARDIAC RESPONSE</CardTitle>
                  <CardDescription>HEART RATE ACROSS SESSIONS</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metrics.heartRate}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis dataKey="session" tick={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }} />
                      <YAxis tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }} />
                      <Line type="monotone" dataKey="pre" stroke={COLORS.clay} strokeWidth={3} name="PRE" dot={{ r: 5, fill: COLORS.clay }} />
                      <Line type="monotone" dataKey="post" stroke={COLORS.sage} strokeWidth={3} name="POST" dot={{ r: 5, fill: COLORS.sage }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sensations */}
              <Card>
                <CardHeader>
                  <CardTitle>PHYSICAL SENSATIONS</CardTitle>
                  <CardDescription>SOMATIC EXPERIENCES REPORTED</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topSensations} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count">
                        {topSensations.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[COLORS.earth, COLORS.sage, COLORS.clay, COLORS.moss, COLORS.sand, COLORS.stone][index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Experiences */}
              <Card>
                <CardHeader>
                  <CardTitle>EXPERIENCE QUALITY</CardTitle>
                  <CardDescription>SUBJECTIVE EXPERIENCE DESCRIPTORS</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topExperiences} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count">
                        {topExperiences.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[COLORS.moss, COLORS.earth, COLORS.clay, COLORS.sand, COLORS.sage, COLORS.stone][index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>METRIC IMPROVEMENTS</CardTitle>
                <CardDescription>PRE VS POST COMPARISON ACROSS ALL SESSIONS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(metrics.improvements).map(([metric, data]) => (
                    <div key={metric} className="border-2 border-stone-900 p-4 bg-stone-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-bold uppercase">{metric}</div>
                        <Badge variant={data.change > 0 ? "success" : "danger"}>
                          {data.change > 0 ? '+' : ''}{data.change.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-stone-600 text-xs uppercase">PRE</div>
                          <div className="font-bold text-xl">{data.pre.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-stone-600 text-xs uppercase">POST</div>
                          <div className="font-bold text-xl">{data.post.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-stone-600 text-xs uppercase">N</div>
                          <div className="font-bold text-xl">{data.count}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SESSION PROGRESSION</CardTitle>
                <CardDescription>METRIC EVOLUTION OVER TIME</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={metrics.sessionTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }} />
                    <YAxis domain={[0, 5]} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="emotional_post" stroke={COLORS.earth} strokeWidth={2} name="EMOTIONAL" />
                    <Line type="monotone" dataKey="energy_post" stroke={COLORS.sage} strokeWidth={2} name="ENERGY" />
                    <Line type="monotone" dataKey="clarity_post" stroke={COLORS.clay} strokeWidth={2} name="CLARITY" />
                    <Line type="monotone" dataKey="spiritual_post" stroke={COLORS.moss} strokeWidth={2} name="SPIRITUAL" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>PARTICIPANTS</CardTitle>
                    <CardDescription>SELECT TO VIEW JOURNEY</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {processedData.baseline.map((p) => {
                        const attendance = metrics.attendance[p.participant];
                        return (
                          <Button
                            key={p.participant}
                            variant={selectedParticipant === p.participant ? "default" : "outline"}
                            className="w-full justify-between text-xs"
                            onClick={() => setSelectedParticipant(p.participant)}
                          >
                            <span>{p.participant}</span>
                            <Badge variant={attendance?.attended === 4 ? "success" : "outline"}>
                              {attendance?.attended}/4
                            </Badge>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {selectedParticipant ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedParticipant} JOURNEY</CardTitle>
                      <CardDescription>METRIC CHANGES ACROSS SESSIONS</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={participantJourney}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                          <XAxis dataKey="session" tick={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }} />
                          <YAxis domain={[-3, 3]} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }} />
                          <Line type="monotone" dataKey="emotional" stroke={COLORS.earth} strokeWidth={2} name="EMOTIONAL" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="energy" stroke={COLORS.sage} strokeWidth={2} name="ENERGY" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="clarity" stroke={COLORS.clay} strokeWidth={2} name="CLARITY" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="spiritual" stroke={COLORS.moss} strokeWidth={2} name="SPIRITUAL" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="stress_reduction" stroke={COLORS.sand} strokeWidth={2} name="STRESS ↓" strokeDasharray="5 5" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="tension_reduction" stroke={COLORS.stone} strokeWidth={2} name="TENSION ↓" strokeDasharray="5 5" dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-[400px]">
                      <div className="text-center">
                        <Users className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                        <p className="text-stone-600 uppercase text-sm">SELECT A PARTICIPANT</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Attendance Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>ATTENDANCE MATRIX</CardTitle>
                <CardDescription>SESSION PARTICIPATION TRACKING</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-stone-900">
                    <thead>
                      <tr className="border-b-2 border-stone-900 bg-stone-200">
                        <th className="text-left p-3 font-bold text-xs uppercase border-r-2 border-stone-900">PARTICIPANT</th>
                        <th className="text-center p-3 font-bold text-xs uppercase border-r-2 border-stone-900">S1</th>
                        <th className="text-center p-3 font-bold text-xs uppercase border-r-2 border-stone-900">S2</th>
                        <th className="text-center p-3 font-bold text-xs uppercase border-r-2 border-stone-900">S3</th>
                        <th className="text-center p-3 font-bold text-xs uppercase border-r-2 border-stone-900">S4</th>
                        <th className="text-center p-3 font-bold text-xs uppercase">RATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.baseline.map((p, idx) => {
                        const attendance = metrics.attendance[p.participant];
                        return (
                          <tr key={p.participant} className={`border-b border-stone-900 ${idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
                            <td className="p-3 font-bold text-xs border-r-2 border-stone-900">{p.participant}</td>
                            {[1, 2, 3, 4].map(sessionNum => {
                              const attended = processedData.sessions[`session_${sessionNum}`]?.some(
                                s => s.participant === p.participant
                              );
                              return (
                                <td key={sessionNum} className="text-center p-3 border-r-2 border-stone-900">
                                  {attended ? (
                                    <CheckCircle className="w-5 h-5 mx-auto" style={{ color: COLORS.sage }} />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-stone-300 mx-auto" />
                                  )}
                                </td>
                              );
                            })}
                            <td className="text-center p-3">
                              <Badge variant={attendance?.attended === 4 ? "success" : "outline"}>
                                {attendance?.rate}%
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            {Object.entries(processedData.sessions).map(([sessionKey, sessionData], idx) => (
              <Card key={sessionKey}>
                <CardHeader>
                  <CardTitle>SESSION {idx + 1}</CardTitle>
                  <CardDescription>{sessionData.length} PARTICIPANTS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase mb-3 text-stone-600">METRIC CHANGES</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={['emotional', 'energy', 'clarity', 'spiritual'].map(metric => {
                          const validData = sessionData.filter(s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null);
                          const preAvg = validData.length > 0 ? validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length : 0;
                          const postAvg = validData.length > 0 ? validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length : 0;
                          return {
                            metric: metric.toUpperCase(),
                            pre: preAvg,
                            post: postAvg
                          };
                        })}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                          <XAxis dataKey="metric" tick={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} />
                          <YAxis domain={[0, 5]} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold' }} />
                          <Bar dataKey="pre" fill={COLORS.stone} name="PRE" />
                          <Bar dataKey="post" fill={COLORS.earth} name="POST" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase mb-3 text-stone-600">HEART RATE SCATTER</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                          <XAxis dataKey="pre" name="PRE" domain={[50, 130]} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                          <YAxis dataKey="post" name="POST" domain={[50, 130]} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                          <Scatter
                            name="PARTICIPANTS"
                            data={sessionData.filter(d => d.pre_heart_rate && d.post_heart_rate).map(d => ({
                              pre: d.pre_heart_rate,
                              post: d.post_heart_rate
                            }))}
                            fill={COLORS.clay}
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'PARTICIPANTS', value: sessionData.length },
                      { 
                        label: 'AVG EMOTIONAL GAIN', 
                        value: (() => {
                          const validData = sessionData.filter(s => s.pre_emotional !== null && s.post_emotional !== null);
                          return validData.length > 0 ?
                            `+${((validData.reduce((sum, s) => sum + (s.post_emotional - s.pre_emotional), 0) / validData.length) * 20).toFixed(0)}%` : '0%';
                        })()
                      },
                      { 
                        label: 'HR REDUCTION', 
                        value: (() => {
                          const validData = sessionData.filter(s => s.pre_heart_rate && s.post_heart_rate);
                          return validData.length > 0 ?
                            `-${(validData.reduce((sum, s) => sum + (s.pre_heart_rate - s.post_heart_rate), 0) / validData.length).toFixed(0)} BPM` : '0';
                        })()
                      },
                      { 
                        label: 'SPIRITUAL BOOST', 
                        value: (() => {
                          const validData = sessionData.filter(s => s.pre_spiritual !== null && s.post_spiritual !== null);
                          return validData.length > 0 ?
                            `+${((validData.reduce((sum, s) => sum + (s.post_spiritual - s.pre_spiritual), 0) / validData.length) * 20).toFixed(0)}%` : '0%';
                        })()
                      }
                    ].map((stat, i) => (
                      <div key={i} className="border-2 border-stone-900 p-3 bg-stone-50 text-center">
                        <div className="text-xs text-stone-600 uppercase mb-1">{stat.label}</div>
                        <div className="text-xl font-bold" style={{ color: COLORS.earth }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

        </Tabs>

        {/* Footer */}
        <div className="border-t-2 border-stone-900 pt-6 text-center text-xs text-stone-600 uppercase tracking-wide space-y-1">
          <p>BIOMETRIC SOUND & BREATH STUDY</p>
          <p>DATA VISUALIZATION DASHBOARD</p>
        </div>

      </div>
    </div>
  );
}
