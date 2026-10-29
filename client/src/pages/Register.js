import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer', phone: '', location: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const { data } = await registerAPI(form);
      login(data);
      navigate(data.role === 'farmer' ? '/dashboard' : '/marketplace');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌾</div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-1">Join AgroConnect — it's free!</p>
        </div>
        <div className="card p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="input" placeholder="Your full name" />
            </div>
            <div>
              <label className="label">Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="label">Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required className="input" placeholder="Min 6 characters" />
            </div>
            <div>
              <label className="label">I am a *</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {['buyer', 'farmer'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`py-3 rounded-lg border-2 font-medium text-sm capitalize transition-all ${
                      form.role === role
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {role === 'farmer' ? '🧑‍🌾 Farmer' : '🛒 Buyer'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input" placeholder="Optional" />
            </div>
            <div>
              <label className="label">Location / Village</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} className="input" placeholder="Your city or village" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
