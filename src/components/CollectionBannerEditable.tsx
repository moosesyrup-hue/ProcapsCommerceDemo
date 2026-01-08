/**
 * CollectionBannerEditable Component
 * Editable version of CollectionBanner for the Collection Page Editor
 */

import React, { useState, useRef } from 'react';
import { Upload, Info } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";

interface CollectionBannerEditableProps {
  /** Main heading text */
  title: string;
  /** Description text */
  description: string;
  /** Image source - can be imported image or URL */
  imageSrc?: string;
  /** SVG path data (if using inline SVG instead of image) */
  svgPath?: string;
  /** Banner background color (desktop only) */
  backgroundColor?: string;
  /** Image container background color */
  imageBackgroundColor?: string;
  /** SVG fill color (if using inline SVG) */
  svgFillColor?: string;
}

export default function CollectionBannerEditable({
  title: initialTitle,
  description: initialDescription,
  imageSrc: initialImageSrc,
  svgPath,
  backgroundColor = '#F6F2EC',
  imageBackgroundColor = '#e5ddd3',
  svgFillColor = '#B9B1A8',
}: CollectionBannerEditableProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [imageSrc, setImageSrc] = useState<string | undefined>(initialImageSrc);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImageSrc(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

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
        setImageSrc(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateRows = (text: string) => {
    if (!text) return 1;
    const lineBreaks = (text.match(/\n/g) || []).length;
    const estimatedLines = Math.ceil(text.length / 80);
    return Math.max(lineBreaks + 1, estimatedLines, 1);
  };

  return (
    <div className="bg-white lg:bg-[var(--banner-bg)] relative shrink-0 w-full" style={{ '--banner-bg': backgroundColor } as React.CSSProperties}>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-transparent border-none outline-none font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[38px] xl:text-[54px] hd:text-[72px] tracking-[-0.76px] xl:tracking-[-1.08px] hd:tracking-[-1.44px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                      placeholder="Add Category Title"
                    />
                  </div>
                  
                  {/* Editable Description */}
                  <div className="w-full relative group/desc">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={calculateRows(description)}
                      className="w-full bg-transparent border-none outline-none font-['Inter',sans-serif] leading-[1.6] text-[16px] xl:text-[20px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors resize-none"
                      placeholder="Add sub category copy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Image */}
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
              style={{ backgroundColor: imageBackgroundColor }}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {svgPath && !imageSrc ? (
                <div className="size-[66px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                    <path d={svgPath} fill={svgFillColor} />
                  </svg>
                </div>
              ) : imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="size-[66px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                    <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-colors flex items-center justify-center"
                style={{ backgroundColor: isDragging ? 'rgba(0, 146, 150, 0.5)' : undefined }}
              >
                <div className="opacity-0 group-hover/image:opacity-100 transition-opacity text-center"
                  style={{ opacity: isDragging ? 1 : undefined }}
                >
                  <Upload className="w-[32px] h-[32px] text-white mx-auto mb-[8px]" />
                  <p className="font-['Inter',sans-serif] text-[14px] font-medium text-white mb-[4px]">
                    {isDragging ? 'Drop image here' : 'Click or drag to upload'}
                  </p>
                  <p className="font-['Inter',sans-serif] text-[12px] text-white/80">
                    Recommended: 1680 × 826 px
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Image first, then copy */}
      <div className="lg:hidden">
        {/* Editable Image */}
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
          style={{ backgroundColor: imageBackgroundColor }}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {svgPath && !imageSrc ? (
            <div className="size-[66px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                <path d={svgPath} fill={svgFillColor} />
              </svg>
            </div>
          ) : imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="size-[66px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
              </svg>
            </div>
          )}
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
            <div className="box-border flex flex-col gap-[20px] items-start justify-center px-[20px] md:px-[40px] pt-[30px] md:pt-[40px] pb-0 text-[#003b3c]">
              {/* Editable Title */}
              <div className="w-full relative group/title">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-none outline-none font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[28px] md:text-[38px] tracking-[-0.56px] md:tracking-[-0.76px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors"
                  placeholder="Add Category Title"
                />
              </div>
              
              {/* Editable Description */}
              <div className="w-full relative group/desc">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={calculateRows(description)}
                  className="w-full bg-transparent border-none outline-none font-['Inter',sans-serif] leading-[1.6] text-[16px] cursor-text hover:bg-white/30 focus:bg-white/50 px-[4px] rounded-[2px] transition-colors resize-none"
                  placeholder="Add sub category copy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}