import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useWooCommerce } from "@/hooks/useWooCommerce";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  ExternalLink,
  Database,
  ShoppingCart,
  Zap
} from "lucide-react";

export default function StatusPage() {
  const { products, categories, loading, error, fetchProducts, fetchCategories } = useWooCommerce();
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts({ limit: 100 });
    fetchCategories();
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    await Promise.all([
      fetchProducts({ limit: 100 }),
      fetchCategories()
    ]);
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const getStatusBadge = (isWorking: boolean, isLoading: boolean) => {
    if (isLoading) return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Loading</Badge>;
    if (isWorking) return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
    return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Error</Badge>;
  };

  const featuredProducts = products.filter(p => p.featured);
  const onSaleProducts = products.filter(p => p.on_sale);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">System Status</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your Fan Waves integration status
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            disabled={isRefreshing}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* WooCommerce Connection */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">WooCommerce Store</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                {getStatusBadge(!error, loading)}
              </div>
              <p className="text-xs text-muted-foreground">
                {error ? 'Connection failed' : 'Store connected'}
              </p>
              <Button 
                variant="link" 
                size="sm" 
                asChild 
                className="h-auto p-0 mt-2"
              >
                <a href="https://fanwaves.fun/shop/wp-admin/" target="_blank" rel="noopener noreferrer">
                  Open Admin <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Products Count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {featuredProducts.length} featured, {onSaleProducts.length} on sale
              </p>
            </CardContent>
          </Card>

          {/* Categories Count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">
                Product categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Error Details */}
        {error && (
          <Card className="mb-8 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Connection Issue</CardTitle>
              <CardDescription>
                Having trouble connecting to your WooCommerce store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Troubleshooting Steps:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check WooCommerce API keys are configured</li>
                  <li>• Ensure your store URL is correct</li>
                  <li>• Verify WooCommerce REST API is enabled</li>
                  <li>• Add some products to your store</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Featured Products</CardTitle>
              <CardDescription>
                Products that appear in "Trending Now" section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {featuredProducts.slice(0, 5).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">${product.price}</span>
                    </div>
                    {product.on_sale && <Badge variant="secondary">Sale</Badge>}
                  </div>
                ))}
                {featuredProducts.length > 5 && (
                  <p className="text-sm text-muted-foreground">
                    ...and {featuredProducts.length - 5} more
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>
                Categories available in your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map(category => (
                  <div key={category.id} className="p-2 bg-muted rounded text-sm">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-muted-foreground">{category.count} products</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Connection Details</h4>
                <div className="space-y-1 text-muted-foreground">
                  <div>Store URL: https://fanwaves.fun/shop/</div>
                  <div>API Version: WC/v3</div>
                  <div>Last Refresh: {lastRefresh.toLocaleTimeString()}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Integration Status</h4>
                <div className="space-y-1 text-muted-foreground">
                  <div>Product Sync: {error ? 'Fallback Mode' : 'Active'}</div>
                  <div>Real-time Updates: {error ? 'Disabled' : 'Enabled'}</div>
                  <div>Cache: 5 minutes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
