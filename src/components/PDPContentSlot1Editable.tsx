import { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import { StorySection } from './StorySection';
import imgPillCapsule from "figma:asset/9713f784abe59c2b09beb31e6a767104a00b0983.png";

export default function PDPContentSlot1Editable({ breakpoint, initialData, onDataChange }: any) {
  const bodySize = breakpoint === 'HD' ? 'text-[20px]' : 'text-[16px]';
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  // Eyebrow size matches StorySection
  const eyebrowSize = isMobile ? 'text-[14px]' : isTablet ? 'text-[14px]' : 'text-[16px] lg:text-[20px]';
  // Headline size matches StorySection
  const headlineSize = isMobile ? 'text-[32px]' : isTablet ? 'text-[42px]' : 'text-[54px]';
  const headlineTracking = isMobile ? 'tracking-[-0.64px]' : isTablet ? 'tracking-[-0.84px]' : 'tracking-[-1.08px]';
  
  // Default data
  const defaultData = {
    eyebrow: "BIOACTIVE MICRO-GRANULES FOR MAXIMUM EFFICACY",
    headline: "Clean, Simple and Exceptionally Pure.",
    paragraph: "Fibermucil® features 100% pure psyllium husk powder from the high-fiber Plantago ovata plant—encapsulated in small, easy-to-swallow capsules without any additives, sweeteners, or synthetic ingredients.\n\nUnlike conventional fiber drinks or gritty powders, Fibermucil is free of colors, flavors, calories, or allergens. Its ultra-fine, bioactive granules are designed for optimal benefit and gentle daily use—delivering fiber in a naturally gentle, yet effective form.",
    imageUrl: imgPillCapsule,
    imageAlt: "Clear capsule with psyllium fiber powder"
  };
  
  const [localData, setLocalData] = useState(initialData || defaultData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for all textareas to auto-resize on mount
  const eyebrowRef = useRef<HTMLTextAreaElement>(null);
  const headlineRef = useRef<HTMLTextAreaElement>(null);
  const paragraphRef = useRef<HTMLTextAreaElement>(null);
  
  // Sync changes back to parent
  useEffect(() => {
    if (onDataChange) {
      onDataChange(localData);
    }
  }, [localData]);
  
  // Auto-resize all textareas on mount and when data changes
  useEffect(() => {
    if (eyebrowRef.current) {
      autoResize(eyebrowRef.current);
    }
    if (headlineRef.current) {
      autoResize(headlineRef.current);
    }
    if (paragraphRef.current) {
      autoResize(paragraphRef.current);
    }
  }, [localData.eyebrow, localData.headline, localData.paragraph]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setLocalData((prev: any) => ({ ...prev, imageUrl }));
      };
      reader.readAsDataURL(file);
    }
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
        setLocalData((prev: any) => ({ ...prev, imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const autoResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };
  
  const bodyContent = (
    <div className={`flex flex-col gap-[16px]`}>
      <textarea
        value={localData.paragraph}
        onChange={(e) => {
          setLocalData((prev: any) => ({ ...prev, paragraph: e.target.value }));
          autoResize(e.target);
        }}
        onFocus={(e) => autoResize(e.target)}
        ref={paragraphRef}
        className={`w-full bg-transparent border border-dashed border-transparent hover:border-[#48E1DC] focus:border-[#009296] outline-none font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize} rounded-[4px] transition-all resize-none overflow-hidden hover:bg-[#EFF6F4]/30 focus:bg-[#EFF6F4]/50 p-0`}
        placeholder="Enter paragraph text..."
        style={{ minHeight: '3em' }}
      />
    </div>
  );
  
  const imageSlot = (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
        onDrop={handleDrop}
        className="w-full aspect-square rounded-[20px] overflow-hidden relative group/image cursor-pointer border-2 border-dashed border-transparent hover:border-[#48E1DC]"
      >
        <img 
          src={localData.imageUrl} 
          alt={localData.imageAlt} 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-colors flex items-center justify-center"
          style={{ backgroundColor: isDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
        >
          <div 
            className="opacity-0 group-hover/image:opacity-100 transition-opacity text-center"
            style={{ opacity: isDragging ? 1 : undefined }}
          >
            <Upload className="w-[32px] h-[32px] text-white mx-auto mb-[8px]" />
            <p className="font-['Inter',sans-serif] text-[14px] font-medium text-white mb-[4px]">
              {isDragging ? 'Drop image here' : 'Click or drag to upload'}
            </p>
            <p className="font-['Inter',sans-serif] text-[12px] text-white/80">
              Paste image URL or upload file
            </p>
          </div>
        </div>
      </button>
    </>
  );
  
  return (
    <StorySection
      breakpoint={breakpoint}
      eyebrow={
        <textarea
          value={localData.eyebrow}
          onChange={(e) => {
            setLocalData((prev: any) => ({ ...prev, eyebrow: e.target.value }));
            autoResize(e.target);
          }}
          onFocus={(e) => autoResize(e.target)}
          ref={eyebrowRef}
          rows={1}
          className={`w-full bg-transparent border border-dashed border-transparent hover:border-[#48E1DC] focus:border-[#009296] outline-none font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[#009296] uppercase tracking-[1.4px] ${eyebrowSize} rounded-[4px] transition-all hover:bg-[#EFF6F4]/30 focus:bg-[#EFF6F4]/50 resize-none overflow-hidden p-0`}
          placeholder="Eyebrow title..."
        />
      }
      headline={
        <textarea
          value={localData.headline}
          onChange={(e) => {
            setLocalData((prev: any) => ({ ...prev, headline: e.target.value }));
            autoResize(e.target);
          }}
          onFocus={(e) => autoResize(e.target)}
          ref={headlineRef}
          rows={1}
          className={`w-full bg-transparent border border-dashed border-transparent hover:border-[#48E1DC] focus:border-[#009296] outline-none font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${headlineSize} ${headlineTracking} rounded-[4px] transition-all hover:bg-[#EFF6F4]/30 focus:bg-[#EFF6F4]/50 resize-none overflow-hidden p-0`}
          placeholder="Headline..."
        />
      }
      bodyContent={bodyContent}
      imageSlot={imageSlot}
      imageOnRight={true}
      eyebrowPosition="above"
      showDivider={false}
      bgColor="white"
    />
  );
}