import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Plus, Minus } from 'lucide-react';

export default function ShippingReturnsPage() {
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

  const shippingData = [
    { 
      title: "Scope", 
      content: (
        <p>This Orders, Shipping, Returns, and Refunds Policy describes our Orders, Shipping, Returns and Refunds process applies to purchases of ProCaps Laboratories' products placed through https://www.ProCaps.com</p>
      )
    },
    { 
      title: "Processing Times", 
      content: (
        <>
          <p className="mb-[16px]">Orders are processed pending item availability and payment approval.</p>
          <p className="mb-[16px]">During high volume periods, such as the holidays, product availability may be subject to change while your order is being processed.</p>
          <p>All orders (including expedited shipping) are processed Monday through Friday, excluding holidays. Orders placed after 3:00 p.m. ET will be processed the next business day. Orders placed on Friday or over the weekend will start processing on Monday and ship within 1-3 business days.</p>
        </>
      )
    },
    { 
      title: "Shipping", 
      content: (
        <>
          <p className="mb-[16px]">We currently offer domestic shipping in the contiguous United States. We are able to ship to APO, FPO, DPO, Alaska, and Hawaii at this time. We do ship via DHL to these addresses in addition to US territories (US Virgin Islands, Puerto Rico, & Guam)</p>
          <p className="mb-[16px]">We currently do not ship internationally. We hope to be available in more countries, soon!</p>
          <p className="mb-[16px]">Our carriers do not count weekends as valid ship dates. Overnight shipments that ship out on a Friday will deliver on a Monday. Weekend and holiday delivery is unavailable.</p>
          <p className="mb-[16px]">We offer free standard shipping for all orders with a subtotal of $29.90 & above.</p>
          <p className="mb-[16px]">We are not responsible for delays incurred by our carrier. We support their hardworking team of drivers, and we also understand the frustrations caused by shipping delays. If you experience a shipping delay, please reach out to us at CustomerService@procapslabs.com, and be sure to include your name and order number, and we'll work to help resolve the issue. Ground shipping is expected to be delivered between 7-10 business days with the possibility for more during high volume periods.</p>
          <p className="mb-[16px]">Please note that Today's Special orders cannot be expedited.</p>
          <p>Our fulfillment center will be closed in observance of federally-recognized U.S, holidays. All shipments will resume processing the following business day.</p>
        </>
      )
    },
    { 
      title: "Order Tracking", 
      content: (
        <>
          <p className="mb-[16px]">Once your order has been shipped, you will receive an e-mail notification containing the shipment tracking information. Your order may arrive in several shipments.</p>
          <p className="mb-[16px]">Please allow up to 48 hours for the tracking to be updated after you've been notified that your package has been shipped. At times, the courier will not scan the package immediately and may take some time to be sorted and scanned at the distribution center.</p>
          <p>We are not responsible for any delayed, missing, lost, or stolen packages. After the packaged goods are shipped out of our fulfillment center, we are not held liable and we do not have any contact of control over the package.</p>
        </>
      )
    },
    { 
      title: "Quantity Discount", 
      content: (
        <>
          <p className="mb-[16px]">At ProCaps Labs, we offer a quantity discount program when purchasing 2 or more products within the same order as follows:</p>
          <div className="mb-[16px]">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[#D9E2E2]">
                  <td className="py-[12px] pr-[16px]">2-3 Products</td>
                  <td className="py-[12px]">5% Off</td>
                </tr>
                <tr className="border-b border-[#D9E2E2]">
                  <td className="py-[12px] pr-[16px]">4-5 Products</td>
                  <td className="py-[12px]">10% Off</td>
                </tr>
                <tr className="border-b border-[#D9E2E2]">
                  <td className="py-[12px] pr-[16px]">6-8 Products</td>
                  <td className="py-[12px]">15% Off</td>
                </tr>
                <tr>
                  <td className="py-[12px] pr-[16px]">9+ Products</td>
                  <td className="py-[12px]">20% Off</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Note:</strong> Items under $5.00 purchase price are exempt from receiving a quantity discount, nor do they count as items for increased quantity discount savings on other products. Today's Special items are exempt from receiving a quantity discount; however, they do count as items for increased quantity discount savings on other products.</p>
        </>
      )
    },
    { 
      title: "Updating or Cancelling Orders, Including Shipping Address", 
      content: (
        <>
          <p className="mb-[16px]">We do our best to process your order as soon as it is received, making it challenging to accommodate changes or updates. Regrettably, we generally cannot alter or cancel orders once they are placed.</p>
          <p>The shipping address for your order is final and cannot be modified once the order is placed, and will ship to the address provided during the initial order placement. Kindly review your order details carefully before confirming your purchase to ensure accurate delivery. If you have any questions, feel free to contact us at CustomerService@procapslabs.com</p>
        </>
      )
    },
    { 
      title: "Returns and Refunds", 
      content: (
        <>
          <p className="mb-[16px]">In the event you are dissatisfied with one of our products purchased via the website, you may return the remaining product for a full refund. Just return the unused portion of the product within 60 days of your original purchase and you will receive a refund, less shipping and handling costs and Quantity Discount, if applicable. The unused portion of the product must be returned in order for us to process a refund.</p>
          <p className="mb-[16px]">Your satisfaction is our number one priority. Please let us know how we are doing and how we can improve.</p>
          <p>Please note that we can only process returns or exchanges on purchases made directly from ProCaps Labs (with a valid order number).</p>
        </>
      )
    },
    { 
      title: "Contact", 
      content: (
        <p>If you have any questions about our policy regarding orders, shipping, returns, and refunds, please contact one of Andrews knowledgeable Vitamin Specialists at CustomerService@procapslabs.com, via phone at 1-800-800-1200 (Monday – Sunday 6:00 a.m. to 6:00 p.m. PT), or write to us at ProCaps Laboratories, 430 Parkson Road, Henderson, NV 89011.</p>
      )
    }
  ];

  return (
    <div className={`bg-white w-full ${topPadding} ${bottomPadding}`}>
      <div className={`${containerPadding} max-w-[1440px] mx-auto`}>
        {/* Title */}
        <h1 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] ${titleSize} text-[#003b3c] ${titleToSubtitle}`}>
          Shipping & Returns
        </h1>

        {/* Subtitle */}
        <p className={`font-['Inter',sans-serif] leading-[1.6] ${subtitleSize} text-[#003b3c]`}>
          Orders, shipping, returns, and refunds policy
        </p>

        {/* Accordions */}
        <div className={subtitleToAccordions}>
          <Accordion type="multiple" className="w-full">
            {shippingData.map((item, index) => (
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
