import { useState, useRef } from 'react';
import { X, Upload, ChevronDown, Info } from 'lucide-react';
import { categoryData, CategoryBannerConfig } from '../config/categoryData';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgProductImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

type ComponentType = 'product-card' | 'banner';

interface ProductCardData {
  headlineStart: string;
  headlineItalicWord: string;
  headlineEnd: string;
  imageSrc: string;
  productTitle: string;
  productDescription: string;
}

interface ComponentEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComponentEditor({ isOpen, onClose }: ComponentEditorProps) {
  // Component type state
  const [componentType, setComponentType] = useState<ComponentType>('product-card');
  
  // Product Card state
  const [productCard, setProductCard] = useState<ProductCardData>({
    headlineStart: 'An ',
    headlineItalicWord: 'Unparalleled',
    headlineEnd: ' Natural Source of Fiber',
    imageSrc: imgProductImage,
    productTitle: 'Fibermucil',
    productDescription: 'Natural Psylium Fiber in Small Capsules',
  });
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [isProductDragging, setIsProductDragging] = useState(false);
  const productFileInputRef = useRef<HTMLInputElement>(null);
  
  // Banner state
  const allCategories = Object.keys(categoryData).filter(key => key !== 'default').sort();
  const groupedCategories = {
    'Specials': allCategories.filter(cat => cat.includes('special')),
    'Product Categories': allCategories.filter(cat => cat.startsWith('product-category/')),
    'Body Parts': allCategories.filter(cat => cat.startsWith('body-part/')),
    'Body Functions': allCategories.filter(cat => cat.startsWith('body-function/')),
    'Health Issues': allCategories.filter(cat => cat.startsWith('health-issues/')),
    'Other': allCategories.filter(cat => 
      !cat.includes('special') && 
      !cat.startsWith('product-category/') && 
      !cat.startsWith('body-part/') && 
      !cat.startsWith('body-function/') && 
      !cat.startsWith('health-issues/')
    ),
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(allCategories[0] || 'all-products');
  const [editedBanner, setEditedBanner] = useState<CategoryBannerConfig>(categoryData[selectedCategory]);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [isBannerDragging, setIsBannerDragging] = useState(false);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Update edited banner when category changes
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setEditedBanner(categoryData[categorySlug]);
    setBannerImageUrl(null);
  };

  // Product Card Image Upload
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProductImageUrl(imageUrl);
        setProductCard({ ...productCard, imageSrc: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleProductDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProductDragging(true);
  };

  const handleProductDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProductDragging(false);
  };

  const handleProductDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProductDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProductImageUrl(imageUrl);
        setProductCard({ ...productCard, imageSrc: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Banner Image Upload
  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setBannerImageUrl(imageUrl);
        setEditedBanner({ ...editedBanner, imageSrc: imageUrl, svgPath: undefined });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBannerDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBannerDragging(true);
  };

  const handleBannerDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBannerDragging(false);
  };

  const handleBannerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBannerDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setBannerImageUrl(imageUrl);
        setEditedBanner({ ...editedBanner, imageSrc: imageUrl, svgPath: undefined });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate rows for textarea
  const calculateRows = (text: string) => {
    if (!text) return 1;
    const lineBreaks = (text.match(/\n/g) || []).length;
    const estimatedLines = Math.ceil(text.length / 80);
    return Math.max(lineBreaks + 1, estimatedLines, 1);
  };

  if (!isOpen) return null;

