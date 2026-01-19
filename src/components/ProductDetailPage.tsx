import { useState, useEffect, useRef } from 'react';
import { products, type Product } from '../data/products';
import { ChevronDown, Check, Minus, Plus, Star, Info, Truck, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import imgPlaceholder from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import imgProduct from "figma:asset/f2e5085bf5c2fe71f9ea2c23494b5c63f1b85c27.png";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import imgProduct2 from "figma:asset/4c827d721cfb3a98dae6bc84c26297020170cff7.png";
import imgProduct3 from "figma:asset/8f7c56591f85ac5a18ebff17e71fe301013b5b43.png";
import imgProduct4 from "figma:asset/a2ad208760c8f65ed2c61a1b716a320cc58d1750.png";
import imgProduct5 from "figma:asset/43c7d6fc4bc81af7fbe5a0eb3a05dfb051504997.png";
import imgProduct6 from "figma:asset/549f0fd0509f835f4574adfa9f122e99f8fc70bb.png";
import imgProduct7 from "figma:asset/6ce1d64ac817d4e5f0c224d844c393f2a86ee576.png";
import imgPillCapsule from "figma:asset/9713f784abe59c2b09beb31e6a767104a00b0983.png";
import imgPlantago from "figma:asset/29e9f2e4f5e91d4380eca0a7e99798dbc545b080.png";
import svgPaths from "../imports/svg-3m84o7zton";
import TickerTape from './TickerTape';
import ProductCard from './ProductCard';
import QuickView from './QuickView';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { motion } from 'motion/react';
import { StorySection } from './StorySection';
import { useEffect } from 'react';

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
  const [showStickyButton, setShowStickyButton] = useState(false);
  
  // New checkbox-based states instead of purchaseType radio
  const [isAutoship, setIsAutoship] = useState(false);
  const [isFlexPay, setIsFlexPay] = useState(false);
  const [deliveryFrequency, setDeliveryFrequency] = useState(30);
  const [flexPayInstallments, setFlexPayInstallments] = useState(2);

  // Scroll detection for sticky button
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button when scrolled past initial add to cart button (~1200px for mobile)
      const shouldShow = window.scrollY > 1200;
      setShowStickyButton(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found</div>;
  }

  // Variant options based on servings
  const variantOptions = ['60', '180', '360', '1000'];
  
  // Calculate current prices - NO autoship discount
  const currentVariantPrice = VARIANT_PRICING[selectedVariant];
  const basePrice = currentVariantPrice.sale;
  const msrpPrice = currentVariantPrice.msrp;
  const unitPrice = basePrice; // Same price regardless of autoship
  const subtotal = unitPrice * quantity;
  
  const handleAddToCart = () => {
    // Get accurate pricing based on selected variant
    const currentVariantPrice = VARIANT_PRICING[selectedVariant];
    const basePrice = currentVariantPrice.sale; // Sale price (e.g., $14.90 for 60ct)
    const msrpPrice = currentVariantPrice.msrp; // MSRP (e.g., $19.90 for 60ct)
    
    // Price is always the base price - no autoship discount
    const finalPrice = basePrice;
    
    // Determine purchase type based on checkbox states
    let purchaseType: 'one-time' | 'autoship' | 'flexpay' | 'autoship-flexpay';
    if (isAutoship && isFlexPay) {
      purchaseType = 'autoship-flexpay';
    } else if (isAutoship) {
      purchaseType = 'autoship';
    } else if (isFlexPay) {
      purchaseType = 'flexpay';
    } else {
      purchaseType = 'one-time';
    }
    
    const newItem = {
      id: `${product.id}-${purchaseType}-${selectedVariant}${isAutoship ? `-${deliveryFrequency}` : ''}${isFlexPay ? `-${flexPayInstallments}` : ''}`,
      productId: product.id,
      name: product.name,
      count: `Count: ${selectedVariant} capsules`,
      price: finalPrice,
      originalPrice: msrpPrice, // Always show MSRP as original price
      quantity: quantity,
      image: product.image || imgPlaceholder,
      purchaseType: purchaseType,
      
      // Autoship specific
      ...(isAutoship && {
        deliveryFrequency: deliveryFrequency
      }),
      
      // FlexPay specific
      ...(isFlexPay && {
        flexPayInstallments: flexPayInstallments,
        flexPayAmount: basePrice / flexPayInstallments // Per-payment amount based on sale price
      })
    };
    
    // Check if item already exists in cart (same product + purchase type + variant + frequency/installments)
    const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);
    
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

  // Product image carousel
  const productImages = [
    product.image || imgPlaceholder,
    imgProduct2,
    imgProduct3,
    imgProduct4,
    imgProduct5,
    imgProduct6,
    imgProduct7
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
          isAutoship={isAutoship}
          setIsAutoship={setIsAutoship}
          isFlexPay={isFlexPay}
          setIsFlexPay={setIsFlexPay}
          deliveryFrequency={deliveryFrequency}
          setDeliveryFrequency={setDeliveryFrequency}
          flexPayInstallments={flexPayInstallments}
          setFlexPayInstallments={setFlexPayInstallments}
        />
        
        {/* Reviews Section */}
        <ReviewsSection breakpoint={breakpoint} />
        
        {/* Benefits Section */}
        <BenefitsSection breakpoint={breakpoint} />
        
        {/* Content Slot 1 */}
        <ContentSlot1 breakpoint={breakpoint} />
        
        {/* Content Slot 2 */}
        <ContentSlot2 breakpoint={breakpoint} />
        
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

      {/* Sticky Add to Cart - Mobile Only */}
      {breakpoint === 'S' && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: showStickyButton ? 1 : 0, 
            y: showStickyButton ? 0 : 100 
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
          style={{ pointerEvents: showStickyButton ? 'auto' : 'none' }}
        >
          {/* Gradient background - white to transparent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)'
            }}
          />
          
          {/* Button container */}
          <div className="relative px-[24px] pb-[24px] pt-[24px]">
            <AddToCartButton 
              onClick={handleAddToCart} 
              total={subtotal}
              isAutoship={isAutoship}
              isFlexPay={isFlexPay}
              deliveryFrequency={deliveryFrequency}
              flexPayInstallments={flexPayInstallments}
              breakpoint={breakpoint} 
            />
          </div>
        </motion.div>
      )}

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
  const [headline, setHeadline] = useState<string>("Mother Nature's answer to comfortable, effective <span class=\"font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]\">fiber.</span>");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const headlineSize = breakpoint === 'S' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[48px]' : breakpoint === 'HD' ? 'text-[92px]' : 'text-[72px]';
  const headlineTracking = breakpoint === 'S' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.96px]' : breakpoint === 'HD' ? 'tracking-[-1.84px]' : 'tracking-[-1.44px]';
  const headlineMaxW = breakpoint === 'S' ? 'max-w-[327px]' : breakpoint === 'M' ? 'max-w-[688px]' : 'max-w-[1150px]';
  const padding = breakpoint === 'S' ? 'px-[24px] py-[60px]' : breakpoint === 'M' ? 'px-[40px] py-[80px]' : 'px-[40px] py-[110px]';

  // Initialize content only once
  useEffect(() => {
    if (headlineRef.current && !isInitialized) {
      headlineRef.current.innerHTML = headline;
      setIsInitialized(true);
    }
  }, [headline, isInitialized]);

  const handleHeadlineChange = () => {
    if (headlineRef.current) {
      setHeadline(headlineRef.current.innerHTML);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top - 50,
        left: rect.left + rect.width / 2
      });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const makeItalic = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;

    // Add italic formatting with teal color
    const span = document.createElement('span');
    span.className = "font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]";
    span.textContent = selectedText;
    range.deleteContents();
    range.insertNode(span);

    // Update state
    if (headlineRef.current) {
      setHeadline(headlineRef.current.innerHTML);
    }

    // Clear selection and hide toolbar
    selection.removeAllRanges();
    setShowToolbar(false);
  };

  const makeRegular = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;

    // Find the parent span element if the selection is within one
    let node = range.commonAncestorContainer;
    let parentSpan = null;
    
    // Traverse up to find the italic span
    while (node && node !== headlineRef.current) {
      if (node.nodeType === Node.ELEMENT_NODE && 
          (node as HTMLElement).tagName === 'SPAN' &&
          (node as HTMLElement).classList.contains('italic')) {
        parentSpan = node as HTMLElement;
        break;
      }
      node = node.parentNode;
    }

    if (parentSpan) {
      // Replace the entire span with its text content
      const textNode = document.createTextNode(parentSpan.textContent || '');
      parentSpan.parentNode?.replaceChild(textNode, parentSpan);
    } else {
      // If not in a span, just replace the selection with plain text
      const textNode = document.createTextNode(selectedText);
      range.deleteContents();
      range.insertNode(textNode);
    }

    // Update state
    if (headlineRef.current) {
      setHeadline(headlineRef.current.innerHTML);
    }

    // Clear selection and hide toolbar
    selection.removeAllRanges();
    setShowToolbar(false);
  };

  return (
    <div className={`w-full flex items-center justify-center ${padding} relative`}>
      <motion.h1 
        ref={headlineRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // Custom ease curve for smooth, elegant motion
          delay: 0.2 
        }}
        contentEditable
        suppressContentEditableWarning
        dir="ltr"
        onInput={handleHeadlineChange}
        onMouseUp={handleTextSelection}
        onKeyUp={handleTextSelection}
        className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] text-center cursor-text hover:bg-[#F7F2EC]/40 focus:bg-[#F7F2EC]/60 px-[12px] py-[8px] rounded-[4px] transition-colors outline-none ${headlineSize} ${headlineTracking} ${headlineMaxW}`}
      />
      
      {/* Formatting Toolbar */}
      {showToolbar && (
        <div 
          className="fixed z-50 bg-[#003b3c] rounded-[6px] shadow-lg px-[8px] py-[4px] -translate-x-1/2 flex gap-[4px]"
          style={{ top: `${toolbarPosition.top}px`, left: `${toolbarPosition.left}px` }}
        >
          <button
            onClick={makeItalic}
            className="px-[12px] py-[6px] text-white hover:bg-[#009296] rounded-[4px] transition-colors font-['STIX_Two_Text:Italic',sans-serif] italic text-[14px]"
            title="Make italic (teal)"
          >
            Italic
          </button>
          <button
            onClick={makeRegular}
            className="px-[12px] py-[6px] text-white hover:bg-[#009296] rounded-[4px] transition-colors text-[14px]"
            title="Make regular (dark)"
          >
            Regular
          </button>
        </div>
      )}
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
  productImages,
  isAutoship,
  setIsAutoship,
  isFlexPay,
  setIsFlexPay,
  deliveryFrequency,
  setDeliveryFrequency,
  flexPayInstallments,
  setFlexPayInstallments
}: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[24px]' : 'px-[40px]';
  const gap = isMobile ? 'gap-[48px]' : 'gap-[40px]';
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
          isAutoship={isAutoship}
          setIsAutoship={setIsAutoship}
          isFlexPay={isFlexPay}
          setIsFlexPay={setIsFlexPay}
          deliveryFrequency={deliveryFrequency}
          setDeliveryFrequency={setDeliveryFrequency}
          flexPayInstallments={flexPayInstallments}
          setFlexPayInstallments={setFlexPayInstallments}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
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
      
      {/* Accordion Group - Desktop/Tablet only */}
      {!isMobile && (
        <AccordionGroup 
          product={product}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          breakpoint={breakpoint}
        />
      )}
    </div>
  );
}

