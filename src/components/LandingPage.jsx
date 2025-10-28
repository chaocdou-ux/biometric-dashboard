import { useState } from 'react';
import App from '../App';
import AbstractBackground from './AbstractBackground';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('sponsorship');

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
      <AbstractBackground />
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(20px)', borderColor: 'rgba(15, 23, 42, 0.1)' }}>
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-shrink-0">
              <h1 className="font-bold tracking-tight" style={{ fontSize: '1.875rem', color: '#0f172a', letterSpacing: '-0.01em' }}>
                Biometric Study
              </h1>
              <p className="font-medium mt-1" style={{ fontSize: '15px', color: '#475569' }}>
                Measurement Meets Human Transformation
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('sponsorship')}
                className={`px-5 py-2.5 font-semibold rounded-full border transition-all ${
                  activeTab === 'sponsorship'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
                }`}
                style={{ fontSize: '16px', letterSpacing: '0.01em' }}
              >
                Sponsor
              </button>
              <button
                onClick={() => setActiveTab('phase2')}
                className={`px-5 py-2.5 font-semibold rounded-full border transition-all ${
                  activeTab === 'phase2'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
                }`}
                style={{ fontSize: '16px', letterSpacing: '0.01em' }}
              >
                Phase 2
              </button>
              <button
                onClick={() => setActiveTab('phase1')}
                className={`px-5 py-2.5 font-semibold rounded-full border transition-all ${
                  activeTab === 'phase1'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
                }`}
                style={{ fontSize: '16px', letterSpacing: '0.01em' }}
              >
                Phase 1
              </button>
              <a
                href="mailto:nathalie@nathaliebonin.com?subject=Sponsorship%20Inquiry"
                className="px-5 py-2.5 font-semibold bg-white text-gray-900 border border-gray-900 rounded-full hover:bg-gray-50 transition-all"
                style={{ fontSize: '16px', letterSpacing: '0.01em' }}
              >
                Inquire
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-28" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container mx-auto px-6 py-4">
          {activeTab === 'sponsorship' && <SponsorshipContent />}
          {activeTab === 'phase2' && <Phase2Content />}
          {activeTab === 'phase1' && <Phase1Content />}
        </div>
      </div>

      <footer className="border-t mt-32" style={{ borderColor: 'rgba(15, 23, 42, 0.1)', position: 'relative', zIndex: 1 }}>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-700 font-semibold" style={{ fontSize: '16px' }}>Founder, Creative Director & Executive Producer</p>
            <p className="text-gray-600 mt-2" style={{ fontSize: '16px' }}>
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
    <div className="max-w-6xl mx-auto">
      <div className="relative mb-24">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-orange-50 rounded-full blur-3xl opacity-30" />
        <div className="relative">
          <p className="uppercase tracking-widest mb-4 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>Partnership Opportunity</p>
          <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: '3.5rem', color: '#0f172a', letterSpacing: '-0.01em' }}>
            Sponsor the Future of<br />Wellness & Innovation
          </h2>
          <p className="leading-relaxed max-w-2xl" style={{ fontSize: '18px', color: '#334155', fontWeight: '400' }}>
            Position your brand at the forefront of groundbreaking research uniting science, wellness,
            technology, and the arts—with global recognition through UNESCO Week of Sound 2026.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-16 mb-32">
        <div>
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-gray-900 font-medium">01</span>
          </div>
          <h3 className="font-semibold mb-3" style={{ fontSize: '22px', color: '#0f172a' }}>Innovation Leadership</h3>
          <p className="leading-relaxed" style={{ fontSize: '16px', color: '#475569' }}>
            Align with pioneering research at the intersection of neuroscience, music therapy, and biometric analysis
          </p>
        </div>
        <div>
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-gray-900 font-medium">02</span>
          </div>
          <h3 className="font-semibold mb-3" style={{ fontSize: '22px', color: '#0f172a' }}>Global Platform</h3>
          <p className="leading-relaxed" style={{ fontSize: '16px', color: '#475569' }}>
            Reach forward-thinking audiences through UNESCO Week of Sound and international wellness communities
          </p>
        </div>
        <div>
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-gray-900 font-medium">03</span>
          </div>
          <h3 className="font-semibold mb-3" style={{ fontSize: '22px', color: '#0f172a' }}>Scalable Impact</h3>
          <p className="leading-relaxed" style={{ fontSize: '16px', color: '#475569' }}>
            Be part of expanding research into wellness centers, hospitals, and concert halls worldwide
          </p>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-200 pt-16">
          <p className="uppercase tracking-widest mb-12 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>Sponsorship Tiers</p>
          <div className="space-y-px bg-gray-50">
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
              <div key={idx} className="bg-white p-8 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-bold mb-1" style={{ fontSize: '24px', color: '#0f172a' }}>{item.tier}</h3>
                    <p className="font-medium" style={{ fontSize: '14px', color: '#94a3b8' }}>{item.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ fontSize: '24px', color: '#0f172a' }}>{item.price}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                  {item.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-3">
                      <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                      <p style={{ fontSize: '16px', color: '#475569' }}>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-16 mb-16">
        <div>
          <p className="uppercase tracking-widest mb-4 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>Past Success</p>
          <h3 className="font-bold mb-4" style={{ fontSize: '26px', color: '#0f172a' }}>Biometric Study Phase 1</h3>
          <p className="leading-relaxed mb-4" style={{ fontSize: '17px', color: '#475569' }}>
            Our inaugural study successfully captured comprehensive biometric data across four sessions,
            demonstrating measurable improvements in emotional state, energy levels, mental clarity,
            and spiritual connection.
          </p>
          <p className="leading-relaxed" style={{ fontSize: '17px', color: '#475569' }}>
            Published results showing average improvements of 15-25% across all measured metrics,
            establishing proof of concept for music-breathwork integration.
          </p>
        </div>
      </div>
    </div>
  );
}

