import React, { useState, useEffect } from 'react';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import Homepage from './components/Homepage';
import CollectionPage from './components/CollectionPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import FindMySupplementsPage from './pages/FindMySupplementsPage';
import FAQPage from './components/FAQPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfUsePage from './components/TermsOfUsePage';
import ShippingReturnsPage from './components/ShippingReturnsPage';
import HelpPage from './components/HelpPage';
import HelpPage2 from './components/HelpPage2';
import IngredientsPage from './components/IngredientsPage';
import IngredientCollectionPage from './components/IngredientCollectionPage';
import VitaminCalculatorPage from './components/VitaminCalculatorPage';
import OurStoryPage from './components/OurStoryPage';
import QualityPage from './components/QualityPage';
import AccountDashboard from './components/account/AccountDashboard';
import MiniCart from './components/MiniCart';
import MobileMenu from './components/MobileMenu';
import AccountTray from './components/AccountTray';
import ChatWithAndrew from './components/chat/ChatWithAndrew';
import AndrewWellnessGuide from './andrew-wellness-guide';
import WellnessHub from './components/WellnessHub';
import WellnessHubGoalPage from './components/WellnessHubGoalPage';
import WellnessHubArticlePage from './components/WellnessHubArticlePage';
import WellnessHubVideoPage from './components/WellnessHubVideoPage';
import ComponentEditor from './components/ComponentEditor';
import CollectionPageEditable from './components/CollectionPageEditable';
import SearchOverlay from './components/SearchOverlay';
import SearchResultsPage from './components/SearchResultsPage';
import { type ContentSlotData } from './components/ProductDetailPage';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Toaster } from './components/ui/sonner';
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

