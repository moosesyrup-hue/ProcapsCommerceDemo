import { MessageCircle, Phone, Mail } from 'lucide-react';
import ContactCard2 from './help/ContactCard2';
import ContactForm from './help/ContactForm';
import SuccessMessage from './help/SuccessMessage';
import { useState } from 'react';

export default function HelpPage2() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

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
    <div className="w-full bg-white min-h-screen -mb-[40px] md:-mb-[60px] lg:-mb-[80px]">
      {/* Hero Section */}
      <div className="w-full bg-[#009296] px-[20px] md:px-[40px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="w-full">
          <h1 className="font-['STIX_Two_Text:Medium',serif] font-medium text-white text-[36px] md:text-[48px] lg:text-[54px] xl:text-[72px] leading-[1.1] tracking-[-0.72px] md:tracking-[-0.96px] lg:tracking-[-1.08px] xl:tracking-[-1.44px] mb-[20px] md:mb-[24px]">
            We're here to <span className="text-[#48E1DC] not-italic" style={{ fontFamily: "'STIX Two Text', serif", fontStyle: 'italic', fontWeight: 400 }}>help</span>
          </h1>
          <p className="font-['Inter',sans-serif] text-[#D4F1F4] text-[20px] leading-[1.4] max-w-[1200px]">
            Reach out to our Vitamin Specialist team to get all the answers you need.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-[20px] md:px-[40px] pt-[60px] lg:pt-[80px] pb-[60px] lg:pb-[80px]">
        <div className="w-full">
          {!showContactForm && !showSuccess ? (
            /* Contact Cards in 3 Columns */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] md:gap-[28px] lg:gap-[32px]">
              <ContactCard2
                icon={MessageCircle}
                title="Chat with us"
                description="Receive live assistance from one of our Vitamin Specialists available 7 days a week between 6AM and 6PM PST."
                buttonText="Start chatting"
                onClick={() => console.log('Start chat')}
              />

              <ContactCard2
                icon={Phone}
                title="Call our support"
                description="You can call us at +1 800 800 1200 available 7 days a week between 6AM and 6PM PST."
                buttonText="Call us"
                onClick={() => console.log('Call us')}
              />

              <ContactCard2
                icon={Mail}
                title="Email us"
                description="Estimated reply time: 1 business day"
                buttonText="Email us"
                onClick={handleEmailUsClick}
              />
            </div>
          ) : showSuccess ? (
            <SuccessMessage
              email={submittedEmail}
              onClose={handleSuccessClose}
            />
          ) : (
            <div className="max-w-[800px] mx-auto">
              <ContactForm
                onCancel={handleFormCancel}
                onSubmitSuccess={handleFormSubmitSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}