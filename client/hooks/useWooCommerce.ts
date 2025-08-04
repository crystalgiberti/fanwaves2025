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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`/api/products?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Ignore JSON parsing errors for error responses
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from API');
      }

      // Handle different response structures
      let productsArray = [];
      if (Array.isArray(data)) {
        productsArray = data;
      } else if (data.products && Array.isArray(data.products)) {
        productsArray = data.products;
      } else if (data.data && Array.isArray(data.data)) {
        productsArray = data.data;
      } else {
        console.warn('Unexpected API response structure:', data);
        throw new Error('Products data not found in API response');
      }

      // Transform API response to match our interface
      const transformedProducts: WooCommerceProduct[] = productsArray.map((product: any) => ({
        id: product.id || Math.random(),
        name: product.name || 'Product',
        slug: product.slug || 'product',
        type: 'simple',
        status: 'publish',
        featured: Boolean(product.featured),
        price: String(product.price || '0'),
        regular_price: String(product.regular_price || product.price || '0'),
        sale_price: String(product.sale_price || ''),
        on_sale: Boolean(product.on_sale),
        images: product.images && Array.isArray(product.images) ? product.images : [{
          id: 1,
          src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
          alt: product.name || 'Product'
        }],
        categories: product.categories && Array.isArray(product.categories) ? product.categories : [],
        short_description: product.short_description || product.description || '',
        description: product.description || product.short_description || '',
        average_rating: String(product.average_rating || '0'),
        rating_count: Number(product.rating_count || 0),
        stock_status: product.stock_status || 'instock',
        attributes: product.attributes && Array.isArray(product.attributes) ? product.attributes : []
      }));

      setProducts(transformedProducts);

      // Clear any previous errors if successful
      if (transformedProducts.length > 0) {
        setError(null);
      }

    } catch (err) {
      console.error('Error fetching products:', err);

      // Determine error type for better user messaging
      let errorMessage = 'Connection to store unavailable';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timed out - store connection slow';
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'Network connection issue - check store setup';
        } else if (err.message.includes('404')) {
          errorMessage = 'Store API not found - check WooCommerce installation';
        } else if (err.message.includes('401') || err.message.includes('403')) {
          errorMessage = 'Store authentication failed - check API keys';
        } else if (err.message.includes('500')) {
          errorMessage = 'Store server error - contact hosting support';
        }
      }

      // Enhanced mock data with more variety
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
          images: [{ id: 1, src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142', alt: 'Championship Hat' }],
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
          featured: true,
          price: '89.99',
          regular_price: '109.99',
          sale_price: '89.99',
          on_sale: true,
          images: [{ id: 2, src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142', alt: 'Team Jersey Pro' }],
          categories: [{ id: 10, name: 'Jerseys', slug: 'jerseys' }],
          short_description: 'Professional quality team jersey',
          description: 'Premium team jersey with official team colors and logos.',
          average_rating: '4.9',
          rating_count: 89,
          stock_status: 'instock',
          attributes: []
        },
        {
          id: 3,
          name: 'Fan Chain Deluxe',
          slug: 'fan-chain-deluxe',
          type: 'simple',
          status: 'publish',
          featured: false,
          price: '19.99',
          regular_price: '24.99',
          sale_price: '19.99',
          on_sale: true,
          images: [{ id: 3, src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142', alt: 'Fan Chain Deluxe' }],
          categories: [{ id: 13, name: 'Accessories', slug: 'accessories' }],
          short_description: 'Premium fan chain with team logo',
          description: 'Show your team spirit with this premium fan chain featuring your team logo.',
          average_rating: '4.7',
          rating_count: 156,
          stock_status: 'instock',
          attributes: []
        },
        {
          id: 4,
          name: 'Terrible Towel Set',
          slug: 'terrible-towel-set',
          type: 'simple',
          status: 'publish',
          featured: false,
          price: '15.99',
          regular_price: '19.99',
          sale_price: '15.99',
          on_sale: true,
          images: [{ id: 4, src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142', alt: 'Terrible Towel Set' }],
          categories: [{ id: 13, name: 'Accessories', slug: 'accessories' }],
          short_description: 'Classic team terrible towel set',
          description: 'Wave your team colors with this classic terrible towel set.',
          average_rating: '4.6',
          rating_count: 203,
          stock_status: 'instock',
          attributes: []
        }
      ];

      setProducts(mockProducts);
      setError(errorMessage);
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const response = await fetch('/api/categories', {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Ignore JSON parsing errors
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from categories API');
      }

      // Handle different response structures
      let categoriesArray = [];
      if (Array.isArray(data)) {
        categoriesArray = data;
      } else if (data.categories && Array.isArray(data.categories)) {
        categoriesArray = data.categories;
      } else if (data.data && Array.isArray(data.data)) {
        categoriesArray = data.data;
      } else {
        console.warn('Unexpected categories API response structure:', data);
        throw new Error('Categories data not found in API response');
      }

      const transformedCategories: WooCommerceCategory[] = categoriesArray.map((category: any) => ({
        id: category.id || Math.random(),
        name: category.name || 'Category',
        slug: category.slug || 'category',
        parent: Number(category.parent || 0),
        description: category.description || '',
        display: 'default',
        image: category.image ? { id: 0, src: category.image, alt: category.name } : undefined,
        count: Number(category.count || 0)
      }));

      setCategories(transformedCategories);

    } catch (err) {
      console.error('Error fetching categories:', err);

      // Enhanced mock data
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
      setCategories(mockCategories);

      // Don't overwrite product error if categories fail
      if (!error) {
        setError('Unable to load store categories - using defaults');
      }
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
