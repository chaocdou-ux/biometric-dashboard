export const colors = {
  mistyWhite: '#F6F7F4',
  cloudGrey: '#E4E5DF',
  deepCharcoal: '#333430',
  pineGreen: '#50604F',
  forestMoss: '#7D8D74',
  earthTaupe: '#B8A389',
  warmGold: '#F3C77B',
  sunriseBeige: '#F7E8CB',
  skyBlue: '#A8C8DA',
  richTerracotta: '#C96F4E',

  accentOrange: '#F18D44',
  accentRed: '#F53B57',
  accentTeal: '#2BC6EA',
  accentViolet: '#6F49EE',
  accentYellow: '#FFD952',
  darkYellow: '#D4A017',

  metrics: {
    emotional: '#A8C8DA',
    energy: '#F3C77B',
    tension: '#7D8D74',
    stress: '#C96F4E',
    clarity: '#50604F',
    spiritual: '#B8A389'
  }
};

export const metricLabels = {
  emotional: 'Emotional State',
  energy: 'Physical Energy',
  tension: 'Body Tension',
  stress: 'Stress Level',
  clarity: 'Mental Clarity',
  spiritual: 'Spiritual Connection'
};

export const metricDescriptions = {
  emotional: 'Self-reported emotional state (1-4 scale, higher is better)',
  energy: 'Self-reported physical energy level (1-4 scale, higher is better)',
  tension: 'Self-reported body tension (1-4 scale, lower is better)',
  stress: 'Self-reported stress level (1-4 scale, lower is better)',
  clarity: 'Self-reported mental clarity (1-4 scale, higher is better)',
  spiritual: 'Self-reported spiritual connection (1-4 scale, higher is better)'
};

export const calculateImprovement = (preValue, postValue, metric) => {
  if (metric === 'tension' || metric === 'stress') {
    return ((preValue - postValue) / preValue * 100);
  }
  return ((postValue - preValue) / preValue * 100);
};

export const getMetricColor = (metric) => {
  return colors.metrics[metric] || colors.skyBlue;
};

export const getMetricDirection = (metric) => {
  return (metric === 'tension' || metric === 'stress') ? 'lower' : 'higher';
};

export const getMetricIcon = (metric) => {
  const icons = {
    emotional: '😊',
    energy: '⚡',
    tension: '🎯',
    stress: '🧘',
    clarity: '💭',
    spiritual: '✨'
  };
  return icons[metric] || '📊';
};

export const dataSourceInfo = {
  title: 'Data Collection',
  description: 'Self-reported assessments collected before and after each breathwork and sound therapy session.',
  frequency: 'Measured at the start and end of all 4 sessions',
  scale: '1-4 scale (1 = lowest, 4 = highest)',
  participants: 'Participants with 2+ session attendance included for longitudinal analysis',
  devices: 'Consumer wearables: Apple Watch, Oura Ring, Muse, Ring Conn',
  disclaimer: 'Device accuracy varies; all biometric results are indicative and should not be considered clinical-grade.'
};

export const significanceThreshold = {
  minimal: 5,
  moderate: 15,
  significant: 25,
  description: 'Improvement percentages: <5% minimal, 5-15% moderate, 15-25% significant, >25% highly significant'
};
