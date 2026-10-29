import React, { useState } from 'react';
import { cropList, soilList, getSuggestion } from '../assets/fertilizerData';

export default function FertilizerPage() {
  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!crop || !soil) return;
    setResult(getSuggestion(crop, soil));
  };

  const handleReset = () => {
    setCrop('');
    setSoil('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 to-primary-600 text-white py-12 px-4 text-center">
        <div className="text-5xl mb-3">🌱</div>
        <h1 className="text-3xl font-bold mb-2">Fertilizer Suggestion Guide</h1>
        <p className="text-green-100 max-w-xl mx-auto">
          Select your crop and soil type to get a tailored fertilizer recommendation and farming tip.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Crop & Soil Type</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Crop */}
            <div>
              <label className="label">🌾 Crop Type *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                {cropList.map((c) => (
                  <button
                    key={c} type="button"
                    onClick={() => { setCrop(c); setResult(null); }}
                    className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      crop === c
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Soil */}
            <div>
              <label className="label">🌍 Soil Type *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {soilList.map((s) => (
                  <button
                    key={s} type="button"
                    onClick={() => { setSoil(s); setResult(null); }}
                    className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                      soil === s
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!crop || !soil}
                className="btn-primary flex-1 justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Get Suggestion →
              </button>
              {(crop || soil || result) && (
                <button type="button" onClick={handleReset} className="btn-outline px-5">
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Result */}
          {result && (
            <div className="mt-8 space-y-4 animate-[fadeInUp_0.3s_ease]">
              <div className="h-px bg-gray-100" />
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🧪</span>
                  <h3 className="font-semibold text-primary-800 text-lg">Recommended Fertilizer</h3>
                </div>
                <p className="text-primary-900 font-bold text-xl mb-1">{result.fertilizer}</p>
                <p className="text-xs text-primary-600">For {crop} on {soil} soil</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💡</span>
                  <h3 className="font-semibold text-yellow-800">Farming Tip</h3>
                </div>
                <p className="text-yellow-900 text-sm leading-relaxed">{result.tip}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
                ℹ️ These are general recommendations. Consult your local Krishi Vigyan Kendra (KVK) for a soil test and expert advice.
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🌿', title: 'Organic Options', desc: 'Consider FYM, vermicompost and green manuring to improve soil health naturally.' },
            { icon: '🔬', title: 'Soil Testing', desc: 'Get a free Soil Health Card from your government agriculture office.' },
            { icon: '📞', title: 'Expert Help', desc: 'Contact KVK (Krishi Vigyan Kendra) in your district for free farming advice.' },
          ].map((item) => (
            <div key={item.title} className="card p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
