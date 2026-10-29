import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct(data);
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div>
    </div>
  );

  if (error || !product) return (
    <div className="text-center py-24">
      <div className="text-5xl mb-4">😔</div>
      <p className="text-gray-600 mb-4">{error}</p>
      <Link to="/marketplace" className="btn-primary">Back to Marketplace</Link>
    </div>
  );

  const imgSrc = product.image
    ? product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`
    : null;
  const farmer = product.farmerId;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 page-enter">
      <div className="max-w-5xl mx-auto">
        <Link to="/marketplace" className="text-primary-600 text-sm font-medium hover:underline flex items-center gap-1 mb-6">
          ← Back to Marketplace
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="card overflow-hidden">
            {imgSrc ? (
              <img src={imgSrc} alt={product.cropName} className="w-full h-80 object-cover" />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-8xl">
                🌿
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-primary-100 text-primary-700">{product.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.cropName}</h1>
            <p className="text-4xl font-bold text-primary-600 mb-4">₹{product.price} <span className="text-base font-normal text-gray-400">per unit</span></p>

            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity Available</span>
                <span className="font-medium text-gray-800">📦 {product.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-gray-800">📍 {product.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Listed On</span>
                <span className="font-medium text-gray-800">{new Date(product.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            {product.description && (
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Farmer Info */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-700 mb-3">🧑‍🌾 Farmer Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-20">Name:</span>
                  <span className="font-medium">{product.farmerName}</span>
                </div>
                {farmer?.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">Email:</span>
                    <a href={`mailto:${farmer.email}`} className="text-primary-600 hover:underline">{farmer.email}</a>
                  </div>
                )}
                {(product.farmerPhone || farmer?.phone) && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">Phone:</span>
                    <a href={`tel:${product.farmerPhone || farmer?.phone}`} className="text-primary-600 hover:underline">
                      {product.farmerPhone || farmer?.phone}
                    </a>
                  </div>
                )}
                {farmer?.location && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">Location:</span>
                    <span>{farmer.location}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                {(product.farmerPhone || farmer?.phone) && (
                  <a href={`tel:${product.farmerPhone || farmer?.phone}`} className="btn-primary flex-1 justify-center text-sm">
                    📞 Call Farmer
                  </a>
                )}
                {farmer?.email && (
                  <a href={`mailto:${farmer.email}?subject=Interest in ${product.cropName}`} className="btn-outline flex-1 justify-center text-sm">
                    ✉️ Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
