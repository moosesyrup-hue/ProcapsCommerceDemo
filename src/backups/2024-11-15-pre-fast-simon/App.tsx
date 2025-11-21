import { useState } from 'react';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import Homepage from './components/Homepage';
import CollectionPage from './components/CollectionPage';
import CheckoutPage from './components/CheckoutPage';
import MiniCart from './components/MiniCart';
import MobileMenu from './components/MobileMenu';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet';
import imgImage from "figma:asset/902e9baf4329e9eccec5f8fbe2da4128f222cb1b.png";

export default function App() {
  // Routing state
  const [currentPage, setCurrentPage] = useState<'home' | 'collection' | 'checkout'>('home');
  
  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    name: string;
    count: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
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
      price: 39.95,
      originalPrice: 49.90,
      quantity: 1,
      image: imgImage
    }
  ]);

  // Navigation handlers
  const handleLogoClick = () => {
    setCurrentPage('home');
  };

  const handleSpecialsClick = () => {
    setCurrentPage('collection');
  };

  const handleCheckoutClick = () => {
    setCurrentPage('checkout');
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
  };

  return (
    <div className="bg-white flex flex-col items-center relative w-full min-h-screen">
      {/* Global Header - Hide on checkout */}
      {currentPage !== 'checkout' && (
        <GlobalHeader 
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onCartClick={() => setCartOpen(true)}
          onLogoClick={handleLogoClick}
          onSpecialsClick={handleSpecialsClick}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Page Content */}
      {currentPage === 'home' ? (
        <Homepage />
      ) : currentPage === 'collection' ? (
        <CollectionPage 
          cartItems={cartItems}
          setCartItems={setCartItems}
          onOpenCart={() => setCartOpen(true)}
        />
      ) : (
        <CheckoutPage 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onContinueShopping={() => setCurrentPage('collection')}
        />
      )}

      {/* Global Footer - Hide on checkout */}
      {currentPage !== 'checkout' && <GlobalFooter />}

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
