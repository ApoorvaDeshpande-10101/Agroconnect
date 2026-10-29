import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Grains', 'Other'];

const categoryBadge = { Vegetables: 'bg-green-100 text-green-700', Fruits: 'bg-orange-100 text-orange-700', Grains: 'bg-yellow-100 text-yellow-700', Other: 'bg-gray-100 text-gray-600' };

function ProductCard({ p }) {
  const imgSrc = p.image
    ? p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`
    : null;
  return (
    <div className="card hover:shadow-md transition-shadow group">
      <div className="h-44 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={p.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="text-6xl">🌿</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{p.cropName}</h3>
          <span className={`badge text-xs ${categoryBadge[p.category] || categoryBadge.Other}`}>{p.category}</span>
        </div>
        <p className="text-2xl font-bold text-primary-600 mb-1">₹{p.price}<span className="text-sm font-normal text-gray-400">/{p.unit}</span></p>
        <div className="text-sm text-gray-500 space-y-1">
          <div className="flex items-center gap-1">📦 <span>{p.quantity}</span></div>
          <div className="flex items-center gap-1">📍 <span>{p.location}</span></div>
          <div className="flex items-center gap-1">🧑‍🌾 <span>{p.farmerName}</span></div>
        </div>
        <Link to={`/products/${p._id}`} className="btn-primary w-full justify-center mt-4 text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProducts({ search, category });
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">🛒 Marketplace</h1>
          <p className="text-gray-500">Fresh produce directly from farmers</p>
          {/* Search */}
          <form onSubmit={handleSearch} className="mt-5 flex gap-2 max-w-xl">
            <input
              value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              className="input flex-1" placeholder="Search crops..."
            />
            <button type="submit" className="btn-primary px-6">Search</button>
          </form>
          {/* Category Filter */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setSearch(''); setSearchInput(''); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  category === cat ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300 bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p._id} p={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
