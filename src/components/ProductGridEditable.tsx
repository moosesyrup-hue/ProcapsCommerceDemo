import { useState, useRef } from 'react';
import { Upload, Info } from 'lucide-react';
import ProductCardEditable from './ProductCardEditable';
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

interface ProductData {
  title: string;
  description: string;
  imageSrc: string;
  headline: string;
  hasImage: boolean;
}

function ProductGridEditable({ filtersVisible, onQuickView, onProductClick }: { filtersVisible: boolean; onQuickView: () => void; onProductClick?: () => void }) {
  // Initial product data
  const initialProducts: ProductData[] = Array(8).fill(null).map((_, index) => ({
    title: '',
    description: '',
    imageSrc: imgImage,
    headline: '',
    hasImage: true
  }));

  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null));

  // Desktop: Show 3 columns when filters visible, 4 when hidden
  const desktopColumns = filtersVisible ? 3 : 4;

  const updateProduct = (index: number, field: keyof ProductData, value: string) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        updateProduct(index, 'imageSrc', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
  };

  const handleDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        updateProduct(index, 'imageSrc', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProductInfo = (index: number) => (
    <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
      <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
        {/* Editable Title */}
        <div className="w-full relative group/prodtitle">
          <input
            type="text"
            value={products[index].title}
            onChange={(e) => updateProduct(index, 'title', e.target.value)}
            className="w-full font-['Inter',sans-serif] font-medium bg-transparent border-none outline-none cursor-text hover:bg-[#F6F2EC]/50 focus:bg-[#F6F2EC] px-[4px] py-[2px] rounded-[2px] transition-colors"
            placeholder="Add product title"
          />
          <div className="absolute -top-[40px] left-[4px] opacity-0 group-hover/prodtitle:opacity-100 group-focus-within/prodtitle:opacity-0 transition-opacity pointer-events-none z-50">
            <div className="bg-[#003b3c] text-white px-[10px] py-[6px] rounded-[6px] shadow-lg whitespace-nowrap">
              <span className="font-['Inter',sans-serif] text-[11px]">Click to edit</span>
              <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
            </div>
          </div>
        </div>

        {/* Editable Description */}
        <div className="w-full relative group/proddesc">
          <input
            type="text"
            value={products[index].description}
            onChange={(e) => updateProduct(index, 'description', e.target.value)}
            className="w-full font-['Inter',sans-serif] text-[#406c6d] bg-transparent border-none outline-none cursor-text hover:bg-[#F6F2EC]/50 focus:bg-[#F6F2EC] px-[4px] py-[2px] rounded-[2px] transition-colors"
            placeholder="Add product description"
          />
          <div className="absolute -top-[40px] left-[4px] opacity-0 group-hover/proddesc:opacity-100 group-focus-within/proddesc:opacity-0 transition-opacity pointer-events-none z-50">
            <div className="bg-[#003b3c] text-white px-[10px] py-[6px] rounded-[6px] shadow-lg whitespace-nowrap">
              <span className="font-['Inter',sans-serif] text-[11px]">Click to edit</span>
              <div className="absolute -bottom-[4px] left-[16px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#003b3c]"></div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
        <span className="text-[#D84315]">$19.90</span>
        <span className="line-through font-normal ml-[8px]">$24.90</span>
      </p>
    </div>
  );

  return (
    <div className="relative shrink-0 w-full">
      <div className={`box-border flex flex-col gap-[20px] items-start p-[20px] md:px-[40px] md:pt-[40px] md:pb-0 ${
        filtersVisible ? 'xl:pl-[40px]' : ''
      }`}>
        {/* Mobile S & Tablet M: 2 columns */}
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px] md:gap-[20px] w-full lg:hidden">
          {products.map((product, i) => (
            <div key={i} className="flex flex-col gap-[20px]">
              {/* Editable Product Card Image Wrapper */}
              <div className="relative group/editcard">
                <ProductCardEditable 
                  hasImage={product.hasImage} 
                  imageSrc={product.imageSrc}
                  onQuickView={onQuickView} 
                  onCardClick={onProductClick} 
                  headline={product.headline}
                  onHeadlineChange={(headline) => updateProduct(i, 'headline', headline)}
                />
                {/* Upload Overlay */}
                <input
                  ref={(el) => { fileInputRefs.current[i] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(i, e)}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRefs.current[i]?.click()}
                  className="absolute bottom-[10px] md:bottom-[20px] left-[10px] md:left-[20px] right-[10px] md:right-[20px] aspect-square cursor-pointer"
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(i, e)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(i, e)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover/editcard:bg-black/40 transition-colors flex items-center justify-center rounded-[6px]"
                    style={{ backgroundColor: isDragging === i ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                  >
                    <div className="opacity-0 group-hover/editcard:opacity-100 transition-opacity text-center"
                      style={{ opacity: isDragging === i ? 1 : undefined }}
                    >
                      <Upload className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white mx-auto mb-[4px]" />
                      <p className="font-['Inter',sans-serif] text-[11px] md:text-[12px] font-medium text-white">
                        {isDragging === i ? 'Drop' : 'Upload'}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[9px] md:text-[10px] text-white/80">
                        800 × 800 px
                      </p>
                    </div>
                  </div>
                </button>
              </div>
              {/* Product Info */}
              {renderProductInfo(i)}
            </div>
          ))}
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden lg:block w-full">
          {/* First Row */}
          <div className={`grid gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px] ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {products.slice(0, desktopColumns).map((product, i) => (
              <div key={i} className="self-stretch relative group/editcard">
                <ProductCardEditable 
                  hasImage={product.hasImage} 
                  imageSrc={product.imageSrc}
                  onQuickView={onQuickView} 
                  onCardClick={onProductClick} 
                  headline={product.headline}
                  onHeadlineChange={(headline) => updateProduct(i, 'headline', headline)}
                />
                {/* Upload Overlay */}
                <input
                  ref={(el) => { fileInputRefs.current[i] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(i, e)}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRefs.current[i]?.click()}
                  className="absolute bottom-[10px] md:bottom-[20px] left-[10px] md:left-[20px] right-[10px] md:right-[20px] aspect-square cursor-pointer"
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(i, e)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(i, e)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover/editcard:bg-black/40 transition-colors flex items-center justify-center rounded-[6px]"
                    style={{ backgroundColor: isDragging === i ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                  >
                    <div className="opacity-0 group-hover/editcard:opacity-100 transition-opacity text-center"
                      style={{ opacity: isDragging === i ? 1 : undefined }}
                    >
                      <Upload className="w-[24px] h-[24px] text-white mx-auto mb-[6px]" />
                      <p className="font-['Inter',sans-serif] text-[12px] font-medium text-white">
                        {isDragging === i ? 'Drop' : 'Upload'}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[10px] text-white/80">
                        800 × 800 px
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Product Info Row */}
          <div className={`grid gap-[20px] items-start pb-[40px] w-full ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {[...Array(desktopColumns)].map((_, i) => (
              <div key={i}>
                {renderProductInfo(i)}
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className={`grid gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px] ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {products.slice(desktopColumns, desktopColumns * 2).map((product, i) => {
              const index = i + desktopColumns;
              return (
                <div key={index} className="self-stretch relative group/editcard">
                  <ProductCardEditable 
                    hasImage={product.hasImage} 
                    imageSrc={product.imageSrc}
                    onQuickView={onQuickView} 
                    onCardClick={onProductClick} 
                    headline={product.headline}
                    onHeadlineChange={(headline) => updateProduct(index, 'headline', headline)}
                  />
                  {/* Upload Overlay */}
                  <input
                    ref={(el) => { fileInputRefs.current[index] = el; }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRefs.current[index]?.click()}
                    className="absolute bottom-[10px] md:bottom-[20px] left-[10px] md:left-[20px] right-[10px] md:right-[20px] aspect-square cursor-pointer"
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(index, e)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(index, e)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover/editcard:bg-black/40 transition-colors flex items-center justify-center rounded-[6px]"
                      style={{ backgroundColor: isDragging === index ? 'rgba(0, 146, 150, 0.5)' : undefined }}
                    >
                      <div className="opacity-0 group-hover/editcard:opacity-100 transition-opacity text-center"
                        style={{ opacity: isDragging === index ? 1 : undefined }}
                      >
                        <Upload className="w-[24px] h-[24px] text-white mx-auto mb-[6px]" />
                        <p className="font-['Inter',sans-serif] text-[12px] font-medium text-white">
                          {isDragging === index ? 'Drop' : 'Upload'}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[10px] text-white/80">
                          800 × 800 px
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Product Info Row */}
          <div className={`grid gap-[20px] items-start pb-[40px] w-full ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {[...Array(desktopColumns)].map((_, i) => {
              const index = i + desktopColumns;
              return (
                <div key={index}>
                  {renderProductInfo(index)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGridEditable;