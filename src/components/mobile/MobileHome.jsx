import { ArrowRight, Activity, Music, Heart, Users, CheckCircle } from 'lucide-react';

export default function MobileHome({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Optimized for 375px viewport, visible above fold */}
      <section className="px-4 pt-24 pb-12">
        <div className="max-w-lg mx-auto text-center">
          {/* Clear headline - under 10 words */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Where Science Meets Wellness
          </h1>

          {/* One-sentence subheading explaining the study */}
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We combine biometrics, movement, music, and art to explore what truly supports human wellbeing
          </p>

          {/* Primary and Secondary CTAs - both visible above fold */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('participate')}
              className="w-full px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg"
              style={{ minHeight: '48px' }}
            >
              Join the Study
            </button>

            <button
              onClick={() => onNavigate('study')}
              className="w-full px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
              style={{ minHeight: '48px' }}
            >
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* What This Study Is - 3 concise benefits */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What We Measure
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4 items-start p-5 rounded-xl bg-white border border-gray-200">
              <Activity className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Real-Time Biometrics
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Track heart rate variability and stress markers using your wearable device
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-5 rounded-xl bg-white border border-gray-200">
              <Music className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Integrative Practices
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Experience breathwork, sound therapy, and movement in guided sessions
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-5 rounded-xl bg-white border border-gray-200">
              <Heart className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Holistic Wellbeing
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover connections between physical markers and emotional states
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 4 clear steps */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            How It Works
          </h2>
          <p className="text-gray-600 text-center mb-10 leading-relaxed">
            A simple 4-session journey
          </p>

          <div className="space-y-6">
            {[
              {
                number: '1',
                title: 'Sign Up',
                description: 'Complete a quick form and sync your wearable device'
              },
              {
                number: '2',
                title: 'Attend Sessions',
                description: 'Join 4 facilitated breathwork and sound therapy experiences'
              },
              {
                number: '3',
                title: 'Track Biometrics',
                description: 'Your device captures heart rate, HRV, and recovery data'
              },
              {
                number: '4',
                title: 'Get Insights',
                description: 'Receive a personalized report on how practices affected you'
              }
            ].map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('participate')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Is This Right for You?
          </h2>
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            We're looking for participants who:
          </p>

          <div className="space-y-3">
            {[
              'Own an Apple Watch, Oura Ring, or similar wearable',
              'Can attend four 90-minute sessions over 4 weeks',
              'Are curious about mind-body wellness practices',
              'Want to understand their biometric responses'
            ].map((criterion, index) => (
              <div key={index} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 leading-relaxed">{criterion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Research-Backed Approach
          </h2>

          <div className="grid grid-cols-1 gap-5">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <Users className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-2">
                Peer-Reviewed Protocols
              </p>
              <p className="text-sm text-gray-700">
                Study design follows established biometric research standards
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <Activity className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-2">
                Privacy-First Data Handling
              </p>
              <p className="text-sm text-gray-700">
                All data is anonymized and protected under research ethics guidelines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Participate?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Join our next cohort
          </p>

          <button
            onClick={() => onNavigate('participate')}
            className="w-full px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg mb-4"
            style={{ minHeight: '48px' }}
          >
            Join the Study
          </button>

          <p className="text-sm text-gray-500">
            Have questions?{' '}
            <button
              onClick={() => onNavigate('contact')}
              className="underline hover:text-gray-900 transition-colors font-medium"
            >
              Get in touch
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
