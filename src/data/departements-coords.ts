/**
 * Coordonnées GPS (latitude, longitude) du centroïde de chaque département français
 * Source: Données géographiques IGN
 */
export const departementsCoords: Record<string, [number, number]> = {
  // Auvergne-Rhône-Alpes
  "01": [46.2044, 5.2258], // Ain
  "03": [46.5667, 3.3333], // Allier
  "07": [44.7363, 4.5997], // Ardèche
  "15": [45.0367, 2.5217], // Cantal
  "26": [44.9339, 5.0511], // Drôme
  "38": [45.1886, 5.7245], // Isère
  "42": [45.4397, 4.3872], // Loire
  "43": [45.0431, 3.8850], // Haute-Loire
  "63": [45.7772, 3.0870], // Puy-de-Dôme
  "69": [45.7640, 4.8357], // Rhône
  "73": [45.5647, 6.3289], // Savoie
  "74": [46.0636, 6.3608], // Haute-Savoie

  // Bourgogne-Franche-Comté
  "21": [47.3222, 5.0411], // Côte-d'Or
  "25": [47.2378, 6.0244], // Doubs
  "39": [46.6739, 5.5544], // Jura
  "58": [47.0000, 3.5333], // Nièvre
  "70": [47.6292, 6.1561], // Haute-Saône
  "71": [46.6561, 4.5569], // Saône-et-Loire
  "89": [47.7983, 3.5672], // Yonne
  "90": [47.6389, 6.8628], // Territoire de Belfort

  // Bretagne
  "22": [48.5136, -2.7606], // Côtes-d'Armor
  "29": [48.2020, -4.0970], // Finistère
  "35": [48.1173, -1.6778], // Ille-et-Vilaine
  "56": [47.7483, -2.7603], // Morbihan

  // Centre-Val de Loire
  "18": [47.0833, 2.3978], // Cher
  "28": [48.4469, 1.4886], // Eure-et-Loir
  "36": [46.8108, 1.6919], // Indre
  "37": [47.3939, 0.6892], // Indre-et-Loire
  "41": [47.5858, 1.3358], // Loir-et-Cher
  "45": [47.9022, 2.3983], // Loiret

  // Corse
  "2A": [41.9267, 8.7369], // Corse-du-Sud
  "2B": [42.4983, 9.1503], // Haute-Corse

  // Grand Est
  "08": [49.7667, 4.7167], // Ardennes
  "10": [48.2972, 4.0803], // Aube
  "51": [49.0431, 4.3681], // Marne
  "52": [48.1128, 5.1383], // Haute-Marne
  "54": [48.6844, 6.1844], // Meurthe-et-Moselle
  "55": [49.1619, 5.3825], // Meuse
  "57": [49.1197, 6.1764], // Moselle
  "67": [48.5734, 7.7521], // Bas-Rhin
  "68": [47.7469, 7.3389], // Haut-Rhin
  "88": [48.1722, 6.4511], // Vosges

  // Hauts-de-France
  "02": [49.5639, 3.6197], // Aisne
  "59": [50.6292, 3.0573], // Nord
  "60": [49.4175, 2.8256], // Oise
  "62": [50.5111, 2.6328], // Pas-de-Calais
  "80": [49.8942, 2.2958], // Somme

  // Île-de-France
  "75": [48.8566, 2.3522], // Paris
  "77": [48.8433, 2.6511], // Seine-et-Marne
  "78": [48.8036, 2.1303], // Yvelines
  "91": [48.6314, 2.4289], // Essonne
  "92": [48.8922, 2.2197], // Hauts-de-Seine
  "93": [48.9086, 2.4514], // Seine-Saint-Denis
  "94": [48.7931, 2.5208], // Val-de-Marne
  "95": [49.0500, 2.0833], // Val-d'Oise

  // Normandie
  "14": [49.1829, -0.3707], // Calvados
  "27": [49.0961, 0.8706], // Eure
  "50": [49.1167, -1.0833], // Manche
  "61": [48.4333, 0.0833], // Orne
  "76": [49.4431, 1.0993], // Seine-Maritime

  // Nouvelle-Aquitaine
  "16": [45.6500, 0.1500], // Charente
  "17": [45.7472, -0.6389], // Charente-Maritime
  "19": [45.2678, 1.7672], // Corrèze
  "23": [46.1708, 1.8714], // Creuse
  "24": [45.1847, 0.7208], // Dordogne
  "33": [44.8378, -0.5792], // Gironde
  "40": [43.8944, -0.4958], // Landes
  "47": [44.2028, 0.6200], // Lot-et-Garonne
  "64": [43.2951, -0.3708], // Pyrénées-Atlantiques
  "79": [46.3239, -0.4642], // Deux-Sèvres
  "86": [46.5802, 0.3404], // Vienne
  "87": [45.8315, 1.2578], // Haute-Vienne

  // Occitanie
  "09": [42.9653, 1.6083], // Ariège
  "11": [43.2128, 2.3531], // Aude
  "12": [44.3503, 2.5750], // Aveyron
  "30": [43.8378, 4.3603], // Gard
  "31": [43.6047, 1.4442], // Haute-Garonne
  "32": [43.6456, 0.5883], // Gers
  "34": [43.6108, 3.8767], // Hérault
  "46": [44.4472, 1.4406], // Lot
  "48": [44.5181, 3.5003], // Lozère
  "65": [43.2328, 0.0783], // Hautes-Pyrénées
  "66": [42.6986, 2.8956], // Pyrénées-Orientales
  "81": [43.9289, 2.1481], // Tarn
  "82": [44.0181, 1.3556], // Tarn-et-Garonne

  // Pays de la Loire
  "44": [47.2184, -1.5536], // Loire-Atlantique
  "49": [47.4736, -0.5519], // Maine-et-Loire
  "53": [48.0697, -0.7703], // Mayenne
  "72": [48.0061, 0.1997], // Sarthe
  "85": [46.6706, -1.4269], // Vendée

  // Provence-Alpes-Côte d'Azur
  "04": [44.0927, 6.2389], // Alpes-de-Haute-Provence
  "05": [44.6611, 6.0797], // Hautes-Alpes
  "06": [43.9450, 7.1239], // Alpes-Maritimes
  "13": [43.5297, 5.4474], // Bouches-du-Rhône
  "83": [43.4642, 6.2378], // Var
  "84": [43.9492, 5.0514], // Vaucluse
};

/**
 * Obtient les coordonnées GPS d'un département
 * @param departement Code département (ex: "75", "2A")
 * @returns [latitude, longitude] ou null si non trouvé
 */
export const getCoordsDepartement = (departement: string): [number, number] | null => {
  return departementsCoords[departement.toUpperCase()] || null;
};

/**
 * Ajoute un léger offset aléatoire aux coordonnées pour éviter les marqueurs superposés
 * @param coords Coordonnées [lat, lng]
 * @param maxOffset Offset maximum en degrés (défaut: 0.1)
 * @returns Coordonnées avec offset [lat, lng]
 */
export const addRandomOffset = (
  coords: [number, number],
  maxOffset: number = 0.1
): [number, number] => {
  const [lat, lng] = coords;
  const randomOffset = () => (Math.random() - 0.5) * maxOffset;
  return [lat + randomOffset(), lng + randomOffset()];
};
