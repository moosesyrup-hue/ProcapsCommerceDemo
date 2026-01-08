import { useState, useRef } from 'react';
import { X, Upload, ChevronDown, Info } from 'lucide-react';
import { categoryData, CategoryBannerConfig } from '../config/categoryData';
import svgPaths from "../imports/svg-vsxzdz3mbf";

type ComponentType = 'banner' | 'product-card';

interface ProductCardData {
  headline: string;
  headlineItalicWord: string;
  imageSrc: string;
  productTitle: string;
  productDescription: string;
}

interface BannerEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BannerEditor({ isOpen, onClose }: BannerEditorProps) {
  // Component type state
  const [componentType, setComponentType] = useState<ComponentType>('product-card');
  
  // Product Card state
  const [productCard, setProductCard] = useState<ProductCardData>({
    headline: 'An ',
    headlineItalicWord: 'Unparalleled',
    imageSrc: 'figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png',
    productTitle: 'Fibermucil',
    productDescription: 'Natural Psylium Fiber in Small Capsules',
  });
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [isProductDragging, setIsProductDragging] = useState(false);
  const productFileInputRef = useRef<HTMLInputElement>(null);
  
  // Banner state
  // Get all category keys from categoryData (except 'default')
  const allCategories = Object.keys(categoryData).filter(key => key !== 'default').sort();
  
  // Group categories by type for better organization
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update edited banner when category changes
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setEditedBanner(categoryData[categorySlug]);
    setUploadedImageUrl(null);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setUploadedImageUrl(imageUrl);
        setEditedBanner({ ...editedBanner, imageSrc: imageUrl, svgPath: undefined });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setUploadedImageUrl(imageUrl);
        setEditedBanner({ ...editedBanner, imageSrc: imageUrl, svgPath: undefined });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate rows for textarea based on content length
  const calculateRows = (text: string) => {
    if (!text) return 1;
    const lineBreaks = (text.match(/\n/g) || []).length;
    // Estimate rows based on character length (assuming ~80 chars per line at desktop width)
    const estimatedLines = Math.ceil(text.length / 80);
    return Math.max(lineBreaks + 1, estimatedLines, 1);
  };

  if (!isOpen) return null;

  // Get current image source
  const currentImageSrc = uploadedImageUrl || editedBanner.imageSrc;

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

      {/* Instructions - With Padding */}
      <div className="px-[20px] lg:px-[40px] pt-[30px] lg:pt-[40px] pb-[20px] lg:pb-[30px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#F7F2EC] rounded-[8px] px-[16px] lg:px-[20px] py-[14px] lg:py-[16px] border border-[#D9E2E2]">
            <p className="font-['Inter',sans-serif] text-[13px] lg:text-[14px] text-[#003b3c]">
              💡 Click on the <strong>Title</strong>, <strong>Description</strong>, or <strong>Image</strong> below to edit
            </p>
          </div>
        </div>
      </div>

