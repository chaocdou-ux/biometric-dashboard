import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { colors } from '../lib/designSystem';
import { Calendar, MapPin, Users, Award, CheckCircle, TrendingUp, Heart, Music, Activity, Brain } from 'lucide-react';
import App from '../App';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('study2');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgba(168, 200, 218, 0.1) 0%, rgba(243, 199, 123, 0.1) 100%)' }}>
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/Background\\ 1.jpg)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Biometric Study
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mb-8 drop-shadow">
            Exploring the frontier of music, breathwork & biometric data
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#sponsorship"
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all"
              style={{
                backgroundColor: colors.accentRed,
                color: 'white',
                boxShadow: '0 4px 20px rgba(245, 59, 87, 0.4)'
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('sponsorship');
                document.getElementById('tabs-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Become a Sponsor
            </a>
            <a
              href="#learn-more"
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all border-2"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: colors.deepCharcoal,
                borderColor: 'white'
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('tabs-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div id="tabs-section" className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-2 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <TabsTrigger
              value="study1"
              className="text-base md:text-lg py-4 px-2 rounded-lg data-[state=active]:shadow-lg"
              style={{
                color: colors.deepCharcoal,
                fontWeight: 600
              }}
            >
              Biometric Study 1
            </TabsTrigger>
            <TabsTrigger
              value="study2"
              className="text-base md:text-lg py-4 px-2 rounded-lg data-[state=active]:shadow-lg"
              style={{
                color: colors.deepCharcoal,
                fontWeight: 600
              }}
            >
              Biometric Study 2
            </TabsTrigger>
            <TabsTrigger
              value="sponsorship"
              className="text-base md:text-lg py-4 px-2 rounded-lg data-[state=active]:shadow-lg"
              style={{
                color: colors.deepCharcoal,
                fontWeight: 600
              }}
            >
              Sponsorship
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study1">
            <div className="glass-card">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.deepCharcoal }}>
                Biometric Study 1: Foundation & Results
              </h2>
              <p className="text-lg mb-8" style={{ color: colors.pineGreen }}>
                Explore the groundbreaking results from our first biometric study combining live music, breathwork, and advanced biometric tracking.
              </p>
            </div>
            <App />
          </TabsContent>

          <TabsContent value="study2">
            <Study2Content />
          </TabsContent>

          <TabsContent value="sponsorship">
            <SponsorshipContent setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="py-12 px-4 text-center" style={{ backgroundColor: colors.deepCharcoal, color: 'white' }}>
        <div className="container mx-auto">
          <p className="text-lg mb-2">Kinemuse Productions Inc.</p>
          <p className="mb-4">
            <a href="mailto:nathalie@nathaliebonin.com" className="hover:underline">nathalie@nathaliebonin.com</a> |
            <a href="tel:818-476-2577" className="ml-2 hover:underline">818-476-2577</a>
          </p>
          <p className="text-sm opacity-75">© 2025 Kinemuse Productions Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Study2Content() {
  const agenda = [
    {
      day: 'Day 1 - November 21',
      title: 'VIP Opening Night',
      time: 'Evening',
      description: 'Exclusive reception featuring keynote by Dr. Mitch Abrams, live RADD ART by Chao Dou, and musical performance by Grammy-winning violinist Nathalie Bonin.',
      icon: Award,
      highlights: [
        'Keynote presentation on science, wellness, and human connection',
        'Live RADD ART creation and music improvisation',
        'Meet the Biometric Study team and I-QRS partners',
        'Sponsor recognition and mental health fundraising'
      ]
    },
    {
      day: 'Day 2 - November 22',
      title: 'Research Sessions',
      time: 'Full Day',
      description: 'Intensive biometric capture sessions featuring live music, breathwork, and various modalities with real-time data collection.',
      icon: Activity,
      highlights: [
        'Live musical performance by Nathalie Bonin',
        'Guided breathwork sessions with Robert Bahedry',
        'Binaural beats and brainwave entrainment',
        'Movement integration and LaseRR Protocol',
        'Real-time biometric visualization (Aurora Borealis effect)'
      ]
    },
    {
      day: 'Day 3 - November 23',
      title: '"Breathe with the Symphony" Pilot',
      time: 'Full Day',
      description: 'Groundbreaking pilot of orchestral music synced with guided breathwork and live biometric data visualization.',
      icon: Music,
      highlights: [
        'Synchronized music and breathwork experience',
        'Collective biometric visualization',
        'EEG and HRV group dynamics capture',
        'Participant insights and personalized results',
        'Closing session and data debrief'
      ]
    }
  ];

  const technologies = [
    {
      name: 'I-QRS Chestbelt',
      description: 'High-resolution ECG and HRV data with motion and temperature sensing',
      icon: Heart
    },
    {
      name: 'eMotiv EpocX EEG',
      description: '14-channel EEG for brainwave monitoring and synchronization',
      icon: Brain
    },
    {
      name: 'Wearable Devices',
      description: 'Multiple consumer wearables for comprehensive tracking',
      icon: Activity
    }
  ];

  return (
    <div className="space-y-8">
      <section className="glass-card">
        <div className="flex items-start gap-4 mb-6">
          <Calendar className="w-8 h-8 flex-shrink-0" style={{ color: colors.accentRed }} />
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: colors.deepCharcoal }}>
              Biometric Study Phase 2
            </h2>
            <p className="text-xl mb-4" style={{ color: colors.pineGreen }}>
              Expanding the Frontier of Music, Breathwork & Biometric Data
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(168, 200, 218, 0.2)' }}>
            <Calendar className="w-6 h-6" style={{ color: colors.metrics.emotional }} />
            <div>
              <p className="font-semibold" style={{ color: colors.deepCharcoal }}>November 21-23, 2025</p>
              <p className="text-sm" style={{ color: colors.pineGreen }}>3-Day Immersive Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(243, 199, 123, 0.2)' }}>
            <MapPin className="w-6 h-6" style={{ color: colors.goldenAmber }} />
            <div>
              <p className="font-semibold" style={{ color: colors.deepCharcoal }}>The KINN, Venice, CA</p>
              <p className="text-sm" style={{ color: colors.pineGreen }}>Conscious Entrepreneur Hub</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: 'rgba(245, 59, 87, 0.1)', border: '2px solid rgba(245, 59, 87, 0.3)' }}>
          <div className="flex items-start gap-3 mb-4">
            <Award className="w-6 h-6 flex-shrink-0" style={{ color: colors.accentRed }} />
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.deepCharcoal }}>
                UNESCO Week of Sound 2026
              </h3>
              <p className="leading-relaxed" style={{ color: colors.deepCharcoal }}>
                We are proud to showcase Biometric Study Phase 2 as part of the first edition of <strong>UNESCO Week of Sound 2026 in Los Angeles</strong>. This prestigious platform provides global recognition for our groundbreaking work, offering sponsors the opportunity to be associated with an initiative endorsed and celebrated on the world stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Event Agenda</h2>
        <p className="text-lg mb-8" style={{ color: colors.pineGreen }}>
          A carefully curated three-day journey blending scientific rigor with immersive artistry
        </p>
        <div className="space-y-6">
          {agenda.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border-l-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderColor: colors.metrics[Object.keys(colors.metrics)[idx % 6]]
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${colors.metrics[Object.keys(colors.metrics)[idx % 6]]}20` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: colors.metrics[Object.keys(colors.metrics)[idx % 6]] }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold" style={{ color: colors.deepCharcoal }}>
                      {item.title}
                    </h3>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(125, 141, 116, 0.2)', color: colors.pineGreen }}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm mb-1 font-semibold" style={{ color: colors.pineGreen }}>
                    {item.day}
                  </p>
                  <p className="mb-4" style={{ color: colors.deepCharcoal }}>
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, hidx) => (
                      <li key={hidx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.metrics[Object.keys(colors.metrics)[idx % 6]] }} />
                        <span style={{ color: colors.deepCharcoal }}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Advanced Biometric Technology</h2>
        <p className="text-lg mb-8" style={{ color: colors.pineGreen }}>
          State-of-the-art hardware and AI-driven platforms capturing comprehensive physiological data
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(168, 200, 218, 0.3)'
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.metrics[Object.keys(colors.metrics)[idx % 6]]}20` }}
              >
                <tech.icon className="w-8 h-8" style={{ color: colors.metrics[Object.keys(colors.metrics)[idx % 6]] }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: colors.deepCharcoal }}>
                {tech.name}
              </h3>
              <p className="text-sm" style={{ color: colors.pineGreen }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">RADD ART Experience</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.deepCharcoal }}>
              Radiologist Developed Autonomic Rewiring Therapy
            </h3>
            <p className="mb-4 leading-relaxed" style={{ color: colors.deepCharcoal }}>
              A visionary NexGenHealth initiative created by Dr. Mitch Abrams through Stanford University's Center for Compassion, Altruism Research and Education (CCARE).
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: colors.deepCharcoal }}>
              During the VIP Opening Night, certified RADD ARTist <strong>Chao Dou</strong> will create a live painting inspired by the collective emotional and physiological energy, while <strong>Nathalie Bonin</strong> performs an original violin composition—a live art and music improvisation sparked by shared energy.
            </p>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(243, 199, 123, 0.2)', border: '1px solid rgba(243, 199, 123, 0.4)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: colors.deepCharcoal }}>
                Platinum Sponsorship Benefit
              </p>
              <p className="text-sm" style={{ color: colors.deepCharcoal }}>
                Includes the option to retain the original RADD ART artwork or have it exhibited in an impactful public space with enduring recognition.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              'Live artistic expression capturing profound insights',
              'QR codes linking to origin stories and sponsors',
              'Showcased in hospitals, clinics, galleries, and community hubs',
              'Catalyst for healing, education, and preventative health',
              'Creates lasting legacy for sponsors and participants'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(168, 200, 218, 0.15)' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accentRed }} />
                <span style={{ color: colors.deepCharcoal }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SponsorshipContent({ setActiveTab }) {
  const sponsorshipTiers = [
    {
      tier: 'Visionary',
      price: '$5,000',
      icon: '💎',
      color: colors.accentRed,
      benefits: [
        'Officially named Presenter of the event',
        'Say a few words at the VIP Opening as main sponsor',
        'Includes the original RADD ART piece*',
        'Largest Presenter Banner at the VIP Opening Night',
        'Largest logo on event materials, credits & livestream',
        'Top level acknowledgement in the RADD ART QR Code Art Story (Logo, link, description paragraph, image)',
        'Featured mention in press communications + social media',
        'VIP acknowledgment on stage',
        'Invitation to VIP Reception',
        'Recognition in UNESCO Week of Sound 2026 LA'
      ],
      availability: '1 Available'
    },
    {
      tier: 'Platinum',
      price: '$2,500',
      icon: '💠',
      color: colors.metrics.emotional,
      benefits: [
        'Upsized logo placement on materials and credits',
        'Medium Banner at the VIP Opening Night',
        'Second level acknowledgement in the RADD ART QR Code Art Story (Logo, link, name, tag line)',
        'Recognition during the event and thank-you social posts',
        'Invitation to VIP Reception',
        'Featured in event photo/video content',
        'Recognition in UNESCO Week of Sound 2026 LA'
      ],
      availability: '2 Available'
    },
    {
      tier: 'Gold',
      price: '$1,000',
      icon: '🥇',
      color: colors.goldenAmber,
      benefits: [
        'Standard logo placement on materials + video credits',
        'Third level acknowledgment in the RADD ART QR Code Art Story (Logo, link, name, tag line)',
        'Recognition during the event and thank-you social posts',
        'Invitation to VIP Reception',
        'Social media mentions',
        'Recognition in UNESCO Week of Sound 2026 LA'
      ],
      availability: '5 Available'
    },
    {
      tier: 'Silver',
      price: '$500',
      icon: '🥈',
      color: colors.metrics.clarity,
      benefits: [
        'Mention in event credits, video credit and social media',
        'Silver level acknowledgment in the RADD ART QR Code Art Story (Logo, name)',
        'Invitation to VIP Reception',
        'Recognition in UNESCO Week of Sound 2026 LA'
      ],
      availability: '10 Available'
    },
    {
      tier: 'Bronze',
      price: '$250',
      icon: '🥉',
      color: colors.metrics.tension,
      benefits: [
        'Thank-you mention in event credits and social media',
        'Invitation to VIP Reception',
        'Recognition in UNESCO Week of Sound 2026 LA'
      ],
      availability: 'Unlimited'
    }
  ];

  const activationOptions = [
    {
      type: 'Product Gifting',
      price: 'In-Kind Donation',
      icon: '🧴',
      description: 'Product in guest goodie bags with organic social mentions',
      ideal: 'Health + wellness products, supplements, clean beauty'
    },
    {
      type: 'Event Sponsorship',
      price: '$150',
      icon: '💡',
      description: 'Brand featured at Marina Reset-style event with product sampling and branded presence',
      ideal: 'Fitness apparel, recovery tools, functional nutrition'
    },
    {
      type: 'Product Activation',
      price: '$250',
      icon: '🌴',
      description: 'Brand integrated into event experience with professional content capture',
      ideal: 'Experiential brands, beverages, wellness tech'
    },
    {
      type: 'Custom Co-Branded Experience',
      price: '$350',
      icon: '✨',
      description: 'Fully co-created pop-up with deep storytelling and long-term collaboration',
      ideal: 'Premium lifestyle brands, mindfulness companies'
    }
  ];

  return (
    <div className="space-y-8">
      <section className="glass-card text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ color: colors.deepCharcoal }}>
          Sponsor the Future of Wellness & Innovation
        </h2>
        <p className="text-xl mb-6 max-w-4xl mx-auto" style={{ color: colors.pineGreen }}>
          Position your brand at the forefront of a groundbreaking initiative uniting science, wellness, technology, and the arts—with global recognition through UNESCO Week of Sound 2026.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:nathalie@nathaliebonin.com?subject=Sponsorship%20Inquiry%20-%20Biometric%20Study%202"
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all"
            style={{
              backgroundColor: colors.accentRed,
              color: 'white',
              boxShadow: '0 4px 20px rgba(245, 59, 87, 0.4)'
            }}
          >
            Become a Sponsor
          </a>
          <a
            href="mailto:nathalie@nathaliebonin.com?subject=Sponsorship%20Information%20Request"
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all border-2"
            style={{
              backgroundColor: 'white',
              color: colors.deepCharcoal,
              borderColor: colors.pineGreen
            }}
          >
            Request Info
          </a>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Why Sponsor Biometric Study 2?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Forefront of Innovation',
              description: 'Unite your brand with science, wellness, technology, and the arts to shape the future of human experience'
            },
            {
              icon: Users,
              title: 'High-Value Visibility',
              description: 'Reach forward-thinking audiences in creative, scientific, and wellness tech communities through UNESCO Week of Sound'
            },
            {
              icon: Award,
              title: 'Scalable Growth Potential',
              description: 'Be part of a pioneering project expanding into wellness centers, hospitals, immersive entertainment, and concert halls worldwide'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(168, 200, 218, 0.3)'
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.accentRed}20` }}
              >
                <item.icon className="w-8 h-8" style={{ color: colors.accentRed }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: colors.deepCharcoal }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: colors.pineGreen }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Sponsorship Tiers</h2>
        <p className="text-lg mb-2 text-center" style={{ color: colors.pineGreen }}>
          All sponsors receive:
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {['Invitation to VIP Opening Night Reception', 'Recognition in event communications & social media', 'Exclusive behind-the-scenes updates', 'Association with UNESCO Week of Sound 2026'].map((item, idx) => (
            <span key={idx} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'rgba(243, 199, 123, 0.2)', color: colors.deepCharcoal, border: '1px solid rgba(243, 199, 123, 0.4)' }}>
              ✨ {item}
            </span>
          ))}
        </div>

        <div className="space-y-6">
          {sponsorshipTiers.map((tier, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border-l-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: tier.color
              }}
            >
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{tier.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.deepCharcoal }}>
                      {tier.tier}
                    </h3>
                    <p className="text-sm" style={{ color: colors.pineGreen }}>
                      {tier.availability}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: tier.color }}>
                    {tier.price}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {tier.benefits.map((benefit, bidx) => (
                  <div key={bidx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                    <span className="text-sm" style={{ color: colors.deepCharcoal }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm mt-4 text-center" style={{ color: colors.pineGreen }}>
          * Permanent ownership of the original painting; Intellectual property rights retained by NexGenHealth Foundation.
        </p>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Brand Activation Options</h2>
        <p className="text-lg mb-8 text-center" style={{ color: colors.pineGreen }}>
          Inspired by Marina Reset—Create authentic brand connections through immersive experiences
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {activationOptions.map((option, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(168, 200, 218, 0.3)'
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold" style={{ color: colors.deepCharcoal }}>
                      {option.type}
                    </h3>
                    <span className="text-lg font-bold" style={{ color: colors.accentRed }}>
                      {option.price}
                    </span>
                  </div>
                  <p className="mb-3" style={{ color: colors.pineGreen }}>
                    {option.description}
                  </p>
                  <p className="text-sm italic" style={{ color: colors.deepCharcoal, opacity: 0.8 }}>
                    Ideal for: {option.ideal}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="section-header">Audience Demographics</h2>
        <p className="text-lg mb-8 text-center" style={{ color: colors.pineGreen }}>
          Connect with a curated, high-value wellness community
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: '100% Sold-Out Rate', desc: 'Every event sells out with waitlists' },
            { label: '25-40 Age Range', desc: 'Values wellness & meaningful experiences' },
            { label: '55% Email Open', desc: 'Highly engaged community' },
            { label: '100+ Participants', desc: 'Cumulative retreat attendance' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl" style={{ backgroundColor: 'rgba(243, 199, 123, 0.15)' }}>
              <p className="text-2xl font-bold mb-2" style={{ color: colors.accentRed }}>
                {stat.label}
              </p>
              <p className="text-sm" style={{ color: colors.deepCharcoal }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card text-center" style={{ backgroundColor: `${colors.accentRed}10` }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: colors.deepCharcoal }}>
          Ready to Partner With Us?
        </h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto" style={{ color: colors.pineGreen }}>
          Join us in creating a movement where wellness meets innovation, and art becomes a pathway to human potential. Let's forge lasting connections with a high-value, wellness-focused community.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:nathalie@nathaliebonin.com?subject=Sponsorship%20Partnership%20-%20Biometric%20Study%202"
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all"
            style={{
              backgroundColor: colors.accentRed,
              color: 'white',
              boxShadow: '0 4px 20px rgba(245, 59, 87, 0.4)'
            }}
          >
            Contact Us Today
          </a>
          <button
            onClick={() => setActiveTab('study2')}
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all border-2"
            style={{
              backgroundColor: 'white',
              color: colors.deepCharcoal,
              borderColor: colors.pineGreen
            }}
          >
            View Event Details
          </button>
        </div>
      </section>
    </div>
  );
}
