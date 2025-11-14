/**
 * AI-powered price prediction for business listings
 * Based on revenue, location, certifications, and market conditions
 */

interface CompanyData {
  revenue: number;          // CA N-1
  ebitda?: number;         // EBITDA or resultat_net
  hasRGE: boolean;         // RGE certification
  location: string;        // Department or city
  sector: string;          // Sector of activity
  urgent?: boolean;        // Urgency to sell
  employees?: number;      // Number of employees
  assetsValue?: number;    // Valeur des actifs (materiel + locaux + stock)
}

interface PricePrediction {
  min: number;
  max: number;
  estimate: number;
  confidence: number;
  breakdown: {
    basePrice: number;
    rgeBonus?: number;
    locationBonus?: number;
    profitabilityBonus?: number;
    urgencyDiscount?: number;
  };
  recommendations: string[];
}

/**
 * Predict the optimal selling price for a business
 */
export const predictPrice = (company: CompanyData): PricePrediction => {
  let basePrice = company.revenue * 0.8; // Standard multiplier: 80% of annual revenue
  
  const breakdown: PricePrediction['breakdown'] = {
    basePrice
  };
  
  const recommendations: string[] = [];

  // 1. RGE Certification bonus (+30%)
  if (company.hasRGE) {
    const bonus = basePrice * 0.3;
    breakdown.rgeBonus = bonus;
    basePrice += bonus;
    recommendations.push("Certification RGE : prime de 30% appliquée");
  }

  // 2. Profitability bonus (if EBITDA > 15% of revenue)
  if (company.ebitda && company.ebitda > company.revenue * 0.15) {
    const bonus = basePrice * 0.2;
    breakdown.profitabilityBonus = bonus;
    basePrice += bonus;
    recommendations.push("Forte rentabilité : prime de 20% appliquée");
  }

  // 3. Location premium
  const premiumLocations = ['75', 'Paris', '78', 'Yvelines', '92', 'Hauts-de-Seine', '06', 'Alpes-Maritimes'];
  const isPremiumLocation = premiumLocations.some(loc => 
    company.location.includes(loc)
  );
  
  if (isPremiumLocation) {
    const bonus = basePrice * 0.15;
    breakdown.locationBonus = bonus;
    basePrice += bonus;
    recommendations.push("Localisation premium : prime de 15% appliquée");
  }

  // 4. Urgency discount (-15%)
  if (company.urgent) {
    const discount = basePrice * 0.15;
    breakdown.urgencyDiscount = discount;
    basePrice -= discount;
    recommendations.push("Vente urgente : réduction de 15% conseillée");
  }

  // 5. Assets value consideration
  if (company.assetsValue && company.assetsValue > basePrice * 0.3) {
    const bonus = company.assetsValue * 0.5; // 50% of assets value
    basePrice += bonus;
    recommendations.push(`Actifs valorisables : +${Math.round(bonus).toLocaleString()}€`);
  }

  // Calculate min/max range (±15%)
  const estimate = Math.round(basePrice);
  const min = Math.round(estimate * 0.85);
  const max = Math.round(estimate * 1.15);

  // Confidence score (70-85%)
  let confidence = 75;
  if (company.hasRGE) confidence += 5;
  if (company.ebitda) confidence += 5;
  if (isPremiumLocation) confidence += 3;
  
  // Add general recommendation
  if (recommendations.length === 0) {
    recommendations.push("Prix basé sur le CA annuel avec multiplicateur standard");
  }

  return {
    min,
    max,
    estimate,
    confidence: Math.min(confidence, 85),
    breakdown,
    recommendations
  };
};

/**
 * Get human-readable price prediction explanation
 */
export const getPricePredictionExplanation = (prediction: PricePrediction): string => {
  const { min, max, estimate, confidence } = prediction;
  
  return `Notre IA estime votre entreprise entre ${min.toLocaleString()}€ et ${max.toLocaleString()}€, 
avec une estimation centrale de ${estimate.toLocaleString()}€ (confiance: ${confidence}%).\n\n` +
    prediction.recommendations.join('\n');
};

/**
 * Calculate if a price is within acceptable range
 */
export const isPriceRealistic = (price: number, prediction: PricePrediction): {
  realistic: boolean;
  reason: string;
} => {
  if (price < prediction.min * 0.7) {
    return {
      realistic: false,
      reason: "Prix trop bas : vous risquez de sous-évaluer votre entreprise"
    };
  }
  
  if (price > prediction.max * 1.3) {
    return {
      realistic: false,
      reason: "Prix trop élevé : vous risquez de décourager les acheteurs"
    };
  }
  
  return {
    realistic: true,
    reason: "Prix dans la fourchette recommandée"
  };
};
