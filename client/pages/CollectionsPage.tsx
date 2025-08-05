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
import { Link } from "react-router-dom";
import { useWooCommerce } from "@/hooks/useWooCommerce";
import {
  ShoppingBag,
  ArrowRight,
  Star,
  Heart,
  Filter,
  Grid3X3,
  TrendingUp,
} from "lucide-react";

export default function CollectionsPage() {
  const { products, loading, error, fetchProducts } = useWooCommerce();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [displayProducts, setDisplayProducts] = useState(products);

  useEffect(() => {
    fetchProducts({ limit: 50, orderby: 'popularity', order: 'desc' });
  }, []);

  useEffect(() => {
    if (selectedFilter === 'all') {
      setDisplayProducts(products);
    } else if (selectedFilter === 'featured') {
      setDisplayProducts(products.filter(p => p.featured));
    } else if (selectedFilter === 'sale') {
      setDisplayProducts(products.filter(p => p.on_sale));
    } else {
      // Filter by category
      setDisplayProducts(products.filter(p =>
        p.categories.some(cat => cat.slug.includes(selectedFilter))
      ));
    }
  }, [products, selectedFilter]);

  const filters = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'featured', label: 'Featured', count: products.filter(p => p.featured).length },
    { id: 'sale', label: 'On Sale', count: products.filter(p => p.on_sale).length },
    { id: 'hats', label: 'Hats & Caps', count: products.filter(p => p.categories.some(cat => cat.slug.includes('hat'))).length },
    { id: 'jerseys', label: 'Jerseys', count: products.filter(p => p.categories.some(cat => cat.slug.includes('jersey'))).length },
    { id: 'accessories', label: 'Accessories', count: products.filter(p => p.categories.some(cat => cat.slug.includes('access'))).length },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-electric-blue via-fan-blue-600 to-fan-blue-800">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container relative mx-auto px-4 py-8 md:py-16">
          <div className="text-center text-white">
            <Badge className="w-fit bg-white/20 text-white border-white/30 hover:bg-white/30 mb-4">
              🛍️ Shop All Products
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Fan Gear
              <span className="block bg-gradient-to-r from-white to-electric-blue-200 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              {error ? 'Browse our complete selection of fan gear and merchandise' : `Discover ${products.length} amazing products from your WooCommerce store`}
            </p>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-auto text-background fill-current"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={selectedFilter === filter.id ? "bg-electric-blue hover:bg-electric-blue/90" : ""}
              >
                <Filter className="mr-2 h-3 w-3" />
                {filter.label}
                {filter.count > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 text-xs">
                    {filter.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Store Connection Status */}
          {error && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                🏪 Showing sample products - Connect your WooCommerce store to see your real inventory
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Add products in your WooCommerce admin to see them here automatically.
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product) => {
                const originalPrice = parseFloat(product.regular_price || product.price);
                const salePrice = parseFloat(product.sale_price || product.price);
                const rating = parseFloat(product.average_rating || '0');

                // Determine badge text
                let badgeText = '';
                let badgeColor = 'bg-electric-blue text-white';

                if (product.featured) {
                  badgeText = 'Featured';
                } else if (product.on_sale) {
                  badgeText = 'Sale';
                  badgeColor = 'bg-red-500 text-white';
                } else if (product.rating_count > 50) {
                  badgeText = 'Popular';
                  badgeColor = 'bg-orange-500 text-white';
                }

                return (
                  <Card
                    key={product.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={product.images[0]?.src || "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142"}
                        alt={product.images[0]?.alt || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142";
                        }}
                      />
                      {badgeText && (
                        <Badge className={`absolute top-2 left-2 ${badgeColor}`}>
                          {badgeText}
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
                        {product.name}
                      </CardTitle>

                      {rating > 0 && (
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {rating.toFixed(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({product.rating_count})
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-electric-blue">
                            ${product.on_sale ? salePrice.toFixed(2) : originalPrice.toFixed(2)}
                          </span>
                          {product.on_sale && originalPrice > salePrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-electric-blue hover:bg-electric-blue/90"
                          asChild
                        >
                          <a href="https://fanwaves.fun/shop/" target="_blank" rel="noopener noreferrer">
                            <ShoppingBag className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && displayProducts.length === 0 && (
            <div className="text-center py-12">
              <Grid3X3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {selectedFilter === 'all'
                  ? 'Add products to your WooCommerce store to see them here'
                  : `No products found in the ${filters.find(f => f.id === selectedFilter)?.label} category`
                }
              </p>
              <Button variant="outline" asChild>
                <a href="https://fanwaves.fun/wp-admin/admin.php?page=wc-admin&task=products" target="_blank" rel="noopener noreferrer">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Manage Products
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">
              Why Choose Fan Waves?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're the trusted choice for thousands of fans across the country
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue mb-2">1000+</div>
              <div className="text-muted-foreground">Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue mb-2">32</div>
              <div className="text-muted-foreground">NFL Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue mb-2">100+</div>
              <div className="text-muted-foreground">NCAA Schools</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
