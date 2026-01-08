/**
 * Global Header Data
 * Centralized configuration and content for the global header component
 */

export interface NavigationItem {
  label: string;
  key: string;
  onClick?: string; // The handler name to call
}

export interface HeaderConfig {
  freeShippingBanner: {
    threshold: number;
    icon: string;
    mobileText: string;
    desktopText: string;
    desktopLinkText: string;
  };
  navigation: NavigationItem[];
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    xlDesktop: number;
    hdDesktop: number;
  };
  megaMenu: {
    openDelay: number;
    closeDelay: number;
  };
}

export const headerData: HeaderConfig = {
  freeShippingBanner: {
    threshold: 25,
    icon: 'gift',
    mobileText: 'FREE ground shipping on orders over $25',
    desktopText: 'FREE ground shipping on orders over $25  -  ',
    desktopLinkText: 'Details',
  },
  navigation: [
    { key: 'shop', label: 'Shop' },
    { key: 'quality', label: 'Quality' },
    { key: 'ourStory', label: 'OUR STORY' },
    { key: 'specials', label: 'SPECIALS' },
  ],
  breakpoints: {
    mobile: 768,
    tablet: 768,
    desktop: 1280,
    xlDesktop: 1440,
    hdDesktop: 1920,
  },
  megaMenu: {
    openDelay: 200,
    closeDelay: 400,
  },
};