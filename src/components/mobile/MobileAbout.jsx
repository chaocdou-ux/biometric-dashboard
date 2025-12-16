import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, Users, Lightbulb, Target } from 'lucide-react';

function TeamMemberCard({ name, role, shortBio, fullBio }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left"
        aria-expanded={isExpanded}
        aria-controls={`bio-${name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {name}
            </h3>
            <p className="text-sm font-medium text-gray-600 mb-2">
              {role}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {shortBio}
            </p>
          </div>
          <div className="flex-shrink-0 pt-1">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div
          id={`bio-${name.replace(/\s+/g, '-').toLowerCase()}`}
          className="px-5 pb-5 pt-2 border-t border-gray-100"
        >
          <div className="text-gray-700 leading-relaxed space-y-3">
            {fullBio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MobileAbout({ onNavigate }) {
  const teamMembers = [
    {
      name: 'Dr. Nathalie Bonin',
      role: 'Principal Investigator',
      shortBio: 'Researcher exploring biometrics, wellness, and creative expression',
      fullBio: `Dr. Bonin leads this interdisciplinary research project, bringing expertise in human performance, technology, and integrative wellness practices.

With a background in both scientific research and holistic health, she bridges empirical measurement and lived experience. Her work focuses on making wellness research accessible and applicable to everyday life.`
    },
    {
      name: 'Sarah Chen',
      role: 'Sound Therapy Practitioner',
      shortBio: 'Certified sound healer integrating music therapy with biometric feedback',
      fullBio: `Sarah brings 12 years of experience in sound healing and music therapy. She designs the sonic landscapes used in each session, combining traditional instruments with modern audio technology.

Her approach is rooted in both ancient healing traditions and contemporary neuroscience research on sound's effects on the nervous system.`
    },
    {
      name: 'Marcus Thompson',
      role: 'Movement & Breathwork Facilitator',
      shortBio: 'Somatic educator specializing in nervous system regulation',
      fullBio: `Marcus guides participants through breathwork and somatic movement practices designed to calm the nervous system and enhance mind-body awareness.

Trained in multiple modalities including pranayama and trauma-informed movement, he creates safe, accessible experiences for all levels.`
    },
    {
      name: 'Dr. Elena Rodriguez',
      role: 'Data Scientist',
      shortBio: 'Biometric data analyst with expertise in wearable technology research',
      fullBio: `Dr. Rodriguez manages the technical infrastructure for data collection and analysis. She ensures that biometric data from various wearables is accurately captured and interpreted.

With a PhD in biostatistics, she specializes in making complex physiological data meaningful to individual participants.`
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About the Project
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Why we're exploring the measurable impact of integrative wellness
          </p>
        </div>
      </section>

      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Ancient wellness practices have profound value, but they've often been separated from rigorous measurement and scientific inquiry.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This study bridges that gap, combining breathwork, sound therapy, and movement with real-time biometric tracking to understand what truly supports human wellbeing.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What Guides Our Work
          </h2>

          <div className="space-y-5">
            {[
              {
                icon: Target,
                color: 'blue',
                title: 'Evidence-Based Curiosity',
                description: 'We approach wellness with scientific rigor and openness to experience'
              },
              {
                icon: Heart,
                color: 'green',
                title: 'Human-Centered Research',
                description: 'Every participant matters. We design with respect and accessibility'
              },
              {
                icon: Lightbulb,
                color: 'amber',
                title: 'Accessible Innovation',
                description: 'We use consumer-grade technology for practical, applicable findings'
              },
              {
                icon: Users,
                color: 'purple',
                title: 'Interdisciplinary Collaboration',
                description: 'We bring together experts from science, wellness, music, and art'
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${item.color}-50 flex items-center justify-center`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-700`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Meet the Team
          </h2>
          <p className="text-gray-600 text-center mb-10 leading-relaxed">
            Tap to learn more about each team member
          </p>

          <div className="space-y-4">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                shortBio={member.shortBio}
                fullBio={member.fullBio}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Research Community
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Be part of advancing our understanding of integrative wellness
          </p>

          <button
            onClick={() => onNavigate('participate')}
            className="w-full px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg"
            style={{ minHeight: '48px' }}
          >
            Participate in the Study
          </button>
        </div>
      </section>
    </div>
  );
}
