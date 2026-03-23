"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, X, Check } from "lucide-react";
import { sendBookingEmails } from "@/app/actions/booking";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Booking() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    eventType: "bridal",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep((s) => s + 1);

  const handleSubmit = async () => {
    setSubmitted(true);
    // Trigger Sound Effect
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (err) {}

    // CALL SERVER ACTION
    await sendBookingEmails(formState);
    
    setTimeout(() => nextStep(), 1500);
  };

  return (
    <section id="booking" className="relative py-20 md:py-28 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative photo */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-60 h-80 rounded-3xl overflow-hidden opacity-20 hidden md:block pointer-events-none">
        <img src="/nancy-mehta-hero-bridal.jpg" alt="Bridal Look by N.Touch MUA" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-plum mb-8">
            Book Your <br/> <span className="italic text-blush-500">Transformation</span>
          </h2>
          <p className="font-body text-lg text-plum-soft max-w-xl mx-auto mb-10">
            Enjoy a personalized, VIP booking experience. Tell us a bit about your big day, and let's create magic together.
          </p>
          <motion.button
            onClick={() => { setIsOpen(true); setStep(0); setSubmitted(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-full bg-black text-white font-display text-xl tracking-wide shadow-2xl flex items-center gap-4 mx-auto cursor-pointer"
          >
            Start Booking <ArrowRight className="w-5 h-5" />
          </motion.button>
        </ScrollReveal>
      </div>

      {/* Fullscreen Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-surface-elevated/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 sm:p-12"
          >
            {/* Close button */}
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-plum/10 hover:bg-plum/20 flex items-center justify-center cursor-pointer transition-colors border border-plum/10">
              <X className="w-6 h-6 text-plum" />
            </button>

            {/* Progress indicator */}
            {step > 0 && step < 7 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-3 items-center">
                 <span className="font-body text-[10px] tracking-[0.3em] uppercase text-plum/30 mr-2">Step {step} of 6</span>
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i <= step ? "w-10 bg-gold-400 shadow-[0_0_10px_#D4AF37]" : "w-4 bg-plum/5"}`} />
                 ))}
              </div>
            )}

            <div className="w-full max-w-2xl relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                 {/* Step 0 */}
                 {step === 0 && (
                   <motion.div key="step0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="text-center w-full">
                     <div className="w-20 h-[1px] bg-gold-400 mx-auto mb-8" />
                     <h3 className="font-display text-5xl md:text-7xl text-plum mb-6 tracking-tight">Your <span className="italic text-blush-500">Elite</span> Journey</h3>
                     <p className="font-body text-xl text-plum-soft mb-12 max-w-md mx-auto leading-relaxed">Let's craft your signature transformation. We'll start with a few brief details.</p>
                     <button onClick={nextStep} className="group relative px-12 py-5 bg-black text-white rounded-full font-display text-2xl tracking-wide overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                       <span className="relative z-10 flex items-center gap-3">Begin Experience <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></span>
                       <div className="absolute inset-0 bg-gradient-to-r from-gold-600/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                     </button>
                   </motion.div>
                 )}

                 {/* Step 1: Name */}
                 {step === 1 && (
                   <motion.div key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">01 — Identity</p>
                     <h3 className="font-display text-4xl md:text-6xl text-plum mb-10 leading-none">Who shall I have the pleasure of <span className="italic text-blush-500">transforming</span>?</h3>
                     <input 
                       autoFocus
                       type="text" 
                       value={formState.name}
                       onChange={(e) => setFormState({...formState, name: e.target.value})}
                       onKeyDown={(e) => e.key === "Enter" && formState.name && nextStep()}
                       className="w-full text-4xl md:text-6xl font-light text-plum bg-transparent border-b border-plum/10 focus:border-gold-400 outline-none pb-6 placeholder:text-plum/5 transition-colors"
                       placeholder="Enter your name"
                     />
                     <div className="mt-12 flex items-center gap-6">
                       <button onClick={nextStep} disabled={!formState.name} className="px-10 py-4 bg-plum text-white rounded-full disabled:opacity-20 flex items-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95">
                         Continue <ArrowRight className="w-4 h-4" />
                       </button>
                       <span className="text-[10px] tracking-widest text-plum/30 uppercase">Press Enter ↵</span>
                     </div>
                   </motion.div>
                 )}

                 {/* Step 2: Email (MOVED EARLIER) */}
                 {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                      <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">02 — Connection</p>
                      <h3 className="font-display text-4xl md:text-6xl text-plum mb-10 leading-none">Your <span className="italic text-blush-500">Email Address</span> for the details?</h3>
                      <input 
                        autoFocus
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        onKeyDown={(e) => e.key === "Enter" && formState.email.includes("@") && nextStep()}
                        className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b border-plum/10 focus:border-gold-400 outline-none pb-6 placeholder:text-plum/5 transition-colors"
                        placeholder="you@luxury.com"
                      />
                      <div className="mt-12 flex items-center gap-6">
                        <button onClick={nextStep} disabled={!formState.email.includes("@")} className="px-10 py-4 bg-plum text-white rounded-full disabled:opacity-20 flex items-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95">
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] tracking-widest text-plum/30 uppercase">Press Enter ↵</span>
                      </div>
                    </motion.div>
                 )}

                 {/* Step 3: Date */}
                 {step === 3 && (
                   <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">03 — Timeline</p>
                     <h3 className="font-display text-4xl md:text-6xl text-plum mb-10 leading-none">Which <span className="italic text-blush-500">Golden Date</span> are we celebrating?</h3>
                     <input 
                       autoFocus
                       type="date" 
                       value={formState.date}
                       onChange={(e) => { setFormState({...formState, date: e.target.value}); }}
                       className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b border-plum/10 focus:border-gold-400 outline-none pb-6 transition-colors"
                     />
                     <div className="mt-12 flex items-center gap-6">
                       <button onClick={nextStep} disabled={!formState.date} className="px-10 py-4 bg-plum text-white rounded-full disabled:opacity-20 flex items-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95">
                         Continue <ArrowRight className="w-4 h-4" />
                       </button>
                     </div>
                   </motion.div>
                 )}

                 {/* Step 4: Event Type */}
                 {step === 4 && (
                   <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">04 — Selection</p>
                     <h3 className="font-display text-4xl md:text-6xl text-plum mb-10 leading-none">Select your <span className="italic text-blush-500">Service</span></h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {["Bridal Makeup", "Party / Reception", "Engagement", "Editorial / Fashion"].map((type) => (
                         <button 
                           key={type}
                           onClick={() => { setFormState({...formState, eventType: type}); setTimeout(nextStep, 400); }}
                           className={`group relative text-left px-8 py-6 rounded-3xl border transition-all duration-500 flex items-center justify-between ${formState.eventType === type ? 'border-gold-400 bg-gold-400/5 text-plum' : 'border-plum/5 bg-white hover:border-plum/20 text-plum/60 hover:text-plum'}`}
                         >
                           <span className="font-display text-xl md:text-2xl">{type}</span>
                           <div className={`w-3 h-3 rounded-full border border-gold-400 transition-all ${formState.eventType === type ? 'bg-gold-400 scale-125' : 'bg-transparent'}`} />
                         </button>
                       ))}
                     </div>
                   </motion.div>
                 )}

                 {/* Step 5: Phone */}
                 {step === 5 && (
                   <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">05 — Reach</p>
                     <h3 className="font-display text-4xl md:text-6xl text-plum mb-10 leading-none">Your <span className="italic text-blush-500">Phone Number</span> for direct contact?</h3>
                     <input 
                       autoFocus
                       type="tel" 
                       value={formState.phone}
                       onChange={(e) => setFormState({...formState, phone: e.target.value})}
                       onKeyDown={(e) => e.key === "Enter" && formState.phone.length >= 10 && nextStep()}
                       className="w-full text-4xl md:text-6xl font-light text-plum bg-transparent border-b border-plum/10 focus:border-gold-400 outline-none pb-6 placeholder:text-plum/5 transition-colors"
                       placeholder="+91"
                     />
                     <div className="mt-12 flex items-center gap-6">
                       <button onClick={nextStep} disabled={formState.phone.length < 10} className="px-10 py-4 bg-plum text-white rounded-full disabled:opacity-20 flex items-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95">
                         Continue <ArrowRight className="w-4 h-4" />
                       </button>
                     </div>
                   </motion.div>
                 )}

                 {/* Step 6: Message */}
                 {step === 6 && (
                   <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">06 — Vision</p>
                     <h3 className="font-display text-3xl md:text-5xl text-plum mb-10 leading-tight">Describe your <span className="italic text-blush-500">Dream Look</span></h3>
                     <textarea 
                       autoFocus
                       rows={4}
                       value={formState.message}
                       onChange={(e) => setFormState({...formState, message: e.target.value})}
                       className="w-full text-xl md:text-2xl font-light text-plum bg-plum/5 border-none focus:ring-1 focus:ring-gold-400/30 outline-none p-10 rounded-[2.5rem] resize-none placeholder:text-plum/10 mb-10 transition-all shadow-inner"
                       placeholder="I'm envisioning a look that is..."
                     />
                     
                     <div className="flex justify-center">
                        {!submitted ? (
                          <motion.button
                            type="button"
                            onClick={handleSubmit}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-16 py-5 rounded-full bg-black text-white font-display text-2xl tracking-widest overflow-hidden shadow-2xl transition-all"
                          >
                            <span className="relative z-10">Request Consultation</span>
                            <motion.div 
                              className="absolute inset-x-0 bottom-0 h-1 bg-gold-400"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.button>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="px-12 py-5 rounded-full bg-plum/5 border border-plum/10 text-plum font-body font-medium flex items-center gap-4"
                          >
                            <div className="w-3 h-3 rounded-full bg-gold-400 animate-pulse" />
                            Establishing Magic...
                          </motion.div>
                        )}
                     </div>
                   </motion.div>
                 )}

                 {/* Step 7: Success */}
                 {step === 7 && (
                   <motion.div key="step7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
                     <div className="w-32 h-32 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-gold-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Check className="w-16 h-16 text-gold-500" />
                     </div>
                     <h3 className="font-display text-5xl md:text-7xl text-plum mb-6 tracking-tight">Elegance <span className="italic text-blush-500">Confirmed</span></h3>
                     <p className="font-body text-2xl text-plum-soft mb-12 max-w-lg mx-auto leading-relaxed">Thank you, {formState.name}. Your details have been secured. A confirmation is winging its way to {formState.email}.</p>
                     <button onClick={() => setIsOpen(false)} className="px-12 py-5 bg-plum hover:bg-black text-white rounded-full font-body tracking-[0.2em] text-xs uppercase cursor-pointer transition-all shadow-xl hover:shadow-2xl">
                       Back to Portfolio
                     </button>
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
