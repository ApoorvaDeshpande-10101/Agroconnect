import React, { useState } from 'react';

const faqs = [
  { q: 'Is AgroConnect free to use?', a: 'Yes! AgroConnect is completely free for both farmers and buyers. Simply register and start using all features.' },
  { q: 'How do I sell my produce on AgroConnect?', a: 'Register as a Farmer, go to your Dashboard, and click "Add Product". Fill in crop details, set your price, and upload a photo.' },
  { q: 'How can buyers contact farmers?', a: 'Visit any product\'s detail page and use the "Call Farmer" or "Email" buttons to contact the farmer directly.' },
  { q: 'Is my personal data safe?', a: 'We only show contact info you choose to provide. Your data is stored securely and never sold to third parties.' },
  { q: 'Who do I contact for technical issues?', a: 'Email us at support@agroconnect.in or call our helpline. We aim to respond within 24 hours.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, send to backend; for now, just show success
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-green-600 text-white py-12 px-4 text-center">
        <div className="text-5xl mb-3">📞</div>
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-green-100 max-w-xl mx-auto">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            {submitted ? (
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline">Send Another Message</button>
              </div>
            ) : (
              <div className="card p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="input" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="label">Subject *</label>
                    <input name="subject" value={form.subject} onChange={handleChange} required className="input" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="input resize-none" placeholder="Write your message here..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3">
                    Send Message →
                  </button>
                </form>
              </div>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: '📧', label: 'Email', value: 'support@agroconnect.in' },
                { icon: '📞', label: 'Helpline', value: '1800-XXX-XXXX' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 9am–6pm' },
              ].map((item) => (
                <div key={item.label} className="card p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs text-gray-400 font-medium uppercase">{item.label}</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm pr-4">{faq.q}</span>
                    <span className={`text-primary-600 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* About Card */}
            <div className="card p-6 mt-6 bg-gradient-to-br from-primary-50 to-green-50 border-primary-100">
              <h3 className="font-semibold text-primary-800 mb-2">🌾 About AgroConnect</h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                AgroConnect is a student project built to bridge the gap between Indian farmers and buyers. 
                Our mission is to eliminate middlemen and ensure farmers get fair prices for their produce.
                Built with the MERN stack as part of an academic curriculum project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2024 AgroConnect. Built with ❤️ for Indian farmers.</p>
      </footer>
    </div>
  );
}
