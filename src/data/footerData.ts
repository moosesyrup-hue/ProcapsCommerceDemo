export interface FooterLink {
  label: string;
  action: 'myAccount' | 'trackOrder' | 'shippingReturns' | 'ourStory' | 'giving' | 'careers' | 'helpCenter' | 'faq' | null;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: 'Account',
    links: [
      { label: 'My Account', action: 'myAccount' },
      { label: 'Track Order', action: 'trackOrder' },
      { label: 'Shipping & Returns', action: 'shippingReturns' }
    ]
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', action: 'ourStory' },
      { label: 'Giving', action: 'giving' },
      { label: 'Careers', action: 'careers' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', action: 'helpCenter' },
      { label: 'FAQs', action: 'faq' }
    ]
  }
];

export const newsletterContent = {
  headline: 'Save 10% off your next order',
  description: 'Sign up for our newsletter to receive a welcome gift from us.',
  placeholder: 'Email address',
  submitText: 'SUBMIT'
};

export const legalContent = {
  copyright: 'Copyright © 2024 ProCaps Laboratories, Inc.    ',
  termsText: 'Terms of Use',
  privacyText: 'Privacy Policy'
};

export const fdaDisclaimer = '*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.';

export const footerHeadline = {
  beforeItalic: 'The supplement brand ',
  italicText: 'trusted',
  afterItalic: ' for over 45 years.'
};
