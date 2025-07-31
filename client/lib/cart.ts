import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  product_id: number;
  variation_id?: number;
  name: string;
  price: number;
  sale_price?: number;
  quantity: number;
  image: string;
  sku?: string;
  team?: string;
  category?: string;
  attributes?: Record<string, string>;
  max_quantity?: number;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
}

export interface ShippingInfo {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
}

export interface BillingInfo extends ShippingInfo {
  email: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  shipping: ShippingInfo | null;
  billing: BillingInfo | null;
  paymentMethod: string;
  customerNote: string;
  couponCode: string;
  appliedCoupon: any;
  shippingMethod: any;
}

export interface CartActions {
  // Cart management
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  
  // Cart UI
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Checkout info
  setShipping: (shipping: ShippingInfo) => void;
  setBilling: (billing: BillingInfo) => void;
  setPaymentMethod: (method: string) => void;
  setCustomerNote: (note: string) => void;
  setCouponCode: (code: string) => void;
  setAppliedCoupon: (coupon: any) => void;
  setShippingMethod: (method: any) => void;
  
  // Calculations
  getSubtotal: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
  getShippingTotal: () => number;
  getTaxTotal: () => number;
  getDiscountTotal: () => number;
}

export const useCart = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      shipping: null,
      billing: null,
      paymentMethod: '',
      customerNote: '',
      couponCode: '',
      appliedCoupon: null,
      shippingMethod: null,

      // Cart management
      addItem: (newItem, quantity = 1) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          item => item.product_id === newItem.id && 
                  item.variation_id === newItem.variation_id
        );

        if (existingItemIndex > -1) {
          // Update existing item quantity
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;
          
          // Check stock limits
          if (existingItem.max_quantity && newQuantity > existingItem.max_quantity) {
            console.warn('Cannot add more items - stock limit reached');
            return;
          }
          
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity
          };
          
          set({ items: updatedItems });
        } else {
          // Add new item
          const cartItem: CartItem = {
            ...newItem,
            id: Date.now(), // Unique cart item ID
            product_id: newItem.id,
            quantity,
          };
          
          set({ items: [...items, cartItem] });
        }
        
        // Auto-open cart when item is added
        set({ isOpen: true });
      },

      removeItem: (id) => {
        const items = get().items.filter(item => item.id !== id);
        set({ items });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const items = get().items.map(item => {
          if (item.id === id) {
            // Check stock limits
            if (item.max_quantity && quantity > item.max_quantity) {
              console.warn('Cannot update quantity - stock limit reached');
              return item;
            }
            return { ...item, quantity };
          }
          return item;
        });
        
        set({ items });
      },

      clearCart: () => {
        set({ 
          items: [],
          appliedCoupon: null,
          couponCode: '',
          customerNote: '',
        });
      },

      // Cart UI
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      // Checkout info
      setShipping: (shipping) => set({ shipping }),
      setBilling: (billing) => set({ billing }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setCustomerNote: (customerNote) => set({ customerNote }),
      setCouponCode: (couponCode) => set({ couponCode }),
      setAppliedCoupon: (appliedCoupon) => set({ appliedCoupon }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),

      // Calculations
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.sale_price || item.price;
          return total + (price * item.quantity);
        }, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShippingTotal();
        const tax = get().getTaxTotal();
        const discount = get().getDiscountTotal();
        
        return Math.max(0, subtotal + shipping + tax - discount);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getShippingTotal: () => {
        const shippingMethod = get().shippingMethod;
        if (!shippingMethod) return 0;
        
        // Free shipping over $50
        const subtotal = get().getSubtotal();
        if (subtotal >= 50) return 0;
        
        return parseFloat(shippingMethod.total || '5.99');
      },

      getTaxTotal: () => {
        // Calculate tax based on shipping address
        const subtotal = get().getSubtotal();
        const shipping = get().shipping;
        
        // Example tax calculation (you'll need to implement proper tax logic)
        if (!shipping) return 0;
        
        const taxRates: Record<string, number> = {
          'CA': 0.0975, // California
          'NY': 0.08,   // New York
          'TX': 0.0625, // Texas
          'FL': 0.06,   // Florida
        };
        
        const taxRate = taxRates[shipping.state] || 0;
        return subtotal * taxRate;
      },

      getDiscountTotal: () => {
        const appliedCoupon = get().appliedCoupon;
        if (!appliedCoupon) return 0;
        
        const subtotal = get().getSubtotal();
        
        if (appliedCoupon.discount_type === 'fixed_cart') {
          return parseFloat(appliedCoupon.amount);
        } else if (appliedCoupon.discount_type === 'percent') {
          return subtotal * (parseFloat(appliedCoupon.amount) / 100);
        }
        
        return 0;
      },
    }),
    {
      name: 'fan-waves-cart',
      partialize: (state) => ({
        items: state.items,
        shipping: state.shipping,
        billing: state.billing,
        paymentMethod: state.paymentMethod,
        customerNote: state.customerNote,
      }),
    }
  )
);

// Cart utility functions
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateSavings = (regularPrice: number, salePrice: number): number => {
  if (!salePrice || salePrice >= regularPrice) return 0;
  return regularPrice - salePrice;
};

export const calculateDiscountPercentage = (regularPrice: number, salePrice: number): number => {
  if (!salePrice || salePrice >= regularPrice) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
};

// Team-specific cart functions
export const getTeamItemsCount = (teamSlug: string): number => {
  const { items } = useCart.getState();
  return items
    .filter(item => item.team === teamSlug)
    .reduce((total, item) => total + item.quantity, 0);
};

export const getTeamItemsTotal = (teamSlug: string): number => {
  const { items } = useCart.getState();
  return items
    .filter(item => item.team === teamSlug)
    .reduce((total, item) => {
      const price = item.sale_price || item.price;
      return total + (price * item.quantity);
    }, 0);
};

// Local storage cart recovery
export const recoverCartFromLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem('fan-waves-cart');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.state && parsed.state.items) {
        // Validate cart items are still available/valid
        console.log('Recovered cart with', parsed.state.items.length, 'items');
      }
    }
  } catch (error) {
    console.error('Error recovering cart from localStorage:', error);
  }
};

// Analytics tracking
export const trackCartEvent = (event: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      event_category: 'ecommerce',
      ...data,
    });
  }
  
  console.log('Cart event:', event, data);
};
