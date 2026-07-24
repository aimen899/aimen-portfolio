import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from "@emailjs/browser";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_1a6asjj",
        "template_30g98fc",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "Bc_EjkPbv3P_bOqPr"
      );

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        onClose();
      }, 2200);

    } catch (error) {
      console.log(error);
      alert("Failed to send message.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#302637]/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl bg-[#F9F5EE] border-2 border-[#8D6AAE]/30 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#302637] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#E8DDF2] hover:bg-[#C9B6E4]/40 text-[#302637] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="hero-heading font-black uppercase text-2xl sm:text-3xl tracking-tight mb-2">
              Let&apos;s Connect
            </h3>
            <p className="text-[#6F6268] text-sm sm:text-base font-normal mb-8">
              Reach out to talk about AI/ML models, software engineering projects, or collaboration opportunities.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#8D6AAE] mb-4" />
                <h4 className="font-bold text-xl uppercase mb-2 text-[#302637]">Message Sent!</h4>
                <p className="text-[#6F6268] text-sm">
                  Thank you for reaching out, Aimen will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#6F6268] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#FFFFFF] border border-[#8D6AAE]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8D6AAE] text-[#302637] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#6F6268] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-[#FFFFFF] border border-[#8D6AAE]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8D6AAE] text-[#302637] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#6F6268] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-[#FFFFFF] border border-[#8D6AAE]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8D6AAE] text-[#302637] resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-full font-medium uppercase tracking-widest text-[#302637] flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #A889C2 0%, #C9B6E4 50%, #8D6AAE 100%)',
                    boxShadow: '0px 4px 14px rgba(141, 106, 174, 0.35)',
                  }}
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-[#8D6AAE]/20 flex items-center justify-between text-xs text-[#6F6268] font-normal">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#8D6AAE]" /> aimenhafeez939@gmail.com
              </span>
              <div className="flex items-center gap-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8D6AAE] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                </a>
                <a href="https://github.com/aimen899" target="_blank" rel="noopener noreferrer" className="hover:text-[#8D6AAE] transition-colors" aria-label="GitHub Profile">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
