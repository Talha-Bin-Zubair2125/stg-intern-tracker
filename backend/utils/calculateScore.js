const calculateScore = (analysis) => {
  const positive = analysis.positive;
  const neutral = analysis.neutral;
  const negative = analysis.negative;

  const total = positive + neutral + negative;

  if (total === 0) {
    return 0;
  }

  const score = (positive * 100 + neutral * 50 + negative * 0) / total;

  return Number(score.toFixed(2));
};

module.exports = calculateScore;
