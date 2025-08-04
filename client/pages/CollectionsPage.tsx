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
              🏆 Browse All Collections
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Fan Gear
              <span className="block bg-gradient-to-r from-white to-electric-blue-200 bg-clip-text text-transparent">
                Collections
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Explore our complete range of NFL and NCAA gear, organized by category to help you find exactly what you're looking for.
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

      {/* Collections Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection, index) => {
              const Icon = collection.icon;
              return (
                <Link key={index} to={collection.href}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div
                      className={`h-48 bg-gradient-to-br ${collection.gradient} relative`}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {collection.popular && (
                          <Badge className="bg-white/20 text-white border-white/30">
                            Popular
                          </Badge>
                        )}
                        {collection.new && (
                          <Badge className="bg-electric-blue text-white">
                            New
                          </Badge>
                        )}
                      </div>

                      {/* Icon */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Item Count */}
                      <div className="absolute bottom-4 right-4 text-white/80 text-sm font-medium">
                        {collection.itemCount}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        {collection.title}
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-electric-blue group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                      <CardDescription>
                        {collection.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <Button 
                        className="w-full bg-electric-blue hover:bg-electric-blue/90"
                        size="sm"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Browse Collection
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
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
