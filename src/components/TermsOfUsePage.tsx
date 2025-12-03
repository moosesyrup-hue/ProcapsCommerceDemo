import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Plus, Minus } from 'lucide-react';

export default function TermsOfUsePage() {
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

  const termsData = [
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
      title: "Accuracy and completeness of Information", 
      content: (
        <>
          <p className="mb-[16px]">This Website located at https://www.ProCaps.com (the "Website" or the "Site") is operated by ProCaps Laboratories, Inc. ("ProCaps," "our," "we," or "us"). These Terms and Conditions ("Terms and Conditions") apply to the Site. Please read these Terms and Conditions carefully. These Terms and Conditions, including all documents referenced herein, represent the entire understanding between ProCaps and you regarding your use of this Site and supersede any prior statements or representations. The Site's Privacy Policy is incorporated into these Terms and Conditions by reference and is made a part hereof.</p>
          <p className="mb-[16px]">The Site is controlled and operated by ProCaps from its offices in the United States of America, and is intended for use in the United States, and its territories and possessions. Our content includes but is not limited to product information, testimonials, videos, vitamin information, and exercise routines. ProCaps is not responsible if information made available on the Site is not accurate, compete, or current. The material on the Site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primacy, more accurate, more complete, more timely sources of information. We reserve the right to modify the contents of the Site at any time, but have no obligations to update the information on the Site. You agree that by using the Site, that it your responsibility to monitor changes to the Site.</p>
          <p className="mb-[16px]">ProCaps makes no representation that the Site, or the materials contained hereon, are appropriate for users located in other countries. Those who choose to access the Site from other countries do so on their own initiative and are responsible for compliance with all laws in that country, if and to the extent that such laws are applicable.</p>
          <p>All content on this Site (including, without limitation, text, design, graphics, logos, icons, images, audio clips, downloads, interfaces, code and software) is the exclusive property of and owned by ProCaps, its licensors or its content providers and is protected by copyright, trademark and other applicable laws. You may access, copy, download and print the material contained on the site for your personal and non-commercial use, provided you do not modify or delete any copyright, trademark or other proprietary notice that appears on the material you access, copy, download or print. Any other use of content on the site, including but not limited to the modification, distribution, transmission, uploading, licensing, or the creation of derivative works from, any material, information, software, products or services obtained from the site, is expressly prohibited. ProCaps or its licensors or content providers retain full and complete title to the material provided on the site, including all associated intellectual property rights, and provide this material to you under a license that is revocable at any time in ProCaps' sole discretion. ProCaps neither warrants nor represents that your use of materials on this site will not infringe rights of third parties not affiliated with ProCaps.</p>
        </>
      )
    },
    { 
      title: "Product Purchases and Prohibitions of Unauthorized Reselling", 
      content: (
        <>
          <p className="mb-[16px]">All Products purchased from the Site are intended for personal use only and not for resale unless expressly authorized in writing by ProCaps and is expressly prohibited.</p>
          <p className="mb-[16px]">Unauthorized Reselling is defined as any sale of Products purchased from the Site without the explicit written consent of ProCaps. This includes but is not limited to:</p>
          <p className="mb-[8px] pl-[24px]">i. Selling or offering to sell any Product to a third party, including, but not limited to, on third-party websites, marketplaces, or platforms including, but not limited to, Amazon, Walmart, eBay, and any other online marketplace.</p>
          <p className="mb-[8px] pl-[24px]">ii. Selling or distributing Products in a brick-and-mortar store or any other physical location.</p>
          <p className="mb-[8px] pl-[24px]">iii. Selling or distributing Products to any third-party entity for resale.</p>
          <p className="mb-[8px] pl-[24px]">iv. Representing oneself as an authorized distributor, affiliate, or partner of ProCaps without explicit written authorization.</p>
          <p className="mb-[8px] pl-[24px]">v. Making any false or misleading representations or warranties to anyone or any entity regarding ProCaps and/or its Products.</p>
          <p className="mb-[8px] pl-[24px]">vi. Engaging in any unfair, anti-competitive, misleading, or deceptive practices regarding ProCaps and/or its Products.</p>
          <p className="mb-[8px] pl-[24px]">vii. Making any modifications to the Products, including their labeling or packaging, or market, distribute, or sell the Products in any form.</p>
          <p className="mb-[16px] pl-[24px]">viii. Resell the Products to any individual or entity in any form, in any capacity, and via any means or platform.</p>
          <p className="mb-[16px]">Any person, entity, and/or account found to be engaging in Unauthorized Reselling may be terminated without notice and may be subject to legal action.</p>
          <p>ProCaps reserves the right to seek damages and other remedies from any party engaging in Unauthorized Reselling.</p>
        </>
      )
    },
    { 
      title: "Intellectual Property and Use of Materials", 
      content: (
        <>
          <p className="mb-[16px]">The branding, trademarks, service marks, and logos of ProCaps, including, but not limited to, PROCAPS®, PROCAPS LABORATORIES®, ANDREW LESSMAN®, ANDREW LESSMAN PROCAPS®, ANDREW LESSMAN PROCAPS LABS®, and ANDREW LESSMAN PROCAPS LABORATORIES® belong to ProCaps or its licensors or affiliates and may not be used in connected with Unauthorized Reselling or in any manner that is likely or may cause confusion among customers o that discredits or disparages ProCaps.</p>
          <p>All material on this Site, including but not limited to software, images, music, text, "applets," logos and trademarks, along with the overall "look and feel" of the Site (collectively referred to as the "Material"), is protected under various intellectual property laws and owned or controlled by ProCaps, or used with permission of the owner(s) of such Material. Except as otherwise indicated on this Site, copying, reproduction, uploading, downloading, transmitting or any other use of this Site or of any of the Material, in whole or part, without the express permission of ProCaps, is prohibited. You may, however, copy, reproduce, download, transmit and/or print individual pages contained on this Site for your personal, non-commercial use, provided you agree not to conceal, remove or alter any trademark, copyright or other notice contained on: (i) this Site; (ii) any of the Material; or (iii) any such individual pages so copied, reproduced, downloaded, transmitted or printed. You may not copy, reproduce, download transmit and/or print substantial portions of this Site or of the Material contained hereon without the express written permission of ProCaps. Any unauthorized use of this Site and/or the Material contained hereon may subject the user to criminal prosecution and/or civil liability under applicable law.</p>
        </>
      )
    },
    { 
      title: "Privacy", 
      content: (
        <p>Please see ProCaps' Privacy Policy, which is incorporated into these Terms and Conditions for information concerning the collection and use of Personal Information from the Site.</p>
      )
    },
    { 
      title: "Links", 
      content: (
        <p>From time to time, this Site may contain links to other websites and/or social media features (collectively, "sites") that are not controlled and/or maintained by ProCaps. Access to and use of such other sites is at your own risk and subject to any terms, conditions and privacy policies that govern such sites, which may be different from those of ProCaps and/or may provide their users with less security than this Site. By providing such links, ProCaps shall not be deemed to endorse, recommend, approve or guarantee any third parties or their services or products, or any facts, views, advice, information and/or products found on such sites. ProCaps is not responsible for the content contained on any such sites, or for the failure of any product or service offered for sale on any such sites or for any damages that may result therefrom. Copyrights in the materials or information on the linked sites are owned by other organizations. Moreover, such other sites may have privacy policies or Terms and Conditions that differ from those of this Site. Accordingly, you should review the privacy policies and terms and conditions on such other sites before using them.</p>
      )
    },
    { 
      title: "Promotion, Sweepstakes, and Contests", 
      content: (
        <p>On occasion, ProCaps and/or certain of its advertisers, partners or suppliers to this Site may elect to conduct certain promotions, sweepstakes or contests (collectively, "Promotions") on this Site. Each such Promotion may have specific rules and regulations, which will be made available to users and which shall be deemed incorporated in and become a part of these Terms and Conditions. By participating in any Promotion, you are deemed to have accepted the rules and regulations for that Promotion, and to have agreed to abide by and be bound by them.</p>
      )
    },
    { 
      title: "Health Related Information", 
      content: (
        <p>Information and statements regarding dietary supplements have not been evaluated by the Food and Drug Administration and are not intended to diagnose, treat, cure or prevent any disease. You should read carefully all product labels and packaging prior to use. Information available on or through the Site is not meant to substitute the advice provided by your doctor or other health care professional. You should not use the information available on or through the Site, including but not limited to information that may be provided by healthcare or nutrition professionals, for diagnosing or treating a health condition or disease.</p>
      )
    },
    { 
      title: "Copyright Infringement Policy", 
      content: (
        <>
          <p className="mb-[16px]">ProCaps values intellectual property and respects the intellectual property rights of others, and will remove materials on its Site that infringe the copyrights of others. If you believe that your copyrighted material may have been infringed by material contained on this Site, then pursuant to Title 17, United States Code, §512, you may notify ProCaps' Designated Agent in writing as follows:</p>
          <p className="mb-[16px]">Name of Designated Agent: _____________________</p>
          <p className="mb-[16px]">In your notice, you must include the following:</p>
          <ul className="list-disc pl-[24px] mb-[16px] space-y-[8px]">
            <li>a physical or electronic signature of the owner of an exclusive right that is being infringed or of a person authorized to act on behalf of such owner;</li>
            <li>identification of the copyrighted work(s) that is (are) allegedly being infringed;</li>
            <li>identification of the materials that are causing the infringement and that are to be removed, along with sufficient information to allow ProCaps to locate such materials;</li>
            <li>contact information (e., name, address, email address) sufficient to enable ProCaps to contact you;</li>
            <li>a statement to the effect that you have a good faith belief that the complained of use of the material was not authorized by the owner of the copyright, its agent or the law;</li>
            <li>a statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of the exclusive right that is allegedly being infringed.</li>
          </ul>
        </>
      )
    },
    { 
      title: "Limitations of Liability and Warranty and Use Disclaimer", 
      content: (
        <p className="uppercase">THIS SITE, ALL MATERIAL CONTAINED ON THIS SITE, AND ALL LINKS OR OTHER ITEMS RELATED THERETO ARE TRANSMITTED AND DISTRIBUTED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THAT THE SITE, ITS FEATURES AND FUNCTIONS, WILL BE AVAILABLE FOR USE OR WORK AS DESCRIBED. THERE ARE NO WARRANTIES REGARDING TITLE, SECURITY, ACCURACY, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE WITH RESPECT TO THE SITE OR THE MATERIALS CONTAINED HEREON. ANY INFORMATION CONTAINED WITHIN THIS SITE IS SUBJECT TO AMENDMENT, REVISION OR UPDATING WITHOUT NOTICE AT ANY TIME. PROCAPS RESERVES THE RIGHT TO SUSPEND OR WITHDRAW ACCESS TO THE PAGES OF THIS SITE WITHOUT NOTICE AT ANY TIME AND ACCEPTS NO RESPONSIBILITY FOR THESE PAGES NOT BEING AVAILABLE AT ALL TIMES. UNLESS PROHIBITED BY LAW, PROCAPS SHALL NOT BE LIABLE FOR ANY ALLEGED DAMAGE OR INJURY, INCLUDING BUT NOT LIMITED TO ANY COMPENSATORY, CONSEQUENTIAL, DIRECT, INDIRECT AND/OR SPECIAL DAMAGES THAT RESULT FROM YOUR USE OF OR INABILITY TO USE OR ACCESS THIS SITE OR ANY MATERIALS CONTAINED HEREON OR FROM ANY COMPUTER VIRUS, MALFUNCTION OR OTHER FAILURE.</p>
      )
    },
    { 
      title: "Transmitting and Downloading", 
      content: (
        <p>ProCaps is not responsible for any damages incurred as a result of any interruption, transmission blackout, delayed transmission or incorrect data transmission over the Internet. ProCaps does not warrant or represent that this Site will meet your requirements, that access will not be interrupted or delayed, that there will be no failures, errors or omissions or loss of transmitted information, that no viruses will be transmitted or that no damage will occur to your computer system.</p>
      )
    },
    { 
      title: "Your Responsibilities", 
      content: (
        <p>You are responsible for undertaking suitable precautions to scan for computer viruses and maintaining a back-up of all data and/or equipment.</p>
      )
    },
    { 
      title: "Electronic Communications", 
      content: (
        <p>When you communicate with ProCaps electronically, via email or otherwise, you consent to receive electronic communications from ProCaps. You agree that all communications (including, but not limited to all notices, agreements and disclosures) provided to you electronically by ProCaps satisfy any legal requirement that such communication be in writing.</p>
      )
    },
    { 
      title: "Indemnity", 
      content: (
        <p>Unless prohibited by law, you agree to indemnify, defend and hold harmless ProCaps, its subsidiaries, licensors and affiliated entities and each of their respective officers, directors, employees and agents from and against any and all claims, demands, losses, liabilities, damages, costs and expenses (including but not limited to attorneys' fees) arising from or in connection with: (i) your use of the Site; (ii) your violation of these Terms and Conditions and/or the Privacy Policy; and (iii) your resale of ProCaps' Products. You agree that your representations and warranties, and obligation to indemnify ProCaps, shall survive beyond any term that these Terms and Conditions are in effect.</p>
      )
    },
    { 
      title: "Changes in Policy", 
      content: (
        <p>From time to time, the policies set forth in these Terms and Conditions may change. We will post changes to the Terms and Conditions of Use at this Site. Please review these Terms and Conditions of Use often so that you will remain abreast of our current policies. Your use of this Site subsequent to any amendment of these Terms and Conditions will signify your acceptance of, and assent to, its revised terms.</p>
      )
    },
    { 
      title: "Acquisition of Business", 
      content: (
        <p>In the event that ProCaps is involved in a merger, acquisition, consolidation, restructuring, reorganization, liquidation, sale or similar transaction relating to any portion of its business and/or assets, you hereby acknowledge and agree that this Site and all of ProCaps' rights hereunder may be included in the assets of, and/or transferred pursuant to, such transaction.</p>
      )
    },
    { 
      title: "Disputes and Governing Law", 
      content: (
        <>
          <p className="mb-[16px]">Use of the Site and these Terms and Conditions shall be governed by the laws of the State of Nevada of the United States of America, without regard to its conflict of law provisions. In the event that any portion of these Terms and Conditions is deemed unenforceable, unlawful or void by a tribunal of competent jurisdiction, in any jurisdiction for any reason, unless narrowed by construction, such portion of these Terms and Conditions shall, for purposes of such jurisdiction only, be construed as if such invalid, prohibited or unenforceable portion had been more narrowly constructed so as not to be invalid, prohibited or unenforceable (or if such provision cannot be drawn narrowly enough, the tribunal making any such determination shall have the power to modify such portion of these Terms and Conditions to the extent necessary to make such portion of these Terms and Conditions enforceable in such jurisdiction, and such portion shall then be applicable in such modified form in such jurisdiction). If, notwithstanding the foregoing, any such portion of these Terms and Conditions would be held to be invalid, prohibited or unenforceable in any jurisdiction for any reason, such portion, as to such jurisdiction only, shall be ineffective to the extent of such invalidity, prohibition or unenforceability, without invalidating the remaining provisions set forth in these Terms and Conditions. No narrowed construction, modification or invalidation of any portion of the Terms and Conditions shall affect the construction, validity or enforceability of such portion in any other jurisdiction. No waiver by ProCaps of any term or condition of these Terms and Conditions shall be deemed a further or continuing waiver of such term or condition or of any other term or condition, and ProCaps' failure to assert any right or demand compliance with any provision of these Terms and Conditions shall not be deemed to constitute a waiver of any such right or provision. Except where prohibited by law, as a condition of you accessing and/or using the Site, you agree that (1) any and all disputes and causes of action you seek to bring arising out of or connected with the Site, including products purchased from the Site, shall be resolved individually, without resort to any form of class action, and exclusively by final and binding arbitration in Nevada within one year from the date that the cause of action arose (or, if multiple cause of actions are involved, from the date that the first cause of action arose), with such arbitration conducted pursuant to the then prevailing rules of the American Arbitration Association ("AAA"); and (2) judgment upon such arbitration award may be entered in any court having jurisdiction. Unless prohibited by law, no arbitration brought pursuant hereto shall be joined to any other action or arbitration.</p>
          <p className="mb-[16px]">The rules governing arbitration are different than those in court. Arbitration does not involve a judge or jury and review is limited, but an arbitrator can award the same damages as a court. Except as may otherwise be provided in AAA's Consumer Due Process Protocol that allows consumers to file certain claims in small claims court, you understand that by accepting these Terms and Conditions, you are giving up your right to a trial in court, either with or without a jury.</p>
          <p className="mb-[16px]">Unless prohibited by law, under no circumstances will you be permitted to obtain an award for, and by accessing and/or using the Site you waive all rights to claim, punitive, incidental, consequential or any other indirect damages (including multiplied and/or increased damages and/or attorneys' fees and court costs) for any dispute or cause of action that you may have that relates in whole or part to the Site or products purchased from the Site. Notwithstanding anything to the contrary set forth in these Terms and Conditions or otherwise, your recovery with respect to any and all claims, judgments, and awards for which you are entitled shall, unless prohibited by law, be limited to your actual out-of-pocket costs incurred, excluding attorneys' fees and court costs.</p>
          <p className="mb-[16px]">Notwithstanding anything to the contrary set forth in these Terms and Conditions, ProCaps may at any time seek injunctive or other appropriate relief against you and/or against others, in any state or federal court in the state of Nevada and/or in any other court chosen by ProCaps in the event that ProCaps believes that there is a violation, or a threatened violation, of any of ProCaps' intellectual property rights and, in such case, you hereby consent to the exclusive personal jurisdiction and venue of such court.</p>
          <p>These Terms and Conditions are governed and interpreted under the laws of the State of Nevada, Nevada for any action arising from these Terms of Use. If any portion of these Terms and Conditions is deemed unlawful, void, or unenforceable, then that part shall be deemed severable and shall be construed in accordance with applicable law. Such a term will not affect the validity and enforceability of any remaining provisions. ProCaps' failure to act with respect to a breach of these Terms of Conditions by you or others does not constitute a waiver and shall not limit ProCaps' rights with respect to such breach or any subsequent breaches.</p>
        </>
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
          Terms of Use
        </h1>

        {/* Last Updated */}
        <p className={`font-['Inter',sans-serif] leading-[1.6] ${subtitleSize} text-[#003b3c]`}>
          Last Updated: September 16, 2023
        </p>

        {/* Terms of Use Accordions */}
        <div className={subtitleToAccordions}>
          <Accordion type="multiple" className="w-full">
            {termsData.map((item, index) => (
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
