import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Plus, Minus } from 'lucide-react';

export default function FAQPage() {
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

  const faqData = [
    { question: "What is ProCaps Laboratories?", answer: "ProCaps Laboratories is American owned and operated. We have been manufacturing quality supplements since 1979. Andrew Lessman is the owner and founder of ProCaps Laboratories. You can feel comfortable knowing his formulas contain naturally-sourced ingredients, designed to maximize absorption without upsetting your stomach. We are located in Henderson, NV, just outside of Las Vegas. The desert climate, with its lack of humidity, is ideal for manufacturing our ultra-fine powders without any of the additives you might expect from other supplement manufacturers." },
    { question: "Why are your products different than other supplements?", answer: "Of course, every company claims it has the \"best\" products, but in our case it is true. Other companies will usually say anything to get a sale, but Andrew Lessman will not allow us to give out misleading or inaccurate information. We also never claim our products cure or treat any medical conditions, unlike many competitors.\n\nAndrew has been in the \"vitamin business\" for nearly 30 years. You can learn more about the company and its founder here.\n\nOur products do not contain added dyes, fillers, waxes, or other unnecessary additives. We manufacture our own products and maintain the highest quality standards in the industry. Other companies manufacture their products in other countries and import them to the U.S.\n\nEven our capsules are natural and contain no plastic. The hard tablets or plastic capsules sold by other companies often pass through the body undigested.\n\nWe hope we have given you enough information. We can't comment on products from other companies because we have no way of verifying their claims or quality standards." },
    { question: "Where are your products made?", answer: "All ProCaps Laboratories products are made in our own 100% solar-powered temperature-controlled manufacturing facility and warehouse located in the high desert of Henderson, Nevada. From product design and manufacturing to shipping and customer service, we control every step of the process to ensure you receive the most well-researched, beneficial and freshest supplements available." },
    { question: "Do your products contain additives?", answer: "Unlike other conventional formulas, our products contain only the nutrients you want and NO additives of any kind. Every formula is metabolically and pH-balanced to ensure optimum effectiveness and to prevent stomach discomfort, even in sensitive individuals." },
    { question: "Why are your supplements in capsules?", answer: "One of the most important differences between ProCaps Laboratories and other supplement manufacturers is that we NEVER use tablets. To make a tablet, it is necessary for other ingredients such as glues, binders, fillers and other additives to be added into the formula. For this reason we only put our additive-free powders in a gelatin capsule to sustain our nutrients." },
    { question: "Why do you use Purple packets instead of clear plastic packets?", answer: "The Purple Perma-fresh packets we use to package our comprehensive products protects the nutrients from heat and sunlight, assuring you the potency and purity that you expect from a supplement. Clear plastic cannot protect fragile nutrients from heat and light which can degrade their effectiveness and reduce their benefits. We package many of our comprehensive formulas in single-dose Purple Perma-fresh packets in order to provide you with convenient daily servings that can be put in your purse or lunch bag." },
    { question: "Is there any independent testing done?", answer: "We only buy product ingredients from internationally recognized, quality suppliers and we require third-party testing on their ingredients. Then we do the confirmation testing ourselves.\n\nIndependent research laboratories often lack the testing facilities or technology to accurately evaluate products or ingredients, which makes third-party testing of products very unreliable.\n\nWe do all of our own manufacturing with strict quality standards. This ensures there is no possibility of outside tampering or manufacturing process complications.\n\nOur quality control methods allow us to confidently state that our products are more potent, pure, reliable, and safe than any other products on the market." },
    { question: "Are there any 'Certificates of Analysis' for the raw ingredients?", answer: "We get a \"Certificate of Analysis\" for the raw ingredients we use to ensure the purity of each ingredient. Our standards for raw materials acquisition are the highest in the industry, as is our standard for manufacturing." },
    { question: "Are tours available?", answer: "At this time, no public tours are offered." },
    { question: "How do I contact ProCaps Laboratories?", answer: "At ProCaps Laboratories, we are proud to provide the highest level of service and support.\n\nYou can take advantage of our toll-free customer service lines, email or chat to reach a member of our outstanding staff, prepared to assist you with ordering or any technical questions about the use of our exceptional products.\n\nContact Us" },
    { question: "Are vitamins necessary?", answer: "Vitamins and minerals are absolutely essential to your body's health and optimal function. They act as co-factors in many enzymatic reactions in the body, they scavenge free radicals to render them harmless, and they support cellular health and metabolism. Of course, the best source of nutrition is your diet, and we will always recommend a healthy diet over taking a vitamin or mineral supplement. However, for the more than 75% of active, educated, healthy Americans who do use supplements, we recommend they take a formula that is not harmful. In other words, we recommend an additive-free supplement that delivers nutrients in their safest, most effective forms." },
    { question: "Why should I take a multivitamin?", answer: "The ProCaps Laboratories' strategy on supplementation promotes the multivitamin as its foundation because this is where a person will get the essential vitamins and minerals that are lacking in their diet. Those nutrients that the body cannot produce on its own or cannot make in sufficient quantities are not provided in the day-to-day foods we consume (fast foods, processed foods, etc.) We don't get enough nutrients from our Westernized diet to achieve optimal health, hence the importance of a multivitamin." },
    { question: "What do anti-oxidants REALLY do?", answer: "Anti-oxidants are natural compounds that inhibit the oxidation of target molecules by free radicals. Free radicals are molecules that possess at least one unpaired electron, making them highly unstable and reactive. To make up for this deficiency, they will steal electrons from other molecules, generating additional free radicals in an ongoing cascade and causing damage to cells and tissues in the process. Free radicals are generated through normal cellular reactions in the body, (such as eating or exercise) or can be created from pollutants, physical stress or injury. Anti-oxidants either prevent the initiation of free radical attack on other molecules or they stabilize free radicals, rendering them harmless in both instances." },
    { question: "What do IU, mg & mcg mean?", answer: "Many of our ingredients are listed with notations. We understand that our customers need to be able to understand what they're getting, so here's what those notations mean.\n\nmg = milligram 1000 mg = 1 gram\nmcg = microgram 1000 mcg = 1 milligram\n\nIU = international unit - This measurement is used for the fat-soluble vitamins - Vitamin A, Vitamin D and Vitamin E. The measurement of IU is not easily compared to milligrams, since it depends on the particular substance." },
    { question: "Can I accidentally take too many nutrients?", answer: "Nutrient levels are a very personal choice. Although our products are additive-free and safe to take daily, only you can decide if the levels meet your needs. There is no chance of \"overdose\" or toxicity of the ingredients if you combine them, as long as you stay within the suggested use for each product.\n\nOf course, your diet also plays a role. For example, most doctors recommend 1200-1500 mg of calcium per day. If you eat no dairy products, you may choose to supplement 1200-1500 mg of calcium; if you eat a lot of dairy, you may only need to supplement half that amount." },
    { question: "What does \"standardized\" mean?", answer: "The standardization process involves testing for and verifying that specific active components in the herbs and plants being used are present in the final standardized material. Standardization also specifies a minimum potency or potency range (usually as a percentage). As a result, one is able to easily and accurately determine an effective dosage level. This is very important because, not only will you know what you are getting, there is no danger of taking too much and you can easily conform your dosage level to what research has determined to be the most beneficial and effective." },
    { question: "What are soft-gels?", answer: "Our new soft-gels protect their delicate liquid contents from oxidation and instability, and contain none of the additives or plasticizers present in ordinary soft-gels." },
    { question: "Do you list \"best by\" dates on your products?", answer: "Yes we do. The best by date for the product is on the bottom of the bottle. We guarantee 100 percent potency until that date. After that date, the product is still safe to take but will gradually lose its potency." },
    { question: "I'm worried about CODEX taking away my ability to take supplements.", answer: "There should be no adverse effects of the Food Supplement Directives (actions by Codex and the WTO) on our company or products, although we are continuing to monitor the events and information surrounding this issue. Codex will not change access to dietary supplement or access to information about supplements that are guaranteed in the United States under existing law: the Dietary Supplement Health and Education Act of 1994." },
    { question: "I am a new customer. Which products do you recommend I start with?", answer: "Without question you should begin with the nutritional foundation provided by a high potency, comprehensive multi-vitamin-mineral supplement such as one of our Multivitamin formulas. You can then add additional products targeted to your special needs -- for example anti-oxidants or supplements that benefit a specific area of the body like your joints or eyes." },
    { question: "How do I know which multivitamin is right for me?", answer: "We have several different multivitamins providing varied nutrient potency levels, specific nutrients not found in other multivitamins and combined nutrients in one multivitamin. The best way to find out which multivitamin suits your needs is to consider your lifestyle: What's lacking in your diet? Is your exercise routine taxing the nutrients in your body? Do your stress levels necessitate incorporating more anti-oxidants? If you're still unsure, you can call one of our knowledgeable Customer Service Representatives at our toll-free number 1-800-800-1200." },
    { question: "Why are there so many capsules in the multivitamins?", answer: "The multivitamins offer comprehensive formulas with nutrient levels too high to be contained in one capsule. If the extra capsules are too much at one meal, you can split them up between meals or open the capsules and add the ingredients to cold food or beverages." },
    { question: "Do I have to take all the capsules in a packet at the same time?", answer: "If you are taking one packet daily, we recommend you take all capsules in the packet at the same time, after a large meal. First, this allows you to obtain higher tissue levels of all the nutrients. Second, you are much more likely to take ProCaps Laboratories regularly if you only need to take them once a day, rather than two or three times. However, since each capsule is identical, you may split the contents of each packet between two or more meals if you prefer." },
    { question: "Can I take your supplements with my medication?", answer: "We suggest that you consult your health care provider prior to taking any supplement if you are being monitored for any health condition or if you are taking any prescription medications. Your pharmacist is also a good source of information. Our label information for every product can be found on the product page of this website. Print them out and share them with your health care provider." },
    { question: "Can I open capsules and add the contents to food?", answer: "Yes, the capsules can be opened and the ingredients mixed into smoothies, applesauce, yogurt, and other cold food and drinks. Open the capsules by grasping at the ends and twisting in opposite directions. Since heat can destroy nutrients, please do not mix into hot substances." },
    { question: "Should I keep my supplements in the fridge?", answer: "There is no need to refrigerate any of our encapsulated ProCaps products. In order to maintain maximum potency, vitamins should be stored tightly closed in a cool, dry, dark place." },
    { question: "Do you carry any thyroid related products?", answer: "Depending on the benefits you are seeking we recommend you contact one of Andrew's Vitamin Specialists so that they can assist you in designing a supplementation program unique to your needs." },
    { question: "Do you have a retail store?", answer: "We do not have a retail outlet at this time." },
    { question: "Do you offer Quantity Discounts?", answer: "At ProCaps Labs, we offer a quantity discount program when purchasing 2 or more products within the same order as follows:\n\n2-3 Products\n5% Off\n4-5 Products\n10% Off\n6-8 Products\n15% Off\n9+ Products\n20% Off\nNote: Items under $5.00 purchase price are exempt from receiving a quantity discount, nor do they count as items for increased quantity discount savings on other products. Today's Special items are exempt from receiving a quantity discount; however, they do count as items for increased quantity discount savings on other products." },
    { question: "What is AutoShip?", answer: "To make your life easier, we offer \"AutoShip\" which is a free auto-delivery program to ensure that you always have an ample supply of your supplements. By placing a product on AutoShip you will receive a fresh supply automatically according to the recommended dosage, or on any shipping schedule you choose. Your credit card will automatically be billed at the time of shipment saving you the inconvenience of reordering.\nSAVE MONEY: With AutoShip, our Global Quantity Discount increases your savings the more products you ship together. Therefore, if you have multiple AutoShip products, you can schedule them to ship together and take advantage of greater discounts. Also, as with any order, Standard Shipping is free for shipments over $29.90.\nFinally, you control every aspect of your AutoShip allowing you to change ship dates, upgrade products or cancel at any time." },
    { question: "Do you charge sales tax?", answer: "As of 4/1/19 we are required to collect applicable sales tax in the following states - AL, AR, AZ, CA, CO, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, ME, MN, MO, NC, ND, NE, NM, NV, OH, OK, RI, SC, SD, TN, UT, VA, WA, WI. Tax on shipping charges will also apply in AR, AZ, CO, GA, HI, IL, IN, KS, KY, MN, MO, NC, ND, NE, NM, OH, RI, SD, TN, WA, WI.\n\nThis change is being implemented based on the U.S. Supreme Court ruling on the South Dakota v. Wayfair, Inc. case whereby states may charge for sales tax on purchases made from out-of-state sellers, even if the seller does not have a physical presence in the taxing state.\n\nIf you have any questions or concerns contact us." },
    { question: "How are my products shipped and what's the cost?", answer: "Within the Continental USA:\n\nStandard Shipping is free for orders of $29.90 or more or $5 for orders under $29.90. Expedited shipping options are available.\n\nOur orders ship via USPS Ground and FedEx. Packages typically arrive in 7-10 business days after your order is placed. Orders to military installations may take up to 45 days.\n\nNote: orders containing Today's Special product(s) are not available for expedited shipping.\n\nExpedited orders placed Monday to Friday prior to 12p.m. PST should ship the same day.\n\nExpedited orders placed Monday to Thursday after 12p.m. PST should ship the next business day.\n\nExpedited orders placed Friday after 12p.m. or Saturday and Sunday, should ship the following Monday.\n\nOccasionally, due to unforeseen circumstances, orders may be delayed. Contact Customer Service if you have any questions or concerns here." },
    { question: "What is your International Shipping Policy?", answer: "We do not offer international shipping at this time." },
    { question: "What is your \"Quality Guarantee?\"", answer: "Each of our products is guaranteed to be completely safe and effective, even when this increases our cost. We seek pure, bioactive and hypo-allergenic forms of all our ingredients, and unlike many conventional supplements, our products contain only the nutrients you want without any additives. ProCaps Laboratories' products are prepared without exposure to potency-robbing heat and pressure and are metabolically and pH balanced to ensure optimum effectiveness without stomach discomfort. This is why we are able to provide you with a 60-day money back guarantee on every product we sell. We also guarantee that all of our products will be continuously updated to include the most recent advances in research, technology and ingredients." },
    { question: "60 Day Money Back Guarantee?", answer: "Your satisfaction is unconditionally guaranteed. We will process your return and refund if received within 60 days of purchase. In short, if you return the unused portion of the product within 60 days of purchase, you can receive a prompt, full refund less shipping and handling and quantity discount; if applicable.\n\nThe unused portion of the product must be returned in order for us to process a refund. To ensure rapid handling of your return, please notify our Customer Care Center in advance of your returning any product by calling us at 1-800-800-1200 or emailing us at CustomerService@procapslabs.com. Our Customer Care Center will make the return process convenient and easy, but please note that simply returning a product without notifying us in advance will understandably delay the processing of your return and refund.\n\nNOTE: Our return process is intended to warranty that quantity of product customarily consumed during the 60-Day warranty period following that product's Suggested Use. It is not intended to warranty the removal or consumption of excessive quantities during that 60-Day period. For obvious reasons, a large supply of product emptied and consumed during the warranty period will be subject to a complete denial of the 60-Day warranty.\n\nOur return address is:\n\nProCaps Laboratories\nATTN: CUSTOMER RETURNS\n430 Parkson Road\nHenderson, NV 89011" },
    { question: "How can I pay for my order?", answer: "For your convenience, ProCapsLabs.com accepts Visa, MasterCard, Discover and American Express. If you wish to pay by money order or personal check, please call 800-800-1200." },
    { question: "Is my credit card information secure?", answer: "Please rest assured that your credit card information is safe. Our website is certified as secure and once the number is saved, only the last 4 digits are visible. Also, we always ask for the authorization number from the back of the card. And, of course, we never sell or share your information. You can read more about our privacy and security policies here." },
    { question: "How do I add/change a credit card to my account?", answer: "To add a credit card to your account, sign in at the account login page . Click on \"view/edit\" under the credit card information. Click \"add\" or \"edit\" as needed. Enter the required information within the section and click on \"save\".\n\nFYI: The name on the credit card must match the name on the account; the billing address must match the address as it appears on your credit card's statement.\n\nIf the system still will not accept your credit card, please call 1-800-800-1200 and a representative will be happy to set it up for you (and place an order, if you like)." },
    { question: "Can I use my in-house credit on the website?", answer: "Currently, in-house credits are not applicable to online purchases. This feature will be coming shortly. If you wish to use your in-house credit for an order, please call us at 1-800-800-1200 from 6 a.m. to 6 p.m. Monday-Sunday (Pacific Standard Time)." },
    { question: "I signed up for your Emails, but I have not received any. Why?", answer: "If you are set up to receive Email alerts, updates and notifications from us, it may be blocked as Spam by your Internet security settings, Email service or by your Internet Service Provider (ISP).\nPlease check the \"bulk mail,\" \"junk mail\" or similar folder (depending on your Email service) to see if our newsletter were moved there.\nIf our newsletter(s) are there, please update your \"trusted sites\" settings to include www.ProCapsLabs.com. Please also add \"Andrew Lessman\" and \"ProCaps Laboratories\" to your Email address book." },
    { question: "I'm getting a security warning on your site. Why?", answer: "We recently changed domain names to www.ProCapsLabs.com and your Internet security feature is just telling you that the current domain name does not match the prior domain name. The connection is still secure." },
    { question: "Where is Guest Checkout?", answer: "In order to provide a consistent experience and enable the ability to securely manage account information we now require that web customers create a password protected web account. We apologize to those who previously used Guest Checkout." }
  ];

  return (
    <div className={`bg-white w-full ${topPadding} ${bottomPadding}`}>
      <div className={`${containerPadding} max-w-[1440px] mx-auto`}>
        {/* Title */}
        <h1 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] ${titleSize} text-[#003b3c] ${titleToSubtitle}`}>
          Frequently Asked Questions
        </h1>

        {/* Subtitle */}
        <p className={`font-['Inter',sans-serif] leading-[1.6] ${subtitleSize} text-[#003b3c]`}>
          Here are the answers to some of our most Frequently Asked Questions. Still have questions?{' '}
          <span className="underline cursor-pointer">Contact Us</span>.
        </p>

        {/* FAQ Accordions */}
        <div className={subtitleToAccordions}>
          <Accordion type="multiple" className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-[#D9E2E2]"
              >
                <AccordionTrigger className="group flex items-start justify-between py-[24px] hover:no-underline [&>svg]:hidden text-left">
                  <p className={`font-['Inter',sans-serif] font-medium leading-[1.4] ${breakpoint === 'S' ? 'text-[16px]' : breakpoint === 'M' ? 'text-[18px]' : 'text-[20px]'} text-[#003b3c] pr-[20px]`}>
                    {faq.question}
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
                    {faq.answer}
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
