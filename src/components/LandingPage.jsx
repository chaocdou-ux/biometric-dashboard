import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import App from '../App';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('sponsorship');

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-light tracking-tight text-gray-900">Biometric Study</h1>
              <p className="text-xs text-gray-500 font-light">Experimental Laboratory. Next Generation.</p>
            </div>
            <a
              href="mailto:nathalie@nathaliebonin.com?subject=Sponsorship%20Inquiry"
              className="px-6 py-2.5 text-sm font-normal bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Inquire
            </a>
          </div>
        </div>
      </header>

      <div className="pt-24">
        <div className="container mx-auto px-6 py-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center gap-8 mb-16 bg-transparent border-b border-gray-100">
              <TabsTrigger
                value="sponsorship"
                className="px-0 py-4 text-sm font-light tracking-wide uppercase bg-transparent border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 text-gray-400 rounded-none"
              >
                Sponsorship
              </TabsTrigger>
              <TabsTrigger
                value="study2"
                className="px-0 py-4 text-sm font-light tracking-wide uppercase bg-transparent border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 text-gray-400 rounded-none"
              >
                Study 2 Agenda
              </TabsTrigger>
              <TabsTrigger
                value="study1"
                className="px-0 py-4 text-sm font-light tracking-wide uppercase bg-transparent border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 text-gray-400 rounded-none"
              >
                Study 1 Archive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sponsorship">
              <SponsorshipContent />
            </TabsContent>

            <TabsContent value="study2">
              <Study2Content />
            </TabsContent>

            <TabsContent value="study1">
              <Study1Content />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="border-t border-gray-100 mt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-light">Kinemuse Productions Inc.</p>
            <p className="text-sm text-gray-400 font-light mt-2">
              <a href="mailto:nathalie@nathaliebonin.com" className="hover:text-gray-900">nathalie@nathaliebonin.com</a>
              <span className="mx-2">·</span>
              <a href="tel:818-476-2577" className="ml-2 hover:text-gray-900">818-476-2577</a>
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
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">Partnership Opportunity</p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Sponsor the Future of<br />Wellness & Innovation
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl">
            Position your brand at the forefront of groundbreaking research uniting science, wellness,
            technology, and the arts—with global recognition through UNESCO Week of Sound 2026.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-16 mb-32">
        <div>
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-gray-900">01</span>
          </div>
          <h3 className="text-xl font-normal mb-3 text-gray-900">Innovation Leadership</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Align with pioneering research at the intersection of neuroscience, music therapy, and biometric analysis
          </p>
        </div>
        <div>
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-gray-900">02</span>
          </div>
          <h3 className="text-xl font-normal mb-3 text-gray-900">Global Platform</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Reach forward-thinking audiences through UNESCO Week of Sound and international wellness communities
          </p>
        </div>
        <div>
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-gray-900">03</span>
          </div>
          <h3 className="text-xl font-normal mb-3 text-gray-900">Scalable Impact</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Be part of expanding research into wellness centers, hospitals, and concert halls worldwide
          </p>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-100 pt-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-12 font-light">Sponsorship Tiers</p>
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
                    <h3 className="text-2xl font-light text-gray-900 mb-1">{item.tier}</h3>
                    <p className="text-xs text-gray-400 font-light">{item.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light text-gray-900">{item.price}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                  {item.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-3">
                      <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600 font-light">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-100 pt-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-12 font-light">Audience Insights</p>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { metric: '100%', label: 'Sold-Out Rate' },
              { metric: '25-40', label: 'Core Age Range' },
              { metric: '55%', label: 'Email Engagement' },
              { metric: '100+', label: 'Prior Participants' }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-light text-gray-900 mb-2">{stat.metric}</p>
                <p className="text-sm text-gray-500 font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mb-32">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-100 via-blue-50 to-orange-50 rounded-full blur-3xl opacity-30" />
        <div className="relative bg-white border border-gray-100 p-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-light">Sponsor Inquiry</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-light">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 font-light placeholder-gray-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-light">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 font-light placeholder-gray-300"
                  placeholder="Company name"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-light">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 font-light placeholder-gray-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-light">Tier Interest</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 font-light"
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
              <label className="block text-sm text-gray-700 mb-2 font-light">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-gray-900 font-light placeholder-gray-300 resize-none"
                placeholder="Tell us about your partnership goals"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white text-sm font-normal rounded-full hover:bg-gray-800 transition-colors"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-16 mb-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">Past Success</p>
            <h3 className="text-2xl font-light text-gray-900 mb-4">Biometric Study Phase 1</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
              Our inaugural study successfully captured comprehensive biometric data across four sessions,
              demonstrating measurable improvements in emotional state, energy levels, mental clarity,
              and spiritual connection.
            </p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Published results showing average improvements of 15-25% across all measured metrics,
              establishing proof of concept for music-breathwork integration.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">Contact</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-700 font-light">Nathalie Bonin</p>
                <p className="text-sm text-gray-400 font-light">Founder & Creative Director</p>
              </div>
              <div>
                <a href="mailto:nathalie@nathaliebonin.com" className="text-sm text-gray-900 hover:text-gray-600 font-light">
                  nathalie@nathaliebonin.com
                </a>
              </div>
              <div>
                <a href="tel:818-476-2577" className="text-sm text-gray-900 hover:text-gray-600 font-light">
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
    <div className="max-w-6xl mx-auto">
      <div className="relative mb-24">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-100 via-blue-50 to-orange-50 rounded-full blur-3xl opacity-30" />
        <div className="relative">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">November 21-23, 2025</p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Biometric Study<br />Phase 2
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl mb-8">
            Expanding the frontier of music, breathwork & biometric data at The KINN, Venice, CA
          </p>
          <div className="inline-block bg-gray-50 px-6 py-3 border border-gray-200">
            <p className="text-xs text-gray-500 font-light">Featured in</p>
            <p className="text-sm text-gray-900 font-normal">UNESCO Week of Sound 2026 Los Angeles</p>
          </div>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-100 pt-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-12 font-light">Three-Day Agenda</p>
          <div className="space-y-px bg-gray-50">
            <div className="bg-white p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-light">Day 1 / Evening</p>
                  <h3 className="text-2xl font-light text-gray-900">VIP Opening Night</h3>
                </div>
                <span className="text-sm text-gray-400 font-light">Nov 21</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600 font-light leading-relaxed">
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
                    <p className="text-sm text-gray-500 font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-light">Day 2 / Full Day</p>
                  <h3 className="text-2xl font-light text-gray-900">Research Sessions</h3>
                </div>
                <span className="text-sm text-gray-400 font-light">Nov 22</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600 font-light leading-relaxed">
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
                    <p className="text-sm text-gray-500 font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-light">Day 3 / Full Day</p>
                  <h3 className="text-2xl font-light text-gray-900">"Breathe with the Symphony" Pilot</h3>
                </div>
                <span className="text-sm text-gray-400 font-light">Nov 23</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Groundbreaking pilot synchronizing orchestral music with guided breathwork and live
                  biometric data visualization for collective experience.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Synchronized music and breathwork',
                  'Collective biometric visualization',
                  'EEG group dynamics capture',
                  'HRV coherence monitoring',
                  'Personalized participant results',
                  'Closing session and data debrief'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-500 font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-32">
        <div className="border-t border-gray-100 pt-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-12 font-light">Technology Platform</p>
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
                  <span className="text-xs text-gray-400">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-normal mb-2 text-gray-900">{tech.name}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">RADD ART Integration</p>
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Radiologist Developed Autonomic Rewiring Therapy
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
              Created by Dr. Mitch Abrams through Stanford University's CCARE program, RADD ART
              captures moments of profound insight and translates them into live artistic expressions.
            </p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Each artwork includes QR codes linking to origin stories, creating lasting legacies for
              sponsors and participants while advancing mental health awareness.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">Research Team</p>
            <div className="space-y-6">
              {[
                { name: 'Nathalie Bonin', role: 'Grammy-winning violinist & composer' },
                { name: 'Dr. Mitch Abrams', role: 'NexGenHealth founder, Stanford CCARE educator' },
                { name: 'Robert Bahedry', role: '2x Emmy-winning breathwork facilitator' },
                { name: 'Chao Dou', role: 'RADD ARTist & experience designer' },
                { name: 'Dr. Gyongyi Szilagyi', role: 'I-QRS Research Director & VP' },
                { name: 'Attila Kocsis', role: 'I-QRS Founder, CEO & CTO' }
              ].map((person, idx) => (
                <div key={idx}>
                  <p className="text-sm text-gray-900 font-normal">{person.name}</p>
                  <p className="text-xs text-gray-500 font-light">{person.role}</p>
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">Archive</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">
          Biometric Study Phase 1
        </h2>
        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-3xl">
          Foundational research exploring the physiological effects of live music combined with breathwork,
          establishing proof of concept and measurable outcomes across multiple wellness metrics.
        </p>
      </div>
      <div className="bg-gray-50 p-1">
        <div className="bg-white p-8">
          <App />
        </div>
      </div>
    </div>
  );
}
