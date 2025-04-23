    // backend/logic/assessLogic.js
export default function assessMangrove({ crownCover, regeneration, height, disturbance }) {
    let score = 0;
  
    // Crown Cover Scoring
    if (crownCover >= 76) score += 3;
    else if (crownCover >= 51) score += 2;
    else if (crownCover >= 26) score += 1;
  
    // Regeneration Scoring
    if (regeneration >= 10) score += 3;
    else if (regeneration >= 7) score += 2;
    else if (regeneration >= 5) score += 1;
  
    // Height Scoring
    if (height > 5) score += 3;
    else if (height >= 3) score += 2;
    else if (height >= 2) score += 1;
  
    // Disturbance Scoring
    if (disturbance === 'none') score += 3;
    else if (disturbance === 'slight') score += 2;
    else if (disturbance === 'moderate') score += 1;
  
    const percentage = (score / 12) * 100;
    let condition = '';
    let comment = '';
  
    if (percentage >= 85) {
      condition = 'Excellent';
      comment = 'The mangrove ecosystem is in excellent condition with ideal growth and minimal disturbance.';
    } else if (percentage >= 65) {
      condition = 'Good';
      comment = 'The mangrove ecosystem is in good health with moderate vegetation and low disturbance.';
    } else if (percentage >= 40) {
      condition = 'Fair';
      comment = 'The mangrove ecosystem is in fair condition. Regeneration and cover are limited.';
    } else {
      condition = 'Poor';
      comment = 'The mangrove ecosystem is in poor condition. Restoration may be necessary.';
    }
  
    return {
      condition,
      percentage: percentage.toFixed(2),
      comment
    };
  }
  
