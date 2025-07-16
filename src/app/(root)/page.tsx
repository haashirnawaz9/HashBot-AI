// Jeremiah Petion
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Stars } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#0f172a] via-[#162033] to-[#1e293b] text-white min-h-screen flex items-start justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBjeD0iMTAwIiBjeT0iMTAwIiByPSI5OSIvPjwvZz48L3N2Zz4=')] opacity-40" />
      
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative mt-8 md:mt-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm backdrop-blur-sm border border-blue-500/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="mr-2">AI-Powered Creativity</span>
              <Stars className="w-3 h-3 text-blue-400 animate-pulse" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl font-extrabold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 animate-gradient">
                Transform Your Ideas
              </span>
              <br />
              <span className="relative">
                Into Reality
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
            >
              Experience the future of creativity with our advanced AI image generation. 
              Create stunning, unique visuals that perfectly capture your vision, all with 
              a few simple prompts.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4"
            >
              <Link 
                href="/main"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-lg text-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-400">AI Model Ready</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 rounded-2xl blur-3xl opacity-20 -z-10 animate-pulse group-hover:opacity-30 transition-opacity" />
            <Image
              src="/ai.jpg"
              alt="AI Generated Masterpiece"
              width={900}
              height={600}
              className="rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/20"
              priority
            />
            <div className="absolute -bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 transform transition-transform duration-500 group-hover:translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm text-slate-300">AI Model Processing • Creating Magic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
