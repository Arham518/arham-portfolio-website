import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Download, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Have an open role, a web project, or just want to chat about React and frontend tech? My inbox is always open.
          </p>
        </div>

        {/* Hiring Highlight Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Immediate Availability
            </div>
            <h3 className="text-lg sm:text-xl font-bold">Open to Full-Time &amp; Remote Roles</h3>
            <p className="text-xs sm:text-sm text-indigo-200">
              BS Computer Science Graduate · Frontend React Developer · Based in Karachi, PK
            </p>
          </div>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold text-sm hover:bg-indigo-50 active:scale-95 shadow-md transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Email Me Directly</span>
          </a>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Contact Information</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Feel free to reach out directly through email, phone, or connect on LinkedIn and GitHub.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 text-sm transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Email</span>
                  <span className="font-semibold text-slate-800 group-hover:text-indigo-600">{PERSONAL_INFO.email}</span>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 text-sm transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Phone</span>
                  <span className="font-semibold text-slate-800 group-hover:text-indigo-600">{PERSONAL_INFO.phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Location</span>
                  <span className="font-semibold text-slate-800">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs sm:text-sm font-semibold transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-xs sm:text-sm font-semibold transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-600" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Download Resume Button */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Arham_Bhatti_Resume.pdf"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold text-sm hover:bg-indigo-100 transition-all shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Resume (PDF)</span>
            </a>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send a Message</h3>
            <p className="text-slate-600 text-sm mb-6">
              Fill out the form below and I will respond to your inquiry as soon as possible.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Message Prepared!</h4>
                <p className="text-sm text-emerald-700">
                  Thank you, <strong>{formData.name}</strong>. If your email client did not open automatically, you can email me directly at <a href={`mailto:${PERSONAL_INFO.email}`} className="underline font-semibold">{PERSONAL_INFO.email}</a>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-800 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-800 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-98 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
