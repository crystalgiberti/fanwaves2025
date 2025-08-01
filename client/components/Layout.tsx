import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Menu, User, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/SearchModal';
import RiffChatbot from '@/components/RiffChatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems, openCart } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          {/* Logo */}
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-fan-blue-600 bg-clip-text text-transparent">
              FAN WAVES
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/nfl" className="transition-colors hover:text-primary">
              NFL
            </Link>
            <Link to="/ncaa" className="transition-colors hover:text-primary">
              NCAA
            </Link>
            <Link to="/hats" className="transition-colors hover:text-primary">
              Hats
            </Link>
            <Link to="/jerseys" className="transition-colors hover:text-primary">
              Jerseys
            </Link>
            <Link to="/accessories" className="transition-colors hover:text-primary">
              Accessories
            </Link>
            <Link to="/custom" className="transition-colors hover:text-primary">
              Custom Gear
            </Link>
          </nav>

          {/* Right Side */}
          <div className="ml-auto flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingCart className="h-4 w-4" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t md:hidden">
            <nav className="container grid gap-4 p-4">
              <Link
                to="/nfl"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NFL
              </Link>
              <Link
                to="/ncaa"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NCAA
              </Link>
              <Link
                to="/hats"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hats
              </Link>
              <Link
                to="/jerseys"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jerseys
              </Link>
              <Link
                to="/accessories"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/custom"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Gear
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Riff Chatbot */}
      <RiffChatbot />

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container max-w-screen-2xl py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-fan-blue-600 bg-clip-text text-transparent">
                FAN WAVES
              </div>
              <p className="text-sm text-muted-foreground">
                Your ultimate destination for NFL and NCAA fan gear. Ride the wave of team spirit!
              </p>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Shop</h3>
              <nav className="space-y-2 text-sm">
                <Link to="/nfl" className="block transition-colors hover:text-primary">
                  NFL Gear
                </Link>
                <Link to="/ncaa" className="block transition-colors hover:text-primary">
                  NCAA Gear
                </Link>
                <Link to="/hats" className="block transition-colors hover:text-primary">
                  Hats & Caps
                </Link>
                <Link to="/jerseys" className="block transition-colors hover:text-primary">
                  Jerseys
                </Link>
                <Link to="/accessories" className="block transition-colors hover:text-primary">
                  Accessories
                </Link>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Support</h3>
              <nav className="space-y-2 text-sm">
                <Link to="/contact" className="block transition-colors hover:text-primary">
                  Contact Us
                </Link>
                <Link to="/shipping" className="block transition-colors hover:text-primary">
                  Shipping Info
                </Link>
                <Link to="/returns" className="block transition-colors hover:text-primary">
                  Returns
                </Link>
                <Link to="/faq" className="block transition-colors hover:text-primary">
                  FAQ
                </Link>
              </nav>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Connect</h3>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block transition-colors hover:text-primary">
                  Twitter
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  Instagram
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  Facebook
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  TikTok
                </a>
              </nav>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © 2024 Fan Waves. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex space-x-4 text-xs text-muted-foreground">
              <Link to="/privacy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
