import { useState, useEffect, useRef } from 'react';
import { Upload, Check, Plus, X } from 'lucide-react';
import { StorySection } from './StorySection';
import imgPlantago from "figma:asset/29e9f2e4f5e91d4380eca0a7e99798dbc545b080.png";

export default function PDPContentSlot2Editable({ breakpoint, initialData, onDataChange }: any) {
  const bodySize = breakpoint === 'HD' ? 'text-[20px]' : 'text-[16px]';
  const bulletSize = breakpoint === 'S' || breakpoint === 'M' ? 'text-[14px]' : 'text-[16px]';
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  // Eyebrow size matches StorySection
  const eyebrowSize = isMobile ? 'text-[14px]' : isTablet ? 'text-[14px]' : 'text-[16px] lg:text-[20px]';
  // Headline size matches StorySection
  const headlineSize = isMobile ? 'text-[32px]' : isTablet ? 'text-[42px]' : 'text-[54px]';
  const headlineTracking = isMobile ? 'tracking-[-0.64px]' : isTablet ? 'tracking-[-0.84px]' : 'tracking-[-1.08px]';
  
  // Default data
  const defaultData = {
    eyebrow: "ESSENTIAL NUTRIENTS FOR BETTER HEALTH",
    headline: "Proven Fiber. Measurable Benefits.",
    paragraphs: [
      "Fiber is one of the most overlooked nutrients in the modern diet, yet it plays a vital role in supporting your body's daily wellness. Backed by decades of research, a fiber-rich diet offers a natural path to better digestive and heart health."
    ],
    bullets: [
      'Gently cleanses the digestive tract',
      'Promotes regularity and healthy transit time',
      'Provides lasting fullness to support weight management',
      'Supports healthy cholesterol levels already in the normal range',
      'Maintains cardiovascular and digestive wellness'
    ],
    imageUrl: imgPlantago,
    imageAlt: "Plantago ovata plant - source of psyllium fiber"
  };
  
  const [localData, setLocalData] = useState(initialData || defaultData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for all textareas to auto-resize on mount
  const eyebrowRef = useRef<HTMLTextAreaElement>(null);
  const headlineRef = useRef<HTMLTextAreaElement>(null);
  const paragraphRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const bulletRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  
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
    paragraphRefs.current.forEach(ref => {
      if (ref) autoResize(ref);
    });
    bulletRefs.current.forEach(ref => {
      if (ref) autoResize(ref);
    });
  }, [localData.eyebrow, localData.headline, localData.paragraphs, localData.bullets]);
  
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

  const addBullet = () => {
    const newBullets = [...(localData.bullets || []), ''];
    setLocalData((prev: any) => ({ ...prev, bullets: newBullets }));
  };

  const removeBullet = (idx: number) => {
    const newBullets = localData.bullets.filter((_: any, i: number) => i !== idx);
    setLocalData((prev: any) => ({ ...prev, bullets: newBullets }));
  };
  
  const bodyContent = (
    <div className="flex flex-col gap-[24px]">
      {localData.paragraphs.map((para: string, idx: number) => (
        <textarea
          key={idx}
          value={para}
          onChange={(e) => {
            const newParagraphs = [...localData.paragraphs];
            newParagraphs[idx] = e.target.value;
            setLocalData((prev: any) => ({ ...prev, paragraphs: newParagraphs }));
            autoResize(e.target);
          }}
          onFocus={(e) => autoResize(e.target)}
          ref={(ref) => paragraphRefs.current[idx] = ref}
          className={`w-full bg-transparent border border-dashed border-transparent hover:border-[#48E1DC] focus:border-[#009296] outline-none font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize} rounded-[4px] transition-all resize-none overflow-hidden hover:bg-[#EFF6F4]/30 focus:bg-[#EFF6F4]/50 p-0`}
          placeholder="Enter paragraph text..."
          style={{ minHeight: '3em' }}
        />
      ))}
      
      {/* Benefits List */}
      {localData.bullets && localData.bullets.length > 0 && (
        <div className="flex flex-col gap-[12px]">
          {localData.bullets.map((bullet: string, idx: number) => (
            <div key={idx} className="flex gap-[12px] items-start group/bullet">
              <Check className="w-[20px] h-[20px] text-[#009296] flex-shrink-0 mt-[2px]" strokeWidth={2.5} />
              <textarea
                value={bullet}
                onChange={(e) => {
                  const newBullets = [...localData.bullets];
                  newBullets[idx] = e.target.value;
                  setLocalData((prev: any) => ({ ...prev, bullets: newBullets }));
                  autoResize(e.target);
                }}
                onFocus={(e) => autoResize(e.target)}
                ref={(ref) => bulletRefs.current[idx] = ref}
                rows={1}
                className={`flex-1 bg-transparent border border-dashed border-transparent hover:border-[#48E1DC] focus:border-[#009296] outline-none font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bulletSize} rounded-[4px] transition-all hover:bg-[#EFF6F4]/30 focus:bg-[#EFF6F4]/50 resize-none overflow-hidden p-0`}
                placeholder="Enter bullet point..."
              />
              {localData.bullets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBullet(idx)}
                  className="opacity-0 group-hover/bullet:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded-[4px]"
                >
                  <X className="w-[16px] h-[16px] text-red-500" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addBullet}
            className="flex items-center gap-[8px] text-[#009296] hover:text-[#00b4ae] text-[14px] font-['Inter',sans-serif] font-medium transition-colors mt-[4px]"
          >
            <Plus className="w-[16px] h-[16px]" />
            Add Bullet Point
          </button>
        </div>
      )}
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
        className="w-full rounded-[20px] overflow-hidden relative group/image cursor-pointer border-2 border-dashed border-transparent hover:border-[#48E1DC]"
      >
        <img 
          src={localData.imageUrl} 
          alt={localData.imageAlt} 
          className="w-full h-auto object-cover rounded-[20px]"
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
      imageOnRight={false}
      eyebrowPosition="above"
      showDivider={false}
      bgColor="white"
    />
  );
}