// Image Carousel Component
function ImageCarousel({ images, currentIndex, setCurrentIndex, breakpoint }: any) {
  const isMobile = breakpoint === 'S';
  
  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  
  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };
  
  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Container for thumbnails and main image */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-[16px] w-full`}>
        {/* Thumbnail Navigation - Hidden on mobile, vertical on desktop */}
        {!isMobile && (
          <div className="flex flex-col gap-[10px] overflow-y-auto scrollbar-hide max-h-[725px]">
            {images.slice(0, 7).map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-[75px] h-[75px] bg-[#F5F5F5] rounded-[8px] overflow-hidden border-2 transition-all ${
                  currentIndex === idx ? 'border-[#009296]' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}
        
        {/* Main Image - 20px border radius */}
        <div 
          className="flex-1 aspect-square bg-[#F5F5F5] rounded-[20px] overflow-hidden relative group"
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <img 
            src={images[currentIndex]} 
            alt="Product" 
            className="w-full h-full object-contain"
          />
          
          {/* Left Arrow - Subtle on desktop (hover only), always visible but subtle on mobile */}
          <button
            onClick={handlePrevious}
            className={`absolute left-[16px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 ${
              isMobile 
                ? 'opacity-60 hover:opacity-100' 
                : 'opacity-0 group-hover:opacity-60 hover:!opacity-100'
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-[20px] h-[20px] text-[#003b3c]" />
          </button>
          
          {/* Right Arrow - Subtle on desktop (hover only), always visible but subtle on mobile */}
          <button
            onClick={handleNext}
            className={`absolute right-[16px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 ${
              isMobile 
                ? 'opacity-60 hover:opacity-100' 
                : 'opacity-0 group-hover:opacity-60 hover:!opacity-100'
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-[20px] h-[20px] text-[#003b3c]" />
          </button>
        </div>
      </div>
      
      {/* Dot indicators - Mobile only */}
      {isMobile && (
        <div className="flex gap-[8px] justify-center items-center py-[8px]">
          {images.slice(0, 7).map((_: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-[8px] rounded-full transition-all ${
                currentIndex === idx 
                  ? 'bg-[#009296] w-[24px]' 
                  : 'bg-[#D9E2E2] w-[8px]'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      )}
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
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[16px] space-y-4">
          <p>
            <strong>FIBERMUCIL</strong> is a pure, encapsulated psyllium husk powder from the high-fiber Plantago ovata plant.
            It contains no additives and provides an unparalleled, natural source of fiber without fiber's typical unpleasant problems.
          </p>
          <p>
            Fibermucil is delivered as a gentle, ultra-fine powder in small, easy-to-swallow capsules.
            Unlike typical fiber products and drinks, there are no added colors, flavors, calories or synthetic ingredients.
          </p>
          <p>
            Dietary fiber provides a myriad of health benefits and is often considered the most overlooked ingredient in the American diet.
            Fiber supports weight loss by providing feelings of fullness.
          </p>
          <p>
            It is also well established that the soluble fiber abundant in Fibermucil is an easy means of supporting healthy cholesterol levels and heart health.
          </p>
          <p>
            Natural Fibermucil also acts as a gentle sponge and broom, naturally promoting regularity and transit time while cleansing the digestive tract of undigested food, debris, toxins and digestive by-products.
          </p>
          <p>
            Decades of clinical science have consistently proven the extensive health benefits of a fiber-rich diet to all body systems.
          </p>
          <p>
            Fibermucil provides a gentle, but powerful source of Mother Nature's best source of dietary fiber without the undesirable ingredients or unpleasant problems associated with typical fiber products.
          </p>
          <p className="text-[14px] text-[#406c6d] italic mt-6">
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure or prevent any disease.
          </p>
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
          <p>Take two capsules daily, preferably with food, or as directed by your healthcare professional.</p>
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
    <div className="flex flex-col w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full group"
      >
        <h3 className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-left ${titleSize} ${titleTracking}`}>
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown 
            className={`${breakpoint === 'S' ? 'w-[28px] h-[28px]' : 'w-[24px] h-[24px]'} text-[#003b3c]`}
            strokeWidth={2}
          />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? 20 : 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ overflow: 'hidden' }}
      >
        <div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Right Column Component
function RightColumn({ 
  product, 
  breakpoint, 
  selectedVariant, 
  setSelectedVariant, 
  quantity, 
  setQuantity, 
  handleAddToCart,
  isAutoship,
  setIsAutoship,
  isFlexPay,
  setIsFlexPay,
  deliveryFrequency,
  setDeliveryFrequency,
  flexPayInstallments,
  setFlexPayInstallments,
  activeAccordion,
  setActiveAccordion
}: any) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const maxWidth = isMobile || isTablet ? 'max-w-none' : 'max-w-[800px]';
  
  // Calculate current prices - NO autoship discount
  const currentVariantPrice = VARIANT_PRICING[selectedVariant];
  const basePrice = currentVariantPrice.sale;
  const msrpPrice = currentVariantPrice.msrp;
  const unitPrice = basePrice; // Same price regardless
  
  const subtotal = unitPrice * quantity;
  const savings = (msrpPrice * quantity) - subtotal;
  
  return (
    <div className={`flex flex-col ${isMobile || isTablet ? 'w-full' : 'flex-1'} ${maxWidth}`}>
      {/* Product Title */}
      <ProductTitleSection product={product} breakpoint={breakpoint} />
      
      {/* Ratings & Reviews - 24px spacing on mobile (related group), 40px on desktop */}
      <div className={isMobile ? 'mt-[24px]' : 'mt-[40px]'}>
        <RatingsSection breakpoint={breakpoint} />
      </div>
      
      {/* Product Description - 24px spacing on mobile (related group), 40px on desktop */}
      <div className={isMobile ? 'mt-[24px]' : 'mt-[40px]'}>
        <ProductDescription product={product} breakpoint={breakpoint} />
      </div>
      
      {/* Good For Tags - 24px spacing on mobile (related group), 40px on desktop */}
      <div className={isMobile ? 'mt-[24px]' : 'mt-[40px]'}>
        <GoodForTags product={product} breakpoint={breakpoint} />
      </div>
      
      {/* Divider - 32px spacing on mobile (before major section), 40px on desktop */}
      <div className={`h-[1px] w-full bg-[#D9E2E2] ${isMobile ? 'mt-[32px]' : 'mt-[40px]'}`} />
      
      {/* Variant Selector - 24px after divider on mobile, 40px on desktop */}
      <div className={isMobile ? 'mt-[24px]' : 'mt-[40px]'}>
        <VariantSelector 
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          breakpoint={breakpoint}
        />
      </div>
      
      {/* Purchase Options - 32px spacing on mobile (functional section), 40px on desktop */}
      <div className={isMobile ? 'mt-[32px]' : 'mt-[40px]'}>
        <PurchaseOptions 
          isAutoship={isAutoship}
          setIsAutoship={setIsAutoship}
          isFlexPay={isFlexPay}
          setIsFlexPay={setIsFlexPay}
          deliveryFrequency={deliveryFrequency}
          setDeliveryFrequency={setDeliveryFrequency}
          flexPayInstallments={flexPayInstallments}
          setFlexPayInstallments={setFlexPayInstallments}
          basePrice={basePrice}
          msrpPrice={msrpPrice}
          breakpoint={breakpoint}
        />
      </div>
      
      {/* Quantity & Add to Cart - 32px spacing on mobile (functional section), 40px on desktop */}
      <div className={`flex ${isMobile ? 'flex-col mt-[32px]' : 'gap-[16px] items-end mt-[40px]'} w-full`}>
        <QuantitySelector 
          quantity={quantity}
          setQuantity={setQuantity}
          breakpoint={breakpoint}
        />
        {/* Hide inline button on mobile, show only sticky */}
        {!isMobile && (
          <AddToCartButton 
            onClick={handleAddToCart} 
            total={subtotal}
            isAutoship={isAutoship}
            isFlexPay={isFlexPay}
            deliveryFrequency={deliveryFrequency}
            flexPayInstallments={flexPayInstallments}
            breakpoint={breakpoint} 
          />
        )}
      </div>
      
      {/* Guarantee Text - 32px spacing on mobile, 40px on desktop */}
      <div className={isMobile ? 'mt-[32px]' : 'mt-[40px]'}>
        <GuaranteeText breakpoint={breakpoint} />
      </div>
      
      {/* Divider - 40px spacing (major break before shipping section) */}
      <div className={`h-[1px] w-full bg-[#D9E2E2] ${isMobile ? 'mt-[40px]' : 'mt-[40px]'}`} />
      
      {/* Shipping & Money Back - 24px after divider on mobile, 40px on desktop */}
      <div className={isMobile ? 'mt-[24px]' : 'mt-[40px]'}>
        <ShippingInfo breakpoint={breakpoint} />
      </div>
      <div className={isMobile ? 'mt-[24px]' : 'mt-[40px]'}>
        <MoneyBackGuarantee breakpoint={breakpoint} />
      </div>
      
      {/* Share - 32px spacing on mobile, 40px on desktop */}
      <div className={isMobile ? 'mt-[32px]' : 'mt-[40px]'}>
        <ShareSection breakpoint={breakpoint} />
      </div>
      
      {/* Accordion Group - Mobile only, shown after Share - 40px spacing (major content area) */}
      {isMobile && (
        <div className="mt-[40px]">
          <AccordionGroup 
            product={product}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            breakpoint={breakpoint}
          />
        </div>
      )}
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
        {product.name}
      </h1>
      <p className={`font-['STIX_Two_Text:Italic',sans-serif] font-normal italic leading-[1.3] text-[#003b3c] ${subtitleSize} ${subtitleTracking}`}>
        {product.description}
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
  const descSize = breakpoint === 'HD' ? 'text-[20px]' : 'text-[16px]';
  
  return (
    <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] max-w-[750px] ${descSize}`}>
      {product.longDescription || product.description}
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

// Variant Selector - Clean without prices
function VariantSelector({ selectedVariant, setSelectedVariant, breakpoint }: any) {
  const variants = ['60', '180', '360', '1000'];
  const labelSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  const buttonSize = breakpoint === 'S' ? 'text-[14px]' : 'text-[16px]';
  const isMobile = breakpoint === 'S';
  
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${labelSize}`}>
        <span className="font-['Inter:Medium',sans-serif] font-medium">Size:</span> {selectedVariant} capsules
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px]">
        {variants.map((variant) => {
          return (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-[16px] py-[14px] border-2 transition-colors ${
                selectedVariant === variant
                  ? 'border-[#009296] bg-[#f2fafa]'
                  : 'border-[#D9E2E2] hover:border-[#009296]'
              }`}
            >
              <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-center ${
                selectedVariant === variant ? 'text-[#009296]' : 'text-[#003b3c]'
              } ${buttonSize}`}>
                {variant} count
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Purchase Options - NEW CHECKBOX DESIGN
function PurchaseOptions({ isAutoship, setIsAutoship, isFlexPay, setIsFlexPay, deliveryFrequency, setDeliveryFrequency, flexPayInstallments, setFlexPayInstallments, basePrice, msrpPrice, breakpoint }: any) {
  const isMobile = breakpoint === 'S';
  const labelSize = isMobile ? 'text-[14px]' : 'text-[16px]';
  const titleSize = isMobile ? 'text-[16px]' : 'text-[18px]';
  const priceSize = isMobile ? 'text-[18px]' : 'text-[24px]';
  const strikethroughSize = isMobile ? 'text-[14px]' : 'text-[16px]';
  const subtitleSize = isMobile ? 'text-[14px]' : 'text-[16px]';
  
  const savings = msrpPrice - basePrice;
  
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {/* Price Display - Always visible at top */}
      <div className="flex items-baseline gap-[12px]">
        <p className={`font-['Inter:Medium',sans-serif] font-medium ${priceSize} leading-[1.2] text-[#D84315]`}>
          ${basePrice.toFixed(2)}
        </p>
        <p className={`font-['Inter:Regular',sans-serif] font-normal ${strikethroughSize} leading-[1.2] text-[#406c6d] line-through`}>
          ${msrpPrice.toFixed(2)}
        </p>
        <p className={`font-['Inter:Medium',sans-serif] font-medium ${strikethroughSize} leading-[1.2] text-[#009296]`}>
          Save ${savings.toFixed(2)}
        </p>
      </div>
      
      <div className="flex flex-col gap-[12px]">
        {/* Autoship Checkbox Card */}
        <div
          className={`
            border-2 rounded-[8px] transition-all duration-200
            ${isAutoship
              ? 'border-[#009296] bg-[#f2fafa]'
              : 'border-[#D9E2E2] hover:border-[#009296]'
            }
          `}
        >
          <button
            onClick={() => setIsAutoship(!isAutoship)}
            className="w-full p-[16px] text-left"
          >
            <div className="flex items-start gap-[12px]">
              {/* Checkbox */}
              <div className="relative w-[20px] h-[20px] shrink-0 mt-[2px]">
                <div className={`
                  w-full h-full rounded-[4px] border-2 transition-all duration-200 flex items-center justify-center
                  ${isAutoship
                    ? 'border-[#009296] bg-[#009296]'
                    : 'border-[#D9E2E2] bg-white'
                  }
                `}>
                  {isAutoship && (
                    <Check className="w-[14px] h-[14px] text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`font-['Inter:Medium',sans-serif] font-medium ${titleSize} text-[#003b3c] mb-[4px]`}>
                  Autoship
                </p>
                <p className={`font-['Inter:Regular',sans-serif] ${subtitleSize} text-[#406c6d]`}>
                  Flexible delivery that works for you
                </p>
              </div>
            </div>
          </button>

          {/* Delivery Frequency Options - Expandable */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: isAutoship ? '1fr' : '0fr',
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
                        Never run out of your essential supplements
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

        {/* FlexPay Checkbox Card */}
        <div
          className={`
            border-2 rounded-[8px] transition-all duration-200
            ${isFlexPay
              ? 'border-[#009296] bg-[#f2fafa]'
              : 'border-[#D9E2E2] hover:border-[#009296]'
            }
          `}
        >
          <button
            onClick={() => setIsFlexPay(!isFlexPay)}
            className="w-full p-[16px] text-left"
          >
            <div className="flex items-start justify-between gap-[16px]">
              <div className="flex items-start gap-[12px]">
                {/* Checkbox */}
                <div className="relative w-[20px] h-[20px] shrink-0 mt-[2px]">
                  <div className={`
                    w-full h-full rounded-[4px] border-2 transition-all duration-200 flex items-center justify-center
                    ${isFlexPay
                      ? 'border-[#009296] bg-[#009296]'
                      : 'border-[#D9E2E2] bg-white'
                    }
                  `}>
                    {isFlexPay && (
                      <Check className="w-[14px] h-[14px] text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-['Inter:Medium',sans-serif] font-medium ${titleSize} text-[#003b3c] mb-[4px]`}>
                    FlexPay
                  </p>
                  <p className={`font-['Inter:Regular',sans-serif] ${subtitleSize} text-[#406c6d]`}>
                    Split into easy installments
                  </p>
                </div>
              </div>
              
              {/* Price Display */}
              <div className="flex flex-col items-end gap-[2px] shrink-0">
                <p className={`font-['Inter:Medium',sans-serif] font-medium text-[16px] leading-[1.2] text-[#009296]`}>
                  ${(basePrice / flexPayInstallments).toFixed(2)}
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[1.2] text-[#406c6d]">
                  ×{flexPayInstallments} payments
                </p>
              </div>
            </div>
          </button>

          {/* Installment Options - Expandable */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: isFlexPay ? '1fr' : '0fr',
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
                    {[2, 3, 4, 5].map((installments) => (
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
  const isMobile = breakpoint === 'S';
  const labelSize = isMobile ? 'text-[14px]' : 'text-[16px]';
  const boxWidth = isMobile ? 'w-full' : 'w-[154px]';
  
  return (
    <div className={`flex flex-col gap-[12px] ${isMobile ? 'w-1/2' : 'shrink-0'}`}>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${labelSize}`}>
        <span className="font-['Inter:Medium',sans-serif] font-medium">Quantity:</span>
      </p>
      <div className="flex gap-[17px] items-center">
        <div className={`flex items-center justify-between px-[13px] py-[12px] h-[50px] ${boxWidth} border border-[#003b3c]`}>
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
  const redPriceSize = breakpoint === 'S' ? 'text-[16px]' : 'text-[24px]';
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
            <p className={`font-['Inter:Medium',sans-serif] font-medium text-[#D84315] ${redPriceSize}`}>
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

// Add to Cart Button - NOW WITH CHECKBOX STATES
function AddToCartButton({ onClick, total, isAutoship, isFlexPay, deliveryFrequency, flexPayInstallments, breakpoint }: any) {
  const buttonHeight = breakpoint === 'S' ? 'h-[52px]' : 'h-[50px]';
  const textSize = 'text-[16px]';
  
  const flexPayPerPayment = total / flexPayInstallments;
  
  let buttonText = `Add to Cart — $${total.toFixed(2)}`;
  if (isFlexPay) {
    buttonText = `Pay $${flexPayPerPayment.toFixed(2)} Today`;
  }
  
  return (
    <button
      onClick={onClick}
      className={`bg-[#009296] ${buttonHeight} rounded-[999px] w-full font-['Inter:Medium',sans-serif] font-medium ${textSize} tracking-[1.6px] uppercase text-white hover:bg-[#007a7d] transition-colors`}
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
  const padding = isMobile ? 'px-[24px] py-[60px]' : isTablet ? 'px-[40px] py-[80px]' : 'px-0 pt-[140px] pb-[120px]';
  const titleSize = isMobile ? 'text-[32px]' : isTablet ? 'text-[38px]' : 'text-[54px]';
  const titleTracking = isMobile ? 'tracking-[-0.64px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-1.08px]';
  const descSize = isMobile ? 'text-[16px]' : isTablet ? 'text-[16px]' : 'text-[20px]';
  const copyPadding = isMobile ? 'px-0' : isTablet ? 'px-[40px]' : 'px-[170px]';
  const headerGap = isMobile ? 'gap-[40px]' : 'gap-[80px]';
  const titleDescGap = isMobile ? 'gap-[20px]' : 'gap-[30px]';
  
  return (
    <div className={`w-full bg-[#f6f2ec] ${padding}`}>
      <div className={`flex flex-col items-center ${headerGap} max-w-[1060px] mx-auto`}>
        {/* Header Group */}
        <div className="w-full">
          <div className={`flex flex-col ${titleDescGap} items-start text-center w-full ${copyPadding}`}>
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

// Content Slot 1 - Clean, Simple and Exceptionally Pure
function ContentSlot1({ breakpoint }: any) {
  const bodySize = breakpoint === 'HD' ? 'text-[20px]' : 'text-[16px]';
  
  const bodyContent = (
    <div className={`flex flex-col gap-[16px]`}>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Fibermucil® features 100% pure psyllium husk powder from the high-fiber Plantago ovata plant—encapsulated in small, easy-to-swallow capsules without any additives, sweeteners, or synthetic ingredients.
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Unlike conventional fiber drinks or gritty powders, Fibermucil is free of colors, flavors, calories, or allergens. Its ultra-fine, bioactive granules are designed for optimal benefit and gentle daily use—delivering fiber in a naturally gentle, yet effective form.
      </p>
    </div>
  );
  
  const imageSlot = (
    <img 
      src={imgPillCapsule} 
      alt="Clear capsule with psyllium fiber powder" 
      className="w-full aspect-square rounded-[20px] object-cover"
    />
  );
  
  return (
    <StorySection
      breakpoint={breakpoint}
      eyebrow="BIOACTIVE MICRO-GRANULES FOR MAXIMUM EFFICACY"
      headline="Clean, Simple and Exceptionally Pure."
      bodyContent={bodyContent}
      imageSlot={imageSlot}
      imageOnRight={true}
      eyebrowPosition="above"
      showDivider={false}
      bgColor="white"
    />
  );
}

// Content Slot 2 - Proven Fiber. Measurable Benefits.
function ContentSlot2({ breakpoint }: any) {
  const bodySize = breakpoint === 'HD' ? 'text-[20px]' : 'text-[16px]';
  const bulletSize = breakpoint === 'S' || breakpoint === 'M' ? 'text-[14px]' : 'text-[16px]';
  
  const benefits = [
    'Gently cleanses the digestive tract',
    'Promotes regularity and healthy transit time',
    'Provides lasting fullness to support weight management',
    'Supports healthy cholesterol levels already in the normal range',
    'Maintains cardiovascular and digestive wellness'
  ];
  
  const bodyContent = (
    <div className="flex flex-col gap-[24px]">
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Fiber is one of the most overlooked nutrients in the modern diet, yet it plays a vital role in supporting your body's daily wellness. Backed by decades of research, a fiber-rich diet offers a natural path to better digestive and heart health.
      </p>
      
      {/* Benefits List */}
      <div className="flex flex-col gap-[12px]">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex gap-[12px] items-start">
            <Check className="w-[20px] h-[20px] text-[#009296] flex-shrink-0 mt-[2px]" strokeWidth={2.5} />
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bulletSize}`}>
              {benefit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  
  const imageSlot = (
    <img 
      src={imgPlantago} 
      alt="Plantago ovata plant - source of psyllium fiber" 
      className="w-full aspect-square rounded-[20px] object-cover"
    />
  );
  
  return (
    <StorySection
      breakpoint={breakpoint}
      eyebrow="ESSENTIAL NUTRIENTS FOR BETTER HEALTH"
      headline="Proven Fiber. Measurable Benefits."
      bodyContent={bodyContent}
      imageSlot={imageSlot}
      imageOnRight={false}
      eyebrowPosition="above"
      showDivider={false}
      bgColor="white"
    />
  );
}

// FAQ Section
function FAQSection({ breakpoint }: any) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const titleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[38px]' : 'text-[54px]';
  const titleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-1.08px]';
  const questionSize = isMobile ? 'text-[16px]' : 'text-[24px]';
  const questionTracking = isMobile ? 'tracking-[-0.16px]' : 'tracking-[-0.24px]';
  const iconSize = isMobile ? 'w-[28px] h-[28px]' : 'w-[24px] h-[24px]';
  
  const faqs = [
    { question: 'Fibermucil question goes here?', answer: 'Answer to the question goes here with detailed information about the product.' },
    { question: 'Fibermucil question goes here?', answer: 'Answer to the question goes here with detailed information about the product.' }
  ];
  
  const padding = isMobile ? 'px-[24px] pb-[60px]' : isTablet ? 'px-[40px] pb-[80px]' : 'px-0 pb-[120px]';
  const containerPadding = isMobile || isTablet ? 'px-0' : 'px-0';
  const titleContentGap = isMobile ? 'gap-[40px]' : 'gap-[80px]';
  
  return (
    <div className={`w-full bg-[#f6f2ec] ${padding}`}>
      <div className={`flex flex-col ${titleContentGap} max-w-[1060px] mx-auto ${containerPadding}`}>
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
                  className={`${iconSize} text-[#003b3c] transition-transform flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
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
  
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
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
  
  // Split products into pages of 2 for mobile
  const productsPerPage = 2;
  const totalPages = Math.ceil(recommendedProducts.length / productsPerPage);
  
  // Handle scroll to update active page
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const pageWidth = scrollRef.current.offsetWidth;
      const page = Math.round(scrollLeft / pageWidth);
      setActivePage(page);
    }
  };
  
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
        
        {/* Mobile Layout - 2 Column Grid with Swipe & Dots */}
        {isMobile && (
          <div className="w-full flex flex-col gap-[40px]">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              <div className="flex">
                {Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const startIdx = pageIdx * productsPerPage;
                  const pageProducts = recommendedProducts.slice(startIdx, startIdx + productsPerPage);
                  
                  return (
                    <div 
                      key={pageIdx} 
                      className="min-w-full snap-start"
                    >
                      <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px]">
                        {pageProducts.map((product, idx) => (
                          <div key={startIdx + idx} className="flex flex-col gap-[20px]">
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
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex gap-[8px] justify-center">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: idx * scrollRef.current.offsetWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-[8px] h-[8px] rounded-full transition-colors ${
                    activePage === idx ? 'bg-[#009296]' : 'bg-[#D9E2E2]'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tablet Layout - Keep Grid */}
        {isTablet && (
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