function Phase2Content() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative mb-24">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-100 via-blue-50 to-orange-50 rounded-full blur-3xl opacity-30" />
        <div className="relative">
          <p className="uppercase tracking-widest mb-4 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>November 21-23, 2025</p>
          <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: '3.5rem', color: '#0f172a', letterSpacing: '-0.01em' }}>
            Phase 2
          </h2>
          <p className="leading-relaxed max-w-2xl mb-8" style={{ fontSize: '18px', color: '#334155', fontWeight: '400' }}>
            Expanding the frontier of music, breathwork & biometric data at The KINN, Venice, CA
          </p>
          <div className="inline-block px-6 py-3 border" style={{ backgroundColor: 'rgba(248, 250, 252, 0.8)', borderColor: 'rgba(15, 23, 42, 0.15)' }}>
            <p className="font-medium" style={{ fontSize: '14px', color: '#64748b' }}>Featured in</p>
            <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>UNESCO Week of Sound 2026 Los Angeles</p>
          </div>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-200 pt-16">
          <p className="uppercase tracking-widest mb-12 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>Three-Day Agenda</p>
          <div className="space-y-px" style={{ backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
            <div className="p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="mb-2 font-medium" style={{ fontSize: '14px', color: '#94a3b8' }}>Day 1 / Evening</p>
                  <h3 className="font-bold" style={{ fontSize: '26px', color: '#0f172a' }}>VIP Opening Night</h3>
                </div>
                <span className="font-medium" style={{ fontSize: '15px', color: '#94a3b8' }}>Nov 21</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="leading-relaxed" style={{ fontSize: '17px', color: '#475569' }}>
                  Exclusive reception featuring keynote by Dr. Mitch Abrams on the intersection of science,
                  wellness, and human connection.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Keynote presentation by Dr. Mitch Abrams',
                  'Live RADD ART creation by Chao Dou',
                  'Original violin composition by Nathalie Bonin',
                  'I-QRS team presentation',
                  'Sponsor recognition ceremony',
                  'Mental health fundraising'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                    <p style={{ fontSize: '16px', color: '#475569' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="mb-2 font-medium" style={{ fontSize: '14px', color: '#94a3b8' }}>Day 2 / Full Day</p>
                  <h3 className="font-bold" style={{ fontSize: '26px', color: '#0f172a' }}>Research Sessions</h3>
                </div>
                <span className="font-medium" style={{ fontSize: '15px', color: '#94a3b8' }}>Nov 22</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="leading-relaxed" style={{ fontSize: '17px', color: '#475569' }}>
                  Intensive biometric capture sessions featuring live music, guided breathwork, and various
                  modalities with real-time data collection and visualization.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Live musical performance by Nathalie Bonin',
                  'Guided breathwork with Robert Bahedry',
                  'Binaural beats integration',
                  'Movement protocols',
                  'LaseRR protocol testing',
                  'Real-time Aurora Borealis visualization'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                    <p style={{ fontSize: '16px', color: '#475569' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="mb-2 font-medium" style={{ fontSize: '14px', color: '#94a3b8' }}>Day 3 / Full Day</p>
                  <h3 className="font-bold" style={{ fontSize: '26px', color: '#0f172a' }}>"Breathe with the Symphony" Pilot</h3>
                </div>
                <span className="font-medium" style={{ fontSize: '15px', color: '#94a3b8' }}>Nov 23</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="leading-relaxed" style={{ fontSize: '17px', color: '#475569' }}>
                  Groundbreaking pilot synchronizing orchestral music with guided breathwork and live
                  biometric data visualization for collective experience.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Synchronized music and breathwork',
                  'Collective biometric visualization',
                  'ECG and EEG data',
                  'HRV coherence monitoring',
                  'Personalized participant results',
                  'Closing session and data debrief'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                    <p style={{ fontSize: '16px', color: '#475569' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-200 pt-16">
          <p className="uppercase tracking-widest mb-12 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>Technology Platform</p>
          <div className="grid md:grid-cols-3 gap-12">
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
              <div key={idx}>
                <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
                  <span className="font-semibold" style={{ fontSize: '14px', color: '#94a3b8' }}>0{idx + 1}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ fontSize: '20px', color: '#0f172a' }}>{tech.name}</h3>
                <p className="leading-relaxed" style={{ fontSize: '17px', color: '#475569' }}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-16 mb-16">
        <p className="uppercase tracking-widest mb-4 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>RADD ART Integration</p>
        <h3 className="font-bold mb-4" style={{ fontSize: '26px', color: '#0f172a' }}>
          Radiologist Developed Autonomic Rewiring Therapy
        </h3>
        <p className="leading-relaxed mb-4" style={{ fontSize: '17px', color: '#475569' }}>
          Created by Dr. Mitch Abrams through Stanford University's CCARE program, RADD ART
          captures moments of profound insight and translates them into live artistic expressions.
        </p>
        <p className="text-sm text-gray-600 font-light leading-relaxed mb-12">
          Each artwork includes QR codes linking to origin stories, creating lasting legacies for
          sponsors and participants while advancing mental health awareness.
        </p>

        <p className="uppercase tracking-widest mb-8 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>Research Team</p>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold mb-4" style={{ fontSize: '20px', color: '#0f172a' }}>Biometric Study Team</h4>
            <div className="space-y-4">
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Nathalie Bonin</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>Founder, Creative Director & Executive Producer, Grammy-Winning Artist</p>
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Robert Bahedry</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>Two-time Emmy-winning host and certified breathwork practitioner</p>
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Chao Dou</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>Experience strategist, data innovator, and RADD ARTist</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ fontSize: '20px', color: '#0f172a' }}>NexGenHealth Team</h4>
            <div className="space-y-4">
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Dr. Mitch Abrams</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>TEDx Speaker and Stanford-certified compassion educator & Founder of NexGenHealth Foundation</p>
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Jody Bresgi</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>CoFounder of NexGenHealth Foundation</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ fontSize: '20px', color: '#0f172a' }}>I-QRS Team</h4>
            <div className="space-y-4">
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Dr. Gyongyi Szilagyi</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>I-QRS Research Director & VP</p>
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: '17px', color: '#0f172a' }}>Attila Kocsis</p>
                <p className="font-medium" style={{ fontSize: '15px', color: '#64748b' }}>I-QRS Founder, CEO & CTO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phase1Content() {
  return <App />;
}
