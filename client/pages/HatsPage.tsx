import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, Filter, Grid3X3, List, ShoppingBag, Truck, Shield } from 'lucide-react';
import { useState } from 'react';

export default function HatsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterStyle, setFilterStyle] = useState('all');

  // Most popular hats based on current trends
  const featuredProducts = [
    // Kansas City Chiefs (Most Popular NFL Team)
    {
      id: 1,
      name: 'Chiefs Super Bowl Champions Snapback Hat',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      price: 34.99,
      originalPrice: 44.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 3251,
      badge: 'Bestseller',
      description: 'Official Super Bowl Champions snapback with embroidered logos and adjustable fit',
      style: 'Snapback',
      sizes: ['One Size'],
      colors: ['Red', 'Gold', 'White'],
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    {
      id: 2,
      name: 'Chiefs Arrowhead 59FIFTY Fitted Cap',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      price: 39.99,
      originalPrice: 49.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 2847,
      badge: 'New Era',
      description: 'Official New Era 59FIFTY fitted cap with authentic team colors and logo',
      style: 'Fitted',
      sizes: ['7', '7 1/8', '7 1/4', '7 3/8', '7 1/2', '7 5/8', '7 3/4'],
      colors: ['Red', 'Gold'],
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    // Dallas Cowboys (2nd Most Popular NFL Team)
    {
      id: 3,
      name: 'Cowboys America\'s Team Dad Hat',
      team: 'Dallas Cowboys',
      league: 'NFL',
      price: 26.99,
      originalPrice: 32.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 2156,
      badge: 'Fan Favorite',
      description: 'Relaxed fit dad hat with vintage Cowboys star logo and curved brim',
      style: 'Dad Hat',
      sizes: ['One Size'],
      colors: ['Navy', 'Silver', 'White'],
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    {
      id: 4,
      name: 'Cowboys Star Logo Beanie',
      team: 'Dallas Cowboys',
      league: 'NFL',
      price: 22.99,
      originalPrice: 27.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 1834,
      badge: 'Winter Ready',
      description: 'Warm knit beanie with embroidered Cowboys star, perfect for cold games',
      style: 'Beanie',
      sizes: ['One Size'],
      colors: ['Navy', 'Gray'],
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    // Alabama Crimson Tide (Most Popular NCAA Team)
    {
      id: 5,
      name: 'Alabama National Champions Trucker Hat',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      price: 29.99,
      originalPrice: 36.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 1456,
      badge: 'Championship',
      description: 'Mesh trucker hat celebrating Alabama\'s championship legacy with vintage styling',
      style: 'Trucker',
      sizes: ['One Size'],
      colors: ['Crimson', 'White'],
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    {
      id: 6,
      name: 'Alabama Elephant Logo Bucket Hat',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      price: 24.99,
      originalPrice: 31.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 987,
      badge: 'Trending',
      description: 'Classic bucket hat featuring the Alabama elephant mascot, great for outdoor events',
      style: 'Bucket',
      sizes: ['S/M', 'L/XL'],
      colors: ['Crimson', 'Gray'],
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    // Ohio State Buckeyes (2nd Most Popular NCAA Team)
    {
      id: 7,
      name: 'Ohio State Block O Fitted Cap',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      price: 36.99,
      originalPrice: 44.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 823,
      badge: 'Classic',
      description: 'Premium fitted cap with the iconic Block O logo in team colors',
      style: 'Fitted',
      sizes: ['7', '7 1/8', '7 1/4', '7 3/8', '7 1/2', '7 5/8'],
      colors: ['Scarlet', 'Gray'],
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    },
    {
      id: 8,
      name: 'Buckeyes Vintage Snapback',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      price: 31.99,
      originalPrice: 38.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 645,
      badge: 'Retro',
      description: 'Vintage-inspired snapback with throwback Ohio State design and flat brim',
      style: 'Snapback',
      sizes: ['One Size'],
      colors: ['Scarlet', 'Black'],
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    }
  ];

  const styles = [
    { name: 'All Styles', value: 'all', count: 8, icon: '🧢' },
    { name: 'Snapback', value: 'snapback', count: 2, icon: '🎯' },
    { name: 'Fitted', value: 'fitted', count: 2, icon: '📏' },
    { name: 'Dad Hat', value: 'dad-hat', count: 1, icon: '👨' },
    { name: 'Trucker', value: 'trucker', count: 1, icon: '🚛' },
    { name: 'Bucket', value: 'bucket', count: 1, icon: '🪣' },
    { name: 'Beanie', value: 'beanie', count: 1, icon: '🧣' }
  ];

  const teams = ['All Teams', 'Kansas City Chiefs', 'Dallas Cowboys', 'Alabama Crimson Tide', 'Ohio State Buckeyes'];

  const filteredProducts = featuredProducts.filter(product => {
    if (filterTeam !== 'all' && product.team !== filterTeam) return false;
    if (filterStyle !== 'all' && product.style.toLowerCase().replace(' ', '-') !== filterStyle) return false;
    return true;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-team-red via-electric-blue to-team-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🧢 Official Team Headwear
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Team Hats & Caps
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Top off your team spirit with authentic hats and caps. From fitted caps to cozy beanies, find the perfect headwear for every season and style.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-red-200">Hat Styles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-red-200">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-red-200">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hat Styles Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Style</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {styles.map((style, index) => (
              <Card 
                key={index} 
                className={`text-center cursor-pointer transition-all ${
                  filterStyle === style.value ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                }`}
                onClick={() => setFilterStyle(style.value)}
              >
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <div className="text-sm font-semibold mb-1">{style.name}</div>
                  <div className="text-xs text-muted-foreground">{style.count} items</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Select value={filterTeam} onValueChange={setFilterTeam}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.slice(1).map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {featuredProducts.length} products
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge 
                        className="absolute top-2 left-2 text-white"
                        style={{ backgroundColor: product.teamColors.primary }}
                      >
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
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-2 left-2 bg-white/90 text-gray-900"
                    >
                      {product.league}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="absolute bottom-2 right-2 bg-white/90 text-gray-900 border-gray-300"
                    >
                      {product.style}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs mb-2"
                      style={{ borderColor: product.teamColors.primary, color: product.teamColors.primary }}
                    >
                      {product.team}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  
                  <CardDescription className="text-sm mb-3 line-clamp-2">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span 
                      className="text-lg font-bold"
                      style={{ color: product.teamColors.primary }}
                    >
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </div>
                  
                  {/* Colors */}
                  <div className="mb-3">
                    <div className="text-xs text-muted-foreground mb-1">Colors:</div>
                    <div className="flex space-x-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ 
                            backgroundColor: color === 'Red' || color === 'Crimson' || color === 'Scarlet' ? '#DC2626' :
                                           color === 'Gold' ? '#FFB81C' :
                                           color === 'Navy' ? '#1E40AF' :
                                           color === 'White' ? '#FFFFFF' :
                                           color === 'Silver' || color === 'Gray' ? '#9CA3AF' :
                                           color === 'Black' ? '#000000' : '#6B7280'
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Available Sizes: {product.sizes.length > 3 ? `${product.sizes.slice(0, 3).join(', ')}...` : product.sizes.join(', ')}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    style={{ backgroundColor: product.teamColors.primary }}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $35</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Official Licensed</h3>
                <p className="text-sm text-muted-foreground">Authentic team merchandise</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Perfect Fit</h3>
                <p className="text-sm text-muted-foreground">Size guide available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 text-center">
        <Button variant="outline" size="lg">
          Load More Hats
        </Button>
      </section>
    </Layout>
  );
}
