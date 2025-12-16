import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function MobileParticipate({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    eligible: null,
    name: '',
    email: '',
    phone: '',
    referralSource: '',
    wearableDevice: '',
    preferredLocation: '',
    availability: [],
    hasExperience: null,
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (formData.eligible === null) {
        newErrors.eligible = 'Please answer this question';
      }
    }

    if (step === 2) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.referralSource) {
        newErrors.referralSource = 'Please select how you heard about us';
      }
    }

    if (step === 3) {
      if (!formData.wearableDevice) {
        newErrors.wearableDevice = 'Please select your device';
      }
      if (!formData.preferredLocation) {
        newErrors.preferredLocation = 'Please select a location';
      }
      if (formData.availability.length === 0) {
        newErrors.availability = 'Please select at least one time slot';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && formData.eligible === 'no') {
        return;
      }
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase
        .from('participation_applications')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            referral_source: formData.referralSource,
            wearable_device: formData.wearableDevice,
            preferred_location: formData.preferredLocation,
            availability: formData.availability,
            has_experience: formData.hasExperience,
            additional_info: formData.additionalInfo || null,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      setCurrentStep(totalSteps + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const toggleAvailability = (slot) => {
    const current = formData.availability;
    if (current.includes(slot)) {
      updateFormData('availability', current.filter(s => s !== slot));
    } else {
      updateFormData('availability', [...current, slot]);
    }
  };

  if (currentStep === totalSteps + 1) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h1>

            <p className="text-gray-700 leading-relaxed mb-8">
              Thank you for your interest. We'll review your application and get back to you within 3-5 business days.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-semibold text-gray-900 mb-3">What Happens Next</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">1.</span>
                  <span>We'll confirm your eligibility and device compatibility</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">2.</span>
                  <span>You'll receive an email with session dates and setup instructions</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">3.</span>
                  <span>Complete a brief consent form</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">4.</span>
                  <span>Begin your first session!</span>
                </li>
              </ol>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Questions?{' '}
                <a href="mailto:nathalie@nathaliebonin.com" className="text-gray-900 underline hover:text-gray-700">
                  nathalie@nathaliebonin.com
                </a>
              </p>

              <button
                onClick={() => onNavigate('home')}
                className="w-full px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 py-3">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-24 pb-8">
        <div className="max-w-lg mx-auto">
          {currentStep === 1 && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Check Your Eligibility
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Let's make sure this study is a good fit
              </p>

              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Do you meet these criteria?
                </h2>

                <ul className="space-y-3 mb-6 text-gray-700">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Own an Apple Watch, Oura Ring, or similar wearable</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Can attend four 90-minute sessions over 4 weeks</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Age 18 or older</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>No serious health conditions requiring medical clearance</span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={() => updateFormData('eligible', 'yes')}
                    className={`w-full p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.eligible === 'yes'
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                    }`}
                  >
                    Yes, I meet all criteria
                  </button>

                  <button
                    onClick={() => updateFormData('eligible', 'no')}
                    className={`w-full p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.eligible === 'no'
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                    }`}
                  >
                    No, not at this time
                  </button>
                </div>

                {errors.eligible && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.eligible}
                  </p>
                )}
              </div>

              {formData.eligible === 'no' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Stay in Touch
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    We may have future cohorts with different requirements. Feel free to contact us about upcoming opportunities.
                  </p>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
                  >
                    Contact Us
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Your Information
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tell us a bit about yourself
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:border-gray-900 focus:outline-none transition-colors`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-gray-900 focus:outline-none transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="referralSource" className="block text-sm font-semibold text-gray-900 mb-2">
                    How did you hear about this study? *
                  </label>
                  <select
                    id="referralSource"
                    value={formData.referralSource}
                    onChange={(e) => updateFormData('referralSource', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.referralSource ? 'border-red-500' : 'border-gray-300'
                    } focus:border-gray-900 focus:outline-none transition-colors`}
                  >
                    <option value="">Select an option</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend or Colleague</option>
                    <option value="wellness-center">Wellness Center</option>
                    <option value="university">University/Research Institution</option>
                    <option value="web-search">Web Search</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.referralSource && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.referralSource}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Study Preferences
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Help us match you with the right sessions
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="wearableDevice" className="block text-sm font-semibold text-gray-900 mb-2">
                    Which wearable device do you own? *
                  </label>
                  <select
                    id="wearableDevice"
                    value={formData.wearableDevice}
                    onChange={(e) => updateFormData('wearableDevice', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.wearableDevice ? 'border-red-500' : 'border-gray-300'
                    } focus:border-gray-900 focus:outline-none transition-colors`}
                  >
                    <option value="">Select your device</option>
                    <option value="apple-watch">Apple Watch</option>
                    <option value="oura-ring">Oura Ring</option>
                    <option value="muse">Muse Headband</option>
                    <option value="fitbit">Fitbit</option>
                    <option value="whoop">WHOOP</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.wearableDevice && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.wearableDevice}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredLocation" className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Location *
                  </label>
                  <select
                    id="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={(e) => updateFormData('preferredLocation', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.preferredLocation ? 'border-red-500' : 'border-gray-300'
                    } focus:border-gray-900 focus:outline-none transition-colors`}
                  >
                    <option value="">Select a location</option>
                    <option value="downtown">Downtown Studio</option>
                    <option value="westside">Westside Wellness Center</option>
                    <option value="online">Virtual/Online Session</option>
                  </select>
                  {errors.preferredLocation && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.preferredLocation}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Which time slots work for you? * (Select all that apply)
                  </label>
                  <div className="space-y-2">
                    {[
                      'Weekday Mornings (9am-12pm)',
                      'Weekday Afternoons (1pm-4pm)',
                      'Weekday Evenings (6pm-8pm)',
                      'Weekend Mornings (9am-12pm)',
                      'Weekend Afternoons (1pm-4pm)'
                    ].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => toggleAvailability(slot)}
                        className={`w-full p-4 rounded-xl border-2 font-medium text-left transition-all ${
                          formData.availability.includes(slot)
                            ? 'border-gray-900 bg-gray-50 text-gray-900'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            formData.availability.includes(slot)
                              ? 'border-gray-900 bg-gray-900'
                              : 'border-gray-300'
                          }`}>
                            {formData.availability.includes(slot) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span>{slot}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.availability && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.availability}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Have you tried breathwork or sound therapy before?
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateFormData('hasExperience', 'yes')}
                      className={`flex-1 p-3 rounded-xl border-2 font-medium transition-all ${
                        formData.hasExperience === 'yes'
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => updateFormData('hasExperience', 'no')}
                      className={`flex-1 p-3 rounded-xl border-2 font-medium transition-all ${
                        formData.hasExperience === 'no'
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Almost Done!
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Any additional information you'd like to share?
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-900 mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us anything else that might be helpful..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Before You Submit</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>All data will be kept confidential and anonymized</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>You can withdraw from the study at any time</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>We'll follow up within 3-5 business days</span>
                    </li>
                  </ul>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-12">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all disabled:opacity-50"
                style={{ minHeight: '48px' }}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={formData.eligible === 'no'}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '48px' }}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
                style={{ minHeight: '48px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
