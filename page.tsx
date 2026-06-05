"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { registerUser } from "@/actions/auth";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Animated Background Mesh */}
      <div className="absolute top-[30%] right-[10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[150px] animate-pulse-glow"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-lg glass-panel p-10 rounded-2xl relative z-10"
      >
        <div className="text-center mb-10 flex flex-col items-center">
          <img src="/logo.png" alt="OR Logo" className="h-20 w-auto rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] mb-4" />
          <p className="text-gray-400 font-medium">Create your enterprise account</p>
        </div>
        
        <form action={async (formData) => {
          const result = await registerUser(formData);
          if (result?.error) {
            alert(result.error);
          }
        }} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
              <input type="text" name="firstName" required className="w-full p-4 glass-input rounded-lg" placeholder="John" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
              <input type="text" name="lastName" required className="w-full p-4 glass-input rounded-lg" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Company Name</label>
            <input type="text" name="companyName" className="w-full p-4 glass-input rounded-lg" placeholder="Acme Corp" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Corporate Email</label>
            <input type="email" name="email" required className="w-full p-4 glass-input rounded-lg" placeholder="john@acmecorp.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Secure Password</label>
            <input type="password" name="password" required className="w-full p-4 glass-input rounded-lg" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="block w-full py-4 text-center bg-gradient-to-r from-brand-accent to-emerald-600 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all mt-8 transform hover:scale-[1.02]">
            Initialize Workspace
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-400 mt-8">
          Already registered? <Link href="/login" className="text-brand-gold hover:text-emerald-400 font-medium transition-colors hover:underline">Access Portal</Link>
        </p>
      </motion.div>
    </div>
  );
}
