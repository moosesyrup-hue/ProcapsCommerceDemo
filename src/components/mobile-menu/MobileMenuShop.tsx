/**
 * Mobile Menu Shop Level Component
 * 
 * Displays the shop submenu with expandable sections and action links.
 */

import { motion } from 'motion/react';
import ExpandableSection from './ExpandableSection';
import { shopSubCategories, shopLinks, animationConfig, layoutConfig } from '../../data/mobileMenuData';
import type { ExpandedSection } from '../../hooks/useMobileMenu';

interface MobileMenuShopProps {
  expandedSection: ExpandedSection;
  onToggleSection: (section: ExpandedSection) => void;
  onNavigate?: (category: string) => void;
  onIngredientsClick?: () => void;
  onClose: () => void;
}

export default function MobileMenuShop({
  expandedSection,
  onToggleSection,
  onNavigate,
  onIngredientsClick,
  onClose
}: MobileMenuShopProps) {
  // Animation variants for non-expandable links
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * animationConfig.itemStagger.delay,
        duration: animationConfig.itemStagger.duration,
        ease: animationConfig.itemStagger.ease
      }
    })
  };

  const handleLinkClick = (action: string) => {
    if (action === 'ingredients') {
      onIngredientsClick?.();
      onClose();
    } else if (action === 'all-products') {
      onNavigate?.('all-products');
      onClose();
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start w-full" data-name="menu">
      {/* Expandable Sections */}
      {shopSubCategories.map((section, index) => (
        <ExpandableSection
          key={section.id}
          id={section.id as ExpandedSection}
          title={section.title}
          items={section.items}
          isExpanded={expandedSection === section.id}
          onToggle={() => onToggleSection(section.id as ExpandedSection)}
          onItemClick={(item) => {
            // Convert category name to slug (same as desktop mega menu)
            const categorySlug = item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
            onNavigate?.(categorySlug);
            onClose();
          }}
          customIndex={index}
          icon={section.icon}
        />
      ))}

      {/* Additional Links (Ingredients, Shop All Products) */}
      {shopLinks.map((link, index) => (
        <motion.div
          key={link.id}
          custom={shopSubCategories.length + index}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className={`content-stretch flex items-center justify-between w-full cursor-pointer ${index === 0 ? 'mt-[32px]' : ''}`}
          onClick={() => handleLinkClick(link.action)}
        >
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic text-[#003b3c] text-[26px] text-nowrap tracking-[-0.52px] whitespace-pre">
            {link.label}
          </p>
        </motion.div>
      ))}

      {/* Bottom Spacer (for scroll padding) */}
      <div style={{ height: layoutConfig.shopBottomSpacer }} />
    </div>
  );
}