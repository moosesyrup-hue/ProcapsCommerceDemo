import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onClose: () => void;
}

export function WelcomeScreen({ onStart, onClose }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8] px-8 py-12 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-[#999999] hover:text-[#003b3c] hover:bg-white/60 rounded-full transition-all"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left: Andrew's Presence */}
          <div className="space-y-8">
            {/* Andrew Photo Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#009296] to-[#007a7d] overflow-hidden">
                {/* Placeholder for Andrew's photo */}
                <div className="w-full h-full flex items-center justify-center text-white text-8xl">
                  AL
                </div>
              </div>
              {/* Credibility Badge */}
              <div className="absolute -bottom-6 left-8 right-8 bg-white rounded-2xl shadow-lg px-6 py-4 border border-[#e8e4d8]">
                <div className="flex items-center justify-between text-center">
                  <div>
                    <div className="text-2xl text-[#009296]">40+</div>
                    <div className="text-xs text-[#666666]">Years</div>
                  </div>
                  <div className="w-px h-12 bg-[#e8e4d8]" />
                  <div>
                    <div className="text-2xl text-[#009296]">500+</div>
                    <div className="text-xs text-[#666666]">Formulations</div>
                  </div>
                  <div className="w-px h-12 bg-[#e8e4d8]" />
                  <div>
                    <div className="text-2xl text-[#009296]">10M+</div>
                    <div className="text-xs text-[#666666]">Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Welcome Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white px-5 py-2.5 rounded-full">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">AI-Powered Supplement Advisor</span>
            </div>
            
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-[#003b3c] text-5xl leading-tight">
                Overwhelmed by<br />
                <span className="text-[#009296]">too many choices?</span>
              </h1>
              <p className="text-[#666666] text-xl leading-relaxed">
                Let me help you find the perfect supplements for your unique needs. I'll ask a few thoughtful questions and recommend a personalized protocol backed by science and 40 years of experience.
              </p>
            </div>
            
            {/* What to Expect */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#009296]/10 flex items-center justify-center flex-shrink-0 text-[#009296]">
                  ⚡
                </div>
                <div>
                  <div className="text-[#003b3c] mb-1">Quick & Easy</div>
                  <div className="text-[#999999] text-sm">Just 2-3 minutes, one question at a time</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#009296]/10 flex items-center justify-center flex-shrink-0 text-[#009296]">
                  🔬
                </div>
                <div>
                  <div className="text-[#003b3c] mb-1">Science-Backed</div>
                  <div className="text-[#999999] text-sm">Recommendations based on clinical research and real results</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#009296]/10 flex items-center justify-center flex-shrink-0 text-[#009296]">
                  ✨
                </div>
                <div>
                  <div className="text-[#003b3c] mb-1">Truly Personalized</div>
                  <div className="text-[#999999] text-sm">Tailored to your goals, lifestyle, and health concerns</div>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={onStart}
                className="group w-full px-12 py-6 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-2xl hover:shadow-2xl transition-all text-xl flex items-center justify-center gap-3"
              >
                <span>Start Your Assessment</span>
                <svg 
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <p className="text-center text-sm text-[#999999] mt-4">
                No account required • Takes 2-3 minutes • Completely free
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
