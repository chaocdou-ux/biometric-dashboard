import { useState } from 'react';
import App from '../App';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('sponsorship');

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-b border-white/45">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setActiveTab('sponsorship')}
                className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-full border-2 transition-all ${
                  activeTab === 'sponsorship'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-gray-50'
                }`}
              >
                Sponsorship
              </button>
              <button
                onClick={() => setActiveTab('study2')}
                className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-full border-2 transition-all ${
                  activeTab === 'study2'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-gray-50'
                }`}
              >
                Study 2
              </button>
              <button
                onClick={() => setActiveTab('study1')}
                className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-full border-2 transition-all ${
                  activeTab === 'study1'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-gray-50'
                }`}
              >
                Study 1
              </button>
            </div>
            <a
              href="mailto:nathalie@nathaliebonin.com?subject=Sponsorship%20Inquiry"
              className="px-6 py-2 text-sm font-semibold tracking-wide bg-white text-black border-2 border-black rounded-full hover:bg-gray-50 transition-all"
            >
              Inquire
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Biometric Study
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Measurement Meets Human Transformation
            </p>
          </div>

          {activeTab === 'sponsorship' && <SponsorshipContent />}
          {activeTab === 'study2' && <Study2Content />}
          {activeTab === 'study1' && <Study1Content />}
        </div>
      </div>

      <footer className="glass-panel mt-32 mx-6 mb-6">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Kinemuse Productions Inc.
            </p>
            <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <a href="mailto:nathalie@nathaliebonin.com" className="hover:text-gray-900">nathalie@nathaliebonin.com</a>
              <span className="mx-2">·</span>
              <a href="tel:818-476-2577" className="hover:text-gray-900">818-476-2577</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SponsorshipContent() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    tier: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Sponsorship Inquiry - ${formData.tier || 'General'}`;
    const body = `Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEmail: ${formData.email}%0D%0ATier Interest: ${formData.tier}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:nathalie@nathaliebonin.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Partnership Opportunity
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Sponsor the Future of Wellness & Innovation
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Position your brand at the forefront of groundbreaking research uniting science, wellness,
          technology, and the arts—with global recognition through UNESCO Week of Sound 2026.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            number: '01',
            title: 'Innovation Leadership',
            description: 'Align with pioneering research at the intersection of neuroscience, music therapy, and biometric analysis'
          },
          {
            number: '02',
            title: 'Global Platform',
            description: 'Reach forward-thinking audiences through UNESCO Week of Sound and international wellness communities'
          },
          {
            number: '03',
            title: 'Scalable Impact',
            description: 'Be part of expanding research into wellness centers, hospitals, and concert halls worldwide'
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel p-8">
            <div className="text-5xl font-bold text-gray-300 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {item.number}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {item.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Sponsorship Tiers
        </p>
        <div className="space-y-6">
          {[
            {
              tier: 'Visionary',
              price: '$5,000',
              note: '1 available',
              benefits: [
                'Named Presenter of the event',
                'Speaking opportunity at VIP Opening',
                'Original RADD ART artwork',
                'Largest logo placement across all materials',
                'Top-level QR code art story integration',
                'Featured press mentions',
                'UNESCO Week of Sound recognition'
              ]
            },
            {
              tier: 'Platinum',
              price: '$2,500',
              note: '2 available',
              benefits: [
                'Prominent logo placement',
                'Medium banner at VIP Opening',
                'QR code art story integration',
                'Event photo/video feature',
                'Social media campaign inclusion',
                'UNESCO Week of Sound recognition'
              ]
            },
            {
              tier: 'Gold',
              price: '$1,000',
              note: '5 available',
              benefits: [
                'Standard logo placement',
                'QR code art story acknowledgment',
                'Event recognition',
                'VIP reception invitation',
                'UNESCO Week of Sound recognition'
              ]
            },
            {
              tier: 'Silver',
              price: '$500',
              note: '10 available',
              benefits: [
                'Event credits and video mention',
                'QR code art story listing',
                'VIP reception invitation',
                'UNESCO Week of Sound recognition'
              ]
            },
            {
              tier: 'Bronze',
              price: '$250',
              note: 'Unlimited',
              benefits: [
                'Event credits mention',
                'VIP reception invitation',
                'UNESCO Week of Sound recognition'
              ]
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm border border-white/45 p-8 rounded-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.tier}
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.note}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.price}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {item.benefits.map((benefit, bidx) => (
                  <div key={bidx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Audience Insights
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { metric: '100%', label: 'Sold-Out Rate' },
            { metric: '25-40', label: 'Core Age Range' },
            { metric: '55%', label: 'Email Engagement' },
            { metric: '100+', label: 'Prior Participants' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-5xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {stat.metric}
              </p>
              <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Sponsor Inquiry
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 text-gray-900"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Company
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 text-gray-900"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                placeholder="Company name"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 text-gray-900"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Tier Interest
              </label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({...formData, tier: e.target.value})}
                className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 text-gray-900"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <option value="">Select tier</option>
                <option value="Visionary">Visionary - $5,000</option>
                <option value="Platinum">Platinum - $2,500</option>
                <option value="Gold">Gold - $1,000</option>
                <option value="Silver">Silver - $500</option>
                <option value="Bronze">Bronze - $250</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 text-gray-900 resize-none"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              placeholder="Tell us about your partnership goals"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white text-sm font-semibold tracking-wide rounded-full hover:bg-gray-800 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>

      <div className="glass-panel p-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Past Success
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Biometric Study Phase 1
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Our inaugural study successfully captured comprehensive biometric data across four sessions,
              demonstrating measurable improvements in emotional state, energy levels, mental clarity,
              and spiritual connection.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Published results showing average improvements of 15-25% across all measured metrics,
              establishing proof of concept for music-breathwork integration.
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Contact
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-900 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Nathalie Bonin
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Founder & Creative Director
                </p>
              </div>
              <div>
                <a href="mailto:nathalie@nathaliebonin.com" className="text-sm text-gray-900 hover:text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  nathalie@nathaliebonin.com
                </a>
              </div>
              <div>
                <a href="tel:818-476-2577" className="text-sm text-gray-900 hover:text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  818-476-2577
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Study2Content() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          November 21-23, 2025
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Biometric Study Phase 2
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Expanding the frontier of music, breathwork & biometric data at The KINN, Venice, CA
        </p>
        <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Featured in UNESCO Week of Sound 2026 Los Angeles
          </p>
        </div>
      </div>

      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Three-Day Agenda
        </p>
        <div className="space-y-6">
          {[
            {
              date: 'Nov 21',
              day: 'Day 1 / Evening',
              title: 'VIP Opening Night',
              description: 'Exclusive reception featuring keynote by Dr. Mitch Abrams on the intersection of science, wellness, and human connection.',
              highlights: [
                'Keynote presentation by Dr. Mitch Abrams',
                'Live RADD ART creation by Chao Dou',
                'Original violin composition by Nathalie Bonin',
                'I-QRS team presentation',
                'Sponsor recognition ceremony',
                'Mental health fundraising'
              ]
            },
            {
              date: 'Nov 22',
              day: 'Day 2 / Full Day',
              title: 'Research Sessions',
              description: 'Intensive biometric capture sessions featuring live music, guided breathwork, and various modalities with real-time data collection and visualization.',
              highlights: [
                'Live musical performance by Nathalie Bonin',
                'Guided breathwork with Robert Bahedry',
                'Binaural beats integration',
                'Movement protocols',
                'LaseRR protocol testing',
                'Real-time Aurora Borealis visualization'
              ]
            },
            {
              date: 'Nov 23',
              day: 'Day 3 / Full Day',
              title: '"Breathe with the Symphony" Pilot',
              description: 'Groundbreaking pilot synchronizing orchestral music with guided breathwork and live biometric data visualization for collective experience.',
              highlights: [
                'Synchronized music and breathwork',
                'Collective biometric visualization',
                'EEG group dynamics capture',
                'HRV coherence monitoring',
                'Personalized participant results',
                'Closing session and data debrief'
              ]
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm border border-white/45 p-8 rounded-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.day}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.title}
                  </h3>
                </div>
                <span className="text-sm text-gray-500 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {item.date}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {item.description}
              </p>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {item.highlights.map((highlight, hidx) => (
                  <div key={hidx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Technology Platform
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'I-QRS Chestbelt',
              desc: 'High-resolution ECG, HRV, motion, and temperature sensing'
            },
            {
              name: 'eMotiv EpocX',
              desc: '14-channel EEG for brainwave monitoring'
            },
            {
              name: 'Consumer Wearables',
              desc: 'Multi-device comprehensive tracking'
            }
          ].map((tech, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-gray-300 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {tech.name}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              RADD ART Integration
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Radiologist Developed Autonomic Rewiring Therapy
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Created by Dr. Mitch Abrams through Stanford University's CCARE program, RADD ART
              captures moments of profound insight and translates them into live artistic expressions.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Each artwork includes QR codes linking to origin stories, creating lasting legacies for
              sponsors and participants while advancing mental health awareness.
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Research Team
            </p>
            <div className="space-y-4">
              {[
                { name: 'Nathalie Bonin', role: 'Grammy-winning violinist & composer' },
                { name: 'Dr. Mitch Abrams', role: 'NexGenHealth founder, Stanford CCARE educator' },
                { name: 'Robert Bahedry', role: '2x Emmy-winning breathwork facilitator' },
                { name: 'Chao Dou', role: 'RADD ARTist & experience designer' },
                { name: 'Dr. Gyongyi Szilagyi', role: 'I-QRS Research Director & VP' },
                { name: 'Attila Kocsis', role: 'I-QRS Founder, CEO & CTO' }
              ].map((person, idx) => (
                <div key={idx}>
                  <p className="text-sm text-gray-900 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {person.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Study1Content() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="glass-panel p-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Archive
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Biometric Study Phase 1
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Foundational research exploring the physiological effects of live music combined with breathwork,
          establishing proof of concept and measurable outcomes across multiple wellness metrics.
        </p>
      </div>
      <div className="glass-panel p-8">
        <App />
      </div>
    </div>
  );
}