export default function App() {
  // Routing state
  const [currentPage, setCurrentPage] = useState<'home' | 'collection' | 'product' | 'cart' | 'checkout' | 'order-confirmation' | 'find-supplements' | 'faq' | 'privacy-policy' | 'terms-of-use' | 'shipping-returns' | 'help' | 'help2' | 'ingredients' | 'ingredient-collection' | 'vitamin-calculator' | 'our-story' | 'quality' | 'account' | 'wellness-guide' | 'wellness-hub' | 'wellness-hub-goal' | 'wellness-hub-article' | 'wellness-hub-video' | 'search'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('digestive-health');
  const [selectedIngredient, setSelectedIngredient] = useState<string>('Vitamin C');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [accountTab, setAccountTab] = useState<'overview' | 'orders' | 'profile' | 'autoship' | 'flexpay' | 'favorites'>('overview');
  const [selectedWellnessGoal, setSelectedWellnessGoal] = useState<string>('heart-health');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('coq10-heart');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('coq10-explained');
  
  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountTrayOpen, setAccountTrayOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bannerEditorOpen, setBannerEditorOpen] = useState(false);
  const [collectionPageEditorOpen, setCollectionPageEditorOpen] = useState(false);
  const [pdpEditorOpen, setPdpEditorOpen] = useState(false);
  
  // PDP Content Slot Data
  const [contentSlot1Data, setContentSlot1Data] = useState<ContentSlotData | undefined>(undefined);
  const [contentSlot2Data, setContentSlot2Data] = useState<ContentSlotData | undefined>(undefined);
  
  // Help page reset key - increments to reset the page when navigating to it
  const [helpPageKey, setHelpPageKey] = useState(0);
  
  // Keyboard shortcuts for Editors
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Component Editor (Ctrl/Cmd + Shift + B)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setBannerEditorOpen(true);
      }
      // Collection Page Editor (Ctrl/Cmd + Shift + C)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        // Toggle editing mode when on collection page
        if (currentPage === 'collection') {
          setCollectionPageEditorOpen(prev => !prev);
        }
      }
      // PDP Content Slot Editor (Ctrl/Cmd + Shift + P)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        // Toggle editing mode when on product page
        if (currentPage === 'product') {
          setPdpEditorOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);
  
  // User/Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  
  // Demo registered user credentials
  const DEMO_REGISTERED_EMAIL = 'demo@andrewlessman.com';
  const DEMO_PASSWORD = 'password123'; // Legacy - kept for backward compatibility
  const DEMO_VERIFICATION_CODE = '123456'; // Passwordless verification code
  
  // Order confirmation data (set when order is placed)
  const [orderData, setOrderData] = useState<{
    orderNumber: string;
    email: string;
    estimatedDelivery: string;
    shippingAddress: any;
    paymentMethod: any;
    totals: any;
    items: Array<{
      id: string;
      productId?: string;
      name: string;
      count: string;
      price: number;
      originalPrice?: number;
      quantity: number;
      image: string;
      purchaseType?: 'one-time' | 'autoship' | 'flexpay' | 'autoship-flexpay';
      deliveryFrequency?: number;
      autoshipDiscount?: number;
      flexPayInstallments?: number;
      flexPayAmount?: number;
      frequency?: string;
    }>;
  } | null>(null);
  
  // Cart state
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    productId?: string;
    name: string;
    count: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
    purchaseType?: 'one-time' | 'autoship' | 'flexpay';
    deliveryFrequency?: number;
    autoshipDiscount?: number;
    flexPayInstallments?: number;
    flexPayAmount?: number;
    frequency?: string;
    isTodaysSpecial?: boolean;
  }>>([
    // Demo items with sale prices to showcase MSRP strikethrough
    {
      id: 'demo-1',
      productId: 'fibermucil',
      name: 'Fibermucil™',
      count: '60 Capsules',
      price: 19.95,
      originalPrice: 24.90,
      quantity: 2,
      image: imgImage,
      purchaseType: 'one-time',
      isTodaysSpecial: true  // Today's Special - excluded from quantity discount
    },
    {
      id: 'demo-2',
      productId: 'ultimate-antioxidant',
      name: 'Ultimate Anti-Oxidant with Acai, Pomegranate & Noni',
      count: '180 Capsules',
      price: 39.95,
      originalPrice: 49.90,
      quantity: 1,
      image: imgImage,
      purchaseType: 'one-time'
      // Regular sale item - included in quantity discount
    },
    {
      id: 'demo-3',
      productId: 'essential-1',
      name: 'Essential-1® Multivitamin',
      count: '360 Capsules',
      price: 34.95,
      originalPrice: 44.95,
      quantity: 3,
      image: imgImage,
      purchaseType: 'one-time'
      // Monthly Special (just a regular item) - included in quantity discount
    }
  ]);

  // Navigation handlers
  const handleLogoClick = () => {
    setCurrentPage('home');
  };

  const handleSpecialsClick = () => {
    setSelectedCategory('specials');
    setCurrentPage('collection');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage('collection');
    window.scrollTo(0, 0);
  };

  const handleCheckoutClick = () => {
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const handleFindSupplementsClick = () => {
    setCurrentPage('find-supplements');
  };

  const handleFAQClick = () => {
    setCurrentPage('faq');
    window.scrollTo(0, 0);
  };

  const handlePrivacyPolicyClick = () => {
    setCurrentPage('privacy-policy');
    window.scrollTo(0, 0);
  };

  const handleTermsOfUseClick = () => {
    setCurrentPage('terms-of-use');
    window.scrollTo(0, 0);
  };

  const handleShippingReturnsClick = () => {
    setCurrentPage('shipping-returns');
    window.scrollTo(0, 0);
  };

  const handleHelpClick = () => {
    setHelpPageKey(prevKey => prevKey + 1);
    setCurrentPage('help');
    window.scrollTo(0, 0);
  };

  const handleHelp2Click = () => {
    setHelpPageKey(prevKey => prevKey + 1);
    setCurrentPage('help2');
    window.scrollTo(0, 0);
  };

  const handleIngredientsClick = () => {
    setCurrentPage('ingredients');
    window.scrollTo(0, 0);
  };

  const handleOurStoryClick = () => {
    setCurrentPage('our-story');
    window.scrollTo(0, 0);
  };

  const handleQualityClick = () => {
    setCurrentPage('quality');
    window.scrollTo(0, 0);
  };

  const handleWellnessGuideClick = () => {
    setCurrentPage('wellness-guide');
    window.scrollTo(0, 0);
  };

  const handleWellnessHubClick = () => {
    setCurrentPage('wellness-hub');
    window.scrollTo(0, 0);
  };

  const handleWellnessHubGoalClick = (goal: string) => {
    setSelectedWellnessGoal(goal);
    setCurrentPage('wellness-hub-goal');
    window.scrollTo(0, 0);
  };

  const handleWellnessHubArticleClick = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('wellness-hub-article');
    window.scrollTo(0, 0);
  };

  const handleWellnessHubVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    setCurrentPage('wellness-hub-video');
    window.scrollTo(0, 0);
  };

  // Cart handlers
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleViewCart = () => {
    setCartOpen(false);
    setCurrentPage('cart');
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  // Handle order placement
  const handlePlaceOrder = (data: {
    orderNumber: string;
    email: string;
    estimatedDelivery: string;
    shippingAddress: any;
    paymentMethod: any;
    totals: any;
  }) => {
    // Add cart items to order data
    const completeOrderData = {
      ...data,
      items: cartItems
    };
    
    setOrderData(completeOrderData);
    setCurrentPage('order-confirmation');
    
    // Clear cart after order is placed
    setCartItems([]);
  };

  const handleNavigateToCollection = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('collection');
  };

  // Account handlers
  const handleLogin = (email: string, password: string): boolean => {
    // Check credentials - support both legacy password and verification code
    if (email.toLowerCase() === DEMO_REGISTERED_EMAIL.toLowerCase() && 
        (password === DEMO_PASSWORD || password === DEMO_VERIFICATION_CODE || password === 'verified')) {
      setIsLoggedIn(true);
      setUserData({
        firstName: 'Andrew',
        lastName: 'Lessman',
        email: DEMO_REGISTERED_EMAIL
      });
      // Store email in localStorage so chat can access it
      localStorage.setItem('userEmail', DEMO_REGISTERED_EMAIL);
      return true;
    }
    return false;
  };

  const handleSignup = (data: { firstName: string; lastName: string; email: string; password: string; marketingOptIn: boolean }) => {
    // In a real app, this would call an API
    setIsLoggedIn(true);
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    });
    // Store email in localStorage so chat can access it
    localStorage.setItem('userEmail', data.email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setAccountTrayOpen(false);
    // Clear email from localStorage
    localStorage.removeItem('userEmail');
  };

  return (
    <div className="bg-white flex flex-col relative w-full min-h-screen">
      {/* Global Header - Hide on checkout, order confirmation, and find-supplements */}
      {currentPage !== 'checkout' && currentPage !== 'order-confirmation' && currentPage !== 'find-supplements' && (
        <GlobalHeader 
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onCartClick={() => setCartOpen(true)}
          onLogoClick={handleLogoClick}
          onSpecialsClick={handleSpecialsClick}
          onNavigateToCollection={(category) => {
            setSelectedCategory(category);
            setCurrentPage('collection');
          }}
          onAccountClick={() => setAccountTrayOpen(!accountTrayOpen)}
          onSearchClick={() => setSearchOpen(true)}
          isLoggedIn={isLoggedIn}
          userFirstName={userData?.firstName}
          onFAQClick={handleFAQClick}
          onIngredientsClick={handleIngredientsClick}
          onHelpClick={handleHelpClick}
          onOurStoryClick={handleOurStoryClick}
          onQualityClick={handleQualityClick}
          onDetailsClick={() => setChatOpen(true)}
          onWellnessGuideClick={handleWellnessGuideClick}
          onVitaminCalculatorClick={() => {
            setCurrentPage('vitamin-calculator');
            window.scrollTo(0, 0);
          }}
        />
      )}

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onProductClick={(productId) => {
          setSelectedProductId(productId);
          setCurrentPage('product');
          setSearchOpen(false);
          window.scrollTo(0, 0);
        }}
        onViewAllResults={(query) => {
          setSearchQuery(query);
          setCurrentPage('search');
          window.scrollTo(0, 0);
        }}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={(category) => {
          setSelectedCategory(category);
          setCurrentPage('collection');
          setMobileMenuOpen(false);
        }}
        onIngredientsClick={handleIngredientsClick}
        onOurStoryClick={() => {
          handleOurStoryClick();
          setMobileMenuOpen(false);
        }}
        isLoggedIn={isLoggedIn}
        userData={userData}
        onAccountClick={() => {
          if (isLoggedIn) {
            // Navigate to account dashboard
            setAccountTab('overview');
            setCurrentPage('account');
            window.scrollTo(0, 0);
          } else {
            // Open account tray for sign in
            setAccountTrayOpen(true);
          }
        }}
      />

      {/* Account Tray */}
      <AccountTray 
        isOpen={accountTrayOpen}
        onClose={() => setAccountTrayOpen(false)}
        isLoggedIn={isLoggedIn}
        userData={userData}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
        onNavigateToAccount={(tab = 'overview') => {
          setAccountTab(tab);
          setCurrentPage('account');
          window.scrollTo(0, 0);
        }}
        onNavigateToHelp={() => {
          setCurrentPage('help');
          window.scrollTo(0, 0);
        }}
      />

      {/* Page Content */}
      {currentPage === 'home' ? (
        <Homepage 
          onFindSupplementsClick={handleFindSupplementsClick}
          onIngredientsClick={handleIngredientsClick}
          onOurStoryClick={handleOurStoryClick}
          onCategoryClick={handleCategoryClick}
          onWellnessHubClick={handleWellnessHubClick}
        />
      ) : currentPage === 'collection' ? (
        collectionPageEditorOpen ? (
          <CollectionPageEditable 
            cartItems={cartItems}
            setCartItems={setCartItems}
            onOpenCart={() => setCartOpen(true)}
            category={selectedCategory}
            onNavigateToCategory={(category) => {
              setSelectedCategory(category);
              window.scrollTo(0, 0);
            }}
            onNavigateToProduct={(productId) => {
              setSelectedProductId(productId);
              setCurrentPage('product');
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <CollectionPage 
            cartItems={cartItems}
            setCartItems={setCartItems}
            onOpenCart={() => setCartOpen(true)}
            category={selectedCategory}
            onNavigateToCategory={(category) => {
              setSelectedCategory(category);
              window.scrollTo(0, 0);
            }}
            onNavigateToProduct={(productId) => {
              setSelectedProductId(productId);
              setCurrentPage('product');
              window.scrollTo(0, 0);
            }}
          />
        )
      ) : currentPage === 'product' ? (
        <div className="relative">
          {/* Editing Mode Banner */}
          {pdpEditorOpen && (
            <div className="sticky top-0 z-[100] bg-[#009296] text-white py-3 px-6 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-['Inter',sans-serif] font-medium text-[14px]">
                  PDP Editing Mode Active - Hover over content slots to edit
                </span>
              </div>
              <button
                onClick={() => setPdpEditorOpen(false)}
                className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-[6px] font-['Inter',sans-serif] text-[13px] font-medium transition-colors"
              >
                Exit Editing Mode
              </button>
            </div>
          )}
          <ProductDetailPage 
            cartItems={cartItems}
            setCartItems={setCartItems}
            onOpenCart={() => setCartOpen(true)}
            productId={selectedProductId}
            onNavigateToCategory={(category) => {
              setSelectedCategory(category);
              setCurrentPage('collection');
              window.scrollTo(0, 0);
            }}
            isEditable={pdpEditorOpen}
            contentSlot1Data={contentSlot1Data}
            contentSlot2Data={contentSlot2Data}
            onContentSlot1Change={setContentSlot1Data}
            onContentSlot2Change={setContentSlot2Data}
          />
        </div>
      ) : currentPage === 'find-supplements' ? (
        <FindMySupplementsPage onClose={handleLogoClick} />
      ) : currentPage === 'faq' ? (
        <FAQPage />
      ) : currentPage === 'privacy-policy' ? (
        <PrivacyPolicyPage />
      ) : currentPage === 'terms-of-use' ? (
        <TermsOfUsePage />
      ) : currentPage === 'shipping-returns' ? (
        <ShippingReturnsPage />
      ) : currentPage === 'help' ? (
        <HelpPage key={helpPageKey} />
      ) : currentPage === 'help2' ? (
        <HelpPage2 key={helpPageKey} />
      ) : currentPage === 'ingredients' ? (
        <IngredientsPage 
          onNavigateToIngredient={(ingredient) => {
            setSelectedIngredient(ingredient);
            setCurrentPage('ingredient-collection');
            window.scrollTo(0, 0);
          }}
        />
      ) : currentPage === 'ingredient-collection' ? (
        <IngredientCollectionPage 
          cartItems={cartItems}
          setCartItems={setCartItems}
          onOpenCart={() => setCartOpen(true)}
          ingredient={selectedIngredient}
          onNavigateToCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage('collection');
            window.scrollTo(0, 0);
          }}
        />
      ) : currentPage === 'vitamin-calculator' ? (
        <VitaminCalculatorPage />
      ) : currentPage === 'search' ? (
        <SearchResultsPage 
          searchQuery={searchQuery}
          onProductClick={(productId) => {
            setSelectedProductId(productId);
            setCurrentPage('product');
            window.scrollTo(0, 0);
          }}
        />
      ) : currentPage === 'cart' ? (
        <CartPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          onContinueShopping={() => {
            setCurrentPage('collection');
            window.scrollTo(0, 0);
          }}
          onProceedToCheckout={() => {
            setCurrentPage('checkout');
            window.scrollTo(0, 0);
          }}
          onEditItem={(productId) => {
            // Navigate back to product detail page for editing
            setSelectedProductId(productId);
            setCurrentPage('product');
            window.scrollTo(0, 0);
          }}
        />
      ) : currentPage === 'checkout' ? (
        <CheckoutPage 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onContinueShopping={() => setCurrentPage('collection')}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : currentPage === 'our-story' ? (
        <OurStoryPage />
      ) : currentPage === 'quality' ? (
        <QualityPage />
      ) : currentPage === 'account' ? (
        <AccountDashboard userEmail={userData?.email || ''} initialTab={accountTab} />
      ) : currentPage === 'wellness-guide' ? (
        <AndrewWellnessGuide />
      ) : currentPage === 'wellness-hub' ? (
        <WellnessHub onNavigateToGoal={handleWellnessHubGoalClick} onNavigateToArticle={handleWellnessHubArticleClick} onNavigateToVideo={handleWellnessHubVideoClick} />
      ) : currentPage === 'wellness-hub-goal' ? (
        <WellnessHubGoalPage 
          goalId={selectedWellnessGoal}
          onBack={handleWellnessHubClick}
          onNavigateToArticle={handleWellnessHubArticleClick}
          onNavigateToVideo={handleWellnessHubVideoClick}
        />
      ) : currentPage === 'wellness-hub-article' ? (
        <WellnessHubArticlePage 
          articleId={selectedArticleId}
          onBack={handleWellnessHubClick}
          onNavigateToArticle={handleWellnessHubArticleClick}
        />
      ) : currentPage === 'wellness-hub-video' ? (
        <WellnessHubVideoPage 
          videoId={selectedVideoId}
          onBack={handleWellnessHubClick}
          onNavigateToVideo={handleWellnessHubVideoClick}
        />
      ) : (
        <OrderConfirmationPage 
          orderData={orderData}
          onContinueShopping={() => setCurrentPage('collection')}
          onMenuClick={() => setMobileMenuOpen(true)}
          onCartClick={() => setCartOpen(true)}
          onLogoClick={() => setCurrentPage('home')}
          onSpecialsClick={() => {
            setSelectedCategory('specials');
            setCurrentPage('collection');
          }}
          onNavigateToCollection={handleNavigateToCollection}
          onAccountClick={() => setAccountTrayOpen(!accountTrayOpen)}
          isLoggedIn={isLoggedIn}
          userFirstName={userData?.firstName}
        />
      )}

      {/* Global Footer - Hide on checkout, order confirmation, find-supplements, and vitamin-calculator */}
      {currentPage !== 'checkout' && currentPage !== 'order-confirmation' && currentPage !== 'find-supplements' && currentPage !== 'vitamin-calculator' && <GlobalFooter onFAQClick={handleFAQClick} onPrivacyPolicyClick={handlePrivacyPolicyClick} onTermsOfUseClick={handleTermsOfUseClick} onMyAccountClick={() => setAccountTrayOpen(true)} onShippingReturnsClick={handleShippingReturnsClick} onTrackOrderClick={() => setAccountTrayOpen(true)} onContactClick={handleHelpClick} onHelpCenter2Click={handleHelp2Click} onOurStoryClick={handleOurStoryClick} onWellnessGuideClick={handleWellnessGuideClick} />}

      {/* MiniCart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-full sm:w-[560px] sm:max-w-[560px] p-0 overflow-hidden [&>button]:hidden">
          <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
          <SheetDescription className="sr-only">Review and manage items in your shopping cart</SheetDescription>
          <MiniCart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={() => setCartOpen(false)}
            onViewCart={handleViewCart}
            onCheckout={handleCheckout}
          />
        </SheetContent>
      </Sheet>

      {/* Chat with Andrew */}
      <ChatWithAndrew isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Component Editor */}
      <ComponentEditor isOpen={bannerEditorOpen} onClose={() => setBannerEditorOpen(false)} />

      {/* Toaster */}
      <Toaster />
    </div>
  );
}