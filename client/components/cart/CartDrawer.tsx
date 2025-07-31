'use client';

import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, formatPrice, CartItem } from '@/lib/cart';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  className?: string;
}

export function CartDrawer({ className }: CartDrawerProps) {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    getTotalItems,
    getShippingTotal,
    getTaxTotal,
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Drawer */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 transform transition-transform",
        "flex flex-col",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            {items.length > 0 && (
              <Badge variant="secondary">{getTotalItems()}</Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">
                Start shopping to add items to your cart
              </p>
              <Button onClick={closeCart} className="w-full">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              
              {getShippingTotal() > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatPrice(getShippingTotal())}</span>
                </div>
              )}
              
              {getShippingTotal() === 0 && getSubtotal() >= 50 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              )}
              
              {getTaxTotal() > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(getTaxTotal())}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>

            {getSubtotal() < 50 && (
              <div className="text-sm text-muted-foreground text-center p-2 bg-muted rounded">
                Add {formatPrice(50 - getSubtotal())} more for FREE shipping
              </div>
            )}

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Checkout'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  const currentPrice = item.sale_price || item.price;
  const hasDiscount = item.sale_price && item.sale_price < item.price;

  return (
    <div className="flex space-x-3 p-3 border rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium line-clamp-2 mb-1">
          {item.name}
        </h3>
        
        {item.attributes && Object.keys(item.attributes).length > 0 && (
          <div className="text-xs text-muted-foreground mb-2">
            {Object.entries(item.attributes).map(([key, value]) => (
              <span key={key} className="mr-2">
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              disabled={item.max_quantity ? item.quantity >= item.max_quantity : false}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Item Total & Remove */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium">
            Total: {formatPrice(currentPrice * item.quantity)}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Stock Warning */}
        {item.stock_status === 'onbackorder' && (
          <div className="text-xs text-orange-600 mt-1">
            On backorder
          </div>
        )}
        
        {item.stock_status === 'outofstock' && (
          <div className="text-xs text-red-600 mt-1">
            Out of stock
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
