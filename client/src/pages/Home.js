import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '🛒', title: 'Direct Marketplace', desc: 'Buy fresh produce directly from farmers. No middlemen, fair prices for everyone.' },
  { icon: '🌱', title: 'Fertilizer Guide', desc: 'Get smart fertilizer suggestions based on your crop type and soil condition.' },
  { icon: '🤖', title: 'KrishiBot', desc: 'Ask farming questions anytime. Our chatbot is ready to help with tips and advice.' },
  { icon: '📦', title: 'Farmer Dashboard', desc: 'Farmers can easily list, manage and delete their products in one place.' },
];

const steps = [
  { step: '1', title: 'Register', desc: 'Create your free account as a Farmer or Buyer in seconds.' },
  { step: '2', title: 'List / Browse', desc: 'Farmers add products; Buyers browse the fresh marketplace.' },
  { step: '3', title: 'Connect', desc: 'Buyers contact farmers directly — no middlemen involved.' },
];

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-green-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Farm Fresh, Direct to You
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            AgroConnect bridges farmers and buyers — no middlemen, fair prices, fresh produce. Join thousands of farmers selling directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors text-center">
              Browse Marketplace →
            </Link>
            <Link to="/register" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-primary-700 transition-colors text-center">
              Join as Farmer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[['🧑‍🌾', '500+', 'Farmers'], ['🛍️', '2000+', 'Products'], ['🌍', '50+', 'Districts']].map(([icon, num, label]) => (
            <div key={label}>
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-2xl font-bold text-primary-700">{num}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Everything You Need</h2>
          <p className="text-center text-gray-500 mb-10">Simple tools to connect farmers and buyers efficiently</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">How It Works</h2>
          <p className="text-center text-gray-500 mb-10">Get started in 3 easy steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-green-100 mb-8">Join AgroConnect today — it's free for farmers and buyers alike.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">
            Create Free Account
          </Link>
          <Link to="/chatbot" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-primary-700 transition-colors">
            Try KrishiBot 🤖
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2024 AgroConnect. Built with ❤️ for Indian farmers.</p>
      </footer>
    </div>
  );
}
