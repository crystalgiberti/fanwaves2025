import { RequestHandler } from "express";
import { wooCommerce, TEAM_CATEGORY_MAPPING, PRODUCT_TYPE_MAPPING } from "../lib/woocommerce";
import { z } from "zod";

// Request schemas
const ProductQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(20),
  search: z.string().optional(),
  category: z.string().optional(),
  team: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  on_sale: z.coerce.boolean().optional(),
  orderby: z.string().optional().default('popularity'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

const OrderCreateSchema = z.object({
  customer_id: z.number().optional(),
  billing: z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string().optional(),
    address_1: z.string(),
    address_2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  shipping: z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string().optional(),
    address_1: z.string(),
    address_2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
  }).optional(),
  line_items: z.array(z.object({
    product_id: z.number(),
    variation_id: z.number().optional(),
    quantity: z.number(),
  })),
  shipping_lines: z.array(z.object({
    method_id: z.string(),
    method_title: z.string(),
    total: z.string(),
  })).optional(),
  payment_method: z.string().optional(),
  payment_method_title: z.string().optional(),
  set_paid: z.boolean().optional(),
  customer_note: z.string().optional(),
  meta_data: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
});

// Get products with Fan Waves specific filtering
export const handleGetProducts: RequestHandler = async (req, res) => {
  console.log('handleGetProducts called with query:', req.query);

  // Parse query parameters first so they're available in error handling
  const query = ProductQuerySchema.parse(req.query);

  try {

    let categoryId: number | undefined;

    // Map team to category ID
    if (query.team && TEAM_CATEGORY_MAPPING[query.team as keyof typeof TEAM_CATEGORY_MAPPING]) {
      categoryId = TEAM_CATEGORY_MAPPING[query.team as keyof typeof TEAM_CATEGORY_MAPPING].categoryId;
    }
    // Map product category to category ID
    else if (query.category && PRODUCT_TYPE_MAPPING[query.category as keyof typeof PRODUCT_TYPE_MAPPING]) {
      categoryId = PRODUCT_TYPE_MAPPING[query.category as keyof typeof PRODUCT_TYPE_MAPPING].categoryId;
    }

    console.log('Calling wooCommerce.getProducts with params:', {
      page: query.page,
      per_page: query.limit,
      search: query.search,
      category: categoryId,
      featured: query.featured,
      on_sale: query.on_sale,
      orderby: query.orderby,
      order: query.order,
    });

    const products = await wooCommerce.getProducts({
      page: query.page,
      per_page: query.limit,
      search: query.search,
      category: categoryId,
      featured: query.featured,
      on_sale: query.on_sale,
      orderby: query.orderby,
      order: query.order,
    });

    // Transform products for Fan Waves frontend
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.short_description || product.description,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      featured: product.featured,
      image: product.images[0]?.src || '/placeholder.svg',
      images: product.images.map(img => ({
        id: img.id,
        src: img.src,
        alt: img.alt || product.name,
      })),
      categories: product.categories,
      tags: product.tags,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      average_rating: parseFloat(product.average_rating) || 0,
      rating_count: product.rating_count,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions,
      attributes: product.attributes,
      variations: product.variations,
      meta_data: product.meta_data,
    }));

    res.json({
      products: transformedProducts,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: transformedProducts.length,
        has_more: transformedProducts.length === query.limit,
      },
      filters: {
        team: query.team,
        category: query.category,
        featured: query.featured,
        on_sale: query.on_sale,
      },
    });

  } catch (error) {
    console.error('Error in handleGetProducts:', error);
    console.log('🔄 Falling back to mock data for development...');

    // Return mock data instead of error during development
    const mockProducts = [
      {
        id: 1,
        name: 'Championship Hat',
        slug: 'championship-hat',
        description: 'Official championship hat with team embroidery',
        price: '29.99',
        regular_price: '39.99',
        sale_price: '29.99',
        on_sale: true,
        featured: true,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
        images: [{
          id: 1,
          src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
          alt: 'Championship Hat'
        }],
        categories: [{ id: 11, name: 'Hats & Caps', slug: 'hats' }],
        tags: [],
        stock_status: 'instock',
        stock_quantity: 10,
        average_rating: 4.8,
        rating_count: 124,
        sku: 'HAT-001',
        weight: '0.2',
        dimensions: { length: '', width: '', height: '' },
        attributes: [],
        variations: [],
        meta_data: [],
      },
      {
        id: 2,
        name: 'Team Jersey Pro',
        slug: 'team-jersey-pro',
        description: 'Professional quality team jersey',
        price: '89.99',
        regular_price: '109.99',
        sale_price: '89.99',
        on_sale: true,
        featured: true,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
        images: [{
          id: 2,
          src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
          alt: 'Team Jersey Pro'
        }],
        categories: [{ id: 10, name: 'Jerseys', slug: 'jerseys' }],
        tags: [],
        stock_status: 'instock',
        stock_quantity: 5,
        average_rating: 4.9,
        rating_count: 89,
        sku: 'JER-001',
        weight: '0.3',
        dimensions: { length: '', width: '', height: '' },
        attributes: [],
        variations: [],
        meta_data: [],
      },
      {
        id: 3,
        name: 'Fan Chain Deluxe',
        slug: 'fan-chain-deluxe',
        description: 'Premium fan chain with team logo',
        price: '19.99',
        regular_price: '24.99',
        sale_price: '19.99',
        on_sale: true,
        featured: false,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
        images: [{
          id: 3,
          src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
          alt: 'Fan Chain Deluxe'
        }],
        categories: [{ id: 13, name: 'Accessories', slug: 'accessories' }],
        tags: [],
        stock_status: 'instock',
        stock_quantity: 15,
        average_rating: 4.7,
        rating_count: 156,
        sku: 'ACC-001',
        weight: '0.1',
        dimensions: { length: '', width: '', height: '' },
        attributes: [],
        variations: [],
        meta_data: [],
      },
      {
        id: 4,
        name: 'Terrible Towel Set',
        slug: 'terrible-towel-set',
        description: 'Classic team terrible towel set',
        price: '15.99',
        regular_price: '19.99',
        sale_price: '15.99',
        on_sale: true,
        featured: false,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
        images: [{
          id: 4,
          src: 'https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142',
          alt: 'Terrible Towel Set'
        }],
        categories: [{ id: 13, name: 'Accessories', slug: 'accessories' }],
        tags: [],
        stock_status: 'instock',
        stock_quantity: 20,
        average_rating: 4.6,
        rating_count: 203,
        sku: 'TOW-001',
        weight: '0.15',
        dimensions: { length: '', width: '', height: '' },
        attributes: [],
        variations: [],
        meta_data: [],
      }
    ];

    // Filter featured products if requested
    const filteredProducts = query.featured
      ? mockProducts.filter(p => p.featured)
      : mockProducts;

    console.log(`✅ Sending ${filteredProducts.length} mock products to frontend`);

    const response = {
      products: filteredProducts.slice(0, query.limit),
      pagination: {
        page: query.page,
        limit: query.limit,
        total: filteredProducts.length,
        has_more: false,
      },
      filters: {
        team: query.team,
        category: query.category,
        featured: query.featured,
        on_sale: query.on_sale,
      },
      mock_data: true,
      message: 'Using mock data - WooCommerce store integration pending'
    };

    res.status(200).json(response);
    return; // Ensure we don't continue execution
  }
};

