import { useState } from 'react';
import Homepage from './components/Homepage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import FindMySupplementsPage from './components/FindMySupplementsPage';
import CollectionPage from './components/CollectionPage';
import FAQPage from './components/FAQPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfUsePage from './components/TermsOfUsePage';
import ShippingReturnsPage from './components/ShippingReturnsPage';
import HelpPage from './components/HelpPage';
import IngredientsPage from './components/IngredientsPage';
import IngredientCollectionPage from './components/IngredientCollectionPage';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import MiniCart from './components/MiniCart';
import MobileMenu from './components/MobileMenu';
import AccountTray from './components/AccountTray';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet';
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

export default function App() {
  // Routing state
  const [currentPage, setCurrentPage] = useState<'home' | 'collection' | 'checkout' | 'order-confirmation' | 'find-supplements' | 'faq' | 'privacy-policy' | 'terms-of-use' | 'shipping-returns' | 'help' | 'ingredients' | 'ingredient-collection'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('digestive-health');
  const [selectedIngredient, setSelectedIngredient] = useState<string>('Vitamin C');
  
  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountTrayOpen, setAccountTrayOpen] = useState(false);
  
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
      name: string;
      count: string;
      price: number;
      originalPrice?: number;
      quantity: number;
      image: string;
      frequency?: string;
    }>;
  } | null>(null);
  
  // Cart state
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    name: string;
    count: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
    frequency?: string;
  }>>([ 
    {
      id: '1',
      name: 'Fibermucil',
      count: 'Count: 60 capsules',
      price: 19.95,
      originalPrice: 24.90,
      quantity: 1,
      image: imgImage
    },
    {
      id: '2',
      name: 'Ultimate Anti-Oxidant',
      count: 'Count: 180 capsules',
      price: 35.96,
      originalPrice: 39.95,
      quantity: 1,
      image: imgImage,
      frequency: 'Every 30 days'
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
    setCurrentPage('help');
    window.scrollTo(0, 0);
  };

  const handleIngredientsClick = () => {
    setCurrentPage('ingredients');
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
    console.log('Navigate to full cart page');
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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setAccountTrayOpen(false);
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
          isLoggedIn={isLoggedIn}
          userFirstName={userData?.firstName}
          onFAQClick={handleFAQClick}
          onIngredientsClick={handleIngredientsClick}
          onHelpClick={handleHelpClick}
        />
      )}

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
      />

      {/* Page Content */}
      {currentPage === 'home' ? (
        <Homepage onFindSupplementsClick={handleFindSupplementsClick} />
      ) : currentPage === 'collection' ? (
        <CollectionPage 
          cartItems={cartItems}
          setCartItems={setCartItems}
          onOpenCart={() => setCartOpen(true)}
          category={selectedCategory}
          onNavigateToCategory={(category) => {
            setSelectedCategory(category);
            window.scrollTo(0, 0);
          }}
        />
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
        <HelpPage />
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
      ) : currentPage === 'checkout' ? (
        <CheckoutPage 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onContinueShopping={() => setCurrentPage('collection')}
          onPlaceOrder={handlePlaceOrder}
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

      {/* Global Footer - Hide on checkout, order confirmation, and find-supplements */}
      {currentPage !== 'checkout' && currentPage !== 'order-confirmation' && currentPage !== 'find-supplements' && <GlobalFooter onFAQClick={handleFAQClick} onPrivacyPolicyClick={handlePrivacyPolicyClick} onTermsOfUseClick={handleTermsOfUseClick} onMyAccountClick={() => setAccountTrayOpen(true)} onShippingReturnsClick={handleShippingReturnsClick} onTrackOrderClick={() => setAccountTrayOpen(true)} />}

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
    </div>
  );
}