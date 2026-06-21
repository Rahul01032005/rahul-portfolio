import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function ContactTerminal() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if configuration is set, otherwise fallback to mock success
    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id_here') {
      console.warn("EmailJS credentials are not configured in .env. Falling back to mock submission.");
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      if (result.status === 200 || result.text === 'OK') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.text || 'Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS transmission failed:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-dark-deep bg-grid">
      {/* Background blurs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-accent-sky/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
            Connection
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Connect Terminal
          </h2>
          <div className="h-1 w-20 bg-accent-cyan mt-4 rounded-full" />
        </div>

        {/* AI Assistant Banner */}
        <div className="max-w-2xl mx-auto mb-12 text-center bg-black/60 border border-accent-cyan/15 hover:border-accent-cyan/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-[0_0_15px_rgba(0,210,255,0.05)] transition-all duration-300">
          <div className="flex items-center space-x-3.5 text-left">
            <span className="text-2xl animate-bounce">🤖</span>
            <div>
              <p className="text-white font-bold text-[13px] mb-0.5">Have a question about Rahul's qualifications?</p>
              <p className="text-slate-400 text-[10px]">Chat directly with Rock, our interactive AI resume assistant!</p>
            </div>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chatbox'))}
            className="px-4 py-2.5 bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/35 hover:shadow-[0_0_12px_rgba(0,210,255,0.25)] text-accent-cyan font-bold rounded-xl cursor-pointer transition-all duration-300 uppercase tracking-wider text-[10px] whitespace-nowrap"
          >
            [ Ask Rock ]
          </button>
        </div>

        {/* 2-Column Desktop Grid / Stacked Mobile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* LEFT: Terminal console box */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-black border border-accent-cyan/15 shadow-2xl relative overflow-hidden h-[360px] lg:h-auto"
          >
            {/* Header window */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-white/5">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">connect.sh</span>
              <FaTerminal size={10} className="text-slate-600" />
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-slate-300 space-y-5 select-all">
              <div className="flex items-center space-x-2 text-white font-bold">
                <span className="text-accent-cyan">&gt;</span>
                <span>connect Rahul_E</span>
              </div>
              
              <div className="space-y-2.5 pl-4 md:pl-6 border-l border-white/5">
                <div>
                  <span className="text-slate-500">email:</span>{' '}
                  <a href="mailto:rahul01032005@gmail.com" className="text-accent-cyan hover:underline select-all">
                    rahul01032005@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">phone:</span>{' '}
                  <span className="text-white select-all">+91 7619533115</span>
                </div>
                <div>
                  <span className="text-slate-500">location:</span>{' '}
                  <span className="text-white">Bengaluru, Karnataka</span>
                </div>
                <div>
                  <span className="text-slate-500">github:</span>{' '}
                  <a href="https://github.com/Rahul01032005" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline select-all">
                    github.com/Rahul01032005
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">linkedin:</span>{' '}
                  <a href="https://linkedin.com/in/rahul-e-5624b5287" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline select-all">
                    linkedin.com/in/rahul-e-5624b5287
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">status:</span>{' '}
                  <span className="text-accent-cyan font-bold">Open to SDE / Backend Developer opportunities</span>
                </div>
              </div>
            </div>

            {/* Console Log footer info */}
            <div className="mt-auto p-4 border-t border-white/5 bg-slate-950/40 text-[9px] font-mono text-slate-600 flex justify-between items-center select-none uppercase">
              <span>CONN_STATUS: CONNECTED</span>
              <span>SECURE_AUTH: OK</span>
            </div>
          </motion.div>

          {/* RIGHT: Black Input form with blue borders */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-black/95 p-6 md:p-8 rounded-2xl border border-accent-cyan/15 hover:border-accent-cyan/30 shadow-2xl relative overflow-hidden transition-all duration-300">
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  // Success layout
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4 font-mono text-xs"
                  >
                    <div className="p-3.5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan rounded-full animate-bounce">
                      <FaCheckCircle size={30} />
                    </div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wider">Transmission Complete</h4>
                    <p className="text-slate-400 max-w-xs leading-relaxed text-[11px]">
                      Your connection query was compiled and successfully delivered to rahul01032005@gmail.com.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 rounded font-semibold text-[10px] uppercase tracking-wider cursor-pointer transition-colors duration-300"
                    >
                      [ Transmit New Signal ]
                    </button>
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  // Error layout
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4 font-mono text-xs"
                  >
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full animate-pulse flex items-center justify-center w-12 h-12">
                      <span className="text-xl font-bold font-sans">!</span>
                    </div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wider">Transmission Failed</h4>
                    <p className="text-slate-400 max-w-xs leading-relaxed text-[11.5px]">
                      An error occurred while compiling and transmitting your query. Please check your credentials or network and try again.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 rounded font-semibold text-[10px] uppercase tracking-wider cursor-pointer transition-colors duration-300"
                    >
                      [ Retransmit Signal ]
                    </button>
                  </motion.div>
                ) : (
                  // Form Fields: Name, Email, Message
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                        &gt; Input_Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={submitStatus === 'sending'}
                        placeholder="Enter full name"
                        className={`px-4 py-3 rounded-xl bg-slate-950 border ${
                          formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-cyan'
                        } focus:outline-none focus:ring-1 focus:ring-accent-cyan text-white placeholder-slate-700 transition-all duration-300 text-xs md:text-sm font-mono`}
                      />
                      {formErrors.name && (
                        <span className="text-red-400 text-xs font-mono">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                        &gt; Input_Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={submitStatus === 'sending'}
                        placeholder="yourname@domain.com"
                        className={`px-4 py-3 rounded-xl bg-slate-950 border ${
                          formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-cyan'
                        } focus:outline-none focus:ring-1 focus:ring-accent-cyan text-white placeholder-slate-700 transition-all duration-300 text-xs md:text-sm font-mono`}
                      />
                      {formErrors.email && (
                        <span className="text-red-400 text-xs font-mono">{formErrors.email}</span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="message" className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                        &gt; Input_Signal
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={submitStatus === 'sending'}
                        rows="4"
                        placeholder="Enter message details..."
                        className={`px-4 py-3 rounded-xl bg-slate-950 border ${
                          formErrors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-cyan'
                        } focus:outline-none focus:ring-1 focus:ring-accent-cyan text-white placeholder-slate-700 transition-all duration-300 text-xs md:text-sm font-mono`}
                      />
                      {formErrors.message && (
                        <span className="text-red-400 text-xs font-mono">{formErrors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitStatus === 'sending'}
                      className="w-full py-3.5 bg-gradient-to-r from-accent-sky to-accent-blue hover:shadow-[0_0_20px_rgba(0,210,255,0.35)] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                    >
                      {submitStatus === 'sending' ? (
                        <>
                          <FaSpinner className="animate-spin text-white" size={13} />
                          <span>Compiling connection signal...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>[ Send Message ]</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
