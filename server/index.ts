import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleImageSearch } from "./routes/search-images";
import { handleTestWooCommerce } from "./routes/test-woocommerce";
import { handlePOSFormSubmission } from "./routes/pos-form";
import {
  handleGetProducts,
  handleGetProduct,
  handleGetTeamProducts,
  handleGetFeaturedProducts,
  handleGetSaleProducts,
  handleSearchProducts,
  handleGetCategories,
  handleCreateOrder,
  handleWebhook,
} from "./routes/woocommerce";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Debug endpoint to test communication
  app.get("/api/debug/products", (_req, res) => {
    console.log("🧪 Debug endpoint called - sending simple mock data");
    res.status(200).json({
      products: [
        { id: 1, name: "Test Product", price: "10.00", featured: true }
      ],
      mock_data: true,
      message: "Debug endpoint working"
    });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/search-images", handleImageSearch);
  app.get("/api/test-woocommerce", handleTestWooCommerce);
  app.post("/api/pos-form", handlePOSFormSubmission);

  // WooCommerce API routes
  app.get("/api/products", handleGetProducts);
  app.get("/api/products/featured", handleGetFeaturedProducts);
  app.get("/api/products/sale", handleGetSaleProducts);
  app.get("/api/products/search", handleSearchProducts);
  app.get("/api/products/:id", handleGetProduct);
  app.get("/api/teams/:teamSlug/products", handleGetTeamProducts);
  app.get("/api/categories", handleGetCategories);
  app.post("/api/orders", handleCreateOrder);
  app.post("/api/webhooks/woocommerce", handleWebhook);

  return app;
}
