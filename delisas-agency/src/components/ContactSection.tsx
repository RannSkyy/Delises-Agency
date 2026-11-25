import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading } from './AnimatedHeading';
import type { ContactFormData, ContactFormErrors } from '../types/delisas';
import { validateContactForm } from '../utils/orderLogic';

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  topic: 'Restaurant Partnership',
  message: '',
};

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormData | null>(null);

  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord(formData);
      setFormData(INITIAL_FORM);
    }, 550);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#E3EAE6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Agency & Kitchen Support Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#4D5851]">Get in Touch</p>
              <AnimatedHeading
                text="Partner With Delisas Agency Or Ask About Orders"
                className="mt-1 font-display text-3xl font-bold tracking-tight text-[#181C19] sm:text-4xl"
              />
              <p className="mt-3 text-base leading-relaxed text-[#515D56]">
                Whether you are onboarding a local restaurant kitchen, planning corporate event
                catering, or need help with an active delivery, our New York team replies within 2 hours.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 rounded-2xl bg-white/90 p-4 border border-white shadow-xs">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF6ED] text-[#58AE52]">
                  <i className="ri-mail-send-line text-lg" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-[#68736C]">Email Support</p>
                  <a
                    href="mailto:hello@delisas.agency"
                    className="font-display text-sm font-bold text-[#181C19] hover:text-[#58AE52]"
                  >
                    hello@delisas.agency
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl bg-white/90 p-4 border border-white shadow-xs">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF6ED] text-[#58AE52]">
                  <i className="ri-customer-service-2-line text-lg" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-[#68736C]">Dispatch Desk</p>
                  <p className="tabular-nums font-display text-sm font-bold text-[#181C19]">
                    +1 (212) 555-0194
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl bg-white/90 p-4 border border-white shadow-xs">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF6ED] text-[#58AE52]">
                  <i className="ri-map-pin-2-line text-lg" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-medium text-[#68736C]">Hub Address</p>
                  <p className="font-display text-sm font-bold text-[#181C19]">
                    345 Hollow Road, New York, NY 10013
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#DCE4DF]"
          >
            {submittedRecord ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF6ED] text-[#58AE52]">
                  <i className="ri-check-double-line text-2xl" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#181C19]">
                  Message Received
                </h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-[#515D56]">
                  Thank you, <span className="font-semibold text-[#181C19]">{submittedRecord.name}</span>.
                  Your inquiry regarding <span className="font-semibold text-[#181C19]">{submittedRecord.topic}</span>{' '}
                  has been logged and our team will reply to{' '}
                  <span className="font-semibold text-[#181C19]">{submittedRecord.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#58AE52] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#489742] cursor-pointer"
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-[#181C19] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Alex Mercer"
                      aria-invalid={Boolean(errors.name)}
                      className={`min-h-[46px] w-full rounded-2xl border bg-[#F9FBFA] px-4 text-sm text-[#181C19] placeholder:text-[#8A968E] focus:bg-white focus:outline-none ${
                        errors.name
                          ? 'border-[#D14B40] focus:border-[#D14B40]'
                          : 'border-[#D3DFD8] focus:border-[#58AE52]'
                      }`}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#C53B30]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-[#181C19] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="alex@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`min-h-[46px] w-full rounded-2xl border bg-[#F9FBFA] px-4 text-sm text-[#181C19] placeholder:text-[#8A968E] focus:bg-white focus:outline-none ${
                        errors.email
                          ? 'border-[#D14B40] focus:border-[#D14B40]'
                          : 'border-[#D3DFD8] focus:border-[#58AE52]'
                      }`}
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#C53B30]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-sm font-semibold text-[#181C19] mb-1.5"
                  >
                    Inquiry Topic
                  </label>
                  <div className="relative">
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => handleChange('topic', e.target.value)}
                      aria-invalid={Boolean(errors.topic)}
                      className={`min-h-[46px] w-full appearance-none rounded-2xl border bg-[#F9FBFA] py-2.5 pr-10 pl-4 text-sm text-[#181C19] focus:bg-white focus:outline-none cursor-pointer ${
                        errors.topic
                          ? 'border-[#D14B40] focus:border-[#D14B40]'
                          : 'border-[#D3DFD8] focus:border-[#58AE52]'
                      }`}
                    >
                      <option value="Restaurant Partnership">Restaurant Partnership</option>
                      <option value="Custom Corporate Catering">Custom Corporate Catering</option>
                      <option value="Order & Delivery Support">Order & Delivery Support</option>
                      <option value="Press & Brand Collaboration">Press & Brand Collaboration</option>
                    </select>
                    <i
                      className="ri-arrow-down-s-line pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg text-[#68736C]"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.topic && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#C53B30]">
                      {errors.topic}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-[#181C19] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your kitchen, catering request, or delivery question..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full rounded-2xl border bg-[#F9FBFA] p-4 text-sm text-[#181C19] placeholder:text-[#8A968E] focus:bg-white focus:outline-none ${
                      errors.message
                        ? 'border-[#D14B40] focus:border-[#D14B40]'
                        : 'border-[#D3DFD8] focus:border-[#58AE52]'
                    }`}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#C53B30]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-[#68736C]">
                    We never share your email or order details with third parties.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#58AE52] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#489742] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-base" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <i className="ri-send-plane-fill text-base" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
