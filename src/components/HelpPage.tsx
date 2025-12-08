import { useState } from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { globalFAQs, topics } from '../data/helpCenterFAQs';
import ContactCard from './help/ContactCard';
import TopicSelector from './help/TopicSelector';
import FAQList from './help/FAQList';
import ContactForm from './help/ContactForm';
import SuccessMessage from './help/SuccessMessage';

export default function HelpPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Get current FAQs based on selected topic
  const currentFAQs = selectedTopic 
    ? topics.find(t => t.id === selectedTopic)?.faqs || globalFAQs
    : globalFAQs;

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId);
    setExpandedFAQ(null);
  };

  const handleToggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleFormSubmitSuccess = (email: string) => {
    setSubmittedEmail(email);
    setShowSuccess(true);
    setShowContactForm(false);
  };

  const handleFormCancel = () => {
    setShowContactForm(false);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailUsClick = () => {
    setShowContactForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full bg-[#009296] px-[20px] md:px-[40px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="w-full">
          <h1 className="font-['STIX_Two_Text:Medium',serif] font-medium text-white text-[36px] md:text-[48px] lg:text-[54px] xl:text-[72px] leading-[1.1] tracking-[-0.72px] md:tracking-[-0.96px] lg:tracking-[-1.08px] xl:tracking-[-1.44px] mb-[20px] md:mb-[24px]">
            We're here to <span className="text-[#48E1DC] not-italic" style={{ fontFamily: "'STIX Two Text', serif", fontStyle: 'italic', fontWeight: 400 }}>help</span>
          </h1>
          <p className="font-['Inter',sans-serif] text-[#D4F1F4] text-[20px] leading-[1.4] max-w-[1200px]">
            Browse our FAQs below or reach out to our Vitamin Specialist team to get all the answers you need.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-[20px] md:px-[40px] pt-[40px] lg:pt-[60px] pb-[60px] md:pb-[80px] lg:pb-[100px]">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] xl:gap-[100px]">
            {/* Left Side - FAQs or Contact Form */}
            <div className="flex-1">
              {!showContactForm && !showSuccess ? (
                <>
                  <TopicSelector
                    topics={topics}
                    selectedTopic={selectedTopic}
                    onTopicChange={handleTopicChange}
                  />

                  {/* FAQ Section Title */}
                  <h2 className="font-['STIX_Two_Text:Medium',serif] font-medium text-[#003b3c] text-[20px] md:text-[28px] leading-[1.2] mb-[28px] md:mb-[32px]">
                    {selectedTopic ? 'Is this what you are looking for?' : 'Most frequently asked...'}
                  </h2>

                  <FAQList
                    faqs={currentFAQs}
                    expandedFAQ={expandedFAQ}
                    onToggleFAQ={handleToggleFAQ}
                    selectedTopic={selectedTopic}
                  />
                </>
              ) : showSuccess ? (
                <SuccessMessage
                  email={submittedEmail}
                  onClose={handleSuccessClose}
                />
              ) : (
                <ContactForm
                  onCancel={handleFormCancel}
                  onSubmitSuccess={handleFormSubmitSuccess}
                />
              )}
            </div>

            {/* Right Side - Contact Cards */}
            <div className="lg:w-[480px] xl:w-[540px] flex flex-col gap-[20px]">
              <ContactCard
                icon={MessageCircle}
                title="Chat with us"
                description="Receive live assistance from one of our Vitamin Specialists available 7 days a week between 6AM and 6PM PST."
                buttonText="Start chatting"
                onClick={() => console.log('Start chat')}
              />

              <ContactCard
                icon={Phone}
                title="Call our support"
                description="You can call us at +1 800 800 1200 available 7 days a week between 6AM and 6PM PST."
                buttonText="Call us"
                onClick={() => console.log('Call us')}
              />

              <ContactCard
                icon={Mail}
                title="Email us"
                description="Estimated reply time: 1 business day"
                buttonText="Email us"
                onClick={handleEmailUsClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
