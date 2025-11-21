import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ConversationalWelcomeScreenProps {
  onStart: () => void;
  onClose: () => void;
}

export function ConversationalWelcomeScreen({ onStart, onClose }: ConversationalWelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8] flex items-center justify-center px-4 sm:px-6 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[#999999] hover:text-[#003b3c] hover:bg-white rounded-full transition-all z-50"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl w-full text-center space-y-8 sm:space-y-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Personalized Supplement Consultation</span>
          </div>
        </motion.div>

        {/* Andrew's Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white shadow-2xl">
            <span className="text-3xl sm:text-5xl">AL</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 sm:space-y-6"
        >
          <h1 className="text-[#003b3c] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Find Your Perfect<br />Supplement Protocol
          </h1>
          
          <p className="text-[#666666] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto px-4">
            I'll ask you a few thoughtful questions about your health goals and lifestyle, 
            then create a personalized supplement protocol based on my 40+ years of experience.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="text-3xl sm:text-4xl">🎯</div>
            <div className="text-[#003b3c] text-base sm:text-lg">Personalized</div>
            <div className="text-[#999999] text-sm sm:text-base">
              Recommendations tailored to your unique needs
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="text-3xl sm:text-4xl">🔬</div>
            <div className="text-[#003b3c] text-base sm:text-lg">Science-Backed</div>
            <div className="text-[#999999] text-sm sm:text-base">
              Formulations based on clinical research
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="text-3xl sm:text-4xl">⏱️</div>
            <div className="text-[#003b3c] text-base sm:text-lg">Takes 2 Minutes</div>
            <div className="text-[#999999] text-sm sm:text-base">
              Just 4 quick questions to get started
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4 sm:pt-6"
        >
          <button
            onClick={onStart}
            className="px-10 sm:px-16 py-4 sm:py-5 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-2xl text-lg sm:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Consultation
          </button>
          
          <p className="text-[#999999] text-xs sm:text-sm mt-4 sm:mt-6">
            No account required • Takes about 2 minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