      {/* FULL WIDTH BANNER - No Padding */}
      <div className="bg-white lg:bg-[var(--banner-bg)] relative shrink-0 w-full" style={{ '--banner-bg': editedBanner.backgroundColor || '#F6F2EC' } as React.CSSProperties}>
        {/* Desktop Layout - Side by side */}
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
                      {/* Tooltip for Title */}
                      <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/title:opacity-100 group-focus-within/title:opacity-0 transition-opacity pointer-events-none z-50">
                        <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                          <div className="flex items-center gap-[6px]">
                            <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                            <span className="font-['Inter',sans-serif] text-[12px]">5-8 words max</span>
                          </div>
                          {/* Arrow */}
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
                      {/* Tooltip for Description */}
                      <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/desc:opacity-100 group-focus-within/desc:opacity-0 transition-opacity pointer-events-none z-50">
                        <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                          <div className="flex items-center gap-[6px]">
                            <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                            <span className="font-['Inter',sans-serif] text-[12px]">15-20 words max</span>
                          </div>
                          {/* Arrow */}
                          <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="h-full aspect-[840/413.492] relative flex items-center justify-center group/image cursor-pointer"
                style={{ backgroundColor: editedBanner.imageBackgroundColor || '#e5ddd3' }}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {editedBanner.svgPath ? (
                  <div className="size-[66px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                      <path d={editedBanner.svgPath} fill={editedBanner.svgFillColor || '#B9B1A8'} />
                    </svg>
                  </div>
                ) : currentImageSrc ? (
                  <img 
                    src={currentImageSrc} 
                    alt={editedBanner.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-colors flex items-center justify-center"
                  style={{ backgroundColor: isDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                >
                  <div className="opacity-0 group-hover/image:opacity-100 transition-opacity text-center"
                    style={{ opacity: isDragging ? 1 : undefined }}
                  >
                    <Upload className="w-[32px] h-[32px] text-white mx-auto mb-[8px]" />
                    <p className="font-['Inter',sans-serif] text-[14px] text-white">
                      {isDragging ? 'Drop image here' : 'Click or drag to upload'}
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

        {/* Mobile/Tablet Layout - Image first, then copy */}
        <div className="lg:hidden">
          {/* Image */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[840/413.492] relative w-full flex items-center justify-center group cursor-pointer"
            style={{ backgroundColor: editedBanner.imageBackgroundColor || '#e5ddd3' }}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {editedBanner.svgPath ? (
              <div className="size-[66px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                  <path d={editedBanner.svgPath} fill={editedBanner.svgFillColor || '#B9B1A8'} />
                </svg>
              </div>
            ) : currentImageSrc ? (
              <img 
                src={currentImageSrc} 
                alt={editedBanner.title}
                className="w-full h-full object-cover"
              />
            ) : null}
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center"
              style={{ backgroundColor: isDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center"
                style={{ opacity: isDragging ? 1 : undefined }}
              >
                <Upload className="w-[24px] h-[24px] text-white mx-auto mb-[8px]" />
                <p className="font-['Inter',sans-serif] text-[13px] text-white">
                  {isDragging ? 'Drop image here' : 'Click or drag to upload'}
                </p>
              </div>
            </div>
          </button>

          {/* Copy */}
          <div className="relative w-full">
            <div className="flex flex-col justify-center size-full">
              <div className="box-border flex flex-col gap-[20px] items-start justify-center px-[20px] md:px-[40px] pt-[30px] md:pt-[40px] pb-[20px] text-[#003b3c]">
                {/* Editable Title */}
                <div className="w-full relative group/title">
                  <input
                    type="text"
                    value={editedBanner.title}
                    onChange={(e) => setEditedBanner({ ...editedBanner, title: e.target.value })}
                    className="w-full bg-transparent border-none outline-none font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[28px] md:text-[38px] tracking-[-0.56px] md:tracking-[-0.76px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                    placeholder="Banner title"
                  />
                  {/* Tooltip for Title */}
                  <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/title:opacity-100 group-focus-within/title:opacity-0 transition-opacity pointer-events-none z-50">
                    <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                      <div className="flex items-center gap-[6px]">
                        <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                        <span className="font-['Inter',sans-serif] text-[12px]">5-8 words max</span>
                      </div>
                      {/* Arrow */}
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
                    className="w-full bg-transparent border-none outline-none font-['Inter',sans-serif] leading-[1.6] text-[16px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors resize-none"
                    placeholder="Banner description"
                  />
                  {/* Tooltip for Description */}
                  <div className="absolute -top-[45px] left-[4px] opacity-0 group-hover/desc:opacity-100 group-focus-within/desc:opacity-0 transition-opacity pointer-events-none z-50">
                    <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg whitespace-nowrap">
                      <div className="flex items-center gap-[6px]">
                        <Info className="w-[14px] h-[14px] text-[#48E1DC]" />
                        <span className="font-['Inter',sans-serif] text-[12px]">15-20 words max</span>
                      </div>
                      {/* Arrow */}
                      <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
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