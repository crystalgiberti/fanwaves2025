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
      const queryParams = new URLSearchParams();

      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.on_sale) queryParams.append('on_sale', 'true');
      if (params?.category) queryParams.append('category', params.category);
      if (params?.team) queryParams.append('team', params.team);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const response = await fetch(`/api/products?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform API response to match our interface
      const transformedProducts: WooCommerceProduct[] = data.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        type: 'simple',
        status: 'publish',
        featured: product.featured || false,
        price: product.price || '0',
        regular_price: product.regular_price || product.price || '0',
        sale_price: product.sale_price || '',
        on_sale: product.on_sale || false,
        images: product.images || [{ id: 1, src: '/placeholder.svg', alt: product.name }],
        categories: product.categories || [],
        short_description: product.description || '',
        description: product.description || '',
        average_rating: product.average_rating?.toString() || '0',
        rating_count: product.rating_count || 0,
        stock_status: product.stock_status || 'instock',
        attributes: product.attributes || []
      }));

      setProducts(transformedProducts);

    } catch (err) {
      console.error('Error fetching products:', err);

      // Fallback to mock data if API fails
      const mockProducts: WooCommerceProduct[] = [
        {
          id: 1,
          name: 'Championship Hat',
          slug: 'championship-hat',
          type: 'simple',
          status: 'publish',
          featured: true,
          price: '29.99',
          regular_price: '39.99',
          sale_price: '29.99',
          on_sale: true,
          images: [{ id: 1, src: '/placeholder.svg', alt: 'Championship Hat' }],
          categories: [{ id: 11, name: 'Hats & Caps', slug: 'hats' }],
          short_description: 'Official championship hat with team embroidery',
          description: 'Show your team pride with this official championship hat featuring premium embroidery.',
          average_rating: '4.8',
          rating_count: 124,
          stock_status: 'instock',
          attributes: []
        },
        {
          id: 2,
          name: 'Team Jersey Pro',
          slug: 'team-jersey-pro',
          type: 'simple',
          status: 'publish',
          featured: false,
          price: '89.99',
          regular_price: '109.99',
          sale_price: '89.99',
          on_sale: true,
          images: [{ id: 2, src: '/placeholder.svg', alt: 'Team Jersey Pro' }],
          categories: [{ id: 10, name: 'Jerseys', slug: 'jerseys' }],
          short_description: 'Professional quality team jersey',
          description: 'Premium team jersey with official team colors and logos.',
          average_rating: '4.9',
          rating_count: 89,
          stock_status: 'instock',
          attributes: []
        }
      ];
      setProducts(mockProducts);
      setError(`Unable to load live products. ${err instanceof Error ? err.message : 'Unknown error'}`);
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
