// Jeremiah Petion
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Stars,
  ImageIcon,
  MessageCircle,
  Rocket,
  Brain,
  LayoutDashboard,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#162033] to-[#1e293b] text-white overflow-hidden px-6 sm:px-12 md:px-20 lg:px-32 py-16">
      {/* Decorative Circles */}
      <div className="pointer-events-none fixed inset-0 opacity-10 saturate-150 mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="350" stroke="#3b82f6" strokeOpacity="0.05" strokeWidth="4" />
          <circle cx="400" cy="400" r="300" stroke="#8b5cf6" strokeOpacity="0.03" strokeWidth="3" />
          <circle cx="400" cy="400" r="250" stroke="#2563eb" strokeOpacity="0.02" strokeWidth="2" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-900/40 to-violet-900/40 border border-blue-500/40 text-blue-300 rounded-full shadow-md">
            <Sparkles className="w-5 h-5 mr-3" />
            Explore the Power of AI
            <Stars className="w-4 h-4 ml-3 text-blue-400 animate-pulse" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400">
              HashBotAI
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-xl">
            Discover the ultimate AI companion for generating images, chatting, learning, and boosting your productivity across every creative domain.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <Link
              href="/image-generator"
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg hover:scale-105 transition-transform"
              aria-label="Launch AI Image Generator"
            >
              <ImageIcon className="w-5 h-5" />
              Generate Images
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform motion-safe:animate-pulse" />
            </Link>

            <Link
              href="/chatbot"
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-800 rounded-full shadow-lg hover:scale-105 transition-transform"
              aria-label="Chat with AI Assistant"
            >
              <MessageCircle className="w-5 h-5" />
              HashBot Chat
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform motion-safe:animate-pulse" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl"
        >
          <Image
            src="/ai.jpg"
            alt="AI Visual"
            width={700}
            height={467}
            className="object-cover rounded-3xl"
            priority
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-slate-300 text-center font-semibold">
            AI Model Processing & Creating Magic ✨
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="mt-28 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-3xl font-bold text-white mb-12"
        >
          What You Can Do with HashBotAI
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'AI Chat Assistants',
              description: 'Chat with intelligent agents that can brainstorm, explain, or assist.',
              icon: <Brain className="w-8 h-8 text-blue-400" />,
            },
            {
              title: 'Image Generation',
              description: 'Turn prompts into stunning AI-generated art instantly.',
              icon: <ImageIcon className="w-8 h-8 text-violet-400" />,
            },
            {
              title: 'Smart Dashboard',
              description: 'Track usage, manage tools, and personalize your AI workspace.',
              icon: <LayoutDashboard className="w-8 h-8 text-teal-400" />,
            },
          ].map(({ title, description, icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.2 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl hover:shadow-blue-600/20 transition-all"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10text-center text-sm text-slate-500 py-6">
        <div className="flex justify-center items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
          <span className="tracking-wide font-medium">AI Systems Online and Ready</span>
        </div>
      </footer>
    </div>
  );
}
