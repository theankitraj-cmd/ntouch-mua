"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Calendar } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { sendBookingEmails } from "@/app/actions/booking";

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BookingSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    eventType: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep((s) => s + 1);

  return (
    <section id="booking" className="relative py-section overflow-hidden bg-white section-optimize">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Reservations</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-plum mb-10 leading-none">
            Your transformation <br /> <span className="italic text-blush-500">starts here.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <motion.button
            onClick={() => { setIsOpen(true); setStep(0); setSubmitted(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-full bg-black text-white font-display text-xl tracking-wide shadow-2xl flex items-center gap-4 mx-auto cursor-pointer perf-gpu"
          >
            Start Booking <ArrowRight className="w-5 h-5" />
          </motion.button>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-surface-elevated/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 sm:p-12"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-plum/10 hover:bg-plum/20 flex items-center justify-center cursor-pointer transition-colors border border-plum/10">
              <X className="w-6 h-6 text-plum" />
            </button>

            {step > 0 && step < 7 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-2">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-blush-500" : "w-3 bg-blush-200"}`} />
                 ))}
              </div>
            )}

            <div className="w-full max-w-2xl relative min-h-[400px] flex items-center justify-center perf-gpu">
              <AnimatePresence mode="wait">
                 {step === 0 && (
                   <motion.div key="step0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="text-center w-full">
                     <h3 className="font-display text-5xl md:text-6xl text-plum mb-6">Ready for your magic?</h3>
                     <p className="font-body text-xl text-plum-soft mb-12">I'll ask a few quick questions to personalize your experience.</p>
                     <button onClick={nextStep} className="px-10 py-4 bg-blush-500 hover:bg-blush-600 text-white rounded-full font-body tracking-widest text-sm uppercase cursor-pointer transition-colors shadow-xl">
                       Let&apos;s Begin
                     </button>
                   </motion.div>
                 )}

                 {step === 1 && (
                   <motion.div key="step1" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">Hi! What's your beautiful name?</h3>
                     <input autoFocus type="text" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} onKeyDown={(e) => e.key === "Enter" && formState.name && nextStep()} className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 placeholder:text-plum/20" placeholder="Type your name..." />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={!formState.name} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">OK <Check className="w-4 h-4" /></button>
                       <span className="text-sm text-plum/40">press Enter ↵</span>
                     </div>
                   </motion.div>
                 )}

                 {step === 2 && (
                   <motion.div key="step2" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">When is the big day?</h3>
                     <input autoFocus type="date" value={formState.date} onChange={(e) => { setFormState({...formState, date: e.target.value}); }} className="w-full text-3xl md:text-4xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 text-left" />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={!formState.date} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">Continue <Check className="w-4 h-4" /></button>
                     </div>
                   </motion.div>
                 )}

                 {step === 3 && (
                   <motion.div key="step3" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">What kind of magic?</h3>
                     <div className="flex flex-col gap-3">
                       {["Bridal Makeup", "Party / Reception", "Engagement", "Editorial / Photoshoot"].map((type) => (
                         <button key={type} onClick={() => { setFormState({...formState, eventType: type}); setTimeout(nextStep, 300); }} className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all cursor-pointer font-body text-xl md:text-2xl ${formState.eventType === type ? 'border-blush-500 bg-blush-50 text-plum' : 'border-blush-100 bg-white hover:border-blush-300 text-plum/70'}`}>{type}</button>
                       ))}
                     </div>
                   </motion.div>
                 )}

                 {step === 4 && (
                   <motion.div key="step4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">Phone number for details?</h3>
                     <input autoFocus type="tel" value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})} onKeyDown={(e) => e.key === "Enter" && formState.phone.length >= 10 && nextStep()} className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 placeholder:text-plum/20" placeholder="+91 89691 84453" />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={formState.phone.length < 10} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">Continue <Check className="w-4 h-4" /></button>
                       <span className="text-sm text-plum/40">press Enter ↵</span>
                     </div>
                   </motion.div>
                 )}

                 {step === 5 && (
                   <motion.div key="step5" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">Email for confirmation?</h3>
                     <input autoFocus type="email" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} onKeyDown={(e) => e.key === "Enter" && formState.email.includes("@") && nextStep()} className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 placeholder:text-plum/20" placeholder="your@email.com" />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={!formState.email.includes("@")} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">Nearly done <Check className="w-4 h-4" /></button>
                       <span className="text-sm text-plum/40">press Enter ↵</span>
                     </div>
                   </motion.div>
                 )}

                 {step === 6 && (
                   <motion.div key="step6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-3xl md:text-4xl text-plum mb-6">Tell us about your dream look.</h3>
                     <textarea autoFocus rows={3} value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="w-full text-xl md:text-2xl font-light text-plum bg-white/50 border-2 border-blush-200 focus:border-blush-500 outline-none p-6 rounded-3xl resize-none placeholder:text-plum/30 mb-8 shadow-inner" placeholder="I&apos;m wearing a red Sabyasachi lehenga..." />
                     <div className="relative w-full sm:w-64 max-w-full">
                        {!submitted ? (
                          <motion.button
                            type="button"
                            onDoubleClick={async (e) => {
                              e.preventDefault();
                              if (isSending) return;
                              setIsSending(true);
                              try {
                                const res = await sendBookingEmails(formState);
                                if (res.success) {
                                  setSubmitted(true);
                                  setTimeout(() => nextStep(), 1500);
                                } else {
                                  alert(res.message || "Failed to send booking.");
                                }
                              } catch (err) { console.error(err); } finally { setIsSending(false); }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-4 rounded-2xl bg-black text-white font-body cursor-pointer flex items-center justify-between shadow-xl"
                          >
                            <span className="text-base font-semibold tracking-wide">{isSending ? "Sending..." : "Confirm Booking"}</span>
                            <span className="text-[10px] text-white/50 uppercase tracking-widest">Double-Click</span>
                          </motion.button>
                        ) : (
                          <div className="w-full px-8 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-body font-medium flex items-center justify-center gap-3">
                            <Check className="w-5 h-5" /> Booking Confirmed
                          </div>
                        )}
                     </div>
                   </motion.div>
                 )}

                 {step === 7 && (
                   <motion.div key="step7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
                     <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-emerald-600" /></div>
                     <h3 className="font-display text-4xl text-plum mb-2">You're all set!</h3>
                     <p className="font-body text-lg text-plum-soft mb-10 text-pretty">A confirmation email has been sent to your email. I will WhatsApp you shortly!</p>
                     <button onClick={() => setIsOpen(false)} className="px-10 py-3 bg-plum text-white rounded-full cursor-pointer transition-colors shadow-lg">Return Home</button>
                   </motion.div>
                 )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
