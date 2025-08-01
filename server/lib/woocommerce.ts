import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { z } from "zod";

// WooCommerce configuration schema
const WooConfigSchema = z.object({
  url: z.string().url(),
  consumerKey: z.string(),
  consumerSecret: z.string(),
  version: z.string().default('wc/v3'),
});

// Product schemas
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  status: z.string(),
  featured: z.boolean(),
  catalog_visibility: z.string(),
  description: z.string(),
  short_description: z.string(),
  sku: z.string(),
  price: z.string(),
  regular_price: z.string(),
  sale_price: z.string(),
  date_on_sale_from: z.string().nullable(),
  date_on_sale_to: z.string().nullable(),
  price_html: z.string(),
  on_sale: z.boolean(),
  purchasable: z.boolean(),
  total_sales: z.number(),
  virtual: z.boolean(),
  downloadable: z.boolean(),
  downloads: z.array(z.any()),
  download_limit: z.number(),
  download_expiry: z.number(),
  external_url: z.string(),
  button_text: z.string(),
  tax_status: z.string(),
  tax_class: z.string(),
  manage_stock: z.boolean(),
  stock_quantity: z.number().nullable(),
  stock_status: z.string(),
  backorders: z.string(),
  backorders_allowed: z.boolean(),
  backordered: z.boolean(),
  sold_individually: z.boolean(),
  weight: z.string(),
  dimensions: z.object({
    length: z.string(),
    width: z.string(),
    height: z.string(),
  }),
  shipping_required: z.boolean(),
  shipping_taxable: z.boolean(),
  shipping_class: z.string(),
  shipping_class_id: z.number(),
  reviews_allowed: z.boolean(),
  average_rating: z.string(),
  rating_count: z.number(),
  related_ids: z.array(z.number()),
  upsell_ids: z.array(z.number()),
  cross_sell_ids: z.array(z.number()),
  parent_id: z.number(),
  purchase_note: z.string(),
  categories: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })),
  tags: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })),
  images: z.array(z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    src: z.string(),
    name: z.string(),
    alt: z.string(),
  })),
  attributes: z.array(z.any()),
  default_attributes: z.array(z.any()),
  variations: z.array(z.number()),
  grouped_products: z.array(z.number()),
  menu_order: z.number(),
  meta_data: z.array(z.any()),
});

export type Product = z.infer<typeof ProductSchema>;

// Order schemas
export const OrderSchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  number: z.string(),
  order_key: z.string(),
  created_via: z.string(),
  version: z.string(),
  status: z.string(),
  currency: z.string(),
  date_created: z.string(),
  date_created_gmt: z.string(),
  date_modified: z.string(),
  date_modified_gmt: z.string(),
  discount_total: z.string(),
  discount_tax: z.string(),
  shipping_total: z.string(),
  shipping_tax: z.string(),
  cart_tax: z.string(),
  total: z.string(),
  total_tax: z.string(),
  prices_include_tax: z.boolean(),
  customer_id: z.number(),
  customer_ip_address: z.string(),
  customer_user_agent: z.string(),
  customer_note: z.string(),
  billing: z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  shipping: z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
  payment_method: z.string(),
  payment_method_title: z.string(),
  transaction_id: z.string(),
  date_paid: z.string().nullable(),
  date_paid_gmt: z.string().nullable(),
  date_completed: z.string().nullable(),
  date_completed_gmt: z.string().nullable(),
  cart_hash: z.string(),
  meta_data: z.array(z.any()),
  line_items: z.array(z.object({
    id: z.number(),
    name: z.string(),
    product_id: z.number(),
    variation_id: z.number(),
    quantity: z.number(),
    tax_class: z.string(),
    subtotal: z.string(),
    subtotal_tax: z.string(),
    total: z.string(),
    total_tax: z.string(),
    taxes: z.array(z.any()),
    meta_data: z.array(z.any()),
    sku: z.string(),
    price: z.number(),
  })),
});

export type Order = z.infer<typeof OrderSchema>;

class WooCommerceAPI {
  private api: WooCommerceRestApi;
  private isConfigured: boolean = false;

  constructor() {
    // Initialize with environment variables
    this.configure({
      url: process.env.WOOCOMMERCE_URL || '',
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
      version: process.env.WOOCOMMERCE_VERSION || 'wc/v3',
    });
  }

  configure(config: Partial<z.infer<typeof WooConfigSchema>>) {
    try {
      const validConfig = WooConfigSchema.parse(config);
      
      this.api = new WooCommerceRestApi({
        url: validConfig.url,
        consumerKey: validConfig.consumerKey,
        consumerSecret: validConfig.consumerSecret,
        version: validConfig.version,
        queryStringAuth: true, // For WordPress.com hosted sites
      });

      this.isConfigured = true;
      console.log('WooCommerce API configured successfully');
    } catch (error) {
      console.error('WooCommerce API configuration error:', error);
      this.isConfigured = false;
    }
  }

  private ensureConfigured() {
    if (!this.isConfigured) {
      throw new Error('WooCommerce API not properly configured. Please check your environment variables.');
    }
  }

