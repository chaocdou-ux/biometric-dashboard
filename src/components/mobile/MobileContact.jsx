import { useState } from 'react';
import { Send, Mail, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function MobileContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!supabase) {
        throw new Error('Database connection not available. Please ensure environment variables are configured.');
      }

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ])
        .select();

      if (error) throw error;

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('There was an error sending your message. Please try again or email us directly.');
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Message Sent!
            </h1>

            <p className="text-gray-700 leading-relaxed mb-8">
              Thank you for reaching out. We'll get back to you within 24-48 hours.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="w-full px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Have questions about the study? We're here to help
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Direct Email
              </h2>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              For immediate inquiries, reach us at:
            </p>
            <a
              href="mailto:nathalie@nathaliebonin.com"
              className="text-gray-900 font-semibold underline hover:text-gray-700 transition-colors"
            >
              nathalie@nathaliebonin.com
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Your Name *
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => updateFormData('subject', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                } focus:border-gray-900 focus:outline-none transition-colors`}
                disabled={isSubmitting}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="participation">Participation Question</option>
                <option value="research">Research Collaboration</option>
                <option value="media">Media/Press Inquiry</option>
                <option value="sponsorship">Sponsorship Opportunity</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } focus:border-gray-900 focus:outline-none transition-colors resize-none`}
                placeholder="Tell us how we can help..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{submitError}</span>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Your contact information will only be used to respond to your inquiry and will never be shared with third parties. All communications are confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Questions
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does it take to hear back?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We typically respond within 24-48 hours during business days. For urgent matters, please mention that in your message.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I visit the study location?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Yes! We're happy to arrange in-person visits for prospective participants. Please mention your interest when you contact us.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you offer virtual information sessions?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We hold monthly virtual Q&A sessions for interested participants. Reach out to learn about upcoming dates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
