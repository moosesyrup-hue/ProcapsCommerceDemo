import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Plus, Minus } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [breakpoint, setBreakpoint] = useState<'S' | 'M' | 'L' | 'XL' | 'HD'>('M');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1920) {
        setBreakpoint('HD');
      } else if (width >= 1440) {
        setBreakpoint('XL');
      } else if (width >= 1280) {
        setBreakpoint('L');
      } else if (width >= 768) {
        setBreakpoint('M');
      } else {
        setBreakpoint('S');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Responsive padding and spacing
  const containerPadding = breakpoint === 'S' ? 'px-[20px]' : breakpoint === 'M' ? 'px-[40px]' : breakpoint === 'L' ? 'px-[60px]' : breakpoint === 'XL' ? 'px-[80px]' : 'px-[120px]';
  const topPadding = breakpoint === 'S' ? 'pt-[40px]' : breakpoint === 'M' ? 'pt-[60px]' : 'pt-[80px]';
  const bottomPadding = breakpoint === 'S' ? 'pb-[60px]' : breakpoint === 'M' ? 'pb-[80px]' : 'pb-[100px]';
  
  // Responsive title sizes
  let titleSize = '';
  if (breakpoint === 'S') {
    titleSize = 'text-[32px] tracking-[-0.64px]';
  } else if (breakpoint === 'M') {
    titleSize = 'text-[42px] tracking-[-0.84px]';
  } else if (breakpoint === 'L') {
    titleSize = 'text-[52px] tracking-[-1.04px]';
  } else if (breakpoint === 'XL') {
    titleSize = 'text-[58px] tracking-[-1.16px]';
  } else {
    // HD
    titleSize = 'text-[68px] tracking-[-1.36px]';
  }

  // Responsive subtitle sizes
  const subtitleSize = breakpoint === 'S' ? 'text-[14px]' : breakpoint === 'M' ? 'text-[16px]' : 'text-[18px]';

  // Responsive spacing
  const titleToSubtitle = breakpoint === 'S' ? 'mb-[16px]' : breakpoint === 'M' ? 'mb-[20px]' : 'mb-[24px]';
  const subtitleToAccordions = breakpoint === 'S' ? 'mt-[32px]' : breakpoint === 'M' ? 'mt-[40px]' : 'mt-[48px]';

  const privacyData = [
    { 
      title: "Acceptance of Terms", 
      content: (
        <>
          <p className="mb-[16px]">This Website located at https://www.ProCaps.com (the "Website" or the "Site") is operated by ProCaps Laboratories, Inc. ("ProCaps," "our," "we," or "us"). These Terms and Conditions ("Terms and Conditions") apply to the Site. Please read these Terms and Conditions carefully. These Terms and Conditions, including all documents referenced herein, represent the entire understanding between ProCaps and you regarding your use of this Site and supersede any prior statements or representations. The Site's Privacy Policy is incorporated into these Terms and Conditions by reference and is made a part hereof.</p>
          <p className="mb-[16px]">The information on this Site is for informational purposes only and is not intended as a substitute for advice from your physician or other healthcare professional or any information contained on or in any product label or packaging. You should not use the information on this site for diagnosis or treatment of any health problem or for prescription of any medication or other treatment. You should always speak with your physician or other healthcare professional before taking any medication or nutritional, herbal or homeopathic supplement, before starting any diet or exercise program or before adopting any treatment for a health problem. Each person is different, and the way you react to a particular product may be significantly different from the way other people react to such product.</p>
          <p className="mb-[16px]">Access, distribution and/or use of to this Site is subject to all applicable laws and regulations. To the extent that access, distribution and/or use of this Site would be deemed illegal by governing law, such access, distribution and/or use is prohibited. By visiting any area on this Site, you are deemed to have accepted these Terms and Conditions. If you do not agree to abide by these Terms and Conditions, please do not use this Site.</p>
          <p className="mb-[16px]">As a condition of your use of the Site, you will not use the Site for any purpose that is unlawful or prohibited by these Terms and Conditions, the Privacy Policy or any applicable laws.</p>
          <p className="mb-[16px]">By accepting these Terms and Conditions and/or by continuing to access the Site you affirm, represent and warrant that: (a) you are 18 years of age or older; (b) all information you submit via the Site shall be truthful and accurate (and you will maintain the accuracy of such information); (c) you will abide by these Terms and Conditions and Privacy Policy; and (d) your use of the Site shall not otherwise violate any applicable law, rule or regulation.</p>
          <p>ProCaps may terminate your right to access and/or use the Site at any time and for any reason whatsoever. ProCaps shall not be liable to you for any termination of the Terms and Conditions, including information that may have been saved to any account you may have set up.</p>
        </>
      )
    },
    { 
      title: "What Information We Collect About You and How We Collect It", 
      content: (
        <>
          <p className="mb-[16px]"><strong>The Personal Information We Collect.</strong> This Privacy Policy applies to all information collected by or submitted to the Website. We consider "Personal Information" to mean information about an identifiable individual. If you subscribe to our newsletter, set up an account, use our online chat function to chat with us via the Site, purchase products via the Site, or participate in activities or promotions that may be offered on the Site from time to time, you will be asked to provide a variety of information including, but not limited to, your name, password preference, mailing address, email address, phone number, and other similar information about you.</p>
          <p className="mb-[16px]">This Site does not collect your financial information. However, when you shop and purchase our Products on the Site, you will be redirected to a website hosted by a third party that is not owned or controlled by ProCaps. Purchases or sales made on or from that Site are not governed by the Privacy Policy and/or Terms and Conditions of this Site. You should read the privacy policies and terms and conditions on the site that you are redirected to when you purchase or shop for ProCaps' products to understand the ways in which your Personal Information, including but not limited to your financial information, is stored by any applicable third party. You are encouraged to review the policies and terms of those other websites to understand how your Personal Information, including your financial information, is collected and maintained by such websites.</p>
          <p className="mb-[16px]">An IP (Internet Protocol) address is a number that is automatically assigned to your computer by your internet service provider when you log on. Your IP address is not linked to your Personal Information but ProCaps does reserve the right to use IP addresses to identify individuals who threaten the Website or other users or visitors. IP addresses may also be used to help diagnose problems with the Website and to gather broad demographic information.</p>
          <p className="mb-[16px]"><strong>Third-Party Applications.</strong> Some Users or visitors may connect with the Website using Facebook or Instagram. If you decide to connect to the Site through an external, third-party application, you will be granting ProCaps permission to receive information from such third-party applications.</p>
          <p className="mb-[16px]"><strong>Other Information.</strong> When you access the Website, ProCaps will automatically receive some information about your use of the Website. The type of information that is automatically collected by ProCaps includes such things as the date and time of access of the Website, the Internet protocol (IP) address of the computer that you are using, the domain and host from which you access the Internet, your browser software and operating system, the referring website address, and the kinds of activities you are engaging in on the Website. This information is used to help us improve and enhance the Website to better meet the needs of its users.</p>
          <p className="mb-[16px]">ProCaps contracts with non-affiliated third parties/business partners to host the Website and to provide data collection and reports regarding Visitors' activities on the Website. On our behalf, these non-affiliated third parties/business partners use cookies to receive and collect information anonymously (meaning without attaching it to any personally identifiable user) about Visitors' activities and collect and aggregate such information as collected from many Users of the Website. These non-affiliated third parties/business partners have agreed not to use this information other than (i) in connection with providing services to us to make our Website more useful and efficient, (ii) as permitted in this Privacy Policy, or (iii) as otherwise permitted by law.</p>
          <p className="mb-[16px]">ProCaps will also aggregate anonymized Personal Information and may use, share and disclose such aggregated information as permitted by law. For example, we may use such information for research and product development purposes, and may also share such aggregated information with ProCaps business partners.</p>
          <p>Regardless of whether a User has chosen to limit ProCaps' sharing of Personal Information as collected on the Website, ProCaps may, without restriction, use, share and disclose aggregated statistics about Users, along with specific information concerning individual Users that is not Personal Information in any way permitted by applicable law.</p>
        </>
      )
    },
    { 
      title: "Use of Cookies and Web Beacons; Use of Google Analytics", 
      content: (
        <>
          <p className="mb-[16px]">The Website may make use of: (i) "cookies" – small data files which we may send to your computer on the basis of the information that we have collected about your visit; and (ii) "web beacons" – small strings of code that provide a graphic image that surveys visitors' internet activity. They contain information allowing us to recognize when someone is visiting the Website and to keep track of preferences. Through the use of cookies and web beacons, we may automatically collect information about your online activity on our Website, such as the links you click and the searches you conduct on our Website. Cookies are stored in your computer's browser or on your hard drive and can then be retrieved by the Website. Two kinds of cookies may be used: so-called "session" cookies, which are deleted from your computer when you leave the Website and are used purely to help you to navigate around the Website; and "persistent" cookies, which remain on your computer so that the Website can recognize you when you return.</p>
          <p className="mb-[16px]">If you want to delete any cookies that were already sent to your computer, please refer to your web browser's "Help" facility. In addition, most web browsers can be set to prevent you from receiving new cookies, notify you before accepting cookies or disable cookies altogether. Details about this can normally be found in the "Help" facility provided with your browser.</p>
          <p>ProCaps uses a web analytics tool called Google Analytics that helps website and mobile application owners understand how visitors engage with their websites. We can view a variety of reports about how visitors interact with our Website so we can improve it. Google Analytics collects information anonymously. Google Analytics uses cookies and IP addresses, and reports website trends without identifying individual visitors. In the event a visitor to the Website voluntarily submits contact information to Google Analytics, that company may then associate such information with the applicable IP address to enable us to see that visitor's specific interactions with our Website. For more information related to Google Analytics, click here: Google Analytics. You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-On. For information about and to install Google Analytics Opt-out Browser Add-on, click here: opt out.</p>
        </>
      )
    },
    { 
      title: "How We Use the Personal Information We Collect From and About You", 
      content: (
        <>
          <p className="mb-[16px]">We use the Personal Information your provide to us for the purpose of communicating with the parties to the transactions in which you are engaged or with other persons or entities with whom you are involved in connection with the transactions on the Website and to process and bring those transactions to completion. Your Personal Information may also be used in the following ways:</p>
          <ul className="list-disc pl-[24px] mb-[16px] space-y-[8px]">
            <li>to deliver materials, information and services to you,</li>
            <li>to give you notice of and/or resolve any problems that may arise in connection with our services,</li>
            <li>to better understand the needs and interests of our customers,</li>
            <li>to analyze the success of our services and Website and for research and development purposes,</li>
            <li>to manage the Website's interactive functionality,</li>
            <li>to help us improve and enhance the Website experience for all of its visitors, and customize the content on our Website,</li>
            <li>for compliance with our legal and regulatory obligations,</li>
            <li>as otherwise reasonably required to provide customer services and maintain the Website,</li>
            <li>to investigate potential breaches of the Terms and Conditions of Use of the Website,</li>
            <li>to investigate potentially unlawful activity,</li>
            <li>for any other purpose outlined in this Privacy Policy and/or the Terms and Conditions of which this Privacy Policy is a part, and as otherwise permitted by law.</li>
          </ul>
          <p className="mb-[16px]">We may also use your Personal Information to contact you to the extent such activity is permitted by law. This information may also be used to help ProCaps and its commercial partners, and services providers deliver information to you, and for other purposes as are reasonably necessary to provide the services requested by you. You may opt-out of receiving future mailings or other messages from us by following the instructions in the e-mail or other message you receive from us or by following the instructions set forth in the Opting In and Opting Out of Electronic Communications section in this Policy.</p>
          <p className="mb-[16px]">Your Personal Information may otherwise be disclosed to non-affiliated third parties as either permitted by, or to comply with, applicable laws and regulations. Your Personal Information is transmitted to and stored only on servers located in the U.S. We may disclose Personal Information if we believe it is necessary to investigate, prevent, or take action regarding suspected illegal activities or fraud, situations involving the physical safety of any person, violations of our Terms and Conditions of Use, or otherwise in accordance with applicable law.</p>
          <p className="mb-[16px]">ProCaps may also share your Personal Information, without restriction, with companies and organizations that we retain to perform services for us, such as those that provide data processing, computer software maintenance and development, and companies providing professional, legal or accounting advice to us. In such situations, ProCaps requires that these companies and organizations agree to (a) maintain the confidentiality of the Personal Information, and (b) limit the use of such Personal Information to the purposes for which it was provided. We will not sell, rent or market Personal Information collected on this Website to non-affiliated third parties for their marketing purposes, unless we have your consent. However, we may disclose aggregated statistics about visitors to the Website, along with anonymous information concerning individual users of the Website. We may combine anonymous information and/or aggregate information we collect with additional anonymous and/or aggregate information collected from other sources. We may share anonymous information (including aggregate information) we collect regarding our users with third parties (such as advisors, and/or consultants) for various business purposes including conducting general business analysis, and developing website content and services.</p>
          <p>In the event that ProCaps, or an affiliate of ProCaps is involved in a merger, acquisition, consolidation, restructuring, reorganization, liquidation, sale or similar transaction relating to any portion of its business and/or assets, or in the unlikely event that ProCaps goes out of business or enters bankruptcy, each User hereby acknowledges and agrees that the Website, all data collected on the Website (including Personal Information still within our possession, custody or control), and any of our rights and obligations under this Privacy Policy may be included in the assets of, and/or transferred pursuant to, such transaction, and that any acquirer or successor (or a third party through bankruptcy) of ProCaps may continue to use the Personal Information as set forth in this Privacy Policy. If that occurs, a notice will be posted to such effect on the Website and/or notification will be provided by any other media or contact method as may be required by applicable laws and regulations.</p>
        </>
      )
    },
    { 
      title: "Retention of Personal Information", 
      content: (
        <>
          <p className="mb-[16px]">Personal Information is retained to deliver our services, to otherwise fulfill identified or apparent purposes, and Personal Information may be retained for record-keeping, and for the following purposes:</p>
          <ul className="list-disc pl-[24px] mb-[16px] space-y-[8px]">
            <li>Your Personal Information is reasonably necessary to manage our operations, to manage your relationship with us, or to satisfy another purpose for which we collected the information;</li>
            <li>Your Personal Information is reasonably necessary to carry out a disclosed purpose that is reasonably compatible with the context in which the personal information was collected;</li>
            <li>The information is reasonably required to protect or defend our rights or property (which will generally relate to applicable laws that limit actions in a particular case); or We are otherwise required or permitted to keep your information by applicable laws or regulations.</li>
          </ul>
          <p>At some point ProCaps may elect to destroy, erase or anonymize your Personal Information.</p>
        </>
      )
    },
    { 
      title: "Children's Privacy", 
      content: (
        <p>We do not knowingly collect Personal Information from children under the age of 13. If you believe we have collect Personal Information from a minor, please contact us via the information in the Contact Us section below and we will take appropriate steps to delete it.</p>
      )
    },
    { 
      title: "Opting In and Opting Out of Electronic Communications", 
      content: (
        <p>At certain points where Personal Information is collected on our Website, there may be a box to indicate that you wish to receive certain information or communications from us. You may opt out of receiving electronic communications, such as emails from us at any time. In all of our electronic communications you will be given the opportunity to opt out of receiving future communications.</p>
      )
    },
    { 
      title: "Do Not Track Signals", 
      content: (
        <p>Certain web browsers provide users with an option by which you may have your browser send a "Do Not Track" signal to websites that you are visiting, advising the recipient websites that you do not want to have your online activity tracked. However, the way browsers communicate such "Do Not Track" signals is not yet uniform and, accordingly, our Website does not take any action in response to such signals. In the event a final standard is developed and accepted, we may reassess how we should respond to such signals.</p>
      )
    },
    { 
      title: "Interest-Based Behavioral Advertising", 
      content: (
        <p>The Digital Advertising Alliance offers a tool for opting out of the collection of cross-app data on a mobile device for interest-based advertising. To exercise choice for companies participating in this tool, download the AppChoices app here.</p>
      )
    },
    { 
      title: "Minors", 
      content: (
        <p>You must be 18 years of age to use the Website. ProCaps does not knowingly collect or maintain any Personal Information from children under the age of 18, and no part of this Website is designed with the purpose of attracting anyone under the age of 18. If you use the Website from any country outside the United States, the various communications will necessarily result in the transfer of information across international boundaries. By visiting the Website, you consent to these transfers.</p>
      )
    },
    { 
      title: "Links to Other Websites and Services", 
      content: (
        <>
          <p className="mb-[16px]">The Website may contain links to various other sites. These sites may ask to collect user information voluntarily or otherwise collect certain information (for example, your IP address). Please be aware that these other websites may have different privacy policies that may subject users to different privacy practices. Please review the privacy policies of such other websites for information concerning what information is collected on such websites and how it is used.</p>
          <p>Our website also includes social media features, such as the Facebook and Instagram or other interactive mini-programs that run on our site. These features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on our Website. Your interactions with these features are governed by the privacy policy of the company providing the feature, which we encourage you to review.</p>
        </>
      )
    },
    { 
      title: "Information Storage and Protection", 
      content: (
        <>
          <p className="mb-[16px]">ProCaps will maintain reasonable procedures to protect the security and confidentiality of Personal Information provided to it by Users, in accordance with applicable law.</p>
          <p className="mb-[16px]">There are industry standard safeguards in place to protect Users' Personal Information, such as the use of firewalls and SSL certificates, and limiting access to such information by company personnel. Personal Information will be stored in databases and servers located in the United States. However, no transmission made through the internet can be made completely secure, and accordingly, we will not be liable for the disclosure of any Users' Personal Information that occurs as a result of transmission errors or the actions of any third party to the fullest extent permitted by law.</p>
          <p>In the unlikely event that we determine that there may have been a security breach that results in the unauthorized disclosure of Personal Information to a third party, ProCaps will promptly notify consumers whose Personal Information it reasonably believes may have been compromised by posting information on the Website and, if email contact is possible, then also by sending an email notification with respect to the situation.</p>
        </>
      )
    },
    { 
      title: "Your Rights Regarding Your Personal Information", 
      content: (
        <>
          <p className="mb-[16px]">In addition to having the ability to opt-out of receiving electronic communications, such as emails from AskAndrew@ProCapsLabs.com, Users may access, review and, in certain situations, update, revise and/or delete certain Personal Information by accessing and editing their accounts on the Website or by sending an e-mail to our privacy officer at AskAndrew@ProCapsLabs.com. Additionally, please note that while you may request the updating, revision or deletion of such information, a copy of the unrevised information may be maintained in PROCAPSs' records after any such revision or deletion.</p>
          <p className="mb-[16px]">As the Website evolves, Users may be offered additional options for reviewing and/or editing Personal Information. Please check this Privacy Policy often to make sure you have reviewed the most recent version.</p>
          <p>If for any reason you wish to discontinue the use of the Website and have your Personal Information removed from our database, please contact us at AskAndrew@ProCapsLabs.com.</p>
        </>
      )
    },
    { 
      title: "Text Marketing Notifications", 
      content: (
        <p>By subscribing to ProCaps' text notifications, you agree to receive automated marketing text messages from us about our products and services at the phone number you provided when you subscribed, and that the messages may be sent via automatic telephone dialing system or other technology. Message frequency is recurring. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP, END, CANCEL, UNSUBSCRIBE or QUIT to opt-out and HELP for customer support. You may receive an additional text message confirming your decision to opt-out. You understand and agree that attempting to opt-out by any means other than texting the opt-out commands above is not a reasonable means of opting out.</p>
      )
    },
    { 
      title: "California Privacy Rights", 
      content: (
        <p>California "Shine the Light" Law: If you reside in California, you have the right to ask us one time per year for information about our disclosure, if any, of personal information to third parties for their direct marketing purposes in the preceding calendar year. To make a request, please contact us at AskAndrew@ProCapsLabs.com or write to us at the address listed below. Indicate in your letter that you are a California resident making a "Shine the Light" inquiry. We reserve our right not to respond to requests submitted other than by the means specified in this section, if the request is not labeled or sent properly, or if the request does not have complete information.</p>
      )
    },
    { title: "California and Colorado Resident/Consumer Rights", content: "Placeholder content for California and Colorado Resident/Consumer Rights. This will be replaced with actual privacy policy content." },
    { 
      title: "Changes in Policy", 
      content: (
        <p>From time to time, the policies set forth in these Terms and Conditions may change. We will post changes to the Terms and Conditions of Use at this Site. Please review these Terms and Conditions of Use often so that you will remain abreast of our current policies. Your use of this Site subsequent to any amendment of these Terms and Conditions will signify your acceptance of, and assent to, its revised terms.</p>
      )
    },
    { 
      title: "Governing Law", 
      content: (
        <p>This Privacy Policy shall be governed by the laws of the State of Nevada of the United States of America, without regard to its conflict of law provisions. Please click here to review the terms relating to Disputes and Governing Law for this Website.</p>
      )
    },
    { 
      title: "Contact Us", 
      content: (
        <p>If you have any questions about our policy regarding orders, shipping, returns, and refunds, please contact us at AskAndrew@ProCapsLabs.com, via phone at 1-800-800-1200 (Monday – Sunday 6:00 a.m. to 6:00 p.m. PT), or write to us at ProCaps Laboratories, 430 Parkson Road, Henderson, NV 89011.</p>
      )
    }
  ];

  return (
    <div className={`bg-white w-full ${topPadding} ${bottomPadding}`}>
      <div className={`${containerPadding} max-w-[1440px] mx-auto`}>
        {/* Title */}
        <h1 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] ${titleSize} text-[#003b3c] ${titleToSubtitle}`}>
          Privacy Policy
        </h1>

        {/* Last Updated */}
        <p className={`font-['Inter',sans-serif] leading-[1.6] ${subtitleSize} text-[#003b3c]`}>
          Last Updated: September 16, 2023
        </p>

        {/* Privacy Policy Accordions */}
        <div className={subtitleToAccordions}>
          <Accordion type="multiple" className="w-full">
            {privacyData.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-[#D9E2E2]"
              >
                <AccordionTrigger className="group flex items-start justify-between py-[24px] hover:no-underline [&>svg]:hidden text-left">
                  <p className={`font-['Inter',sans-serif] font-medium leading-[1.4] ${breakpoint === 'S' ? 'text-[16px]' : breakpoint === 'M' ? 'text-[18px]' : 'text-[20px]'} text-[#003b3c] pr-[20px]`}>
                    {item.title}
                  </p>
                  <div className="flex-shrink-0 group-data-[state=open]:hidden">
                    <Plus className={`${breakpoint === 'S' ? 'w-[20px] h-[20px]' : 'w-[24px] h-[24px]'} text-[#009296]`} />
                  </div>
                  <div className="flex-shrink-0 hidden group-data-[state=open]:block">
                    <Minus className={`${breakpoint === 'S' ? 'w-[20px] h-[20px]' : 'w-[24px] h-[24px]'} text-[#009296]`} />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className={`font-['Inter',sans-serif] leading-[1.6] ${breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]'} text-[#003b3c] pb-[24px]`}>
                    {item.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
