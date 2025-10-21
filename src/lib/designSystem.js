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
  emotional: 'Self-reported emotional state (1-5 scale, higher is better)',
  energy: 'Self-reported physical energy level (1-5 scale, higher is better)',
  tension: 'Self-reported body tension (1-5 scale, lower is better)',
  stress: 'Self-reported stress level (1-5 scale, lower is better)',
  clarity: 'Self-reported mental clarity (1-5 scale, higher is better)',
  spiritual: 'Self-reported spiritual connection (1-5 scale, higher is better)'
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
