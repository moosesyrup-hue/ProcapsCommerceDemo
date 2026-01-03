import { useState, useEffect } from 'react';
import { products, type Product } from '../data/products';
import { ChevronDown, Check, Minus, Plus, Star, Info, Truck, Package } from 'lucide-react';
import imgPlaceholder from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import imgProduct from "figma:asset/f2e5085bf5c2fe71f9ea2c23494b5c63f1b85c27.png";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import svgPaths from "../imports/svg-3m84o7zton";
import TickerTape from './TickerTape';
import ProductCard from './ProductCard';
import QuickView from './QuickView';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { motion } from 'motion/react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Variant pricing - realistic bulk pricing
const VARIANT_PRICING: Record<string, { msrp: number; sale: number }> = {
  '60': { msrp: 19.90, sale: 14.90 },
  '180': { msrp: 49.90, sale: 39.90 },
  '360': { msrp: 89.90, sale: 69.90 },
  '1000': { msrp: 199.90, sale: 159.90 }
};

// Breakpoint detection hook matching Homepage pattern
function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('HD');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('S');
      else if (width < 1280) setBreakpoint('M');
      else if (width < 1440) setBreakpoint('L');
      else if (width < 1920) setBreakpoint('XL');
      else setBreakpoint('HD');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

interface ProductDetailPageProps {
  productId: string;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  onOpenCart: () => void;
  onNavigateToCategory: (category: string) => void;
}

export default function ProductDetailPage({ productId, cartItems, setCartItems, onOpenCart, onNavigateToCategory }: ProductDetailPageProps) {
  const breakpoint = useBreakpoint();
  const product = products.find(p => p.id === productId);
  
  const [selectedVariant, setSelectedVariant] = useState<string>('60');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found</div>;
  }

  // Variant options based on servings
  const variantOptions = ['60', '180', '360', '1000'];
  
  const handleAddToCart = () => {
    const newItem = {
      id: product.id,
      name: product.name,
      count: `Count: ${selectedVariant} capsules`,
      price: product.salePrice || product.price,
      originalPrice: product.salePrice ? product.price : undefined,
      quantity: quantity,
      image: product.image || imgPlaceholder
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id && item.count === newItem.count);
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([...cartItems, newItem]);
    }
    
    // Open cart
    onOpenCart();
  };

  // Mock image carousel - in production would use product.images array
  const productImages = [
    product.image || imgPlaceholder,
    product.image || imgPlaceholder,
    product.image || imgPlaceholder,
    product.image || imgPlaceholder
  ];

  // Sample product data for QuickView
  const fibermucilProduct = {
    id: 'fibermucil-001',
    name: 'Fibermucil',
    description: 'Natural Psyllium Fiber in Small Capsules',
    image: imgImage,
    basePrice: 24.90,
    salePrice: 19.90,
    isSpecial: true,
    counts: [
      { value: 60, label: '60', basePrice: 24.90, salePrice: 19.90 },
      { value: 180, label: '180', basePrice: 49.90, salePrice: 39.95 },
      { value: 360, label: '360', basePrice: 89.90, salePrice: 69.95 },
      { value: 1000, label: '1000', basePrice: 199.90, salePrice: 159.95 }
    ]
  };

  // Handle QuickView add to cart
  const handleQuickViewAddToCart = (config: {
    productId: string;
    count: number;
    purchaseType: 'one-time' | 'subscribe';
    frequency?: number;
    quantity: number;
  }) => {
    setQuickViewOpen(false);
    
    // Add item to cart
    const newItem = {
      id: `${config.productId}-${Date.now()}`,
      name: 'Fibermucil',
      count: `Count: ${config.count} capsules`,
      price: 19.90,
      originalPrice: 24.90,
      quantity: config.quantity,
      image: imgImage
    };
    
    setCartItems([...cartItems, newItem]);
    onOpenCart();
  };

  const handleViewProductDetails = () => {
    setQuickViewOpen(false);
  };

  return (
    <>
      <div className="bg-white w-full">
        {/* Hero Section */}
        <HeroSection product={product} breakpoint={breakpoint} />
        
        {/* Main Content Section */}
        <TopSection
          product={product}
          breakpoint={breakpoint}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          productImages={productImages}
        />
        
        {/* Reviews Section */}
        <ReviewsSection breakpoint={breakpoint} />
        
        {/* Benefits Section */}
        <BenefitsSection breakpoint={breakpoint} />
        
        {/* Video Section */}
        <VideoSection breakpoint={breakpoint} />
        
        {/* FAQ Section */}
        <FAQSection breakpoint={breakpoint} />
        
        {/* We Also Recommend Section */}
        <WeAlsoRecommendSection 
          breakpoint={breakpoint}
          setCartItems={setCartItems}
          cartItems={cartItems}
          onOpenCart={onOpenCart}
          quickViewOpen={quickViewOpen}
          setQuickViewOpen={setQuickViewOpen}
        />
      </div>

      {/* QuickView Sheet */}
      <Sheet open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <SheetContent side="right" className="w-full sm:w-[560px] sm:max-w-[560px] p-0 overflow-hidden [&>button]:hidden">
          <SheetTitle className="sr-only">Quick View</SheetTitle>
          <SheetDescription className="sr-only">Quick view product details and add to cart</SheetDescription>
          <QuickView
            product={fibermucilProduct}
            onClose={() => setQuickViewOpen(false)}
            onAddToCart={handleQuickViewAddToCart}
            onViewDetails={handleViewProductDetails}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

// Hero Section with headline
function HeroSection({ product, breakpoint }: { product: Product; breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'S' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[48px]' : breakpoint === 'HD' ? 'text-[92px]' : 'text-[72px]';
  const headlineTracking = breakpoint === 'S' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.96px]' : breakpoint === 'HD' ? 'tracking-[-1.84px]' : 'tracking-[-1.44px]';
  const headlineMaxW = breakpoint === 'S' ? 'max-w-[327px]' : breakpoint === 'M' ? 'max-w-[688px]' : 'max-w-[1150px]';
  const padding = breakpoint === 'S' ? 'px-[24px] py-[60px]' : breakpoint === 'M' ? 'px-[40px] py-[80px]' : 'px-[40px] py-[110px]';

  return (
    <div className={`w-full flex items-center justify-center ${padding}`}>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // Custom ease curve for smooth, elegant motion
          delay: 0.2 
        }}
        className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] text-center ${headlineSize} ${headlineTracking} ${headlineMaxW}`}
      >
        Mother Nature's answer to comfortable, effective <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">fiber.</span>
      </motion.h1>
    </div>
  );
}

// Top Section with product details and image
function TopSection({ 
  product, 
  breakpoint, 
  selectedVariant, 
  setSelectedVariant, 
  quantity, 
  setQuantity, 
  handleAddToCart,
  activeAccordion,
  setActiveAccordion,
  currentImageIndex,
  setCurrentImageIndex,
  productImages
}: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[24px]' : 'px-[40px]';
  const gap = isMobile ? 'gap-[40px]' : 'gap-[40px]';
  const bottomPadding = isMobile ? 'pb-[60px]' : isTablet ? 'pb-[80px]' : 'pb-[110px]';

  return (
    <div className={`w-full ${padding} ${bottomPadding}`}>
      <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} ${gap} items-start justify-center w-full max-w-[1920px] mx-auto relative`}>
        {/* Left Column - Images & Accordions */}
        <LeftColumn 
          product={product}
          breakpoint={breakpoint}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          productImages={productImages}
        />
        
        {/* Vertical Divider - Desktop only, positioned between columns */}
        {!isMobile && !isTablet && (
          <div className="self-stretch w-[1px] bg-[#D9E2E2] flex-shrink-0" />
        )}
        
        {/* Right Column - Product Info */}
        <RightColumn 
          product={product}
          breakpoint={breakpoint}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

