import Link from 'next/link';
import React from 'react';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] to-[#1a2a42] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            ImageGenAI Documentation
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into stunning visuals with our powerful AI image generation tool.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-blue-100 leading-relaxed">
              We're dedicated to making AI-powered creativity accessible to everyone. Whether you're a professional designer or just exploring visual arts, our platform helps you transform ideas into stunning images effortlessly.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Key Features</h2>
            </div>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Generate images from text descriptions instantly</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>High-quality downloads in multiple formats</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Privacy-focused - your creations remain yours</span>
              </li>
            </ul>
          </div>

          {/* How It Works */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">How It Works</h2>
            </div>
            <ol className="space-y-4 text-blue-100">
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                <span>Sign in with your account</span>
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                <span>Describe your desired image in the prompt</span>
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                <span>Generate and download your artwork</span>
              </li>
            </ol>
          </div>

          {/* Simplicity */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-emerald-400/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-500/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Designed for Simplicity</h2>
            </div>
            <p className="text-blue-100 leading-relaxed">
              We've crafted an intuitive interface that gets out of your way so you can focus on creativity. No complex settings or technical knowledge required - just describe what you imagine and let our AI handle the rest.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-6">
            Start transforming your ideas into visual masterpieces today.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30">
            <Link href='/main'>Get Started Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;