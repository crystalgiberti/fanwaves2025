import { useState, useEffect } from 'react';

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  featured: boolean;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  short_description: string;
  description: string;
  average_rating: string;
  rating_count: number;
  stock_status: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image?: {
    id: number;
    src: string;
    alt: string;
  };
  count: number;
}

interface UseWooCommerceReturn {
  products: WooCommerceProduct[];
  categories: WooCommerceCategory[];
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: any) => Promise<void>;
  fetchProductsByCategory: (categoryId: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export function useWooCommerce(): UseWooCommerceReturn {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [categories, setCategories] = useState<WooCommerceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (params?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call to your WooCommerce API
      // const response = await fetch('/api/woocommerce/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(params)
      // });
      // const data = await response.json();
      
      // For now, return mock data
      const mockProducts: WooCommerceProduct[] = [
        {
          id: 1,
          name: 'Chiefs Super Bowl Champions Snapback Hat',
          slug: 'chiefs-super-bowl-hat',
          type: 'simple',
          status: 'publish',
          featured: true,
          price: '29.99',
          regular_price: '34.99',
          sale_price: '29.99',
          on_sale: true,
          images: [{ id: 1, src: '/placeholder.svg', alt: 'Chiefs Hat' }],
          categories: [
            { id: 11, name: 'Hats & Caps', slug: 'hats' },
            { id: 100, name: 'Kansas City Chiefs', slug: 'chiefs' }
          ],
          short_description: 'Official Super Bowl Champions snapback hat with embroidered logos',
          description: 'Show your Chiefs pride with this official Super Bowl Champions snapback hat featuring embroidered team logos and an adjustable fit.',
          average_rating: '4.8',
          rating_count: 156,
          stock_status: 'instock',
          attributes: [
            { id: 1, name: 'Size', options: ['One Size'] },
            { id: 2, name: 'Color', options: ['Red', 'White'] }
          ]
        },
        {
          id: 2,
          name: 'Cowboys America\'s Team Dad Hat',
          slug: 'cowboys-dad-hat',
          type: 'simple',
          status: 'publish',
          featured: false,
          price: '26.99',
          regular_price: '32.99',
          sale_price: '26.99',
          on_sale: true,
          images: [{ id: 2, src: '/placeholder.svg', alt: 'Cowboys Hat' }],
          categories: [
            { id: 11, name: 'Hats & Caps', slug: 'hats' },
            { id: 101, name: 'Dallas Cowboys', slug: 'cowboys' }
          ],
          short_description: 'Relaxed fit dad hat with vintage Cowboys star logo',
          description: 'Classic dad hat featuring the iconic Cowboys star logo with a relaxed fit and curved brim.',
          average_rating: '4.7',
          rating_count: 89,
          stock_status: 'instock',
          attributes: [
            { id: 1, name: 'Size', options: ['One Size'] },
            { id: 2, name: 'Color', options: ['Navy', 'Silver'] }
          ]
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(mockProducts);
      
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId: number) => {
    await fetchProducts({ category: categoryId });
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      const mockCategories: WooCommerceCategory[] = [
        {
          id: 11,
          name: 'Hats & Caps',
          slug: 'hats',
          parent: 0,
          description: 'Team hats and caps for all occasions',
          display: 'default',
          count: 25
        },
        {
          id: 10,
          name: 'Jerseys',
          slug: 'jerseys',
          parent: 0,
          description: 'Official team jerseys',
          display: 'default',
          count: 45
        },
        {
          id: 13,
          name: 'Accessories',
          slug: 'accessories',
          parent: 0,
          description: 'Team accessories and fan gear',
          display: 'default',
          count: 38
        }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setCategories(mockCategories);
      
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    fetchCategories
  };
}
