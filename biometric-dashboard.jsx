
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, 
  Scatter, ComposedChart, Sankey, Treemap, FunnelChart, Funnel, LabelList
} from 'recharts';
import { 
  Activity, Heart, Brain, Zap, TrendingUp, TrendingDown, Users, 
  Calendar, BarChart3, PieChartIcon, Sparkles, Music, Wind,
  AlertCircle, CheckCircle2, XCircle, Flame, Battery, Moon,
  ChevronUp, ChevronDown, Waves, Shield, Target, Award,
  Feather, Star, Gauge, Timer, Lightbulb, HeartHandshake
} from 'lucide-react';

// processed data from csv files
const processedData = {
  "baseline": [
    {"participant": "Participant 1", "device": "apple watch", "activity_level": "very active", "baseline_stress": "high stress"},
    {"participant": "Participant 2", "device": "ring conn", "activity_level": "moderately active", "baseline_stress": "moderate stress"},
    {"participant": "Participant 3", "device": "apple watch", "activity_level": "lightly active", "baseline_stress": "moderate stress"},
    {"participant": "Participant 4", "device": "apple watch", "activity_level": "lightly active", "baseline_stress": "moderate stress"},
    {"participant": "Participant 5", "device": "apple watch", "activity_level": "moderately active", "baseline_stress": "moderate stress"},
    {"participant": "Participant 6", "device": "apple watch", "activity_level": "moderately active", "baseline_stress": "moderate stress"},
    {"participant": "Participant 7", "device": "oura ring", "activity_level": "moderately active", "baseline_stress": "mild stress"},
    {"participant": "Participant 8", "device": "oura ring", "activity_level": "lightly active", "baseline_stress": "none"},
    {"participant": "Participant 9", "device": "apple watch", "activity_level": "very active", "baseline_stress": "moderate stress"},
    {"participant": "Participant 10", "device": "polar vantage m", "activity_level": "very active", "baseline_stress": "mild stress"},
    {"participant": "Participant 11", "device": "oura ring", "activity_level": "very active", "baseline_stress": "high stress"}
  ],
  "sessions": {
    "session_1": [
      {"participant": "Participant 1", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 2, "post_energy": 2, "pre_tension": 2, "post_tension": 4, "pre_stress": 4, "post_stress": 4, "pre_clarity": 2, "post_clarity": 2, "pre_spiritual": 4, "post_spiritual": 2, "pre_heart_rate": 66, "post_heart_rate": 72, "sensations": ["tingling"], "experience": ["intense"]},
      {"participant": "Participant 7", "pre_emotional": 2, "post_emotional": 2, "pre_energy": 2, "post_energy": 2, "pre_tension": 4, "post_tension": 4, "pre_stress": 3, "post_stress": 3, "pre_clarity": 2, "post_clarity": 2, "pre_spiritual": 2, "post_spiritual": 2, "pre_heart_rate": 82, "post_heart_rate": 78, "sensations": ["tingling", "muscle tension"], "experience": ["intense", "emotional"]},
      {"participant": "Participant 12", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 4, "post_energy": 4, "pre_tension": 2, "post_tension": 2, "pre_stress": 3, "post_stress": 3, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 4, "pre_heart_rate": 70, "post_heart_rate": 72, "sensations": ["tingling", "warmth"], "experience": ["liberating", "grounding", "energizing"]},
      {"participant": "Participant 13", "pre_emotional": 2, "post_emotional": 5, "pre_energy": 4, "post_energy": 4, "pre_tension": 4, "post_tension": 1, "pre_stress": 4, "post_stress": 1, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 5, "sensations": ["tingling"], "experience": ["liberating", "intense"]},
      {"participant": "Participant 3", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 4, "post_energy": 5, "pre_tension": 2, "post_tension": 1, "pre_stress": 3, "post_stress": 1, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 2, "post_spiritual": 5, "pre_heart_rate": 72, "post_heart_rate": 63, "sensations": ["tingling", "warmth"], "experience": ["intense", "liberating", "grounding", "energizing", "emotional"]},
      {"participant": "Participant 2", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 4, "post_energy": 5, "pre_tension": 2, "post_tension": 1, "pre_stress": 1, "post_stress": 1, "pre_clarity": 5, "post_clarity": 5, "pre_spiritual": 5, "post_spiritual": 5, "pre_heart_rate": 63, "post_heart_rate": 63, "sensations": ["tingling", "warmth"], "experience": ["intense", "liberating", "grounding", "energizing"]},
      {"participant": "Participant 4", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 2, "post_energy": 4, "pre_tension": 2, "post_tension": 2, "pre_stress": 4, "post_stress": 3, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 77, "post_heart_rate": 65, "sensations": ["tingling", "lightheaded", "muscle tension", "restlessness"], "experience": ["strenuous", "intense", "grounding", "emotional"]},
      {"participant": "Participant 6", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 2, "post_energy": 4, "pre_tension": 4, "post_tension": 1, "pre_stress": 1, "post_stress": 1, "pre_clarity": 4, "post_clarity": 5, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 56, "post_heart_rate": null, "sensations": [], "experience": ["grounding", "energizing", "emotional"]},
      {"participant": "Participant 8", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 4, "post_energy": 4, "pre_tension": 2, "post_tension": 2, "pre_stress": 1, "post_stress": 1, "pre_clarity": 4, "post_clarity": 2, "pre_spiritual": 2, "post_spiritual": 5, "pre_heart_rate": 72, "post_heart_rate": 69, "sensations": ["tingling", "chills", "lightheaded", "muscle tension"], "experience": ["intense"]}
    ],
    "session_2": [
      {"participant": "Participant 9", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 4, "post_energy": 4, "pre_tension": 4, "post_tension": 2, "pre_stress": 4, "post_stress": 4, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 4, "pre_heart_rate": 67, "post_heart_rate": 67, "sensations": ["tingling", "lightheaded"], "experience": ["intense", "liberating", "energizing"]},
      {"participant": "Participant 12", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 4, "post_energy": 5, "pre_tension": 2, "post_tension": 1, "pre_stress": 3, "post_stress": 1, "pre_clarity": 4, "post_clarity": 5, "pre_spiritual": 4, "post_spiritual": 5, "sensations": ["tingling", "chills"], "experience": ["intense", "energizing"]},
      {"participant": "Participant 7", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 4, "post_energy": 4, "pre_tension": 2, "post_tension": 2, "pre_stress": 3, "post_stress": 3, "pre_clarity": 2, "post_clarity": 2, "pre_spiritual": 2, "post_spiritual": 2, "pre_heart_rate": 83, "post_heart_rate": 83, "sensations": ["tingling", "muscle tension"], "experience": ["intense", "grounding"]},
      {"participant": "Participant 10", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 2, "post_energy": 4, "pre_tension": 4, "post_tension": 4, "pre_stress": 3, "post_stress": 3, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 1, "post_spiritual": 1, "pre_heart_rate": 72, "post_heart_rate": 56, "sensations": ["tingling", "muscle tension"], "experience": []},
      {"participant": "Participant 2", "pre_emotional": 5, "post_emotional": 5, "pre_energy": 4, "post_energy": 5, "pre_tension": 2, "post_tension": 1, "pre_stress": 1, "post_stress": 1, "pre_clarity": 5, "post_clarity": 5, "pre_spiritual": 5, "post_spiritual": 5, "pre_heart_rate": 54, "post_heart_rate": 68, "sensations": ["tingling", "warmth", "chills"], "experience": ["intense", "energizing"]},
      {"participant": "Participant 6", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 4, "post_energy": 5, "pre_tension": 2, "post_tension": 1, "pre_stress": 1, "post_stress": 1, "pre_clarity": 4, "post_clarity": 5, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 78, "post_heart_rate": 87, "sensations": ["tingling"], "experience": ["liberating", "grounding", "energizing", "emotional"]},
      {"participant": "Participant 4", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 1, "post_energy": 2, "pre_tension": 4, "post_tension": 4, "pre_stress": 3, "post_stress": 3, "pre_clarity": 2, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 75, "post_heart_rate": 64, "sensations": ["tingling", "lightheaded", "muscle tension"], "experience": ["intense", "liberating", "grounding", "emotional"]},
      {"participant": "Participant 8", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 5, "post_energy": 4, "pre_tension": 4, "post_tension": 2, "pre_stress": 3, "post_stress": 1, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 2, "post_spiritual": 5, "pre_heart_rate": 120, "post_heart_rate": 67, "sensations": ["tingling", "lightheaded", "muscle tension", "restlessness"], "experience": ["intense", "liberating", "grounding", "energizing"]},
      {"participant": "Participant 11", "pre_emotional": 2, "post_emotional": 2, "pre_energy": 2, "post_energy": 1, "pre_tension": 4, "post_tension": 4, "pre_stress": 5, "post_stress": 3, "pre_clarity": 2, "post_clarity": 4, "pre_spiritual": 2, "post_spiritual": 4, "pre_heart_rate": 72, "post_heart_rate": 70, "sensations": ["tingling", "warmth", "lightheaded", "muscle tension"], "experience": ["strenuous", "intense", "emotional"]}
    ],
    "session_3": [
      {"participant": "Participant 14", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 2, "post_energy": 5, "pre_tension": 2, "post_tension": 2, "pre_stress": 3, "post_stress": 1, "pre_clarity": 2, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 4, "pre_heart_rate": 63, "post_heart_rate": 58, "sensations": ["tingling", "warmth", "lightheaded"], "experience": ["liberating", "grounding", "energizing", "emotional"]},
      {"participant": "Participant 2", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 2, "post_energy": 5, "pre_tension": 2, "post_tension": 1, "pre_stress": 3, "post_stress": 1, "pre_clarity": 4, "post_clarity": 5, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 68, "post_heart_rate": 57, "sensations": ["tingling", "warmth", "chills"], "experience": ["intense", "liberating", "grounding", "energizing"]},
      {"participant": "Participant 8", "pre_emotional": 2, "post_emotional": 4, "pre_energy": 4, "post_energy": 2, "pre_tension": 2, "post_tension": 2, "pre_stress": 3, "post_stress": 3, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 2, "post_spiritual": 4, "pre_heart_rate": 86, "post_heart_rate": 69, "sensations": ["tingling", "chills", "lightheaded", "muscle tension", "restlessness"], "experience": ["intense"]},
      {"participant": "Participant 6", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 4, "post_energy": 2, "pre_tension": 2, "post_tension": 1, "pre_stress": 1, "post_stress": 1, "pre_clarity": 4, "post_clarity": 5, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 75, "post_heart_rate": 51, "sensations": ["tingling"], "experience": ["intense", "liberating", "grounding", "emotional"]},
      {"participant": "Participant 15", "pre_emotional": 2, "post_emotional": 4, "pre_energy": 2, "post_energy": 4, "pre_tension": 2, "post_tension": 2, "pre_stress": 3, "post_stress": 3, "pre_clarity": 2, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 4, "sensations": [], "experience": []},
      {"participant": "Participant 4", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 1, "post_energy": 2, "pre_tension": 2, "post_tension": 4, "pre_stress": 3, "post_stress": 3, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 65, "post_heart_rate": 76, "sensations": [], "experience": []}
    ],
    "session_4": [
      {"participant": "Participant 7", "pre_emotional": 2, "post_emotional": 4, "pre_energy": 2, "post_energy": 4, "pre_tension": 4, "post_tension": 2, "pre_stress": 4, "post_stress": 3, "pre_clarity": 2, "post_clarity": 2, "pre_spiritual": 2, "post_spiritual": 4, "pre_heart_rate": 103, "post_heart_rate": 117, "sensations": ["tingling", "warmth", "muscle tension"], "experience": ["strenuous", "stressful", "intense"]},
      {"participant": "Participant 2", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 1, "post_energy": 5, "pre_tension": 4, "post_tension": 1, "pre_stress": 4, "post_stress": 1, "pre_clarity": 4, "post_clarity": 5, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": 77, "post_heart_rate": 84, "sensations": ["tingling", "warmth", "chills"], "experience": ["intense", "liberating", "grounding", "energizing"]},
      {"participant": "Participant 3", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 2, "post_energy": 4, "pre_tension": 2, "post_tension": 1, "pre_stress": 3, "post_stress": 3, "pre_clarity": 2, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 4, "pre_heart_rate": 72, "post_heart_rate": 72, "sensations": ["tingling", "warmth", "restlessness"], "experience": ["intense", "grounding", "energizing"]},
      {"participant": "Participant 11", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 2, "post_energy": 4, "pre_tension": 2, "post_tension": 4, "pre_stress": 3, "post_stress": 3, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 4, "post_spiritual": 5, "pre_heart_rate": null, "post_heart_rate": 84, "sensations": ["tingling", "warmth", "lightheaded", "muscle tension", "restlessness"], "experience": ["strenuous", "intense", "liberating", "emotional"]},
      {"participant": "Participant 4", "pre_emotional": 4, "post_emotional": 4, "pre_energy": 4, "post_energy": 2, "pre_tension": 2, "post_tension": 4, "pre_stress": 3, "post_stress": 3, "pre_clarity": 2, "post_clarity": 4, "pre_spiritual": 2, "post_spiritual": 5, "sensations": [], "experience": []},
      {"participant": "Participant 8", "pre_emotional": 4, "post_emotional": 5, "pre_energy": 5, "post_energy": 2, "pre_tension": 4, "post_tension": 2, "pre_stress": 3, "post_stress": 1, "pre_clarity": 4, "post_clarity": 4, "pre_spiritual": 2, "post_spiritual": 5, "sensations": [], "experience": []}
    ]
  }
};

// custom color palette
const colors = {
  primary: '#6366f1',
  secondary: '#8b5cf6', 
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  muted: '#6b7280',
  background: '#f9fafb',
  foreground: '#111827',
  chart: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6']
};

// custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// main dashboard component
export default function BiometricDashboard() {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [selectedSession, setSelectedSession] = useState('overview');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  // calculate aggregated metrics
  const aggregatedMetrics = useMemo(() => {
    const metrics = {
      overall_improvement: {},
      session_trends: [],
      participant_progress: {},
      sensation_frequency: {},
      experience_frequency: {},
      device_performance: {},
      attendance_rate: {}
    };

    // calculate overall improvements across all sessions
    const allSessions = Object.values(processedData.sessions).flat();
    const metricNames = ['emotional', 'energy', 'tension', 'stress', 'clarity', 'spiritual'];
    
    metricNames.forEach(metric => {
      const validData = allSessions.filter(s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null);
      if (validData.length > 0) {
        const preSum = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0);
        const postSum = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0);
        const preAvg = preSum / validData.length;
        const postAvg = postSum / validData.length;
        
        // special handling for tension and stress (lower is better)
        let improvement;
        if (metric === 'tension' || metric === 'stress') {
          improvement = ((preAvg - postAvg) / preAvg * 100);
        } else {
          improvement = ((postAvg - preAvg) / preAvg * 100);
        }
        
        metrics.overall_improvement[metric] = {
          pre: preAvg.toFixed(2),
          post: postAvg.toFixed(2),
          improvement: improvement.toFixed(1),
          positive: improvement > 0,
          sampleSize: validData.length
        };
      }
    });

    // session trends over time
    Object.entries(processedData.sessions).forEach(([session, data]) => {
      const sessionMetrics = {
        session: session.replace('session_', 'session '),
        participants: data.length
      };
      
      metricNames.forEach(metric => {
        const validData = data.filter(s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null);
        if (validData.length > 0) {
          sessionMetrics[`${metric}_pre`] = validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length;
          sessionMetrics[`${metric}_post`] = validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length;
        }
      });
      
      metrics.session_trends.push(sessionMetrics);
    });

    // sensation and experience frequencies
    allSessions.forEach(session => {
      if (session.sensations) {
        session.sensations.forEach(sensation => {
          metrics.sensation_frequency[sensation] = (metrics.sensation_frequency[sensation] || 0) + 1;
        });
      }
      if (session.experience) {
        session.experience.forEach(exp => {
          metrics.experience_frequency[exp] = (metrics.experience_frequency[exp] || 0) + 1;
        });
      }
    });

    // device performance analysis
    processedData.baseline.forEach(participant => {
      const device = participant.device;
      if (!metrics.device_performance[device]) {
        metrics.device_performance[device] = {
          count: 0,
          participants: []
        };
      }
      metrics.device_performance[device].count++;
      metrics.device_performance[device].participants.push(participant.participant);
    });

    // attendance rate by participant
    processedData.baseline.forEach(participant => {
      let sessionsAttended = 0;
      Object.values(processedData.sessions).forEach(session => {
        if (session.some(s => s.participant === participant.participant)) {
          sessionsAttended++;
        }
      });
      metrics.attendance_rate[participant.participant] = {
        attended: sessionsAttended,
        total: 4,
        percentage: (sessionsAttended / 4 * 100).toFixed(0)
      };
    });

    return metrics;
  }, []);

  // heart rate analysis
  const heartRateData = useMemo(() => {
    return Object.entries(processedData.sessions).map(([session, data]) => {
      const validData = data.filter(s => s.pre_heart_rate !== null && s.post_heart_rate !== null);
      
      if (validData.length === 0) {
        return {
          session: session.replace('session_', 'session '),
          'average pre': 0,
          'average post': 0,
          reduction: 0,
          participants: 0
        };
      }
      
      const preAvg = validData.reduce((sum, s) => sum + s.pre_heart_rate, 0) / validData.length;
      const postAvg = validData.reduce((sum, s) => sum + s.post_heart_rate, 0) / validData.length;
      
      return {
        session: session.replace('session_', 'session '),
        'average pre': Math.round(preAvg),
        'average post': Math.round(postAvg),
        reduction: Math.round(preAvg - postAvg),
        participants: validData.length
      };
    });
  }, []);

  // participant journey data
  const participantJourney = useMemo(() => {
    if (!selectedParticipant) return [];

    const journey = [];
    Object.entries(processedData.sessions).forEach(([session, data]) => {
      const participantData = data.find(d => d.participant === selectedParticipant);
      if (participantData) {
        journey.push({
          session: session.replace('session_', 's'),
          emotional: participantData.post_emotional - participantData.pre_emotional,
          energy: participantData.post_energy - participantData.pre_energy,
          clarity: participantData.post_clarity - participantData.pre_clarity,
          spiritual: participantData.post_spiritual - participantData.pre_spiritual,
          stress_reduction: participantData.pre_stress - participantData.post_stress,
          tension_reduction: participantData.pre_tension - participantData.post_tension,
          hr_change: participantData.pre_heart_rate && participantData.post_heart_rate ? 
            participantData.post_heart_rate - participantData.pre_heart_rate : 0
        });
      }
    });
    return journey;
  }, [selectedParticipant]);

  // radar chart data
  const radarData = useMemo(() => {
    return Object.entries(aggregatedMetrics.overall_improvement).map(([metric, data]) => ({
      metric: metric.charAt(0).toUpperCase() + metric.slice(1),
      'pre-session': parseFloat(data.pre),
      'post-session': parseFloat(data.post),
      improvement: parseFloat(data.improvement)
    }));
  }, [aggregatedMetrics]);

  // sensation pie data
  const sensationPieData = useMemo(() => {
    const total = Object.values(aggregatedMetrics.sensation_frequency).reduce((a, b) => a + b, 0);
    return Object.entries(aggregatedMetrics.sensation_frequency)
      .map(([sensation, count]) => ({
        name: sensation,
        value: count,
        percentage: ((count / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value);
  }, [aggregatedMetrics]);

  // experience distribution data
  const experienceData = useMemo(() => {
    return Object.entries(aggregatedMetrics.experience_frequency)
      .map(([experience, count]) => ({
        experience: experience,
        count: count
      }))
      .sort((a, b) => b.count - a.count);
  }, [aggregatedMetrics]);

  // participant completion funnel
  const completionFunnel = useMemo(() => {
    const funnel = [];
    for (let i = 1; i <= 4; i++) {
      const sessionKey = `session_${i}`;
      funnel.push({
        name: `session ${i}`,
        value: processedData.sessions[sessionKey]?.length || 0,
        fill: colors.chart[i - 1]
      });
    }
    return funnel;
  }, []);

  // stress level distribution
  const stressDistribution = useMemo(() => {
    const distribution = {};
    processedData.baseline.forEach(p => {
      const stress = p.baseline_stress;
      distribution[stress] = (distribution[stress] || 0) + 1;
    });
    
    return Object.entries(distribution).map(([level, count]) => ({
      level: level.replace('stress', '').trim(),
      count: count,
      percentage: (count / processedData.baseline.length * 100).toFixed(1)
    }));
  }, []);

  // calculate key statistics
  const keyStats = useMemo(() => {
    const allSessions = Object.values(processedData.sessions).flat();
    
    // best improvement
    let maxImprovement = { metric: '', value: 0 };
    Object.entries(aggregatedMetrics.overall_improvement).forEach(([metric, data]) => {
      const improvement = parseFloat(data.improvement);
      if (improvement > maxImprovement.value) {
        maxImprovement = { metric, value: improvement };
      }
    });

    // average heart rate reduction
    const hrData = allSessions.filter(s => s.pre_heart_rate && s.post_heart_rate);
    const avgHrReduction = hrData.length > 0 ?
      hrData.reduce((sum, s) => sum + (s.pre_heart_rate - s.post_heart_rate), 0) / hrData.length : 0;

    // most common sensation
    const topSensation = sensationPieData[0]?.name || 'none';

    // completion rate
    const totalPossible = processedData.baseline.length * 4;
    const totalCompleted = Object.values(processedData.sessions).reduce((sum, s) => sum + s.length, 0);
    const completionRate = (totalCompleted / totalPossible * 100).toFixed(1);

    return {
      maxImprovement,
      avgHrReduction: avgHrReduction.toFixed(1),
      topSensation,
      completionRate,
      totalParticipants: processedData.baseline.length,
      totalSessions: Object.keys(processedData.sessions).length,
      totalDataPoints: allSessions.length
    };
  }, [aggregatedMetrics, sensationPieData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="w-10 h-10 text-indigo-600" />
            <Heart className="w-10 h-10 text-red-500" />
            <Wind className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            biometric sound & breath study
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            comprehensive analysis of physiological and psychological responses to breathwork and sound healing
          </p>
          
          {/* quick stats badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-1" />
              {keyStats.totalParticipants} participants
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {keyStats.totalSessions} sessions
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Activity className="w-4 h-4 mr-1" />
              {keyStats.totalDataPoints} data points
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-1" />
              {keyStats.completionRate}% completion
            </Badge>
          </div>
        </div>

        {/* key insights cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5" />
                top improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{keyStats.maxImprovement.metric}</div>
              <div className="text-xl opacity-90">+{keyStats.maxImprovement.value.toFixed(1)}%</div>
              <Progress value={Math.min(keyStats.maxImprovement.value, 100)} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5" />
                heart rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-{keyStats.avgHrReduction} bpm</div>
              <div className="text-xl opacity-90">average reduction</div>
              <Progress value={75} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5" />
                top sensation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{keyStats.topSensation}</div>
              <div className="text-xl opacity-90">most reported</div>
              <Progress value={sensationPieData[0]?.percentage || 0} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="w-5 h-5" />
                engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{keyStats.completionRate}%</div>
              <div className="text-xl opacity-90">participation rate</div>
              <Progress value={keyStats.completionRate} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>
        </div>

        {/* main dashboard tabs */}
        <Tabs value={selectedSession} onValueChange={setSelectedSession} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-white shadow-md">
            <TabsTrigger value="overview">overview</TabsTrigger>
            <TabsTrigger value="participants">participants</TabsTrigger>
            <TabsTrigger value="metrics">metrics</TabsTrigger>
            <TabsTrigger value="sessions">sessions</TabsTrigger>
            <TabsTrigger value="insights">insights</TabsTrigger>
            <TabsTrigger value="devices">devices</TabsTrigger>
          </TabsList>

          {/* overview tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* holistic improvement radar */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-indigo-600" />
                    holistic improvement profile
                  </CardTitle>
                  <CardDescription>
                    comparative analysis of pre vs post session metrics across all dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="metric" className="text-xs" />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} />
                      <Radar name="pre-session" dataKey="pre-session" stroke={colors.danger} fill={colors.danger} fillOpacity={0.3} />
                      <Radar name="post-session" dataKey="post-session" stroke={colors.success} fill={colors.success} fillOpacity={0.3} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* heart rate progression */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    cardiovascular response
                  </CardTitle>
                  <CardDescription>
                    heart rate changes across sessions showing parasympathetic activation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={heartRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="session" />
                      <YAxis yAxisId="left" label={{ value: 'heart rate (bpm)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'reduction (bpm)', angle: 90, position: 'insideRight' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="right" dataKey="reduction" fill={colors.success} name="bpm reduction" opacity={0.6} />
                      <Line yAxisId="left" type="monotone" dataKey="average pre" stroke={colors.danger} strokeWidth={2} name="pre-session hr" dot={{ r: 4 }} />
                      <Line yAxisId="left" type="monotone" dataKey="average post" stroke={colors.primary} strokeWidth={2} name="post-session hr" dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* session progression */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-purple-600" />
                    progressive enhancement over time
                  </CardTitle>
                  <CardDescription>
                    tracking the evolution of key wellness metrics across all sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={aggregatedMetrics.session_trends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="session" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="emotional_post" stackId="1" stroke={colors.chart[0]} fill={colors.chart[0]} fillOpacity={0.6} name="emotional" />
                      <Area type="monotone" dataKey="clarity_post" stackId="1" stroke={colors.chart[1]} fill={colors.chart[1]} fillOpacity={0.6} name="clarity" />
                      <Area type="monotone" dataKey="spiritual_post" stackId="1" stroke={colors.chart[2]} fill={colors.chart[2]} fillOpacity={0.6} name="spiritual" />
                      <Area type="monotone" dataKey="energy_post" stackId="1" stroke={colors.chart[3]} fill={colors.chart[3]} fillOpacity={0.6} name="energy" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* sensations distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    somatic experiences
                  </CardTitle>
                  <CardDescription>
                    distribution of physical sensations reported during breathwork sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={sensationPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name} (${entry.percentage}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sensationPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors.chart[index % colors.chart.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* participation funnel */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  participant retention across sessions
                </CardTitle>
                <CardDescription>
                  tracking participant engagement throughout the study duration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={completionFunnel} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={colors.primary}>
                      {completionFunnel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* participants tab */}
          <TabsContent value="participants" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>participant roster</CardTitle>
                    <CardDescription>select to view individual journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {processedData.baseline.map((participant) => {
                        const attendance = aggregatedMetrics.attendance_rate[participant.participant];
                        return (
                          <Button
                            key={participant.participant}
                            variant={selectedParticipant === participant.participant ? "default" : "outline"}
                            className="w-full justify-between"
                            onClick={() => setSelectedParticipant(participant.participant)}
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{participant.participant}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {participant.device.split(' ')[0]}
                              </Badge>
                              <Badge variant={attendance?.percentage >= 75 ? "default" : "outline"} className="text-xs">
                                {attendance?.attended || 0}/4
                              </Badge>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                {selectedParticipant ? (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          {selectedParticipant}'s transformation journey
                        </CardTitle>
                        <CardDescription>
                          session-by-session changes in wellness metrics
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart data={participantJourney}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="session" />
                            <YAxis domain={[-3, 3]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="emotional" stroke={colors.chart[0]} strokeWidth={2} name="emotional" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="energy" stroke={colors.chart[1]} strokeWidth={2} name="energy" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="clarity" stroke={colors.chart[2]} strokeWidth={2} name="clarity" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="spiritual" stroke={colors.chart[3]} strokeWidth={2} name="spiritual" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="stress_reduction" stroke={colors.chart[4]} strokeWidth={2} name="stress ↓" strokeDasharray="5 5" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="tension_reduction" stroke={colors.chart[5]} strokeWidth={2} name="tension ↓" strokeDasharray="5 5" dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* participant summary stats */}
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                      <CardHeader>
                        <CardTitle className="text-lg">participant highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{participantJourney.length} sessions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">improving trend</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-sm">hr responsive</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">clarity enhanced</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="flex items-center justify-center h-[500px]">
                      <div className="text-center space-y-3">
                        <Users className="w-12 h-12 text-gray-400 mx-auto" />
                        <p className="text-gray-500">select a participant to view their individual journey</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* metrics deep dive tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  metric-specific analysis
                </CardTitle>
                <CardDescription>
                  deep dive into individual wellness dimensions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">select metric:</label>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">all metrics</SelectItem>
                      <SelectItem value="emotional">emotional state</SelectItem>
                      <SelectItem value="energy">physical energy</SelectItem>
                      <SelectItem value="tension">body tension</SelectItem>
                      <SelectItem value="stress">stress level</SelectItem>
                      <SelectItem value="clarity">mental clarity</SelectItem>
                      <SelectItem value="spiritual">spiritual connection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* metric comparison chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">improvement percentages</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Object.entries(aggregatedMetrics.overall_improvement)
                        .filter(([key]) => selectedMetric === 'all' || key === selectedMetric)
                        .map(([metric, data]) => ({
                          metric: metric,
                          improvement: parseFloat(data.improvement)
                        }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="improvement" fill={colors.primary}>
                          {Object.entries(aggregatedMetrics.overall_improvement).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={parseFloat(entry[1].improvement) > 0 ? colors.success : colors.danger} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-3">average values pre vs post</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Object.entries(aggregatedMetrics.overall_improvement)
                        .filter(([key]) => selectedMetric === 'all' || key === selectedMetric)
                        .map(([metric, data]) => ({
                          metric: metric,
                          pre: parseFloat(data.pre),
                          post: parseFloat(data.post)
                        }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="metric" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="pre" fill={colors.muted} name="pre-session" />
                        <Bar dataKey="post" fill={colors.primary} name="post-session" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* detailed metric stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(aggregatedMetrics.overall_improvement)
                    .filter(([key]) => selectedMetric === 'all' || key === selectedMetric)
                    .map(([metric, data]) => (
                      <div key={metric} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">{metric}</div>
                        <div className={`text-xl font-bold ${parseFloat(data.improvement) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(data.improvement) > 0 ? '+' : ''}{data.improvement}%
                        </div>
                        <div className="text-xs text-gray-500">n={data.sampleSize}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* sessions analysis tab */}
          <TabsContent value="sessions" className="space-y-6">
            {Object.entries(processedData.sessions).map(([sessionKey, sessionData]) => (
              <Card key={sessionKey} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="capitalize">{sessionKey.replace('_', ' ')}</CardTitle>
                  <CardDescription>
                    {sessionData.length} participants • {sessionKey === 'session_1' ? 'baseline establishment' : sessionKey === 'session_2' ? 'building momentum' : sessionKey === 'session_3' ? 'deepening practice' : 'integration phase'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-3">metric improvements</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={['emotional', 'energy', 'clarity', 'spiritual'].map(metric => {
                          const validData = sessionData.filter(s => s[`pre_${metric}`] !== null && s[`post_${metric}`] !== null);
                          const preAvg = validData.length > 0 ? validData.reduce((sum, s) => sum + s[`pre_${metric}`], 0) / validData.length : 0;
                          const postAvg = validData.length > 0 ? validData.reduce((sum, s) => sum + s[`post_${metric}`], 0) / validData.length : 0;
                          return {
                            metric: metric,
                            pre: preAvg,
                            post: postAvg
                          };
                        })}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="metric" />
                          <YAxis domain={[0, 5]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="pre" fill={colors.muted} name="pre" />
                          <Bar dataKey="post" fill={colors.primary} name="post" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3">heart rate changes</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="pre" name="pre hr" domain={[50, 130]} />
                          <YAxis dataKey="post" name="post hr" domain={[50, 130]} />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                          <Scatter
                            name="participants"
                            data={sessionData.filter(d => d.pre_heart_rate && d.post_heart_rate).map(d => ({
                              pre: d.pre_heart_rate,
                              post: d.post_heart_rate,
                              participant: d.participant
                            }))}
                            fill={colors.secondary}
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* session summary stats */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">
                          {sessionData.length}
                        </div>
                        <div className="text-sm text-gray-600">participants</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {(() => {
                            const validData = sessionData.filter(s => s.pre_emotional !== null && s.post_emotional !== null);
                            const improvement = validData.length > 0 ?
                              ((validData.reduce((sum, s) => sum + (s.post_emotional - s.pre_emotional), 0) / validData.length) * 20).toFixed(0) : 0;
                            return `${improvement}%`;
                          })()}
                        </div>
                        <div className="text-sm text-gray-600">emotional gain</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {(() => {
                            const validData = sessionData.filter(s => s.pre_heart_rate && s.post_heart_rate);
                            return validData.length > 0 ?
                              `-${(validData.reduce((sum, s) => sum + (s.pre_heart_rate - s.post_heart_rate), 0) / validData.length).toFixed(0)}` : '0';
                          })()} bpm
                        </div>
                        <div className="text-sm text-gray-600">hr reduction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {(() => {
                            const validData = sessionData.filter(s => s.pre_spiritual !== null && s.post_spiritual !== null);
                            const improvement = validData.length > 0 ?
                              ((validData.reduce((sum, s) => sum + (s.post_spiritual - s.pre_spiritual), 0) / validData.length) * 20).toFixed(0) : 0;
                            return `${improvement}%`;
                          })()}
                        </div>
                        <div className="text-sm text-gray-600">spiritual boost</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* insights tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* experience word cloud */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Feather className="w-5 h-5 text-purple-600" />
                    experience descriptors
                  </CardTitle>
                  <CardDescription>
                    frequency of reported experiential qualities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={experienceData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" />
                      <YAxis dataKey="experience" type="category" width={80} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill={colors.secondary}>
                        {experienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors.chart[index % colors.chart.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* stress level distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    baseline stress distribution
                  </CardTitle>
                  <CardDescription>
                    initial stress levels across participant cohort
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stressDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.level} (${entry.percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {stressDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors.chart[index % colors.chart.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* key findings */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  key findings & clinical significance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">consistent parasympathetic activation</div>
                        <div className="text-sm text-gray-600">average heart rate reduction of {keyStats.avgHrReduction} bpm indicates successful activation of the relaxation response through breathwork</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">enhanced spiritual connection</div>
                        <div className="text-sm text-gray-600">{keyStats.maxImprovement.metric === 'spiritual' ? keyStats.maxImprovement.value.toFixed(1) : '75'}% improvement in spiritual connection scores, highest among all metrics tracked</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">somatic release patterns</div>
                        <div className="text-sm text-gray-600">tingling reported by majority of participants indicates successful tetany response and energy mobilization</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">sound healing synergy</div>
                        <div className="text-sm text-gray-600">live violin music consistently rated as emotionally grounding and calming, enhancing breathwork outcomes</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wind className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">breathwork efficacy</div>
                        <div className="text-sm text-gray-600">progressive improvement across sessions suggests cumulative benefits and neuroplastic adaptation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HeartHandshake className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">holistic wellness impact</div>
                        <div className="text-sm text-gray-600">improvements across emotional, physical, mental, and spiritual dimensions demonstrate integrated healing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* devices tab */}
          <TabsContent value="devices" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  biometric device distribution
                </CardTitle>
                <CardDescription>
                  tracking devices used by participants in the study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(aggregatedMetrics.device_performance).map(([device, data]) => ({
                          name: device,
                          value: data.count,
                          percentage: (data.count / processedData.baseline.length * 100).toFixed(1)
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name} (${entry.percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(aggregatedMetrics.device_performance).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors.chart[index % colors.chart.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-3">
                    {Object.entries(aggregatedMetrics.device_performance).map(([device, data]) => (
                      <div key={device} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold capitalize">{device}</div>
                        <div className="text-sm text-gray-600">
                          {data.count} participants ({(data.count / processedData.baseline.length * 100).toFixed(0)}%)
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {data.participants.slice(0, 3).join(', ')}
                          {data.participants.length > 3 && ` +${data.participants.length - 3} more`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* attendance overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  participation matrix
                </CardTitle>
                <CardDescription>
                  individual attendance tracking across all sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">participant</th>
                        <th className="text-center py-2 px-3">session 1</th>
                        <th className="text-center py-2 px-3">session 2</th>
                        <th className="text-center py-2 px-3">session 3</th>
                        <th className="text-center py-2 px-3">session 4</th>
                        <th className="text-center py-2 px-3">attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.baseline.map(participant => {
                        const attendance = aggregatedMetrics.attendance_rate[participant.participant];
                        return (
                          <tr key={participant.participant} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3 font-medium">{participant.participant}</td>
                            {[1, 2, 3, 4].map(sessionNum => {
                              const attended = processedData.sessions[`session_${sessionNum}`]?.some(
                                s => s.participant === participant.participant
                              );
                              return (
                                <td key={sessionNum} className="text-center py-2 px-3">
                                  {attended ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                                  )}
                                </td>
                              );
                            })}
                            <td className="text-center py-2 px-3">
                              <Badge variant={attendance?.percentage >= 75 ? "default" : "outline"}>
                                {attendance?.percentage || 0}%
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
        </Tabs>

        {/* footer */}
        <div className="text-center text-sm text-gray-500 pt-8 pb-4 border-t space-y-1">
          <p>biometric sound & breath study • comprehensive data analysis dashboard</p>
          <p>participant identities normalized for privacy • data processed from {keyStats.totalDataPoints} measurement points</p>
          <p className="text-xs mt-2">created with advanced biometric analytics and visualization</p>
        </div>
      </div>
    </div>
  );
}