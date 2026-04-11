"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, User, Mail, Phone, AlertCircle, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  website: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  server?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email";
  }
  if (data.phone.trim() && !/^\+?[\d\s\-().]{7,}$/.test(data.phone)) {
    errors.phone = "Invalid phone format";
  }
  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  icon: React.ElementType;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

function Field({ id, label, icon: Icon, error, inputProps }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5 relative group">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 pl-1">
        {label}
      </label>
      <div className="relative">
        <Icon className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 pointer-events-none",
          error ? "text-rose-400" : "text-slate-500 group-focus-within:text-teal-400"
        )} />
        <input
          id={id}
          className={cn(
            "w-full bg-slate-900/50 backdrop-blur-xl rounded-xl px-11 py-3.5 text-slate-100 placeholder-slate-600 text-sm font-medium",
            "transition-all duration-300 outline-none border",
            "focus:bg-slate-800/80 focus:shadow-[0_0_20px_rgba(45,212,191,0.1)]",
            error
              ? "border-rose-500/50 focus:border-rose-400"
              : "border-white/5 hover:border-white/10 focus:border-teal-400/50"
          )}
          {...inputProps}
        />
        <div className={cn(
          "absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-300",
          error ? "bg-rose-400 opacity-100" : "bg-gradient-to-r from-teal-400 to-cyan-400 group-focus-within:opacity-100"
        )} />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-rose-400 text-xs pl-1 mt-1 font-medium overflow-hidden"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({ fullName: "", email: "", phone: "", website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      setSubmitState("success");
    } catch (err: any) {
      console.error(err);
      setErrors({ server: err.message });
      setSubmitState("error");
    }
  };

  return (
    <section id="register" className="relative py-32 px-6 overflow-hidden bg-transparent">
      {/* Ambient background glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center lg:px-8">
        
        {/* Left Column: Context & Copy */}
        <div className="flex flex-col gap-8 text-left max-w-lg mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05]"
          >
            Claim Your Spot <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              Before It Closes
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed font-medium mt-2"
          >
            This 60-minute masterclass is strictly limited capacity to ensure direct Q&A interaction. Once you register, your calendar invite and joining instructions will be instantly dispatched to your inbox.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 mt-8 border-l-2 border-teal-500/30 pl-6 py-2"
          >
            <div className="flex items-center gap-3 text-slate-300 text-[15px] font-medium">
              <CheckCircle className="w-5 h-5 text-teal-400 drop-shadow-sm" />
              Direct access to the livestream
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-[15px] font-medium">
              <CheckCircle className="w-5 h-5 text-teal-400 drop-shadow-sm" />
              Exclusive post-webinar PDF frameworks
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-[15px] font-medium">
              <CheckCircle className="w-5 h-5 text-teal-400 drop-shadow-sm" />
              Live Q&A participation slot
            </div>
          </motion.div>
        </div>

        {/* Right Column: The Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg mx-auto"
        >
          {/* Ambient card glow */}
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-500/20 to-blue-500/20 blur-2xl opacity-40" />

          <div className="relative bg-[#090f1e]/80 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-[2rem] p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center py-8 gap-5"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full" />
                    <div className="relative w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2">You're In.</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                      Your exclusive access details have been instantly dispatched to your inbox.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-teal-400/80 bg-teal-400/5 px-4 py-2 rounded-full border border-teal-400/10">
                    <Mail className="w-3.5 h-3.5" />
                    {formData.email}
                  </div>
                </motion.div>
              ) : (
                /* Form State */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  className="flex flex-col gap-5"
                >
                  <Field
                    id="fullName"
                    label="Full Name"
                    icon={User}
                    error={errors.fullName}
                    inputProps={{
                      type: "text",
                      placeholder: "e.g. Ahmad Noral",
                      value: formData.fullName,
                      onChange: handleChange("fullName"),
                      autoComplete: "name",
                    }}
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    icon={Mail}
                    error={errors.email}
                    inputProps={{
                      type: "email",
                      placeholder: "you@example.com",
                      value: formData.email,
                      onChange: handleChange("email"),
                      autoComplete: "email",
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <Field
                      id="phone"
                      label="Phone Number (Optional)"
                      icon={Phone}
                      error={errors.phone}
                      inputProps={{
                        type: "tel",
                        placeholder: "+1 (555) 000-0000",
                        value: formData.phone,
                        onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                      }}
                    />
                    <div className="flex items-start gap-2 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-500 leading-tight">
                        Used exclusively for a brief SMS reminder before we go live.
                      </span>
                    </div>
                  </div>

                  {/* The error message is now handled globally and within the button for better UX */}

                  <div className="pt-4">
                    {/* Honeypot field - stay hidden */}
                    <div className="absolute opacity-0 -z-50 h-0 overflow-hidden">
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        placeholder="Your website"
                        onChange={handleChange("website")}
                      />
                    </div>

                    <button
                      id="submit-register"
                      type="submit"
                      disabled={submitState === "loading"}
                      className={cn(
                        "group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 overflow-hidden",
                        submitState === "error"
                           ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                           : submitState === "loading"
                              ? "bg-teal-500/20 text-teal-400 cursor-not-allowed"
                              : "bg-teal-400 text-slate-950 hover:bg-teal-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
                      )}
                    >
                      <AnimatePresence mode="wait">
                        {submitState === "loading" ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            <svg className="animate-spin w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                          </motion.span>
                        ) : submitState === "error" ? (
                          <motion.span
                            key="error"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 px-6 text-white"
                          >
                            <AlertCircle className="w-5 h-5" />
                            <span className="truncate">{errors.server || "Failed. Try again."}</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-center w-full px-6"
                          >
                            Reserve My Seat Now
                            <ChevronRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-600 font-medium uppercase tracking-widest">
                      <Lock className="w-3 h-3" />
                      Encrypted & Secure
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
