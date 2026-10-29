export const fertilizerData = {
  Rice: {
    Clay: { fertilizer: 'Urea (46-0-0)', tip: 'Apply Urea in split doses. Keep field flooded during tillering stage for best yield.' },
    Sandy: { fertilizer: 'DAP + Potash', tip: 'Sandy soils drain fast; apply fertilizer in small doses. Mulch to retain moisture.' },
    Loamy: { fertilizer: 'NPK (20-20-0)', tip: 'Loamy soil is ideal for rice. Maintain 2-3 cm standing water during vegetative stage.' },
    'Black (Clay-rich)': { fertilizer: 'Urea + Zinc Sulphate', tip: 'Black soil retains moisture well. Add zinc to prevent deficiency common in paddy.' },
    Red: { fertilizer: 'NPK + FYM (Farm Yard Manure)', tip: 'Red soils are low in nutrients. Enrich with organic manure before transplanting.' },
  },
  Wheat: {
    Clay: { fertilizer: 'DAP (Di-Ammonium Phosphate)', tip: 'Apply DAP at sowing and top-dress with urea at first irrigation.' },
    Sandy: { fertilizer: 'NPK + Organic Compost', tip: 'Sandy soil needs organic matter. Add compost and irrigate frequently.' },
    Loamy: { fertilizer: 'NPK (12-32-16)', tip: 'Loamy soil is best for wheat. Ensure proper drainage and timely irrigation.' },
    'Black (Clay-rich)': { fertilizer: 'NPK Fertilizer', tip: 'Black soil has good moisture retention. Avoid waterlogging for healthy roots.' },
    Red: { fertilizer: 'DAP + Urea + Micronutrients', tip: 'Red soils may lack boron and sulphur. Use compound fertilizers.' },
  },
  Maize: {
    Clay: { fertilizer: 'Urea + SSP', tip: 'Apply SSP (Single Super Phosphate) at sowing for root development.' },
    Sandy: { fertilizer: 'NPK + Compost', tip: 'Frequent light irrigation is key. Apply fertilizer in 3 splits.' },
    Loamy: { fertilizer: 'NPK (28-28-0)', tip: 'Top dress with nitrogen at knee-height stage. Ensure good sunlight exposure.' },
    'Black (Clay-rich)': { fertilizer: 'Urea + MOP (Muriate of Potash)', tip: 'Apply MOP to improve drought resistance and grain quality.' },
    Red: { fertilizer: 'NPK + Lime', tip: 'Add lime to neutralize acidity in red soils before planting maize.' },
  },
  Tomato: {
    Clay: { fertilizer: 'DAP + Micronutrients', tip: 'Improve drainage in clay. Stake plants properly and prune suckers.' },
    Sandy: { fertilizer: 'NPK + Organic Matter', tip: 'Use drip irrigation to conserve water and apply fertigation.' },
    Loamy: { fertilizer: 'NPK (19-19-19)', tip: 'Best soil for tomatoes. Mulch to retain moisture and prevent soil splash diseases.' },
    'Black (Clay-rich)': { fertilizer: 'SSP + Urea', tip: 'Avoid overwatering. Black soil holds moisture; irrigate only when needed.' },
    Red: { fertilizer: 'FYM + NPK + Calcium Nitrate', tip: 'Add calcium to prevent blossom-end rot. Use organic matter to enrich soil.' },
  },
  Cotton: {
    Clay: { fertilizer: 'Urea + DAP', tip: 'Deep ploughing helps in clay soil. Ensure good drainage to prevent root rot.' },
    Sandy: { fertilizer: 'NPK + FYM', tip: 'Sandy soil dries fast; mulching is essential for cotton cultivation.' },
    Loamy: { fertilizer: 'NPK (15-15-15)', tip: 'Loamy soil suits cotton well. Apply boron spray at flowering stage.' },
    'Black (Clay-rich)': { fertilizer: 'NPK + Sulphur', tip: 'Black soil (regur) is ideal for cotton. Add sulphur for better fibre quality.' },
    Red: { fertilizer: 'DAP + Potash + FYM', tip: 'Red soils need heavy organic amendment. Inter-crop with legumes for nitrogen fixation.' },
  },
  Sugarcane: {
    Clay: { fertilizer: 'Urea + SSP + MOP', tip: 'Apply fertilizer in furrows. Earthing-up improves root anchorage.' },
    Sandy: { fertilizer: 'NPK split doses + Compost', tip: 'Sandy soil requires frequent irrigation and split nutrient application.' },
    Loamy: { fertilizer: 'NPK (12-32-16) + Urea', tip: 'Ideal for sugarcane. Ensure proper trash mulching between rows.' },
    'Black (Clay-rich)': { fertilizer: 'Urea + MOP + Zinc', tip: 'Black soil is very good for sugarcane. Avoid waterlogging during early growth.' },
    Red: { fertilizer: 'DAP + Urea + Lime + FYM', tip: 'Correct soil acidity with lime. Add heavy organic manure before planting.' },
  },
  Onion: {
    Clay: { fertilizer: 'SSP + Urea + MOP', tip: 'Raise beds to improve drainage in clay. Excess moisture causes bulb rot.' },
    Sandy: { fertilizer: 'NPK + Compost + Boron', tip: 'Sandy soil drains well for onion. Add boron to prevent hollow heart.' },
    Loamy: { fertilizer: 'NPK (10-26-26)', tip: 'Loamy soil is excellent for onions. Maintain soil moisture with drip irrigation.' },
    'Black (Clay-rich)': { fertilizer: 'DAP + MOP', tip: 'Black soil suits onion but needs raised beds. Harvest when tops fall over.' },
    Red: { fertilizer: 'FYM + NPK + Sulphur', tip: 'Add sulphur to enhance onion flavour and yield. Apply in split doses.' },
  },
  Potato: {
    Clay: { fertilizer: 'DAP + MOP + FYM', tip: 'Use ridges and furrow method. Clay soil compacts; add organic matter to loosen it.' },
    Sandy: { fertilizer: 'NPK + Compost', tip: 'Sandy soils are perfect for potato shape. Apply in multiple split doses with water.' },
    Loamy: { fertilizer: 'NPK (12-32-16)', tip: 'Best soil for potatoes. Hill-up soil around plants to prevent green tubers.' },
    'Black (Clay-rich)': { fertilizer: 'Urea + SSP + MOP', tip: 'Black soil holds water; ensure drainage channels. Late blight monitoring is key.' },
    Red: { fertilizer: 'NPK + Lime + Organic Manure', tip: 'Correct acidic pH for potatoes. Use certified seed tubers for disease-free crop.' },
  },
};
 
export const cropList = Object.keys(fertilizerData);
export const soilList = ['Clay', 'Sandy', 'Loamy', 'Black (Clay-rich)', 'Red'];
 
export const getSuggestion = (crop, soil) => {
  if (fertilizerData[crop] && fertilizerData[crop][soil]) {
    return fertilizerData[crop][soil];
  }
  return {
    fertilizer: 'NPK General Purpose Fertilizer',
    tip: 'Use a balanced NPK fertilizer and consult your local agricultural officer for specific advice.',
  };
};