  const currentProductImage = productImageUrl || productCard.imageSrc;
  const currentBannerImage = bannerImageUrl || editedBanner.imageSrc;

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b border-[#D9E2E2] px-[20px] lg:px-[40px] py-[20px] flex items-center justify-between z-10">
        <div className="flex-1">
          <h1 className="font-['Inter',sans-serif] text-[20px] lg:text-[24px] text-[#003b3c] mb-[4px]">
            Component Editor
          </h1>
          <p className="font-['Inter',sans-serif] text-[13px] lg:text-[14px] text-[#406c6d]">
            Press Ctrl/Cmd + Shift + B to close
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-[8px] lg:p-[12px] rounded-full hover:bg-[#EFF6F4] transition-colors shrink-0"
          aria-label="Close"
        >
          <X className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#003b3c]" />
        </button>
      </div>

      {/* Component Type Selector */}
      <div className="bg-[#EFF6F4] border-b border-[#D9E2E2] px-[20px] lg:px-[40px] py-[16px] lg:py-[20px]">
        <div className="max-w-[1400px] mx-auto">
          <label className="block font-['Inter',sans-serif] text-[13px] lg:text-[14px] text-[#003b3c] mb-[8px] font-medium">
            Select Component
          </label>
          <div className="flex gap-[10px]">
            <button
              onClick={() => setComponentType('product-card')}
              className={`px-[20px] py-[10px] rounded-[8px] font-['Inter',sans-serif] text-[14px] lg:text-[16px] transition-colors ${
                componentType === 'product-card'
                  ? 'bg-[#009296] text-white'
                  : 'bg-white text-[#003b3c] border border-[#D9E2E2] hover:bg-[#F7F2EC]'
              }`}
            >
              Product Card
            </button>
            <button
              onClick={() => setComponentType('banner')}
              className={`px-[20px] py-[10px] rounded-[8px] font-['Inter',sans-serif] text-[14px] lg:text-[16px] transition-colors ${
                componentType === 'banner'
                  ? 'bg-[#009296] text-white'
                  : 'bg-white text-[#003b3c] border border-[#D9E2E2] hover:bg-[#F7F2EC]'
              }`}
            >
              Collection Banner
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT CARD EDITOR */}
      {componentType === 'product-card' && (
        <>
          {/* Instructions */}
          <div className="px-[20px] lg:px-[40px] pt-[30px] lg:pt-[40px] pb-[20px] lg:pb-[30px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="bg-[#F7F2EC] rounded-[8px] px-[16px] lg:px-[20px] py-[14px] lg:py-[16px] border border-[#D9E2E2]">
                <p className="font-['Inter',sans-serif] text-[13px] lg:text-[14px] text-[#003b3c]">
                  💡 Click on the <strong>Headline</strong>, <strong>Image</strong>, <strong>Product Title</strong>, or <strong>Description</strong> to edit
                </p>
              </div>
            </div>
          </div>

          {/* Product Card Preview */}
          <div className="px-[20px] lg:px-[40px] pb-[60px]">
            <div className="max-w-[340px] xl:max-w-[380px] mx-auto">
              <div className="bg-[#F6F2EC] rounded-[10px] flex flex-col group">
                <div className="box-border flex flex-col items-center justify-between pb-[10px] md:pb-[20px] pt-[30px] md:pt-[40px] px-[10px] md:px-[20px] h-full">
                  {/* Stars + Headline */}
                  <div className="w-full shrink-0">
                    <div className="box-border flex flex-col gap-[20px] items-center px-[25px] py-0">
                      {/* Ratings */}
                      <div className="flex gap-px items-start justify-center w-full">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="relative size-[24px]">
                            <div className="absolute bottom-[9.55%] left-[2.45%] right-[2.45%] top-0">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 22">
                                <path d={svgPaths.p33530f00} fill="#F1A33A" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Editable Headline */}
                      <div className="w-full relative group/headline">
                        <p className="product-headline font-['STIX_Two_Text:Regular',sans-serif] leading-[1.2] text-[#003b3c] text-center tracking-[-0.4px] cursor-text hover:bg-white/30 focus-within:bg-white/50 px-[4px] rounded-[2px] transition-colors">
                          <span>{productCard.headlineStart}</span>
                          <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">{productCard.headlineItalicWord}</span>
                          <span>{productCard.headlineEnd}</span>
                        </p>
                        {/* Tooltip */}
                        <div className="absolute -top-[45px] left-1/2 -translate-x-1/2 opacity-0 group-hover/headline:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                            <div className="flex items-center gap-[6px]">
                              <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                              <span className="font-['Inter',sans-serif] text-[12px]">Example product card headline</span>
                            </div>
                            <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Editable Image */}
                  <input
                    ref={productFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => productFileInputRef.current?.click()}
                    className="aspect-square overflow-clip relative w-full cursor-pointer group/image mt-[20px]"
                    onDragOver={handleProductDragOver}
                    onDragEnter={handleProductDragEnter}
                    onDragLeave={handleProductDragLeave}
                    onDrop={handleProductDrop}
                  >
                    <img 
                      alt="" 
                      className="absolute inset-0 object-cover size-full" 
                      src={currentProductImage} 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-colors flex items-center justify-center"
                      style={{ backgroundColor: isProductDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                    >
                      <div className="opacity-0 group-hover/image:opacity-100 transition-opacity text-center"
                        style={{ opacity: isProductDragging ? 1 : undefined }}
                      >
                        <Upload className="w-[32px] h-[32px] text-white mx-auto mb-[8px]" />
                        <p className="font-['Inter',sans-serif] text-[14px] text-white">
                          {isProductDragging ? 'Drop image here' : 'Click or drag to upload'}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#48E1DC] mt-[6px] flex items-center justify-center gap-[4px]">
                          <Info className="w-[12px] h-[12px]" />
                          Use 800x800
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Product Info - Below Card */}
              <div className="box-border flex flex-col gap-[20px] items-start pt-[20px] text-[#003b3c]">
                <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                  {/* Editable Product Title */}
                  <div className="w-full relative group/title">
                    <input
                      type="text"
                      value={productCard.productTitle}
                      onChange={(e) => setProductCard({ ...productCard, productTitle: e.target.value })}
                      className="w-full font-['Inter',sans-serif] font-medium bg-transparent border-none outline-none cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                      placeholder="Product Title"
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/title:opacity-100 group-focus-within/title:opacity-0 transition-opacity pointer-events-none z-50">
                      <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                        <div className="flex items-center gap-[6px]">
                          <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                          <span className="font-['Inter',sans-serif] text-[12px]">1-3 words max</span>
                        </div>
                        <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Editable Product Description */}
                  <div className="w-full relative group/desc">
                    <input
                      type="text"
                      value={productCard.productDescription}
                      onChange={(e) => setProductCard({ ...productCard, productDescription: e.target.value })}
                      className="w-full font-['Inter',sans-serif] text-[#406c6d] bg-transparent border-none outline-none cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                      placeholder="Product Description"
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/desc:opacity-100 group-focus-within/desc:opacity-0 transition-opacity pointer-events-none z-50">
                      <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                        <div className="flex items-center gap-[6px]">
                          <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                          <span className="font-['Inter',sans-serif] text-[12px]">5-10 words max</span>
                        </div>
                        <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price - Not Editable */}
                <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                  <span className="text-[#D84315]">$19.90</span>
                  <span className="line-through font-normal ml-[8px]">$24.90</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* COLLECTION BANNER EDITOR */}
      {componentType === 'banner' && (
        <>
          {/* Category Selector */}
          <div className="bg-[#EFF6F4] border-b border-[#D9E2E2] px-[20px] lg:px-[40px] py-[16px] lg:py-[20px]">
            <div className="max-w-[1400px] mx-auto">
              <label className="block font-['Inter',sans-serif] text-[13px] lg:text-[14px] text-[#003b3c] mb-[8px] font-medium">
                Select Category
              </label>
              <div className="relative max-w-[600px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-[14px] lg:px-[16px] py-[10px] lg:py-[12px] pr-[40px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[14px] lg:text-[16px] text-[#003b3c] focus:outline-none focus:border-[#009296] bg-white appearance-none cursor-pointer"
                >
                  {Object.entries(groupedCategories).map(([groupName, categories]) => {
                    if (categories.length === 0) return null;
                    return (
                      <optgroup key={groupName} label={groupName}>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
                <ChevronDown className="absolute right-[12px] top-[50%] -translate-y-1/2 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#406c6d] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="px-[20px] lg:px-[40px] pt-[30px] lg:pt-[40px] pb-[20px] lg:pb-[30px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="bg-[#F7F2EC] rounded-[8px] px-[16px] lg:px-[20px] py-[14px] lg:py-[16px] border border-[#D9E2E2]">
                <p className="font-['Inter',sans-serif] text-[13px] lg:text-[14px] text-[#003b3c]">
                  💡 Click on the <strong>Title</strong>, <strong>Description</strong>, or <strong>Image</strong> below to edit
                </p>
              </div>
            </div>
          </div>

          {/* Banner Preview - FULL WIDTH */}
          <div className="bg-white lg:bg-[var(--banner-bg)] relative shrink-0 w-full" style={{ '--banner-bg': editedBanner.backgroundColor || '#F6F2EC' } as React.CSSProperties}>
            {/* Desktop Layout */}
            <div className="hidden lg:block lg:aspect-[1678/413]">
              <div className="flex flex-row items-center size-full">
                <div className="box-border flex items-center justify-between pl-[40px] pr-0 py-0 relative size-full">
                  {/* Copy */}
                  <div className="basis-0 grow relative">
                    <div className="flex flex-col justify-center size-full">
                      <div className="box-border flex flex-col gap-[20px] items-start justify-center pr-[40px] text-[#003b3c]">
                        {/* Editable Title */}
                        <div className="w-full relative group/title">
                          <input
                            type="text"
                            value={editedBanner.title}
                            onChange={(e) => setEditedBanner({ ...editedBanner, title: e.target.value })}
                            className="w-full bg-transparent border-none outline-none font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[38px] xl:text-[54px] hd:text-[72px] tracking-[-0.76px] xl:tracking-[-1.08px] hd:tracking-[-1.44px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                            placeholder="Banner title"
                          />
                          <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/title:opacity-100 group-focus-within/title:opacity-0 transition-opacity pointer-events-none z-50">
                            <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                              <div className="flex items-center gap-[6px]">
                                <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                                <span className="font-['Inter',sans-serif] text-[12px]">5-8 words max</span>
                              </div>
                              <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Editable Description */}
                        <div className="w-full relative group/desc">
                          <textarea
                            value={editedBanner.description}
                            onChange={(e) => setEditedBanner({ ...editedBanner, description: e.target.value })}
                            rows={calculateRows(editedBanner.description)}
                            className="w-full bg-transparent border-none outline-none font-['Inter',sans-serif] leading-[1.6] text-[16px] xl:text-[20px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors resize-none"
                            placeholder="Banner description"
                          />
                          <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/desc:opacity-100 group-focus-within/desc:opacity-0 transition-opacity pointer-events-none z-50">
                            <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                              <div className="flex items-center gap-[6px]">
                                <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                                <span className="font-['Inter',sans-serif] text-[12px]">15-20 words max</span>
                              </div>
                              <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <input
                    ref={bannerFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBannerImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => bannerFileInputRef.current?.click()}
                    className="h-full aspect-[840/413.492] relative flex items-center justify-center group/image cursor-pointer"
                    style={{ backgroundColor: editedBanner.imageBackgroundColor || '#e5ddd3' }}
                    onDragOver={handleBannerDragOver}
                    onDragEnter={handleBannerDragEnter}
                    onDragLeave={handleBannerDragLeave}
                    onDrop={handleBannerDrop}
                  >
                    {editedBanner.svgPath ? (
                      <div className="size-[66px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                          <path d={editedBanner.svgPath} fill={editedBanner.svgFillColor || '#B9B1A8'} />
                        </svg>
                      </div>
                    ) : currentBannerImage ? (
                      <img 
                        src={currentBannerImage} 
                        alt={editedBanner.title}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-colors flex items-center justify-center"
                      style={{ backgroundColor: isBannerDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                    >
                      <div className="opacity-0 group-hover/image:opacity-100 transition-opacity text-center"
                        style={{ opacity: isBannerDragging ? 1 : undefined }}
                      >
                        <Upload className="w-[32px] h-[32px] text-white mx-auto mb-[8px]" />
                        <p className="font-['Inter',sans-serif] text-[14px] text-white">
                          {isBannerDragging ? 'Drop image here' : 'Click or drag to upload'}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#48E1DC] mt-[6px] flex items-center justify-center gap-[4px]">
                          <Info className="w-[12px] h-[12px]" />
                          Use 1680x826
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              <input
                ref={bannerFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerImageUpload}
                className="hidden"
              />
              <button
                onClick={() => bannerFileInputRef.current?.click()}
                className="aspect-[840/413.492] relative w-full flex items-center justify-center group cursor-pointer"
                style={{ backgroundColor: editedBanner.imageBackgroundColor || '#e5ddd3' }}
                onDragOver={handleBannerDragOver}
                onDragEnter={handleBannerDragEnter}
                onDragLeave={handleBannerDragLeave}
                onDrop={handleBannerDrop}
              >
                {editedBanner.svgPath ? (
                  <div className="size-[66px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                      <path d={editedBanner.svgPath} fill={editedBanner.svgFillColor || '#B9B1A8'} />
                    </svg>
                  </div>
                ) : currentBannerImage ? (
                  <img 
                    src={currentBannerImage} 
                    alt={editedBanner.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center"
                  style={{ backgroundColor: isBannerDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center"
                    style={{ opacity: isBannerDragging ? 1 : undefined }}
                  >
                    <Upload className="w-[24px] h-[24px] text-white mx-auto mb-[8px]" />
                    <p className="font-['Inter',sans-serif] text-[13px] text-white">
                      {isBannerDragging ? 'Drop image here' : 'Click or drag to upload'}
                    </p>
                  </div>
                </div>
              </button>

              <div className="relative w-full">
                <div className="flex flex-col justify-center size-full">
                  <div className="box-border flex flex-col gap-[20px] items-start justify-center px-[20px] md:px-[40px] pt-[30px] md:pt-[40px] pb-[20px] text-[#003b3c]">
                    <div className="w-full relative group/title">
                      <input
                        type="text"
                        value={editedBanner.title}
                        onChange={(e) => setEditedBanner({ ...editedBanner, title: e.target.value })}
                        className="w-full bg-transparent border-none outline-none font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[28px] md:text-[38px] tracking-[-0.56px] md:tracking-[-0.76px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                        placeholder="Banner title"
                      />
                      <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/title:opacity-100 group-focus-within/title:opacity-0 transition-opacity pointer-events-none z-50">
                        <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                          <div className="flex items-center gap-[6px]">
                            <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                            <span className="font-['Inter',sans-serif] text-[12px]">5-8 words max</span>
                          </div>
                          <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full relative group/desc">
                      <textarea
                        value={editedBanner.description}
                        onChange={(e) => setEditedBanner({ ...editedBanner, description: e.target.value })}
                        rows={calculateRows(editedBanner.description)}
                        className="w-full bg-transparent border-none outline-none font-['Inter',sans-serif] leading-[1.6] text-[16px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors resize-none"
                        placeholder="Banner description"
                      />
                      <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/desc:opacity-100 group-focus-within/desc:opacity-0 transition-opacity pointer-events-none z-50">
                        <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                          <div className="flex items-center gap-[6px]">
                            <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                            <span className="font-['Inter',sans-serif] text-[12px]">15-20 words max</span>
                          </div>
                          <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}