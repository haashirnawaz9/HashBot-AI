'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  MessageSquareText,
  ArrowRight,
  ScanLine,
  Code,
  BookOpen,
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
}

const DocumentationPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#162033] to-[#1e293b] text-white overflow-hidden">
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeIn}
      className="max-w-5xl text-white px-6 py-24 mx-auto"
    >
      {/* Title */}
      <motion.h1
        variants={fadeIn}
        className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
      >
        Hashbot AI Documentation
      </motion.h1>

      {/* Intro */}
      <motion.p
        variants={fadeIn}
        className="text-lg text-blue-200 max-w-3xl mx-auto mb-16 text-center"
      >
        Hashbot AI combines powerful AI image generation with an interactive chat assistant — all free to use. Create an account to get started, no payment required.
      </motion.p>

      {/* Sections */}
      <Section
        icon={<Sparkles className="w-6 h-6 text-blue-400" />}
        title="Getting Started"
      >
        <>
          <p className="mb-4 text-blue-100">
            To begin, simply create a free account. Once logged in, you can generate images from text prompts or chat with our AI assistant instantly.
          </p>
          <pre className="bg-[#112240] p-4 rounded-md overflow-x-auto text-sm text-blue-300 mb-4">
            {`1. Sign up at /sign-up\n2. Navigate to /main\n3. Choose “Image Generator” or “AI Chat” feature\n4. Enter your prompt or chat message\n5. Generate or send to see results`}
          </pre>
          <p className="text-blue-100">
            No payment or setup is required — just your creativity.
          </p>
        </>
      </Section>

      <Section
        icon={<Sparkles className="w-6 h-6 text-purple-400" />}
        title="Features"
      >
        <>
          <ul className="list-disc list-inside space-y-2 text-blue-100">
            <li>Generate high-quality images from natural language prompts</li>
            <li>Chat with AI for brainstorming, writing help, and more</li>
            <li>Privacy-first platform: your data and creations are yours alone</li>
            <li>Multiple image styles and output formats supported</li>
            <li>Fast, real-time response with minimal latency</li>
          </ul>
        </>
      </Section>

      <Section
        icon={<Code className="w-6 h-6 text-cyan-400" />}
        title="Usage Examples"
      >
        <>
          <p className="mb-4 text-blue-100">
            Here are some examples of prompts and chat inputs you can try:
          </p>
          <pre className="bg-[#112240] p-4 rounded-md overflow-x-auto text-sm text-blue-300 mb-4">
            {`// Image Generation Prompt:\n"Create a futuristic city skyline at sunset, cyberpunk style"\n\n// Chat Input:\n"Help me write a short poem about the ocean and stars"`}
          </pre>
          <p className="text-blue-100">
            Experiment and explore your creativity with different prompt styles.
          </p>
        </>
      </Section>

      <Section
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
        title="FAQ"
      >
        <>
          <dl className="space-y-4 text-blue-100">
            <dt className="font-semibold">Do I need to pay to use Hashbot AI?</dt>
            <dd>No! You only need to create a free account. All features are available without payment.</dd>

            <dt className="font-semibold mt-4">Is my data private?</dt>
            <dd>Your prompts and conversations are private and not shared with third parties.</dd>

            <dt className="font-semibold mt-4">Can I download the generated images?</dt>
            <dd>Yes, images can be downloaded in multiple high-quality formats.</dd>
          </dl>
        </>
      </Section>

      {/* CTA */}
      <motion.div variants={fadeIn} className="text-center mt-10 mb-[-20px]">
        <Link href="/sign-up">
          <Button size="lg" className="px-6 py-6 rounded-xl border-2 cursor-pointer">
            Create Account & Start →
          </Button>
        </Link>
      </motion.div>
    </motion.div>
    </div>
  )
}

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) => (
  <motion.section
    variants={fadeIn}
    className="mb-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-400/30 transition-all"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-blue-500/20 p-3 rounded-lg">{icon}</div>
      <h2 className="text-3xl font-semibold">{title}</h2>
    </div>
    <div>{children}</div>
  </motion.section>

)

export default DocumentationPage