// Left Column Component
function LeftColumn({ product, breakpoint, activeAccordion, setActiveAccordion, currentImageIndex, setCurrentImageIndex, productImages }: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const minWidth = isMobile || isTablet ? 'min-w-0' : 'min-w-[725px]';
  
  return (
    <div className={`flex flex-col gap-[60px] ${isMobile || isTablet ? 'w-full' : 'flex-1'} ${minWidth}`}>
      {/* Image Carousel */}
      <ImageCarousel 
        images={productImages}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
        breakpoint={breakpoint}
      />
      
      {/* Accordion Group */}
      <AccordionGroup 
        product={product}
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        breakpoint={breakpoint}
      />
    </div>
  );
}

// Image Carousel Component
function ImageCarousel({ images, currentIndex, setCurrentIndex, breakpoint }: any) {
  const isMobile = breakpoint === 'S';
  
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {/* Main Image - 20px border radius */}
      <div className="w-full aspect-square bg-[#F5F5F5] rounded-[20px] overflow-hidden relative">
        <img 
          src={images[currentIndex]} 
          alt="Product" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Thumbnail Navigation - Smaller with scrolling support */}
      <div className="flex gap-[8px] w-full overflow-x-auto scrollbar-hide">
        {images.slice(0, 7).map((img: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-[80px] h-[80px] bg-[#F5F5F5] rounded-[8px] overflow-hidden border-2 transition-all ${
              currentIndex === idx ? 'border-[#009296]' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Accordion Group Component
function AccordionGroup({ product, activeAccordion, setActiveAccordion, breakpoint }: any) {
  return (
    <div className="flex flex-col gap-[40px] w-full">
      <div className="h-[1px] w-full bg-[#D9E2E2]" />
      
      <AccordionItem
        title="Product details"
        isOpen={activeAccordion === 'details'}
        onToggle={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')}
        breakpoint={breakpoint}
      >
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[16px]">
          <p className="mb-4">{product.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Formulation: {product.formulation}</li>
            <li>Serving Size: {product.servingSize}</li>
            <li>Servings Per Container: {product.servingsPerContainer}</li>
          </ul>
        </div>
      </AccordionItem>
      
      <div className="h-[1px] w-full bg-[#D9E2E2]" />
      
      <AccordionItem
        title="Suggested use"
        isOpen={activeAccordion === 'use'}
        onToggle={() => setActiveAccordion(activeAccordion === 'use' ? null : 'use')}
        breakpoint={breakpoint}
      >
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[16px]">
          <p>Take {product.servingSize} daily with water, preferably with a meal, or as directed by your healthcare professional.</p>
        </div>
      </AccordionItem>
      
      <div className="h-[1px] w-full bg-[#D9E2E2]" />
    </div>
  );
}

// Accordion Item Component
function AccordionItem({ title, isOpen, onToggle, children, breakpoint }: any) {
  const titleSize = breakpoint === 'S' ? 'text-[24px]' : 'text-[34px]';
  const titleTracking = breakpoint === 'S' ? 'tracking-[-0.24px]' : 'tracking-[-0.34px]';
  
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full group"
      >
        <h3 className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-left ${titleSize} ${titleTracking}`}>
          {title}
        </h3>
        <ChevronDown 
          className={`w-[24px] h-[24px] text-[#003b3c] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>
      {isOpen && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

// Right Column Component
function RightColumn({ product, breakpoint, selectedVariant, setSelectedVariant, quantity, setQuantity, handleAddToCart }: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const maxWidth = isMobile || isTablet ? 'max-w-none' : 'max-w-[800px]';
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'autoship' | 'flexpay'>('one-time');
  const [deliveryFrequency, setDeliveryFrequency] = useState(30);
  const [flexPayInstallments, setFlexPayInstallments] = useState(2);
  
  // Calculate current prices
  const currentVariantPrice = VARIANT_PRICING[selectedVariant];
  const basePrice = currentVariantPrice.sale;
  const msrpPrice = currentVariantPrice.msrp;
  
  // Apply purchase type discount/modification
  let unitPrice = basePrice;
  if (purchaseType === 'autoship') {
    unitPrice = basePrice * 0.9; // 10% off
  }
  // FlexPay uses base price, no discount
  
  const subtotal = unitPrice * quantity;
  const savings = (msrpPrice * quantity) - subtotal;
  
  return (
    <div className={`flex flex-col gap-[40px] ${isMobile || isTablet ? 'w-full' : 'flex-1'} ${maxWidth}`}>
      {/* Product Title */}
      <ProductTitleSection product={product} breakpoint={breakpoint} />
      
      {/* Ratings & Reviews */}
      <RatingsSection breakpoint={breakpoint} />
      
      {/* Product Description */}
      <ProductDescription product={product} breakpoint={breakpoint} />
      
      {/* Good For Tags */}
      <GoodForTags product={product} breakpoint={breakpoint} />
      
      <div className="h-[1px] w-full bg-[#D9E2E2]" />
      
      {/* Variant Selector */}
      <VariantSelector 
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        breakpoint={breakpoint}
      />
      
      {/* Purchase Options */}
      <PurchaseOptions 
        purchaseType={purchaseType}
        setPurchaseType={setPurchaseType}
        deliveryFrequency={deliveryFrequency}
        setDeliveryFrequency={setDeliveryFrequency}
        flexPayInstallments={flexPayInstallments}
        setFlexPayInstallments={setFlexPayInstallments}
        basePrice={basePrice}
        breakpoint={breakpoint}
      />
      
      {/* Quantity Selector */}
      <QuantitySelector 
        quantity={quantity}
        setQuantity={setQuantity}
        breakpoint={breakpoint}
      />
      
      {/* Order Summary */}
      <OrderSummary 
        unitPrice={unitPrice}
        quantity={quantity}
        subtotal={subtotal}
        savings={savings}
        msrpPrice={msrpPrice}
        purchaseType={purchaseType}
        flexPayInstallments={flexPayInstallments}
        breakpoint={breakpoint}
      />
      
      {/* Add to Cart Button */}
      <AddToCartButton 
        onClick={handleAddToCart} 
        total={subtotal}
        purchaseType={purchaseType}
        flexPayInstallments={flexPayInstallments}
        breakpoint={breakpoint} 
      />
      
      {/* Guarantee Text */}
      <GuaranteeText breakpoint={breakpoint} />
      
      <div className="h-[1px] w-full bg-[#D9E2E2]" />
      
      {/* Shipping & Money Back */}
      <ShippingInfo breakpoint={breakpoint} />
      <MoneyBackGuarantee breakpoint={breakpoint} />
      
      {/* Share */}
      <ShareSection breakpoint={breakpoint} />
    </div>
  );
}

// Product Title Section
function ProductTitleSection({ product, breakpoint }: any) {
  const titleSize = breakpoint === 'S' ? 'text-[24px]' : 'text-[34px]';
  const titleTracking = breakpoint === 'S' ? 'tracking-[-0.24px]' : 'tracking-[-0.34px]';
  const subtitleSize = breakpoint === 'S' ? 'text-[16px]' : 'text-[20px]';
  const subtitleTracking = breakpoint === 'S' ? 'tracking-[-0.16px]' : 'tracking-[-0.2px]';
  
  return (
    <div className="flex flex-col gap-[16px]">
      <h1 className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.3] text-[#003b3c] ${titleSize} ${titleTracking}`}>
        Fibermucil
      </h1>
      <p className={`font-['STIX_Two_Text:Italic',sans-serif] font-normal italic leading-[1.3] text-[#003b3c] ${subtitleSize} ${subtitleTracking}`}>
        Natural Psyllium Fiber
      </p>
    </div>
  );
}

// Ratings Section
function RatingsSection({ breakpoint }: any) {
  const ratingSize = breakpoint === 'S' ? 'text-[20px]' : 'text-[24px]';
  const reviewSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  
  return (
    <div className="flex gap-[10px] items-center">
      {/* Star Rating */}
      <div className="flex gap-[4px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F1A33A" stroke="#F1A33A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ))}
      </div>
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[#003b3c] ${ratingSize}`}>
        4.9
      </p>
      <a href="#reviews" className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] underline ${reviewSize}`}>
        298 Reviews
      </a>
    </div>
  );
}

// Product Description
function ProductDescription({ product, breakpoint }: any) {
  const descSize = breakpoint === 'S' ? 'text-[16px]' : 'text-[20px]';
  
  return (
    <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] max-w-[750px] ${descSize}`}>
      A natural, encapsulated Psyllium Husk powder that contains no additives of any kind and provides an unparalleled natural source of both water-soluble fiber and bulk fiber to support a healthy digestive tract, as well as helping to support healthy blood cholesterol levels already in the normal range.
    </p>
  );
}

// Good For Tags
function GoodForTags({ product, breakpoint }: any) {
  const textSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  
  return (
    <div className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.5] text-[#003b3c] ${textSize}`}>
      <span className="font-['Inter:Medium',sans-serif] font-medium">Good for:</span>
      {' '}
      {product.functions.map((fn: any, idx: number) => (
        <span key={idx}>
          <a href="#" className="underline hover:text-[#009296]">{fn.name}</a>
          {idx < product.functions.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>
  );
}

// Variant Selector - NOW WITH PRICES
function VariantSelector({ selectedVariant, setSelectedVariant, breakpoint }: any) {
  const variants = ['60', '180', '360', '1000'];
  const labelSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  const buttonSize = breakpoint === 'S' ? 'text-[12px]' : 'text-[14px]';
  const isMobile = breakpoint === 'S';
  
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${labelSize}`}>
        <span className="font-['Inter:Medium',sans-serif] font-medium">Size:</span> {selectedVariant} capsules
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px] max-w-[550px]">
        {variants.map((variant) => {
          const pricing = VARIANT_PRICING[variant];
          return (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-[12px] py-[12px] border-2 transition-colors ${
                selectedVariant === variant
                  ? 'border-[#009296] bg-[#f2fafa]'
                  : 'border-[#b3c4c5] hover:border-[#009296]'
              }`}
            >
              <div className="flex flex-col items-center gap-[4px]">
                <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] ${
                  selectedVariant === variant ? 'text-[#009296]' : 'text-[#003b3c]'
                } ${buttonSize}`}>
                  {variant} count
                </p>
                <div className="flex items-center gap-[6px]">
                  <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[12px] ${
                    selectedVariant === variant ? 'text-[#D84315]' : 'text-[#D84315]'
                  }`}>
                    ${pricing.sale.toFixed(2)}
                  </p>
                  <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[10px] line-through ${
                    selectedVariant === variant ? 'text-[#406c6d]' : 'text-[#406c6d]'
                  }`}>
                    ${pricing.msrp.toFixed(2)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Purchase Options - REMOVED PRICES (they're in Order Summary now)
function PurchaseOptions({ purchaseType, setPurchaseType, deliveryFrequency, setDeliveryFrequency, flexPayInstallments, setFlexPayInstallments, basePrice, breakpoint }: any) {
  const labelSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  
  return (
    <div className="flex flex-col gap-[16px] w-full max-w-[550px]">
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.6] text-[#003b3c] ${labelSize}`}>
        Purchase options:
      </p>
      
      <div className="flex flex-col gap-[12px]">
        {/* One-Time Purchase */}
        <button
          onClick={() => setPurchaseType('one-time')}
          className={`
            border-2 rounded-[8px] p-[16px] text-left transition-all duration-200
            ${purchaseType === 'one-time'
              ? 'border-[#009296] bg-[#f2fafa]'
              : 'border-[#D9E2E2] hover:border-[#009296]'
            }
          `}
        >
          <div className="flex items-center gap-[12px]">
            {/* Radio Button */}
            <div className="relative w-[20px] h-[20px] shrink-0">
              <div className={`
                w-full h-full rounded-full border-2 transition-all duration-200
                ${purchaseType === 'one-time'
                  ? 'border-[#009296]'
                  : 'border-[#D9E2E2]'
                }
              `}>
                {purchaseType === 'one-time' && (
                  <div className="w-[10px] h-[10px] rounded-full bg-[#009296] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-[#003b3c]">
              One-Time Purchase
            </p>
          </div>
        </button>

        {/* Autoship & Save */}
        <div
          className={`
            border-2 rounded-[8px] transition-all duration-200
            ${purchaseType === 'autoship'
              ? 'border-[#009296] bg-[#f2fafa]'
              : 'border-[#D9E2E2] hover:border-[#009296]'
            }
          `}
        >
          <button
            onClick={() => setPurchaseType('autoship')}
            className="w-full p-[16px] text-left"
          >
            <div className="flex items-start gap-[12px]">
              {/* Radio Button */}
              <div className="relative w-[20px] h-[20px] shrink-0 mt-[2px]">
                <div className={`
                  w-full h-full rounded-full border-2 transition-all duration-200
                  ${purchaseType === 'autoship'
                    ? 'border-[#009296]'
                    : 'border-[#D9E2E2]'
                  }
                `}>
                  {purchaseType === 'autoship' && (
                    <div className="w-[10px] h-[10px] rounded-full bg-[#009296] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-[#003b3c] mb-[4px]">
                  Autoship & Save 10%
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#406c6d]">
                  Never run out, save on every order
                </p>
              </div>
            </div>
          </button>

          {/* Delivery Frequency Options - Expandable */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: purchaseType === 'autoship' ? '1fr' : '0fr',
              transition: 'grid-template-rows 300ms ease-in-out'
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div className="px-[16px] pb-[16px]">
                <div className="pt-[16px] border-t border-[#D9E2E2]">
                  <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#003b3c] mb-[12px]">
                    Delivery frequency:
                  </p>
                  
                  {/* Frequency Buttons */}
                  <div className="flex gap-[10px] mb-[16px]">
                    {[30, 60, 90].map((days) => (
                      <button
                        key={days}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeliveryFrequency(days);
                        }}
                        className={`
                          flex-1 h-[40px] rounded-[6px] border transition-all duration-200
                          font-['Inter:Regular',sans-serif] text-[14px]
                          flex items-center justify-center
                          ${deliveryFrequency === days
                            ? 'bg-[#009296] border-[#009296] text-white font-medium'
                            : 'bg-white border-[#D9E2E2] text-[#003b3c] hover:border-[#009296]'
                          }
                        `}
                      >
                        {days} days
                      </button>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-start gap-[8px]">
                      <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#003b3c] leading-[1.4]">
                        Extra 10% savings on every order
                      </p>
                    </div>
                    <div className="flex items-start gap-[8px]">
                      <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#003b3c] leading-[1.4]">
                        Free shipping on all autoship orders
                      </p>
                    </div>
                    <div className="flex items-start gap-[8px]">
                      <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#003b3c] leading-[1.4]">
                        Pause, skip, or cancel anytime
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FlexPay */}
        <div
          className={`
            border-2 rounded-[8px] transition-all duration-200
            ${purchaseType === 'flexpay'
              ? 'border-[#009296] bg-[#f2fafa]'
              : 'border-[#D9E2E2] hover:border-[#009296]'
            }
          `}
        >
          <button
            onClick={() => setPurchaseType('flexpay')}
            className="w-full p-[16px] text-left"
          >
            <div className="flex items-start gap-[12px]">
              {/* Radio Button */}
              <div className="relative w-[20px] h-[20px] shrink-0 mt-[2px]">
                <div className={`
                  w-full h-full rounded-full border-2 transition-all duration-200
                  ${purchaseType === 'flexpay'
                    ? 'border-[#009296]'
                    : 'border-[#D9E2E2]'
                  }
                `}>
                  {purchaseType === 'flexpay' && (
                    <div className="w-[10px] h-[10px] rounded-full bg-[#009296] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-[#003b3c] mb-[4px]">
                  FlexPay
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#406c6d]">
                  Split into interest-free installments
                </p>
              </div>
            </div>
          </button>

          {/* Installment Options - Expandable */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: purchaseType === 'flexpay' ? '1fr' : '0fr',
              transition: 'grid-template-rows 300ms ease-in-out'
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div className="px-[16px] pb-[16px]">
                <div className="pt-[16px] border-t border-[#D9E2E2]">
                  <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#003b3c] mb-[12px]">
                    Choose installments:
                  </p>
                  
                  {/* Installment Buttons */}
                  <div className="flex gap-[10px] mb-[16px]">
                    {[2, 3, 4].map((installments) => (
                      <button
                        key={installments}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlexPayInstallments(installments);
                        }}
                        className={`
                          flex-1 h-[40px] rounded-[6px] border transition-all duration-200
                          font-['Inter:Regular',sans-serif] text-[14px]
                          flex items-center justify-center
                          ${flexPayInstallments === installments
                            ? 'bg-[#009296] border-[#009296] text-white font-medium'
                            : 'bg-white border-[#D9E2E2] text-[#003b3c] hover:border-[#009296]'
                          }
                        `}
                      >
                        {installments} payments
                      </button>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-start gap-[8px]">
                      <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#003b3c] leading-[1.4]">
                        No interest, no fees
                      </p>
                    </div>
                    <div className="flex items-start gap-[8px]">
                      <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#003b3c] leading-[1.4]">
                        Automatic payments every 30 days
                      </p>
                    </div>
                    <div className="flex items-start gap-[8px]">
                      <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#003b3c] leading-[1.4]">
                        Products ship immediately
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quantity Selector
function QuantitySelector({ quantity, setQuantity, breakpoint }: any) {
  const labelSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${labelSize}`}>
        <span className="font-['Inter:Medium',sans-serif] font-medium">Quantity:</span>
      </p>
      <div className="flex gap-[17px] items-center w-full">
        <div className="flex items-center justify-between px-[13px] py-[12px] h-[50px] w-[154px] border border-[#003b3c]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex items-center justify-center"
          >
            <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none">
              <path d="M5.5 12.75V11.25H18.5V12.75H5.5Z" fill="#003B3C"/>
            </svg>
          </button>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[16px]">
            {quantity}
          </p>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex items-center justify-center"
          >
            <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none">
              <path d="M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z" fill="#003B3C"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// NEW: Order Summary Component
function OrderSummary({ unitPrice, quantity, subtotal, savings, msrpPrice, purchaseType, flexPayInstallments, breakpoint }: any) {
  const labelSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  const priceSize = breakpoint === 'S' ? 'text-[20px]' : 'text-[24px]';
  
  const flexPayPerPayment = subtotal / flexPayInstallments;
  
  return (
    <div className="border-2 border-[#D9E2E2] rounded-[8px] p-[20px] bg-[#fafafa] max-w-[550px]">
      <div className="flex flex-col gap-[16px]">
        {/* Unit Price */}
        <div className="flex justify-between items-center">
          <p className={`font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] ${labelSize}`}>
            Price per bottle:
          </p>
          <div className="flex items-center gap-[10px]">
            <p className={`font-['Inter:Medium',sans-serif] font-medium text-[#D84315] ${labelSize}`}>
              ${unitPrice.toFixed(2)}
            </p>
            {purchaseType === 'autoship' && (
              <span className="px-[8px] py-[2px] bg-[#009296] text-white text-[10px] font-['Inter:Medium',sans-serif] font-medium rounded-[4px] uppercase tracking-wider">
                -10%
              </span>
            )}
          </div>
        </div>
        
        {/* Quantity */}
        <div className="flex justify-between items-center">
          <p className={`font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] ${labelSize}`}>
            Quantity:
          </p>
          <p className={`font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] ${labelSize}`}>
            {quantity}
          </p>
        </div>
        
        <div className="h-[1px] w-full bg-[#D9E2E2]" />
        
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <p className={`font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] ${priceSize} tracking-[-0.24px]`}>
            {purchaseType === 'flexpay' ? 'Total:' : 'Subtotal:'}
          </p>
          <p className={`font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] ${priceSize} tracking-[-0.24px]`}>
            ${subtotal.toFixed(2)}
          </p>
        </div>
        
        {/* FlexPay Breakdown */}
        {purchaseType === 'flexpay' && (
          <div className="pt-[8px] border-t border-[#D9E2E2]">
            <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#406c6d] leading-[1.5] mb-[8px]">
              Split into {flexPayInstallments} interest-free payments:
            </p>
            <div className="flex justify-between items-center">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#009296]">
                ${flexPayPerPayment.toFixed(2)} × {flexPayInstallments} payments
              </p>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#406c6d] mt-[8px]">
              First payment due today, then every 30 days
            </p>
          </div>
        )}
        
        {/* Savings */}
        {savings > 0 && (
          <div className="pt-[8px] border-t border-[#D9E2E2] bg-[#f2fafa] -mx-[20px] -mb-[20px] px-[20px] py-[12px] rounded-b-[6px]">
            <div className="flex justify-between items-center">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#009296]">
                You save:
              </p>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#009296]">
                ${savings.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add to Cart Button - NOW WITH TOTAL
function AddToCartButton({ onClick, total, purchaseType, flexPayInstallments, breakpoint }: any) {
  const buttonHeight = breakpoint === 'S' ? 'h-[48px]' : 'h-[50px]';
  const textSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  
  const flexPayPerPayment = total / flexPayInstallments;
  
  let buttonText = `Add to Cart — $${total.toFixed(2)}`;
  if (purchaseType === 'flexpay') {
    buttonText = `Pay $${flexPayPerPayment.toFixed(2)} Today`;
  }
  
  return (
    <button
      onClick={onClick}
      className={`bg-[#009296] ${buttonHeight} rounded-[999px] w-full max-w-[550px] font-['Inter:Medium',sans-serif] font-medium ${textSize} tracking-[1.6px] uppercase text-white hover:bg-[#007a7d] transition-colors`}
    >
      {buttonText}
    </button>
  );
}

// Guarantee Text
function GuaranteeText({ breakpoint }: any) {
  const textSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  
  return (
    <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${textSize}`}>
      <span className="font-['Inter:Medium',sans-serif] font-medium">Questions?</span>{' '}
      <a href="#" className="underline hover:text-[#009296]">Talk to one of our Vitamin Specialists</a>
    </p>
  );
}

// Shipping Info
function ShippingInfo({ breakpoint }: any) {
  const iconSize = breakpoint === 'S' ? 'w-[36px] h-[36px]' : 'w-[40px] h-[40px]';
  const titleSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  const descSize = breakpoint === 'S' ? 'text-[12px]' : 'text-[14px]';
  
  return (
    <div className="flex gap-[20px] items-start">
      <div className={`${iconSize} rounded-full bg-[#f2fafa] flex items-center justify-center shrink-0`}>
        <Package className="w-[20px] h-[20px] text-[#003b3c]" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.7] text-[#003b3c] ${titleSize}`}>
          Free shipping and returns
        </p>
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.7] text-[#003b3c] ${descSize}`}>
          On orders over $25 within the contiguous U.S.
        </p>
      </div>
    </div>
  );
}

// Money Back Guarantee
function MoneyBackGuarantee({ breakpoint }: any) {
  const iconSize = breakpoint === 'S' ? 'w-[36px] h-[36px]' : 'w-[40px] h-[40px]';
  const titleSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  const descSize = breakpoint === 'S' ? 'text-[12px]' : 'text-[14px]';
  
  return (
    <div className="flex gap-[20px] items-start">
      <div className={`${iconSize} rounded-full bg-[#f2fafa] flex items-center justify-center shrink-0`}>
        <svg className="w-[20px] h-[20px]" viewBox="0 0 20 20" fill="none">
          <path d="M18.3333 9.23333V10C18.3323 11.797 17.7504 13.5456 16.6744 14.9849C15.5985 16.4241 14.0861 17.4771 12.3628 17.9866C10.6395 18.4961 8.79769 18.4349 7.11205 17.8122C5.42642 17.1894 3.98718 16.0384 3.00912 14.5309C2.03106 13.0234 1.56648 11.24 1.68472 9.4469C1.80296 7.65377 2.49766 5.94691 3.66522 4.58086C4.83278 3.21482 6.41064 2.26279 8.16348 1.86679C9.91632 1.47078 11.7502 1.65195 13.3917 2.38333M18.3333 3.33333L10 11.675L7.5 9.175" stroke="#003b3c" strokeWidth="1.5" strokeLinecap="square" strokeMiterlimit="10"/>
        </svg>
      </div>
      <div className="flex-1">
        <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.7] text-[#003b3c] ${titleSize}`}>
          60-day money back guarantee
        </p>
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.7] text-[#003b3c] ${descSize}`}>
          We promise you will love it, or your money-back.
        </p>
      </div>
    </div>
  );
}

// Share Section
function ShareSection({ breakpoint }: any) {
  const textSize = breakpoint === 'S' ? 'text-[16px]' : 'text-[18px]';
  
  return (
    <div className="flex gap-[20px] items-center">
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.6] text-[#003b3c] ${textSize}`}>
        Share:
      </p>
      <div className="flex gap-[12px]">
        <a href="#" className="w-[24px] h-[24px] text-[#003b3c] hover:text-[#009296] transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="#" className="w-[24px] h-[24px] text-[#003b3c] hover:text-[#009296] transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="#" className="w-[24px] h-[24px] text-[#003b3c] hover:text-[#009296] transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

// Reviews Section
function ReviewsSection({ breakpoint }: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[24px] py-[60px]' : isTablet ? 'px-[40px] py-[80px]' : 'px-[40px] py-[110px]';
  const quoteSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[38px]' : 'text-[48px]';
  const quoteTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-0.96px]';
  const authorSize = isMobile ? 'text-[14px]' : 'text-[16px]';
  
  return (
    <div id="reviews" className={`w-full bg-[#009296] ${padding}`}>
      <div className="flex flex-col items-center gap-[30px] max-w-[1060px] mx-auto">
        {/* Stars */}
        <div className="flex gap-[4px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-[28px] h-[28px]" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F1A33A" stroke="#F1A33A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </div>
        
        {/* Quote */}
        <blockquote className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-white text-center ${quoteSize} ${quoteTracking}`}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
        </blockquote>
        
        {/* Author */}
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-white text-center uppercase tracking-[1.6px] ${authorSize}`}>
          Jane Doe – Verified Customer
        </p>
      </div>
    </div>
  );
}

// Benefits Section
function BenefitsSection({ breakpoint }: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'py-[60px]' : isTablet ? 'py-[80px]' : 'py-[110px]';
  
  return (
    <div className={`w-full ${padding}`}>
      <TickerTape 
        fontSize={isMobile ? '28px' : '34px'}
        gap="31px"
        lineWidth="94px"
        animationDuration="20s"
      />
    </div>
  );
}

// Video Section
function VideoSection({ breakpoint }: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[24px] py-[60px]' : isTablet ? 'px-[40px] py-[80px]' : 'px-0 py-[120px]';
  const titleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[38px]' : 'text-[54px]';
  const titleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-1.08px]';
  const descSize = isMobile ? 'text-[14px]' : isTablet ? 'text-[16px]' : 'text-[20px]';
  const copyPadding = isMobile ? 'px-0' : isTablet ? 'px-[40px]' : 'px-[170px]';
  
  return (
    <div className={`w-full bg-[#f6f2ec] ${padding}`}>
      <div className="flex flex-col items-center gap-[80px] max-w-[1060px] mx-auto">
        {/* Header Group */}
        <div className="w-full">
          <div className={`flex flex-col gap-[30px] items-start text-center w-full ${copyPadding}`}>
            <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] w-full ${titleSize} ${titleTracking}`}>
              Why fiber matters and why Fibermucil is different.
            </p>
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] w-full ${descSize}`}>
              All our products are made in-house. No outsourcing, no markups.
            </p>
          </div>
        </div>
        
        {/* Video Placeholder */}
        <div className="w-full aspect-[1060/658] bg-[#c4c4c4] rounded-[20px] flex items-center justify-center relative overflow-hidden">
          <button className="w-[80px] h-[80px] rounded-full bg-white/15 border-[3px] border-white flex items-center justify-center hover:bg-white/25 transition-colors">
            <svg className="w-[32px] h-[32px] ml-1" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// FAQ Section
function FAQSection({ breakpoint }: any) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const titleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[38px]' : 'text-[54px]';
  const titleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-1.08px]';
  const questionSize = isMobile ? 'text-[18px]' : 'text-[24px]';
  const questionTracking = isMobile ? 'tracking-[-0.18px]' : 'tracking-[-0.24px]';
  
  const faqs = [
    { question: 'Fibermucil question goes here?', answer: 'Answer to the question goes here with detailed information about the product.' },
    { question: 'Fibermucil question goes here?', answer: 'Answer to the question goes here with detailed information about the product.' }
  ];
  
  return (
    <div className="w-full bg-[#f6f2ec] px-0 pb-[120px]">
      <div className="flex flex-col gap-[80px] max-w-[1060px] mx-auto">
        {/* Title */}
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] text-center w-full ${titleSize} ${titleTracking}`}>
          Frequently asked questions
        </p>
        
        {/* FAQ Items */}
        <div className="flex flex-col gap-[40px]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="flex flex-col gap-[40px]">
              {idx === 0 && <div className="h-[1px] w-full bg-[#D9E2E2]" />}
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex items-center justify-between w-full group"
              >
                <h3 className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-left ${questionSize} ${questionTracking}`}>
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-[41px] h-[41px] text-[#003b3c] transition-transform flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                />
              </button>
              {openFaq === idx && (
                <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[16px] animate-in slide-in-from-top-2 duration-200">
                  {faq.answer}
                </div>
              )}
              <div className="h-[1px] w-full bg-[#D9E2E2]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// We Also Recommend Section
function WeAlsoRecommendSection({ breakpoint, setCartItems, cartItems, onOpenCart, quickViewOpen, setQuickViewOpen }: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isDesktop = !isMobile && !isTablet;
  const padding = isMobile ? 'px-[24px] py-[60px]' : isTablet ? 'px-[40px] py-[80px]' : 'px-[40px] py-[110px]';
  const titleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[38px]' : 'text-[48px]';
  const titleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-0.96px]';
  
  // Recommended products - using existing products from data
  const recommendedProducts = [
    {
      id: 'fibermucil-1',
      name: 'Fibermucil',
      subtitle: 'Natural Psylium Fiber in Small Capsules',
      price: 24.90,
      salePrice: 19.90,
    },
    {
      id: 'fibermucil-2',
      name: 'Fibermucil',
      subtitle: 'Natural Psylium Fiber in Small Capsules',
      price: 24.90,
      salePrice: 19.90,
    },
    {
      id: 'fibermucil-3',
      name: 'Fibermucil',
      subtitle: 'Natural Psylium Fiber in Small Capsules',
      price: 24.90,
      salePrice: 19.90,
    },
    {
      id: 'fibermucil-4',
      name: 'Fibermucil',
      subtitle: 'Natural Psylium Fiber in Small Capsules',
      price: 24.90,
      salePrice: 19.90,
    }
  ];
  
  // Grid columns based on breakpoint
  const gridCols = isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-4';
  const gap = 'gap-[20px]';
  
  return (
    <div className={`w-full bg-white ${padding}`}>
      <div className="flex flex-col items-start gap-[40px] w-full max-w-[1920px] mx-auto">
        {/* Title */}
        <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${titleSize} ${titleTracking}`}>
          We also recommend
        </h2>
        
        {/* Desktop Layout - matching CollectionPage */}
        {isDesktop && (
          <div className="w-full">
            {/* Product Cards Row */}
            <div className={`grid ${gap} items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px] ${gridCols}`}>
              {recommendedProducts.map((product, idx) => (
                <div key={idx} className="self-stretch">
                  <ProductCard hasImage={true} onQuickView={() => setQuickViewOpen(true)} />
                </div>
              ))}
            </div>
            
            {/* Product Info Row */}
            <div className={`grid ${gap} items-start pb-[40px] w-full ${gridCols}`}>
              {recommendedProducts.map((product, idx) => (
                <div key={idx}>
                  <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                    <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                      <p className="font-['Inter',sans-serif] font-medium">{product.name}</p>
                      <p className="font-['Inter',sans-serif] text-[#406c6d]">{product.subtitle}</p>
                    </div>
                    <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                      <span className="text-[#D84315]">${product.salePrice.toFixed(2)}</span>
                      <span className="line-through font-normal ml-[8px]">${product.price.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Mobile/Tablet Layout */}
        {!isDesktop && (
          <>
            {/* Product Cards Row */}
            <div className={`grid gap-[10px] w-full ${gridCols}`}>
              {recommendedProducts.map((product, idx) => (
                <div key={idx} className="flex flex-col gap-[20px]">
                  {/* Product Card */}
                  <ProductCard hasImage={true} onQuickView={() => setQuickViewOpen(true)} />
                  
                  {/* Product Info */}
                  <div className="flex flex-col gap-[10px] text-[#003b3c]">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[16px]">{product.name}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[14px] text-[#406c6d]">{product.subtitle}</p>
                    
                    {/* Price */}
                    <div className="flex gap-[10px] items-center">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[16px] text-[#D84315]">
                        ${product.salePrice.toFixed(2)}
                      </p>
                      <p className="font-['Inter:Light',sans-serif] font-light leading-[1.4] text-[14px] line-through">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