// Get single product
export const handleGetProduct: RequestHandler = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await wooCommerce.getProduct(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Transform product for Fan Waves frontend
    const transformedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      short_description: product.short_description,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      featured: product.featured,
      images: product.images.map(img => ({
        id: img.id,
        src: img.src,
        alt: img.alt || product.name,
      })),
      categories: product.categories,
      tags: product.tags,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      manage_stock: product.manage_stock,
      average_rating: parseFloat(product.average_rating) || 0,
      rating_count: product.rating_count,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions,
      attributes: product.attributes,
      variations: product.variations,
      related_ids: product.related_ids,
      upsell_ids: product.upsell_ids,
      cross_sell_ids: product.cross_sell_ids,
      purchase_note: product.purchase_note,
      meta_data: product.meta_data,
    };

    res.json(transformedProduct);

  } catch (error) {
    console.error('Error in handleGetProduct:', error);
    res.status(500).json({ 
      error: 'Failed to fetch product',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get team-specific products
export const handleGetTeamProducts: RequestHandler = async (req, res) => {
  try {
    const { teamSlug } = req.params;
    const query = ProductQuerySchema.parse(req.query);
    
    if (!TEAM_CATEGORY_MAPPING[teamSlug as keyof typeof TEAM_CATEGORY_MAPPING]) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const teamInfo = TEAM_CATEGORY_MAPPING[teamSlug as keyof typeof TEAM_CATEGORY_MAPPING];
    
    const products = await wooCommerce.getProductsByCategory(
      teamInfo.categoryId,
      query.limit
    );

    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      image: product.images[0]?.src || '/placeholder.svg',
      stock_status: product.stock_status,
      average_rating: parseFloat(product.average_rating) || 0,
      rating_count: product.rating_count,
    }));

    res.json({
      team: teamInfo.name,
      team_slug: teamSlug,
      products: transformedProducts,
      total: transformedProducts.length,
    });

  } catch (error) {
    console.error('Error in handleGetTeamProducts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch team products',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get featured products
export const handleGetFeaturedProducts: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 12;
    
    const products = await wooCommerce.getFeaturedProducts(limit);
    
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      image: product.images[0]?.src || '/placeholder.svg',
      average_rating: parseFloat(product.average_rating) || 0,
      rating_count: product.rating_count,
      categories: product.categories,
    }));

    res.json({
      products: transformedProducts,
      total: transformedProducts.length,
    });

  } catch (error) {
    console.error('Error in handleGetFeaturedProducts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch featured products',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get sale products
export const handleGetSaleProducts: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    
    const products = await wooCommerce.getSaleProducts(limit);
    
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      image: product.images[0]?.src || '/placeholder.svg',
      average_rating: parseFloat(product.average_rating) || 0,
      rating_count: product.rating_count,
      categories: product.categories,
      discount_percentage: product.regular_price && product.sale_price 
        ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)
        : 0,
    }));

    res.json({
      products: transformedProducts,
      total: transformedProducts.length,
    });

  } catch (error) {
    console.error('Error in handleGetSaleProducts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch sale products',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Search products
export const handleSearchProducts: RequestHandler = async (req, res) => {
  try {
    const { q: query } = req.query;
    const limit = parseInt(req.query.limit as string) || 20;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await wooCommerce.searchProducts(query, limit);
    
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      image: product.images[0]?.src || '/placeholder.svg',
      average_rating: parseFloat(product.average_rating) || 0,
      rating_count: product.rating_count,
      categories: product.categories,
    }));

    res.json({
      query,
      products: transformedProducts,
      total: transformedProducts.length,
    });

  } catch (error) {
    console.error('Error in handleSearchProducts:', error);
    res.status(500).json({ 
      error: 'Failed to search products',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get categories
export const handleGetCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await wooCommerce.getCategories();
    
    res.json({
      categories: categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image ? cat.image.src : null,
        count: cat.count,
        parent: cat.parent,
      })),
      total: categories.length,
    });

  } catch (error) {
    console.error('Error in handleGetCategories:', error);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create order
export const handleCreateOrder: RequestHandler = async (req, res) => {
  try {
    const orderData = OrderCreateSchema.parse(req.body);
    
    const order = await wooCommerce.createOrder(orderData);
    
    res.status(201).json({
      id: order.id,
      number: order.number,
      status: order.status,
      total: order.total,
      currency: order.currency,
      date_created: order.date_created,
      payment_method: order.payment_method,
      billing: order.billing,
      shipping: order.shipping,
      line_items: order.line_items,
    });

  } catch (error) {
    console.error('Error in handleCreateOrder:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Webhook handler for WooCommerce events
export const handleWebhook: RequestHandler = async (req, res) => {
  try {
    const signature = req.headers['x-wc-webhook-signature'] as string;
    const body = JSON.stringify(req.body);
    const secret = process.env.WOOCOMMERCE_WEBHOOK_SECRET || '';

    // Skip signature verification in development or if no secret is set
    const shouldVerifySignature = secret && process.env.NODE_ENV === 'production';

    if (shouldVerifySignature && !wooCommerce.verifyWebhook(signature, body, secret)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const event = req.headers['x-wc-webhook-event'] as string;
    const topic = req.headers['x-wc-webhook-topic'] as string;

    console.log(`🔔 WooCommerce webhook received: ${topic} - ${event}`);
    console.log('📦 Product data:', {
      id: req.body.id,
      name: req.body.name,
      status: req.body.status,
      featured: req.body.featured
    });

    // Handle different webhook events
    switch (topic) {
      case 'product.created':
        console.log('✅ New product created:', req.body.name || req.body.id);
        // Could trigger cache refresh or notify frontend
        // In the future: notifyFrontend('product_created', req.body);
        break;

      case 'product.updated':
        console.log('🔄 Product updated:', req.body.name || req.body.id);
        // Could trigger cache refresh
        // In the future: invalidateProductCache(req.body.id);
        break;

      case 'product.deleted':
        console.log('🗑️ Product deleted:', req.body.id);
        // Could trigger cache cleanup
        break;

      case 'order.created':
        console.log('🛒 New order created:', req.body.id);
        // Handle new order notifications
        break;

      case 'order.updated':
        console.log('📋 Order updated:', req.body.id, 'Status:', req.body.status);
        // Handle order status changes
        break;

      default:
        console.log(`ℹ️ Unhandled webhook topic: ${topic}`);
    }

    // Log webhook for monitoring
    console.log(`🎯 Webhook processed successfully: ${topic}`);

    res.status(200).json({
      received: true,
      topic,
      event,
      processed: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in handleWebhook:', error);
    res.status(500).json({
      error: 'Webhook processing failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      topic: req.headers['x-wc-webhook-topic'],
      timestamp: new Date().toISOString()
    });
  }
};
