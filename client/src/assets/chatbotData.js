const responses = [
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'namaskar'],
    answer: 'Namaste! 🌾 I am KrishiBot, your farming assistant. Ask me about fertilizers, crops, seasons, or farming tips!',
  },
  {
    keywords: ['fertilizer', 'fertiliser', 'khad', 'manure'],
    answer: '🌱 Fertilizers are nutrients given to crops. Main types:\n• NPK (Nitrogen-Phosphorus-Potassium) — general purpose\n• Urea — nitrogen source, good for leafy growth\n• DAP — for root development\n• SSP — for phosphorus\n• Organic/FYM — improves soil health long-term\n\nUse our Fertilizer Suggestion tool for crop-specific advice!',
  },
  {
    keywords: ['npk', 'urea', 'dap', 'ssp', 'potash', 'mop'],
    answer: '🧪 Common fertilizers explained:\n• NPK: Balanced nutrient (Nitrogen + Phosphorus + Potassium)\n• Urea (46-0-0): High nitrogen, promotes green growth\n• DAP (18-46-0): Good for root growth and establishment\n• SSP: Slow-release phosphorus + sulphur\n• MOP (Muriate of Potash): Boosts disease resistance and fruit quality',
  },
  {
    keywords: ['rice', 'paddy', 'dhan'],
    answer: '🌾 Rice farming tips:\n• Best season: Kharif (June–September)\n• Water: Keep field flooded 2-3 cm during vegetative stage\n• Fertilizer: Urea + DAP + Zinc Sulphate\n• Common pests: Brown planthopper, blast disease\n• Harvest when 80% grains turn golden yellow',
  },
  {
    keywords: ['wheat', 'gehun'],
    answer: '🌾 Wheat farming tips:\n• Best season: Rabi (October–March)\n• Requires 6–7 irrigations for good yield\n• Fertilizer: DAP at sowing + Urea top-dressing\n• Sow at 100-125 kg seeds/hectare\n• Harvest when grain moisture is around 12-14%',
  },
  {
    keywords: ['tomato', 'tamatar'],
    answer: '🍅 Tomato farming tips:\n• Grows in most seasons; avoid heavy frost\n• Stake plants when 30 cm tall\n• Fertilizer: NPK 19-19-19 + Calcium Nitrate\n• Watch for early/late blight and fruit borer\n• Drip irrigation saves water and reduces disease',
  },
  {
    keywords: ['potato', 'aloo'],
    answer: '🥔 Potato farming tips:\n• Best season: Rabi (Oct–Jan in plains)\n• Plant certified seed tubers to avoid disease\n• Fertilizer: NPK + MOP in ridges\n• Hill up soil when plants are 15 cm tall\n• Harvest 10-15 days after vine drying',
  },
  {
    keywords: ['onion', 'pyaz', 'kanda'],
    answer: '🧅 Onion farming tips:\n• Kharif (June) and Rabi (Oct-Nov) sowing\n• Requires well-drained loamy/sandy loam soil\n• Fertilizer: NPK + Sulphur for pungency\n• Avoid overwatering close to harvest\n• Cure harvested onions in shade for 2 weeks before storage',
  },
  {
    keywords: ['cotton', 'kapas'],
    answer: '🌿 Cotton farming tips:\n• Kharif crop; sow May–June\n• Black (regur) soil is ideal\n• Fertilizer: NPK + Sulphur\n• Spray boron at flowering for better boll setting\n• Monitor for bollworm and whitefly regularly',
  },
  {
    keywords: ['maize', 'corn', 'makka'],
    answer: '🌽 Maize farming tips:\n• Kharif: June-July | Rabi: October-November\n• Fertilizer: Apply Urea in 3 splits\n• Requires good sunlight and proper spacing (60×20 cm)\n• Intercrop with legumes for soil nitrogen\n• Harvest when husk turns brown and grain dents',
  },
  {
    keywords: ['sugarcane', 'ganna'],
    answer: '🍬 Sugarcane tips:\n• Long-duration crop (12-18 months)\n• Plant ratoons for 2-3 seasons for economy\n• Fertilizer: Urea + SSP + MOP in splits\n• Trash mulching conserves moisture\n• Ideal: Black clay soil with good water supply',
  },
  {
    keywords: ['kharif', 'kharif crop', 'summer crop', 'monsoon crop'],
    answer: '☀️ Kharif Crops (Sown June–July, Harvested Sep–Oct):\n• Rice, Maize, Cotton, Soybean\n• Groundnut, Jowar, Bajra\n• Sugarcane (planted)\n• These crops need monsoon rainfall or irrigation',
  },
  {
    keywords: ['rabi', 'rabi crop', 'winter crop'],
    answer: '❄️ Rabi Crops (Sown Oct–Nov, Harvested Mar–Apr):\n• Wheat, Barley, Mustard\n• Chickpea (Chana), Lentil (Masoor)\n• Peas, Potato, Onion\n• These crops need cool winters and minimal rainfall',
  },
  {
    keywords: ['zaid', 'zaid crop', 'summer vegetables'],
    answer: '🌞 Zaid Crops (Sown Mar–Apr, Harvested Jun–Jul):\n• Watermelon, Muskmelon, Cucumber\n• Bitter gourd, Bottle gourd, Pumpkin\n• Grown between Rabi and Kharif using irrigation',
  },
  {
    keywords: ['soil', 'mitti', 'soil type'],
    answer: '🌍 Common soil types in India:\n• Black Soil (Regur): Best for cotton; retains moisture\n• Red Soil: Good drainage; needs nutrients\n• Loamy Soil: Best for most crops; balanced texture\n• Clay Soil: Retains water; needs drainage\n• Sandy Soil: Fast drainage; needs frequent watering\n\nKnow your soil type before selecting fertilizer!',
  },
  {
    keywords: ['irrigation', 'water', 'paani', 'drip'],
    answer: '💧 Irrigation methods:\n• Drip Irrigation: Saves 40-60% water; best for vegetables/fruits\n• Sprinkler: Good for wheat and groundnut\n• Flood/Furrow: Traditional; used for rice and sugarcane\n• Tip: Irrigate in early morning or evening to reduce evaporation',
  },
  {
    keywords: ['pest', 'insect', 'disease', 'spray', 'keeda'],
    answer: '🐛 Pest Management:\n• Use IPM (Integrated Pest Management) approach\n• Install pheromone traps for bollworm/fruit borer monitoring\n• Use neem oil spray as organic option\n• Avoid spraying pesticides during flowering (kills pollinators)\n• Consult your local KVK (Krishi Vigyan Kendra) for guidance',
  },
  {
    keywords: ['organic', 'jaivik', 'natural farming'],
    answer: '🌿 Organic Farming Tips:\n• Use FYM (Farm Yard Manure) or compost as base\n• Green manuring with Dhaincha or Sunhemp\n• Vermicompost improves soil structure and nutrients\n• Crop rotation reduces pests naturally\n• Jeevamrit and Beejamrit are popular bioinputs in natural farming',
  },
  {
    keywords: ['government', 'scheme', 'subsidy', 'yojana', 'pm'],
    answer: '🏛️ Key Government Schemes for Farmers:\n• PM-KISAN: ₹6000/year direct income support\n• PM Fasal Bima Yojana: Crop insurance\n• Soil Health Card: Free soil testing\n• eNAM: Online mandi/marketplace\n• KCC (Kisan Credit Card): Easy farm loans\n• Contact your local agriculture department for enrollment',
  },
  {
    keywords: ['price', 'msp', 'sell', 'market', 'rate'],
    answer: '💰 Selling Your Produce:\n• MSP (Minimum Support Price) is set by govt for major crops\n• Use AgroConnect marketplace to sell directly to buyers\n• eNAM platform for online auction\n• Check Agmarknet.gov.in for daily mandi prices\n• Farmer Producer Organizations (FPOs) help get better prices',
  },
  {
    keywords: ['compost', 'vermicompost', 'worm'],
    answer: '♻️ Composting Tips:\n• Vermicompost: Use earthworms to decompose organic waste\n• Ready in 45-60 days; rich in nutrients\n• Apply 2-4 tonnes/hectare for best results\n• Pit composting can be done on-farm with crop residue\n• Reduces dependency on chemical fertilizers',
  },
  {
    keywords: ['weather', 'rain', 'barish', 'mausam', 'forecast'],
    answer: '🌦️ Weather for Farming:\n• Check IMD (India Meteorological Department): mausam.imd.gov.in\n• Meghdoot app by ICAR provides agro-met advisories\n• Sow when 10-day forecast shows adequate rainfall\n• Pre-position irrigation if dry spell expected\n• Avoid pesticide spraying when rain is forecast',
  },
  {
    keywords: ['help', 'what can you do', 'topics', 'questions'],
    answer: '🤖 I can help you with:\n• 🌾 Crop-specific tips (Rice, Wheat, Tomato, Cotton...)\n• 🧪 Fertilizer types and usage\n• 📅 Kharif / Rabi / Zaid crop seasons\n• 🌍 Soil types and management\n• 💧 Irrigation methods\n• 🐛 Pest and disease management\n• 🏛️ Government schemes for farmers\n• 💰 Selling your produce\n• 🌿 Organic farming\n\nJust type your question!',
  },
];
 
export const getBotResponse = (input) => {
  const lower = input.toLowerCase().trim();
 
  for (const item of responses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.answer;
    }
  }
 
  return "🤔 I'm not sure about that. Try asking about fertilizers, crop seasons, soil types, irrigation, or government schemes. Type 'help' to see all topics!";
};