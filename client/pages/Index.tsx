import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Truck, Shield, Heart, TrendingUp } from 'lucide-react';

export default function Index() {
  const featuredCategories = [
    {
      title: 'NFL Gear',
      description: 'Official team merchandise',
      image: '/placeholder.svg',
      href: '/nfl',
      gradient: 'from-team-red-500 to-team-red-700'
    },
    {
      title: 'NCAA Gear',
      description: 'College team favorites',
      image: '/placeholder.svg',
      href: '/ncaa',
      gradient: 'from-team-orange-500 to-team-orange-700'
    },
    {
      title: 'Hats & Caps',
      description: 'Top off your look',
      image: '/placeholder.svg',
      href: '/hats',
      gradient: 'from-fan-blue-500 to-fan-blue-700'
    },
    {
      title: 'Custom Gear',
      description: 'Make it uniquely yours',
      image: '/placeholder.svg',
      href: '/custom',
      gradient: 'from-team-green-500 to-team-green-700'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Championship Hat',
      price: 29.99,
      originalPrice: 39.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 124,
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Team Jersey Pro',
      price: 89.99,
      originalPrice: 109.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 89,
      badge: 'New'
    },
    {
      id: 3,
      name: 'Fan Chain Deluxe',
      price: 19.99,
      originalPrice: 24.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 156,
      badge: 'Hot'
    },
    {
      id: 4,
      name: 'Terrible Towel Set',
      price: 15.99,
      originalPrice: 19.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 203,
      badge: 'Sale'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-electric-blue via-fan-blue-600 to-fan-blue-800">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container relative mx-auto px-4 py-3 md:py-32">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-6 text-white">
              <Badge className="w-fit bg-white/20 text-white border-white/30 hover:bg-white/30">
                🎉 New Season, New Gear!
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Ride the
                <span className="block bg-gradient-to-r from-white to-electric-blue-200 bg-clip-text text-transparent">
                  FAN WAVES
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Your ultimate destination for NFL and NCAA fan gear. Hats, jerseys, accessories, and custom gear to show your team spirit!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-fan-blue-800 hover:bg-blue-50" asChild>
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent" asChild>
                  <Link to="/products">
                    Browse Collections
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-blue-200">Happy Fans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm text-blue-200">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm text-blue-200">Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image - Mascot */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://cdn.builder.io/api/v1/assets/87091a742c05463799bae52525d7477c/fanwavesriff-c84096?format=webp&width=800"
                  alt="Fan Waves Mascot"
                  className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/30 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-auto text-background fill-current">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background mb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $350</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Authentic Gear</h3>
                <p className="text-sm text-muted-foreground">Official licensed products</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Custom Options</h3>
                <p className="text-sm text-muted-foreground">Loved by thousands of fans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-muted/30 -mb-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Shop by Category
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Find the perfect gear for your favorite teams across NFL and NCAA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-48 bg-gradient-to-br ${category.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{category.title}</h3>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Trending Now
              </h2>
              <p className="text-muted-foreground mt-2">
                Most popular items this week
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142"
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-electric-blue text-white">
                        {product.badge}
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
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base font-semibold mb-2">{product.name}</CardTitle>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-electric-blue">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-electric-blue to-fan-blue-600 -mb-1">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Ready to Show Your Team Spirit?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of fans who trust Fan Waves for their game day gear. From championship hats to custom fan chains, we've got everything you need to ride the wave!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-fan-blue-800 hover:bg-blue-50" asChild>
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent" asChild>
                <Link to="/custom">
                  Create Custom Gear
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
