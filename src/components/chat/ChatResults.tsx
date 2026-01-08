import { useState, useEffect } from 'react';
import { UserData } from './ChatWithAndrew';
import StructuredResults from './StructuredResults';
import imgProductImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { getUserProductNames } from '../../data/purchaseHistory';

interface ChatResultsProps {
  userData: UserData;
  onStartOver: () => void;
}

interface ProductRecommendation {
  name: string;
  image: string;
  why: string;
  details: string;
}

interface ConsultationMessage {
  id: string;
  type: 'message' | 'structured-results';
  content?: string;
  highlight?: boolean;
}

export default function ChatResults({ userData, onStartOver }: ChatResultsProps) {
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showStructuredResults, setShowStructuredResults] = useState(false);

  // Get user's purchase history
  const userEmail = localStorage.getItem('userEmail');
  const purchasedProducts = userEmail ? getUserProductNames(userEmail) : [];

  // Generate personalized consultation messages
  const getConsultationFlow = (): ConsultationMessage[] => {
    const flow: ConsultationMessage[] = [];
    let messageId = 0;

    // Just show structured results directly - no extra intro messages
    flow.push({
      id: `msg-${messageId++}`,
      type: 'structured-results'
    });

    return flow;
  };

  // Progressive reveal of messages
  useEffect(() => {
    const consultationFlow = getConsultationFlow();
    
    if (currentIndex >= consultationFlow.length) {
      setIsTyping(false);
      return;
    }

    // Show typing indicator
    setIsTyping(true);

    // Delay varies by message type
    const currentMessage = consultationFlow[currentIndex];
    const delay = currentMessage.type === 'structured-results' ? 600 : 
                  currentMessage.highlight ? 2200 : 
                  1600;

    const timer = setTimeout(() => {
      setMessages(prev => [...prev, currentMessage]);
      setIsTyping(false);
      
      // Queue next message
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 400);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Helper functions for personalized content
  const getPersonalizedAnalysis = (data: UserData): string => {
    const ageContext = {
      'under-30': "You're in a great age range where your body is still producing most nutrients naturally, but",
      '30-50': "You're at a stage where nutritional needs are starting to shift, and",
      '50-65': "You're at an age where natural production of many key nutrients begins to decline, and",
      '65+': "At this stage of life, both production and absorption of nutrients become critical, and"
    }[data.age || '30-50'] || "Looking at your age range,";

    const activityContext = {
      'very-active': "with your high activity level, your body is depleting nutrients much faster than average.",
      'moderately-active': "being moderately active means your body is using more nutrients than someone sedentary.",
      'lightly-active': "even with light activity, your body still has increased nutritional demands.",
      'sedentary': "even without intense exercise, your body still needs optimal nutrition to function."
    }[data.activity || 'moderately-active'];

    const goalContext = {
      'energy': "focusing on energy",
      'brain': "wanting to support brain health",
      'heart': "prioritizing heart health",
      'joints': "looking for joint support",
      'immune': "strengthening your immune system",
      'stress': "managing stress better",
      'sleep': "improving your sleep",
      'wellness': "seeking overall wellness"
    }[data.goal || 'wellness'];

    return `${ageContext} ${activityContext}\n\nYou mentioned ${goalContext}. Let me explain what's really happening in your body right now, and what we can do about it.`;
  };

  const getEducationalContext = (data: UserData): string => {
    const contexts = {
      'energy': "Here's what most people don't understand about energy: It's not about stimulants or quick fixes. Energy is produced in your mitochondria - the tiny power plants in every cell.\n\nAfter age 40, mitochondrial function naturally declines. That's why you might feel more tired even though nothing else has changed. But here's the good news: we can support mitochondrial health.",
      
      'brain': "Your brain represents only 2% of your body weight, but it uses 20% of your body's energy. It's the most metabolically active organ you have.\n\nBrain cells can't regenerate like other cells, so protecting the ones you have is crucial. The right nutrients can support cognitive function, memory, and mental clarity - but it has to be the RIGHT nutrients, not just random supplements.",
      
      'heart': "Your heart beats roughly 100,000 times per day. It never rests. Think about that for a moment - it's the hardest-working muscle in your body.\n\nHeart muscle cells need constant energy and protection from oxidative stress. The nutrients that support heart health aren't just 'nice to have' - they're essential for this non-stop process.",
      
      'joints': "Joint health isn't just about cartilage - though that's important. It's about the entire support system: cartilage, synovial fluid, surrounding tissue, and inflammatory response.\n\nYour body can support healthy joints, but it needs the right building blocks. And here's the key: joint support is preventative. It's much easier to maintain healthy joints than to rebuild damaged ones.",
      
      'immune': "Your immune system is incredibly complex - it's not just one thing. You have trillions of immune cells working 24/7 to protect you.\n\nThese cells need specific nutrients to function optimally. When you're deficient in key vitamins and minerals, your immune response suffers. It's that simple, and that important.",
      
      'stress': "Stress isn't just mental - it's biochemical. When you're stressed, your body depletes B vitamins, magnesium, and other nutrients faster than normal.\n\nThis creates a cycle: stress depletes nutrients, which makes you less able to handle stress, which depletes more nutrients. We need to break that cycle.",
      
      'sleep': "Quality sleep isn't about 'knocking yourself out' with sedatives. It's about supporting your body's natural sleep-wake cycle.\n\nYour brain produces neurotransmitters like melatonin and GABA that regulate sleep. But it needs specific nutrients to make these compounds. Without them, your sleep architecture suffers.",
      
      'wellness': "Overall wellness starts with nutritional foundation. Even if you eat well, modern food is less nutrient-dense than it was 50 years ago. Soil depletion, farming practices, and food processing have changed the game.\n\nA comprehensive approach fills the gaps in your diet and supports every system in your body. That's not marketing - that's biochemistry."
    };

    return contexts[data.goal || 'wellness'] || contexts.wellness;
  };

  const getApproachMessage = (data: UserData): string => {
    const supplementHistory = {
      'none': "I love that you're starting fresh - we can build a proper foundation from the ground up. I'm recommending things that work TOGETHER. This isn't about taking everything - it's about the right combination for YOU.",
      'few': "You're already taking some steps, which is great. Let me help you optimize what you're doing. I'm focusing on the most important nutrients for your specific situation - things that work synergistically together.",
      'several': "You're clearly committed to your health, and I respect that. But more isn't always better. Let me share what I consider the CORE essentials for your goals - the supplements that give you the most benefit."
    }[data.supplements || 'none'] || "Let me share my approach for your specific situation.";

    return supplementHistory;
  };

  const getProductIntro = (product: ProductRecommendation, data: UserData, position: number): string => {
    const intro = position === 1 ? "First" : position === 2 ? "Second" : "And finally";
    return `${intro}: ${product.name}.\n\n${product.why}\n\n${product.details}`;
  };

  const getSynergyExplanation = (products: ProductRecommendation[], data: UserData): string => {
    // Different synergy explanations based on goal
    const synergies = {
      'energy': "Here's why these work together: CoQ10 produces energy at the cellular level, and B vitamins help your body actually USE that energy. One without the other is like having a car with gas but no ignition. They're synergistic - meaning they work better together than separately.",
      
      'brain': "These aren't random choices. Omega-3s provide the structural fats your brain needs, while the other nutrients support the biochemical processes that keep your brain functioning optimally. It's the combination that matters - brain health is multifaceted.",
      
      'heart': "Your heart needs both energy production (CoQ10) and cellular protection (Omega-3s). Together, they support cardiovascular function from multiple angles. I've been recommending this combination for over 30 years because it works.",
      
      'joints': "Joint support requires both building blocks for cartilage AND support for a healthy inflammatory response. These work on different aspects of the same goal. That's why taking them together makes sense.",
      
      'immune': "Your immune system needs both antioxidant protection AND the minerals that immune cells use to function. These nutrients support immunity through different mechanisms - which is exactly what you want.",
      
      'stress': "Magnesium supports your nervous system's ability to relax, while B vitamins help your body cope with stress biochemically. Together, they address stress from both angles - immediate relief and long-term resilience.",
      
      'sleep': "These support your natural sleep cycle by providing the nutrients your brain needs to produce sleep-regulating compounds. It's not about sedation - it's about giving your body what it needs to sleep naturally.",
      
      'wellness': "This is what I call the 'foundation approach' - covering all your bases so every system in your body has what it needs to function optimally. Start here, and you can always add targeted support later."
    };

    return synergies[data.goal || 'wellness'] || "These nutrients work together synergistically - each one enhances the effectiveness of the others. That's the power of intelligent supplementation.";
  };

  const getExpectationsMessage = (data: UserData): string => {
    const timelines = {
      'energy': "Most people notice a difference in energy within 2-3 weeks. Not a jittery 'caffeine' feeling - just more sustained energy throughout the day. Some notice it sooner, some take a month. Everyone's biochemistry is different.",
      'brain': "Brain health is a long game. You might notice improved mental clarity within a few weeks, but the real benefits - supporting long-term cognitive health - come from consistent use over months and years.",
      'heart': "Heart health isn't something you 'feel' day-to-day. The benefits here are long-term - supporting healthy cardiovascular function over time. Think of it as insurance for your most vital organ.",
      'joints': "Joint support takes time. You might feel some difference in 2-4 weeks, but real improvement typically takes 2-3 months of consistent use. Cartilage and connective tissue rebuild slowly - that's just biology.",
      'immune': "You won't 'feel' a stronger immune system, but over time you might notice you're getting sick less often or recovering faster. Immune support is preventative and cumulative.",
      'stress': "Many people feel calmer within a week or two as magnesium levels normalize. B vitamins help with energy and resilience, which you should notice fairly quickly. But managing stress is also about lifestyle - supplements are part of the picture, not the whole solution.",
      'sleep': "Sleep improvements can be gradual. Some people sleep better within days, others take 2-3 weeks. The key is supporting natural sleep architecture, which sometimes means your body needs time to recalibrate.",
      'wellness': "Foundation nutrition builds over time. You might feel more energetic or notice better overall wellbeing within a few weeks, but the real value is in the long-term investment in your health."
    };

    return timelines[data.goal || 'wellness'] || "Quality supplements work with your body, not against it. Give it time - usually 2-4 weeks to notice initial changes. This is about supporting long-term health, not quick fixes.";
  };

  const getSafetyNote = (data: UserData): string | null => {
    // Different safety notes based on recommendations
    if (data.goal === 'heart' || data.goal === 'energy') {
      return "One important thing: If you're taking blood thinners or any heart medications, check with your doctor before starting CoQ10 or Omega-3s. I always say this because your safety comes first. These are powerful nutrients, and we need to make sure they work with, not against, any medications you're taking.";
    }
    
    if (data.goal === 'sleep' || data.goal === 'stress') {
      return "If you're taking any medications that affect sleep or mood, talk to your healthcare provider before adding these supplements. Natural doesn't always mean risk-free, especially when combined with medications.";
    }

    if (data.age === '65+') {
      return "At your age, absorption and medication interactions become more important. Always run new supplements by your doctor, especially if you take multiple medications. This is just good practice.";
    }

    return null;
  };

  const getRecommendations = (data: UserData): ProductRecommendation[] => {
    const recommendations: ProductRecommendation[] = [];

    switch (data.goal) {
      case 'energy':
        recommendations.push({
          name: 'Ultimate CoQ-10',
          image: imgProductImage,
          why: "CoQ10 is absolutely essential for cellular energy production",
          details: data.age === '50-65' || data.age === '65+' 
            ? "After age 50, your body produces about 50% less CoQ10 than it did at age 20. Your heart, which never stops working, needs this constantly. I take this every morning myself - have for over 30 years."
            : "Every cell in your body uses CoQ10 to produce energy. It's especially critical for your heart and muscles. Think of it as fuel for your cellular power plants."
        });
        recommendations.push({
          name: 'Essential B-Complex',
          image: imgProductImage,
          why: "B vitamins are your 'energy vitamins' - they convert food into usable fuel",
          details: data.activity === 'very-active' || data.activity === 'moderately-active'
            ? "You're active, which means you're burning through B vitamins faster than someone sedentary. Stress depletes them too. Your body can't store most B vitamins, so you need them daily."
            : "These help your body convert food into energy you can actually use. Without adequate B vitamins, the food you eat can't be efficiently turned into fuel."
        });
        break;

      case 'brain':
        recommendations.push({
          name: 'Omega-3 Fish Oil',
          image: imgProductImage,
          why: "DHA, a type of omega-3, is a major structural component of your brain",
          details: "Your brain is about 60% fat, and much of that is DHA from omega-3s. Your brain needs these fats to function optimally. Most people don't get nearly enough from diet alone."
        });
        recommendations.push({
          name: 'Brain & Memory Support',
          image: imgProductImage,
          why: "Targeted nutrients that support cognitive function and memory",
          details: "This includes ingredients like Ginkgo Biloba and Phosphatidylserine that have been studied for brain health. I formulated this specifically for people concerned about maintaining mental clarity as they age."
        });
        break;

      case 'heart':
        recommendations.push({
          name: 'Ultimate CoQ-10',
          image: imgProductImage,
          why: "Your heart muscle has the highest concentration of CoQ10 in your entire body",
          details: "That tells you something. Your heart needs constant energy, and CoQ10 provides it at the cellular level. This isn't optional for heart health - it's foundational."
        });
        recommendations.push({
          name: 'Omega-3 Fish Oil',
          image: imgProductImage,
          why: "Supports healthy cardiovascular function and healthy triglyceride levels",
          details: "Omega-3s have been extensively studied for heart health. They support healthy blood vessel function and help maintain triglycerides already in the normal range. This is one of the most researched nutrients in cardiovascular health."
        });
        break;

      case 'joints':
        recommendations.push({
          name: 'Joint & Cartilage Support',
          image: imgProductImage,
          why: "Provides glucosamine and other building blocks for healthy cartilage",
          details: "Your body needs these compounds to maintain cartilage and joint fluid. Think of it as providing raw materials for ongoing maintenance. The earlier you start supporting joint health, the better."
        });
        recommendations.push({
          name: 'Curcumin Complex',
          image: imgProductImage,
          why: "Supports a healthy inflammatory response",
          details: "Curcumin from turmeric has been used for centuries. Modern research shows it supports the body's natural inflammatory response, which is key for joint comfort and mobility. Quality and absorption matter - not all curcumin supplements work the same."
        });
        break;

      case 'immune':
        recommendations.push({
          name: 'Vitamin C & E Complex',
          image: imgProductImage,
          why: "Powerful antioxidants that support immune function",
          details: "Vitamin C is water-soluble, so your body can't store it - you need it every day. Vitamin E protects cell membranes. Together, they provide comprehensive antioxidant protection for immune cells."
        });
        recommendations.push({
          name: 'Zinc & Selenium Complex',
          image: imgProductImage,
          why: "Essential minerals that immune cells use to function properly",
          details: "Zinc is involved in virtually every aspect of immune function. Selenium supports your body's antioxidant defense system. Many people are deficient in both because modern diets don't provide enough."
        });
        break;

      case 'stress':
        recommendations.push({
          name: 'Magnesium Complex',
          image: imgProductImage,
          why: "Magnesium is often called the 'relaxation mineral' for good reason",
          details: "It helps calm your nervous system and supports healthy stress response. Most Americans are deficient in magnesium because of modern diets and soil depletion. Stress depletes it even faster."
        });
        recommendations.push({
          name: 'Essential B-Complex',
          image: imgProductImage,
          why: "Stress depletes B vitamins faster than almost anything else",
          details: "Your adrenal glands need B vitamins to produce stress hormones. When you're stressed, you use more B vitamins. It's a direct relationship. Supplementing helps your body cope with stress more effectively."
        });
        break;

      case 'sleep':
        recommendations.push({
          name: 'Magnesium Complex',
          image: imgProductImage,
          why: "Magnesium promotes relaxation and supports natural sleep cycles",
          details: "It helps activate the parasympathetic nervous system - your 'rest and digest' mode. Many sleep issues are related to magnesium deficiency. This is gentle, natural support, not sedation."
        });
        recommendations.push({
          name: 'Sleep Support Complex',
          image: imgProductImage,
          why: "A gentle blend that supports your body's natural sleep-wake rhythm",
          details: "This includes nutrients like L-theanine and GABA that support relaxation without grogginess. It works WITH your body's natural processes, not against them. You'll wake up refreshed, not groggy."
        });
        break;

      case 'wellness':
      default:
        recommendations.push({
          name: 'Ultimate Multivitamin',
          image: imgProductImage,
          why: "This is your nutritional foundation - where everyone should start",
          details: "A comprehensive multivitamin fills the gaps in your diet and provides a solid foundation for health. Even if you eat well, you're likely missing nutrients. This covers all the bases with high-quality, bioavailable forms."
        });
        recommendations.push({
          name: 'Omega-3 Fish Oil',
          image: imgProductImage,
          why: "Essential fatty acids your body cannot make on its own",
          details: "They're called 'essential' for a reason - your body can't produce them. They support heart health, brain function, joint health, and healthy inflammatory response. If you take only two supplements, make it a multivitamin and omega-3s."
        });
        break;
    }

    // Add foundation product for beginners (if not already included)
    if (data.supplements === 'none' && data.goal !== 'wellness' && recommendations.length < 3) {
      recommendations.push({
        name: 'Ultimate Multivitamin',
        image: imgProductImage,
        why: "Before we focus on specific goals, let's build a proper foundation",
        details: "You mentioned you're not currently taking supplements. Start here. A quality multivitamin ensures you're not deficient in basic nutrients before adding targeted support. It's like building a house - foundation first, then everything else."
      });
    }

    return recommendations;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Render all messages in sequence */}
      {messages.map((message) => {
        if (message.type === 'message') {
          return (
            <div key={message.id} className="flex justify-start">
              <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${ 
                message.highlight 
                  ? 'bg-[#FFF9E6]' 
                  : 'bg-white'
              }`}>
                <p className="text-[14px] leading-[1.6] text-[#003b3c] whitespace-pre-line">
                  {message.content}
                </p>
              </div>
            </div>
          );
        }

        if (message.type === 'structured-results') {
          const products = getRecommendations(userData);
          return (
            <StructuredResults
              key={message.id}
              userData={userData}
              products={products}
              analysis={getPersonalizedAnalysis(userData)}
              education={getEducationalContext(userData)}
              synergy={getSynergyExplanation(products, userData)}
              expectations={getExpectationsMessage(userData)}
              safety={getSafetyNote(userData)}
              onStartOver={onStartOver}
            />
          );
        }

        return null;
      })}

      {/* Typing indicator */}
      {isTyping && messages.length > 0 && (
        <div className="flex justify-start animate-fade-in">
          <div className="bg-white border border-[#D9E2E2] rounded-2xl px-4 py-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#003b3c]/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#003b3c]/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#003b3c]/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}