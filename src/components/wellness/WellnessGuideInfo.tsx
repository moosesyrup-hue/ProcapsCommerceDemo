export default function WellnessGuideInfo() {
  return (
    <div className="space-y-6">
      {/* Main Value Prop */}
      <div className="bg-white rounded-2xl p-8 border-2 border-[#D9E2E2] shadow-sm">
        <div className="mb-6">
          <h2 className="text-[#003b3c] mb-3">What Makes This Different?</h2>
          <p className="text-[16px] text-[#003b3c]/80 leading-[1.7]">
            This isn't a generic quiz. Andrew's system analyzes your specific age, activity level, 
            and health goals to recommend exactly what YOUR body needs—with detailed explanations 
            of the science behind each recommendation.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#48E1DC]/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#009296]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-[#003b3c] mb-1.5">Truly Personalized</h3>
              <p className="text-[14px] text-[#003b3c]/70 leading-[1.6]">
                Your recommendations are based on YOUR unique profile—not one-size-fits-all advice.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#48E1DC]/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#009296]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-[#003b3c] mb-1.5">Education-First Approach</h3>
              <p className="text-[14px] text-[#003b3c]/70 leading-[1.6]">
                Andrew explains WHY each supplement matters for you specifically, in plain language.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#48E1DC]/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#009296]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-[#003b3c] mb-1.5">Synergy Explanations</h3>
              <p className="text-[14px] text-[#003b3c]/70 leading-[1.6]">
                Learn how your recommended supplements work together for maximum benefit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl p-8 border-2 border-[#D9E2E2] shadow-sm">
        <h2 className="text-[#003b3c] mb-6">How This Works</h2>
        
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#009296] text-white rounded-full flex items-center justify-center text-[16px]">
                1
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#003b3c] mb-1">Answer a Few Questions</h3>
              <p className="text-[14px] text-[#003b3c]/70 leading-[1.6]">
                Tell Andrew about your health goals, age, activity level, and current supplements.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#009296] text-white rounded-full flex items-center justify-center text-[16px]">
                2
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#003b3c] mb-1">Andrew Analyzes Your Profile</h3>
              <p className="text-[14px] text-[#003b3c]/70 leading-[1.6]">
                Based on 40+ years of experience, Andrew considers what your body needs.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#009296] text-white rounded-full flex items-center justify-center text-[16px]">
                3
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#003b3c] mb-1">Get Your Personalized Plan</h3>
              <p className="text-[14px] text-[#003b3c]/70 leading-[1.6]">
                Receive detailed recommendations with explanations that appear right here →
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Andrew's Quote */}
      <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF3D6] border-2 border-[#FFE599] rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <svg className="w-8 h-8 text-[#009296]/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p className="text-[15px] text-[#003b3c] leading-[1.7] mb-3">
          "I've spent over 40 years helping people understand what their bodies need. This consultation 
          is my way of sitting down with each of you personally, just like I would if you walked into 
          my office."
        </p>
        <p className="text-[13px] text-[#003b3c]/70">
          — Andrew Lessman, Founder
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#D9E2E2] shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-[24px] text-[#009296] mb-1">40+</div>
            <div className="text-[12px] text-[#003b3c]/60">Years of<br />Expertise</div>
          </div>
          <div>
            <div className="text-[24px] text-[#009296] mb-1">100%</div>
            <div className="text-[12px] text-[#003b3c]/60">Free<br />Consultation</div>
          </div>
          <div>
            <div className="text-[24px] text-[#009296] mb-1">2min</div>
            <div className="text-[12px] text-[#003b3c]/60">Quick &<br />Easy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
