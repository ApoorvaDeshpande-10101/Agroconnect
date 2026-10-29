/**
 * AgroConnect — Seed Script
 * Run this once to populate your database with demo farmers and products.
 *
 * Usage:
 * node seed.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

// ───────────────── DEMO FARMERS ─────────────────

const farmers = [
  {
    name: 'Ramesh Patil',
    email: 'ramesh.patil@demo.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '9876543210',
    location: 'Nashik, Maharashtra',
  },

  {
    name: 'Sunita Devi',
    email: 'sunita.devi@demo.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '9812345678',
    location: 'Amritsar, Punjab',
  },

  {
    name: 'Kiran Reddy',
    email: 'kiran.reddy@demo.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '9700112233',
    location: 'Guntur, Andhra Pradesh',
  },

  {
    name: 'Meena Kumari',
    email: 'meena.kumari@demo.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '9823456789',
    location: 'Jaipur, Rajasthan',
  },
];

// ───────────────── DEMO PRODUCTS ─────────────────

const productTemplates = [

  // VEGETABLES

  {
    farmerIndex: 0,
    cropName: 'Tomato',
    category: 'Vegetables',
    price: 18,
    quantity: 200,
    unit: 'kg',
    location: 'Nashik, Maharashtra',
    description: 'Fresh hybrid tomatoes, bright red and firm.',
    image: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg',
  },

  {
    farmerIndex: 0,
    cropName: 'Onion',
    category: 'Vegetables',
    price: 25,
    quantity: 500,
    unit: 'kg',
    location: 'Nashik, Maharashtra',
    description: 'Premium Nashik onions with long shelf life.',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80',
  },

  {
    farmerIndex: 2,
    cropName: 'Brinjal (Eggplant)',
    category: 'Vegetables',
    price: 22,
    quantity: 150,
    unit: 'kg',
    location: 'Guntur, Andhra Pradesh',
    description: 'Fresh purple brinjals for curries and grilling.',
    image: 'https://static.wixstatic.com/media/5f1a7b_5f9cec1922cf45acb1884aa8e4958856~mv2.jpg/v1/fill/w_640,h_326,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5f1a7b_5f9cec1922cf45acb1884aa8e4958856~mv2.jpg',
  },

  {
    farmerIndex: 3,
    cropName: 'Spinach',
    category: 'Vegetables',
    price: 15,
    quantity: 80,
    unit: 'kg',
    location: 'Jaipur, Rajasthan',
    description: 'Organic spinach rich in nutrients.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80',
  },

  {
    farmerIndex: 3,
    cropName: 'Cauliflower',
    category: 'Vegetables',
    price: 30,
    quantity: 100,
    unit: 'kg',
    location: 'Jaipur, Rajasthan',
    description: 'Fresh white cauliflower heads.',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&q=80',
  },

  {
    farmerIndex: 2,
    cropName: 'Green Chilli',
    category: 'Vegetables',
    price: 40,
    quantity: 60,
    unit: 'kg',
    location: 'Guntur, Andhra Pradesh',
    description: 'Spicy green chillies from Guntur.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Green_chillies.jpg',
  },

  {
    farmerIndex: 0,
    cropName: 'Garlic',
    category: 'Vegetables',
    price: 55,
    quantity: 120,
    unit: 'kg',
    location: 'Nashik, Maharashtra',
    description: 'Premium export-grade garlic.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Garlic_Bulbs_%28Unsplash%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  },

  // FRUITS

  {
    farmerIndex: 0,
    cropName: 'Mango (Alphonso)',
    category: 'Fruits',
    price: 120,
    quantity: 300,
    unit: 'kg',
    location: 'Nashik, Maharashtra',
    description: 'Sweet Alphonso mangoes.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
  },

  {
    farmerIndex: 2,
    cropName: 'Banana (Robusta)',
    category: 'Fruits',
    price: 35,
    quantity: 400,
    unit: 'dozen',
    location: 'Guntur, Andhra Pradesh',
    description: 'Naturally ripened bananas.',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&q=80',
  },

  {
    farmerIndex: 3,
    cropName: 'Pomegranate',
    category: 'Fruits',
    price: 90,
    quantity: 150,
    unit: 'kg',
    location: 'Jaipur, Rajasthan',
    description: 'Juicy Bhagwa pomegranates.',
    image: 'https://extension.usu.edu/yardandgarden/images/pomegranate-cropped.jpg',
  },

  {
    farmerIndex: 0,
    cropName: 'Grapes (Thompson)',
    category: 'Fruits',
    price: 70,
    quantity: 200,
    unit: 'kg',
    location: 'Nashik, Maharashtra',
    description: 'Seedless green grapes.',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80',
  },

  // GRAINS

  {
    farmerIndex: 1,
    cropName: 'Basmati Rice',
    category: 'Grains',
    price: 65,
    quantity: 1000,
    unit: 'kg',
    location: 'Amritsar, Punjab',
    description: 'Premium aromatic basmati rice.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
  },

  {
    farmerIndex: 1,
    cropName: 'Wheat (Sharbati)',
    category: 'Grains',
    price: 28,
    quantity: 2000,
    unit: 'kg',
    location: 'Amritsar, Punjab',
    description: 'Golden hard wheat.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
  },

  {
    farmerIndex: 1,
    cropName: 'Maize (Corn)',
    category: 'Grains',
    price: 22,
    quantity: 800,
    unit: 'kg',
    location: 'Amritsar, Punjab',
    description: 'Yellow maize for feed and flour.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
  },

  {
    farmerIndex: 3,
    cropName: 'Bajra (Pearl Millet)',
    category: 'Grains',
    price: 20,
    quantity: 500,
    unit: 'kg',
    location: 'Jaipur, Rajasthan',
    description: 'Organic Rajasthan bajra.',
    image: 'https://www.greendna.in/cdn/shop/products/perl5_500x.jpg?v=1750257706',
  },

  // OTHER

  {
    farmerIndex: 2,
    cropName: 'Turmeric (Raw)',
    category: 'Other',
    price: 80,
    quantity: 200,
    unit: 'kg',
    location: 'Guntur, Andhra Pradesh',
    description: 'Fresh turmeric rhizomes.',
    image: 'https://images.squarespace-cdn.com/content/v1/56801b350e4c11744888ec37/0fe73982-bfab-4f76-9d13-0d977e64ba0b/Turmeric+Root.jpg',
  },

];

// ───────────────── SEED FUNCTION ─────────────────

async function seed() {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ Connected to MongoDB');

    // DELETE OLD DEMO DATA

    const demoEmails = farmers.map((f) => f.email);

    await User.deleteMany({
      email: { $in: demoEmails }
    });

    console.log('🗑 Cleared old demo farmers');

    await Product.deleteMany({});

    console.log('🗑 Cleared old demo products');

    // HASH PASSWORDS

    const hashedFarmers = await Promise.all(
      farmers.map(async (f) => ({
        ...f,
        password: await bcrypt.hash(f.password, 10),
      }))
    );

    // INSERT FARMERS

    const insertedFarmers = await User.insertMany(hashedFarmers);

    console.log(`👨‍🌾 Inserted ${insertedFarmers.length} demo farmers`);

    // BUILD PRODUCTS

    const products = productTemplates.map((p) => {

      const farmer = insertedFarmers[p.farmerIndex];

      return {

        farmerId: farmer._id,
        farmerName: farmer.name,
        farmerPhone: farmer.phone,

        cropName: p.cropName,
        category: p.category,

        price: p.price,
        quantity: p.quantity,
        unit: p.unit,

        location: p.location,
        description: p.description,
        image: p.image,

      };
    });

    // INSERT PRODUCTS

    await Product.insertMany(products);

    console.log(`🌾 Inserted ${products.length} demo products`);

    // SUMMARY

    console.log('\n✅ Seed Complete!');
    console.log('────────────────────────────────────');

    insertedFarmers.forEach((f) => {

      const count = productTemplates.filter(
        (p) => farmers[p.farmerIndex].email === f.email
      ).length;

      console.log(`🧑‍🌾 ${f.name} → ${count} products`);
    });

    console.log('────────────────────────────────────');

    console.log('\n🔑 DEMO LOGIN');
    console.log('Email: ramesh.patil@demo.com');
    console.log('Password: farmer123');

    console.log('\n🚀 Run: npm run dev\n');

    process.exit(0);

  } catch (err) {

    console.error('❌ Seed Failed:', err.message);

    process.exit(1);
  }
}

seed();