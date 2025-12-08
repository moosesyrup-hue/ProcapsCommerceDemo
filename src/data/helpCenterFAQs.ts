export interface FAQ {
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  label: string;
  faqs: FAQ[];
}

export const globalFAQs: FAQ[] = [
  {
    question: 'What makes Andrew Lessman vitamins different from other brands?',
    answer: 'Our vitamins are created with the highest quality ingredients, manufactured in our own facility, and backed by decades of research. We never use artificial colors, fillers, or unnecessary additives.'
  },
  {
    question: 'How do I know which supplements are right for me?',
    answer: 'We recommend using our Find My Supplements tool to get personalized recommendations based on your health goals. You can also reach out to our Vitamin Specialists for one-on-one guidance.'
  },
  {
    question: 'Are your products tested for quality and purity?',
    answer: 'Yes, all our products undergo rigorous testing at every stage of production. We test for purity, potency, and quality to ensure you receive the best supplements possible.'
  },
  {
    question: 'Do you offer a satisfaction guarantee?',
    answer: 'Absolutely. We stand behind our products with a 100% satisfaction guarantee. If you\'re not completely satisfied, we\'ll make it right.'
  }
];

export const topics: Topic[] = [
  {
    id: 'shipping-returns',
    label: 'Shipping & Returns',
    faqs: [
      {
        question: 'What are your shipping options and costs?',
        answer: 'We offer free ground shipping on all orders over $25. Express shipping options are available at checkout for an additional fee.'
      },
      {
        question: 'How long will it take to receive my order?',
        answer: 'Standard shipping typically takes 5-7 business days. Express shipping delivers in 2-3 business days.'
      },
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of delivery. Products must be in original condition. Contact our support team to initiate a return.'
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order from your account dashboard.'
      }
    ]
  },
  {
    id: 'orders-payments',
    label: 'Orders & Payments',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team for assistance.'
      },
      {
        question: 'Do you offer subscription services?',
        answer: 'Yes! Subscribe and save up to 15% on your favorite products. You can adjust frequency or cancel anytime from your account.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details.'
      }
    ]
  },
  {
    id: 'product-info',
    label: 'Product Information',
    faqs: [
      {
        question: 'Are your products suitable for vegetarians/vegans?',
        answer: 'Many of our products are vegetarian-friendly. Look for the vegetarian icon on product pages, or filter by dietary preference in our shop.'
      },
      {
        question: 'Do your products contain allergens?',
        answer: 'All allergen information is clearly listed on each product page. We manufacture in a facility that processes common allergens.'
      },
      {
        question: 'How should I store my supplements?',
        answer: 'Store in a cool, dry place away from direct sunlight. Keep bottles tightly closed when not in use.'
      },
      {
        question: 'What do the expiration dates mean?',
        answer: 'Expiration dates indicate when the product maintains full potency. We recommend using products before this date for maximum effectiveness.'
      }
    ]
  },
  {
    id: 'gift-cards',
    label: 'Gift Cards',
    faqs: [
      {
        question: 'How do I purchase a gift card?',
        answer: 'Gift cards are available for purchase on our website. Simply select the amount, add a personalized message, and check out. The recipient will receive the gift card via email.'
      },
      {
        question: 'Do gift cards expire?',
        answer: 'No, our gift cards never expire. Your recipient can use them whenever they\'re ready to shop.'
      },
      {
        question: 'Can I use multiple gift cards on one order?',
        answer: 'Yes, you can apply multiple gift cards to a single order during checkout.'
      },
      {
        question: 'Can I check my gift card balance?',
        answer: 'Yes, you can check your gift card balance by entering the card number on our gift card balance page or during checkout.'
      }
    ]
  },
  {
    id: 'promo-codes',
    label: 'Promo Codes',
    faqs: [
      {
        question: 'Where do I enter my promo code?',
        answer: 'You can enter your promo code during checkout. Look for the "Promo Code" field in your order summary before completing your purchase.'
      },
      {
        question: 'Can I use multiple promo codes on one order?',
        answer: 'Only one promo code can be applied per order. The system will automatically apply the code that gives you the best discount.'
      },
      {
        question: 'Why isn\'t my promo code working?',
        answer: 'Promo codes may have expiration dates, minimum purchase requirements, or product exclusions. Check the terms of your specific code. If you\'re still having trouble, contact our support team.'
      },
      {
        question: 'Do promo codes work with subscription orders?',
        answer: 'Most promo codes apply to one-time purchases only. Some special subscription codes may be available - check the specific terms of your code.'
      }
    ]
  },
  {
    id: 'money-back-guarantee',
    label: 'Money Back Guarantee',
    faqs: [
      {
        question: 'What is your money back guarantee?',
        answer: 'We stand behind our products with a 100% satisfaction guarantee. If you\'re not completely satisfied with any product, we\'ll provide a full refund or replacement.'
      },
      {
        question: 'How long do I have to request a refund?',
        answer: 'You can request a refund within 30 days of receiving your order. We want you to have enough time to try the product and see results.'
      },
      {
        question: 'Do I need to return the product for a refund?',
        answer: 'For most refund requests, you\'ll need to return the product. Contact our support team to receive return instructions and a prepaid shipping label.'
      },
      {
        question: 'How will I receive my refund?',
        answer: 'Refunds are issued to your original payment method within 5-7 business days after we receive your return.'
      }
    ]
  },
  {
    id: 'account-help',
    label: 'Account Help',
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Sign In" in the header and select "Create Account". You can also create an account automatically when you place your first order.'
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click "Sign In" and then "Forgot Password". Enter your email address and we\'ll send you a verification code to reset your password.'
      },
      {
        question: 'How do I update my account information?',
        answer: 'Log in to your account and navigate to Account Settings. You can update your personal information, addresses, and payment methods there.'
      },
      {
        question: 'Can I view my order history?',
        answer: 'Yes, all your past orders are available in your account dashboard under "Order History".'
      }
    ]
  }
];
