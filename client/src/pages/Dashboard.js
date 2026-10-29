import React, { useState, useEffect } from 'react';
import { getMyProducts, addProduct, deleteProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Other'];
const EMPTY_FORM = { cropName: '', category: 'Vegetables', price: '', quantity: '', location: '', description: '' };

export default function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getMyProducts();
      setProducts(data);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await addProduct(fd);
      setSuccess('Product added successfully! 🎉');
      setForm(EMPTY_FORM);
      setImage(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      setSuccess('Product deleted.');
    } catch {
      setError('Failed to delete product.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🧑‍🌾 My Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome, <strong>{user?.name}</strong> · {products.length} product{products.length !== 1 ? 's' : ''} listed</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setError(''); setSuccess(''); }} className="btn-primary">
            {showForm ? '✕ Cancel' : '+ Add Product'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Notifications */}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-4">{success}</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">{error}</div>}

        {/* Add Product Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Crop Name *</label>
                <input name="cropName" value={form.cropName} onChange={handleChange} required className="input" placeholder="e.g. Tomato" />
              </div>
              <div>
                <label className="label">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="input">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Price (₹ per unit) *</label>
                <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="input" placeholder="e.g. 20" />
              </div>
              <div>
                <label className="label">Quantity *</label>
                <input name="quantity" value={form.quantity} onChange={handleChange} required className="input" placeholder="e.g. 50 kg" />
              </div>
              <div>
                <label className="label">Location *</label>
                <input name="location" value={form.location} onChange={handleChange} required className="input" placeholder="Your village/city" />
              </div>
              <div>
                <label className="label">Product Image</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="input py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input resize-none" placeholder="Brief description of the product (optional)" />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Adding...' : '+ Add Product'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading your products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products yet</h3>
            <p className="text-gray-400 mb-6">Add your first product to start selling!</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">+ Add Your First Product</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => {
              const imgSrc = p.image
                ? p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`
                : null;
              return (
                <div key={p._id} className="card">
                  <div className="h-36 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center overflow-hidden">
                    {imgSrc ? <img src={imgSrc} alt={p.cropName} className="w-full h-full object-cover" /> : <span className="text-5xl">🌿</span>}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{p.cropName}</h3>
                        <p className="text-primary-600 font-bold text-lg">₹{p.price}</p>
                      </div>
                      <span className="badge bg-gray-100 text-gray-600 text-xs">{p.category}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 space-y-1">
                      <div>📦 {p.quantity}</div>
                      <div>📍 {p.location}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn-danger w-full text-sm mt-3"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