  // Product methods
  async getProducts(params: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: number;
    tag?: number;
    featured?: boolean;
    on_sale?: boolean;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<Product[]> {
    this.ensureConfigured();

    try {
      console.log('Fetching products with params:', params);
      const response = await this.api.get('products', params);

      console.log('WooCommerce API response status:', response.status);
      console.log('WooCommerce API response data type:', typeof response.data);
      console.log('WooCommerce API response data:', JSON.stringify(response.data, null, 2));

      // Check if response.data is an array
      if (!Array.isArray(response.data)) {
        console.error('WooCommerce API did not return an array. Response:', response.data);

        // Check if it's an error response
        if (response.data && response.data.code) {
          throw new Error(`WooCommerce API Error: ${response.data.message || response.data.code}`);
        }

        // Return empty array if no products
        return [];
      }

      return response.data.map((product: any) => ProductSchema.parse(product));
    } catch (error) {
      console.error('Error fetching products:', error);

      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
          throw new Error('Cannot connect to WooCommerce store. Please check your store URL.');
        }
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          throw new Error('WooCommerce API authentication failed. Please check your API keys.');
        }
        if (error.message.includes('404')) {
          throw new Error('WooCommerce API endpoint not found. Please check your store configuration.');
        }
      }

      throw new Error('Failed to fetch products from WooCommerce');
    }
  }

  async getProduct(id: number): Promise<Product | null> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.get(`products/${id}`);
      return ProductSchema.parse(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  async searchProducts(query: string, limit: number = 20): Promise<Product[]> {
    return this.getProducts({
      search: query,
      per_page: limit,
      orderby: 'relevance',
    });
  }

  async getFeaturedProducts(limit: number = 12): Promise<Product[]> {
    return this.getProducts({
      featured: true,
      per_page: limit,
      orderby: 'popularity',
      order: 'desc',
    });
  }

  async getProductsByCategory(categoryId: number, limit: number = 20): Promise<Product[]> {
    return this.getProducts({
      category: categoryId,
      per_page: limit,
      orderby: 'popularity',
      order: 'desc',
    });
  }

  async getSaleProducts(limit: number = 20): Promise<Product[]> {
    return this.getProducts({
      on_sale: true,
      per_page: limit,
      orderby: 'popularity',
      order: 'desc',
    });
  }

  // Category methods
  async getCategories(): Promise<any[]> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.get('products/categories', {
        per_page: 100,
        orderby: 'name',
        order: 'asc',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories from WooCommerce');
    }
  }

  // Order methods
  async getOrders(params: {
    page?: number;
    per_page?: number;
    status?: string;
    customer?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<Order[]> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.get('orders', params);
      return response.data.map((order: any) => OrderSchema.parse(order));
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders from WooCommerce');
    }
  }

  async createOrder(orderData: any): Promise<Order> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.post('orders', orderData);
      return OrderSchema.parse(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order in WooCommerce');
    }
  }

  async updateOrder(id: number, orderData: any): Promise<Order> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.put(`orders/${id}`, orderData);
      return OrderSchema.parse(response.data);
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      throw new Error('Failed to update order in WooCommerce');
    }
  }

  // Customer methods
  async getCustomers(): Promise<any[]> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.get('customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Failed to fetch customers from WooCommerce');
    }
  }

  async createCustomer(customerData: any): Promise<any> {
    this.ensureConfigured();
    
    try {
      const response = await this.api.post('customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer in WooCommerce');
    }
  }

  // Webhook verification
  verifyWebhook(signature: string, body: string, secret: string): boolean {
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', secret).update(body).digest('base64');
    return hash === signature;
  }
}

// Singleton instance
export const wooCommerce = new WooCommerceAPI();

// Team-specific product mapping
export const TEAM_CATEGORY_MAPPING = {
  // NFL Teams
  'chiefs': { categoryId: 100, name: 'Kansas City Chiefs' },
  'cowboys': { categoryId: 101, name: 'Dallas Cowboys' },
  'patriots': { categoryId: 102, name: 'New England Patriots' },
  'packers': { categoryId: 103, name: 'Green Bay Packers' },
  'steelers': { categoryId: 104, name: 'Pittsburgh Steelers' },
  'bears': { categoryId: 105, name: 'Chicago Bears' },
  
  // NCAA Teams  
  'crimson-tide': { categoryId: 200, name: 'Alabama Crimson Tide' },
  'buckeyes': { categoryId: 201, name: 'Ohio State Buckeyes' },
  'tigers': { categoryId: 202, name: 'LSU Tigers' },
  'bulldogs': { categoryId: 203, name: 'Georgia Bulldogs' },
};

// Product type mapping
export const PRODUCT_TYPE_MAPPING = {
  'jerseys': { categoryId: 10, name: 'Jerseys' },
  'hats': { categoryId: 11, name: 'Hats & Caps' },
  'shirts': { categoryId: 12, name: 'T-Shirts & Apparel' },
  'accessories': { categoryId: 13, name: 'Accessories' },
  'outerwear': { categoryId: 14, name: 'Outerwear' },
  'ladies': { categoryId: 15, name: 'Ladies Apparel' },
  'pants': { categoryId: 16, name: 'Pants & Shorts' },
};
