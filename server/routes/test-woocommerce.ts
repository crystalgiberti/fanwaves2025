import { RequestHandler } from "express";
import { wooCommerce } from "../lib/woocommerce";

export const handleTestWooCommerce: RequestHandler = async (req, res) => {
  try {
    console.log('Testing WooCommerce connection...');
    
    // Check environment variables
    const config = {
      url: process.env.WOOCOMMERCE_URL,
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    };
    
    console.log('WooCommerce config:', {
      url: config.url,
      consumerKey: config.consumerKey ? `${config.consumerKey.substring(0, 8)}...` : 'NOT SET',
      consumerSecret: config.consumerSecret ? `${config.consumerSecret.substring(0, 8)}...` : 'NOT SET',
    });
    
    // Test basic API connection
    try {
      const products = await wooCommerce.getProducts({ per_page: 1 });
      
      res.json({
        status: 'success',
        message: 'WooCommerce API connection successful',
        config: {
          url: config.url,
          hasConsumerKey: !!config.consumerKey,
          hasConsumerSecret: !!config.consumerSecret,
        },
        productCount: products.length,
        sampleProduct: products[0] ? {
          id: products[0].id,
          name: products[0].name,
          price: products[0].price,
        } : null,
      });
      
    } catch (apiError) {
      console.error('WooCommerce API Error:', apiError);
      
      res.status(500).json({
        status: 'error',
        message: 'WooCommerce API connection failed',
        error: apiError instanceof Error ? apiError.message : 'Unknown error',
        config: {
          url: config.url,
          hasConsumerKey: !!config.consumerKey,
          hasConsumerSecret: !!config.consumerSecret,
        },
      });
    }
    
  } catch (error) {
    console.error('Test WooCommerce error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to test WooCommerce connection',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
