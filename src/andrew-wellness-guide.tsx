import { useState } from 'react';
import ChatWithAndrew from './components/chat/ChatWithAndrew';
import WellnessGuideInfo from './components/wellness/WellnessGuideInfo';
import WellnessGuideResults from './components/wellness/WellnessGuideResults';
import type { UserData } from './components/chat/ChatWithAndrew';

export default function AndrewWellnessGuide() {
  const [showResults, setShowResults] = useState(false);
  const [userData, setUserData] = useState<UserData>({});

  const handleResultsReady = (data: UserData) => {
    setUserData(data);
    setShowResults(true);
  };

  const handleStartOver = () => {
    setShowResults(false);
    setUserData({});
  };

  return (
    <div className="min-h-screen bg-[#F7F2EC]">
      {/* Hero Section - Above the split */}
      <div className="bg-gradient-to-b from-[#003b3c] to-[#005557] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8 md:py-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=200&h=200&fit=crop" 
                alt="Andrew Lessman"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-white text-[24px] md:text-[32px] mb-1">Andrew Lessman Wellness Guide</h1>
              <p className="text-white/80 text-[14px] md:text-[16px]">
                Your free personal consultation • 2 minutes • Expert recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-6 md:py-8">
        <div className="grid lg:grid-cols-[450px_1fr] gap-6 items-start">
          
          {/* LEFT PANEL - Chat */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#D9E2E2] overflow-hidden lg:sticky lg:top-6">
            {/* Chat Header */}
            <div className="bg-[#003b3c] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=100&h=100&fit=crop" 
                    alt="Andrew"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-white text-[15px]">Andrew Lessman</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-[#48E1DC] rounded-full animate-pulse"></div>
                    <p className="text-white/70 text-[12px]">Online now</p>
                  </div>
                </div>
              </div>
              {showResults && (
                <button
                  onClick={handleStartOver}
                  className="text-white/70 hover:text-white transition-colors text-[13px] underline"
                >
                  Start Over
                </button>
              )}
            </div>

            {/* Chat Body - Fixed height with scroll */}
            <div className="h-[600px] md:h-[700px]">
              <ChatWithAndrew 
                isOpen={true} 
                onClose={() => {}} 
                hideHeader={true}
                onResultsReady={handleResultsReady}
              />
            </div>
          </div>

          {/* RIGHT PANEL - Info or Results */}
          <div className="min-h-[600px]">
            {!showResults ? (
              <WellnessGuideInfo />
            ) : (
              <WellnessGuideResults userData={userData} onStartOver={handleStartOver} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
