"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Users, Download, ShieldAlert, CheckCircle2, Send, X, Mail, TrendingUp, Activity, Trash2 } from "lucide-react";
import Image from "next/image";

interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Analytics Computation
  const today = new Date();
  const registrationsToday = registrations.filter(r => {
    const d = new Date(r.created_at);
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
  }).length;

  // Broadcast State
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState("Your EduSync Masterclass Link Inside!");
  const [broadcastMessage, setBroadcastMessage] = useState("We are going live! Click the link below to join the Microsoft Teams session immediately. See you inside!");
  const [broadcastLink, setBroadcastLink] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/edusync-ops-77/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login Failed");
      }

      setRegistrations(data.registrations || []);
      setIsAuthed(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || (!broadcastMessage && !broadcastLink)) return;
    
    setIsBroadcasting(true);
    setError("");
    setBroadcastSuccess("");

    try {
      const res = await fetch("/api/edusync-ops-77/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          subject: broadcastSubject,
          message: broadcastMessage,
          link: broadcastLink
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Broadcast Failed");

      setBroadcastSuccess(`Successfully sent to ${data.sentCount} out of ${data.totalRegistrants} registrants!`);
      setTimeout(() => setShowBroadcast(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsBroadcasting(false);
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Registered At", "Full Name", "Email", "Phone"];
    const rows = registrations.map((r) => [
      r.id,
      new Date(r.created_at).toLocaleString(),
      r.full_name,
      r.email,
      r.phone,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "edusync_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently revoke ${name}'s spot in the masterclass?`)) return;

    try {
      const res = await fetch("/api/edusync-ops-77/registrations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="relative shrink-0 block min-h-[50px] w-[180px] h-[50px] mb-6">
              <Image src="/logo.png" alt="EduSync" fill loading="eager" priority sizes="(max-width: 768px) 180px, 180px" className="object-contain object-center scale-[1.7] brightness-[1.3]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Security</h1>
            <p className="text-slate-400 text-sm">Enter the master passcode to encrypt session.</p>
          </div>

          <form onSubmit={handleLogin} className="glass rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter master passcode"
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all font-mono"
                required
              />
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 text-rose-400 text-sm bg-rose-400/10 p-3 rounded-lg border border-rose-400/20">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
            >
              {loading ? "Decrypting..." : "Access Dashboard"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8 glass p-6 rounded-2xl border border-white/10 drop-shadow-xl">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0 block min-h-[55px] w-[180px] h-[55px]">
              <Image src="/logo.png" alt="EduSync" fill loading="eager" priority sizes="(max-width: 768px) 180px, 180px" className="object-contain object-left scale-[1.7] origin-left brightness-[1.3]" />
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-teal-400 font-semibold bg-teal-400/10 px-4 py-1.5 rounded-full border border-teal-400/20 shadow-inner">
              <Users className="w-4 h-4" />
              {registrations.length} Registrations
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => { setBroadcastSuccess(""); setError(""); setShowBroadcast(true); }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 border border-teal-300/50 rounded-xl text-slate-950 transition-all font-bold shadow-[0_0_15px_rgba(45,212,191,0.2)]"
            >
              <Send className="w-4 h-4" />
              Broadcast Link
            </button>
            <button
              onClick={exportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-white transition-all font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </header>

        {/* Analytics KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Registrations */}
          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Total Signups</h3>
              <div className="p-2 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <Users className="w-4 h-4 text-teal-400" />
              </div>
            </div>
            <div className="text-4xl font-black text-white">{registrations.length}</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              Solid baseline established
            </div>
          </div>

          {/* Registrations Today */}
          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">New Today</h3>
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="text-4xl font-black text-white">{registrationsToday}</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
              <ShieldAlert className="w-3.5 h-3.5 opacity-50" />
              Waitlist conversion
            </div>
          </div>

          {/* Delivery Health */}
          <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group col-span-1 md:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Email Health</h3>
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <Mail className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-black text-white">100%</div>
              <div className="text-sm font-medium text-slate-500">Delivery</div>
            </div>
            <div className="mt-2 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-indigo-400 w-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-white/10 text-xs uppercase tracking-wider text-teal-400/70">
                  <th className="px-6 py-5 font-bold">Status</th>
                  <th className="px-6 py-5 font-bold">Full Name</th>
                  <th className="px-6 py-5 font-bold">Email Address</th>
                  <th className="px-6 py-5 font-bold">Phone Number</th>
                  <th className="px-6 py-5 font-bold">Registered At</th>
                  <th className="px-6 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                      <Users className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      No registrations found in Supabase yet.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={reg.id}
                      className="hover:bg-teal-900/10 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-teal-400 text-xs font-semibold bg-teal-400/5 w-fit px-2 py-1 rounded-md border border-teal-400/10">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">{reg.full_name}</td>
                      <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 opacity-50" /> {reg.email}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-300 text-sm">{reg.phone}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {new Date(reg.created_at).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(reg.id, reg.full_name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-rose-500/20 rounded-md text-rose-400 hover:text-rose-300"
                          title="Revoke access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      <AnimatePresence>
        {showBroadcast && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => !isBroadcasting && setShowBroadcast(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-800/30">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-teal-400" />
                  Broadcast Link
                </h3>
                <button 
                  onClick={() => setShowBroadcast(false)} 
                  disabled={isBroadcasting}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleBroadcast} className="p-6 flex flex-col gap-5">
                {broadcastSuccess ? (
                  <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-teal-400" />
                    <p className="font-medium">{broadcastSuccess}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Subject</label>
                      <input 
                        required
                        type="text" 
                        value={broadcastSubject}
                        onChange={(e) => setBroadcastSubject(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-400/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Meeting Link (Teams/Zoom)</label>
                      <input 
                        required
                        type="url" 
                        placeholder="https://teams.microsoft.com/l/meetup-join/..."
                        value={broadcastLink}
                        onChange={(e) => setBroadcastLink(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-cyan-400 font-medium outline-none focus:border-teal-400/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Custom Message</label>
                      <textarea 
                        required
                        rows={3}
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-teal-400/50 resize-none"
                      />
                    </div>

                    {error && (
                      <div className="text-rose-400 text-sm bg-rose-400/10 p-3 rounded-lg border border-rose-400/20 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0" /> {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isBroadcasting}
                      className="w-full mt-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isBroadcasting ? (
                        <>Sending to {registrations.length} people...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Blast Email Now
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500">
                      This will send an individual email to all {registrations.length} registrants.
                    </p>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
