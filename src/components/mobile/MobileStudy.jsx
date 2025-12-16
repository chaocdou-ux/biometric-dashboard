import { Activity, Music, Heart, Target, Shield } from 'lucide-react';

export default function MobileStudy({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            The Study
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Exploring how integrative wellness practices impact human physiology
          </p>
        </div>
      </section>

      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What We're Measuring
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            This study combines real-time biometric data with self-reported assessments to explore the intersection of mind, body, and creative expression.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Physical Metrics</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Heart rate variability, stress levels, and recovery scores captured via wearables
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Psychological Markers</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Emotional state, mental clarity, and perceived stress assessments
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Music className="w-6 h-6 text-amber-600" />
                <h3 className="font-semibold text-gray-900">Holistic Wellbeing</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Body tension, energy levels, and spiritual connection
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Study Design
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Participants attend four 90-minute sessions over four weeks, experiencing:
          </p>

          <div className="space-y-5">
            {[
              {
                icon: Music,
                title: 'Sound Therapy',
                description: 'Guided soundscapes designed to promote relaxation and presence'
              },
              {
                icon: Activity,
                title: 'Breathwork',
                description: 'Structured breathing techniques to regulate the nervous system'
              },
              {
                icon: Heart,
                title: 'Movement',
                description: 'Somatic practices encouraging mind-body connection'
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Makes This Different
          </h2>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <Target className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Multi-Modal Approach</p>
                <p className="text-gray-700 leading-relaxed">
                  We integrate breathwork, sound, and movement rather than studying them in isolation
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Target className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Consumer-Grade Tech</p>
                <p className="text-gray-700 leading-relaxed">
                  Using everyday wearables makes findings accessible and applicable
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Target className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Subjective + Objective</p>
                <p className="text-gray-700 leading-relaxed">
                  Combining biometric data with personal experience gives a complete picture
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 bg-white">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              Privacy & Ethics
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            This study follows research ethics guidelines. All data is:
          </p>

          <ul className="space-y-3 mb-8">
            {[
              'Fully anonymized and de-identified',
              'Stored securely with encryption',
              'Only used for research purposes',
              'Never shared with third parties'
            ].map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-gray-900 font-bold">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-gray-600 leading-relaxed">
            Participants can withdraw at any time, and all data collection follows informed consent procedures.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Participating?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Our next cohort begins soon
          </p>

          <button
            onClick={() => onNavigate('participate')}
            className="w-full px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg"
            style={{ minHeight: '48px' }}
          >
            Sign Up for the Study
          </button>
        </div>
      </section>
    </div>
  );
}
