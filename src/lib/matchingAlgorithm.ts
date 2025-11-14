interface Listing {
  id: string;
  departement: string;
  prix_vente: number;
  secteur_activite: string;
  nombre_salaries: number;
  user_id: string;
}

interface BuyerCriteria {
  targetDepartments: string[];
  minBudget: number;
  maxBudget: number;
  targetSectors: string[];
  targetSize?: number;
}

interface MatchScore {
  score: number;
  locationMatch: boolean;
  budgetMatch: boolean;
  sectorMatch: boolean;
  sizeMatch: boolean;
}

/**
 * Calculate match score between a listing and buyer criteria
 */
export const calculateMatchScore = (
  listing: Listing,
  criteria: BuyerCriteria
): MatchScore => {
  let score = 0;
  const weights = {
    location: 30,
    budget: 25,
    sector: 20,
    size: 15,
    timing: 10,
  };

  // Location match
  const locationMatch =
    criteria.targetDepartments.length === 0 ||
    criteria.targetDepartments.includes(listing.departement);
  if (locationMatch) {
    score += weights.location;
  }

  // Budget match (with 20% flexibility)
  const budgetMatch =
    listing.prix_vente >= criteria.minBudget * 0.8 &&
    listing.prix_vente <= criteria.maxBudget * 1.2;
  if (budgetMatch) {
    score += weights.budget;
  }

  // Sector match
  const sectorMatch =
    criteria.targetSectors.length === 0 ||
    criteria.targetSectors.includes(listing.secteur_activite);
  if (sectorMatch) {
    score += weights.sector;
  }

  // Size match (within 5 employees)
  const sizeMatch =
    !criteria.targetSize ||
    Math.abs(listing.nombre_salaries - criteria.targetSize) <= 5;
  if (sizeMatch) {
    score += weights.size;
  }

  return {
    score: Math.round(score),
    locationMatch,
    budgetMatch,
    sectorMatch,
    sizeMatch,
  };
};

/**
 * Find best matches for a buyer based on criteria
 */
export const findBestMatches = (
  listings: Listing[],
  criteria: BuyerCriteria,
  limit = 5
): Array<{ listing: Listing; matchScore: MatchScore }> => {
  const matches = listings
    .map((listing) => ({
      listing,
      matchScore: calculateMatchScore(listing, criteria),
    }))
    .filter((match) => match.matchScore.score >= 50) // Only keep matches with 50%+ score
    .sort((a, b) => b.matchScore.score - a.matchScore.score)
    .slice(0, limit);

  return matches;
};