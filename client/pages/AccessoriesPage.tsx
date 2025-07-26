import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, Filter, Grid3X3, List, ShoppingBag, Truck, Shield } from 'lucide-react';
import { useState } from 'react';

export default function AccessoriesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterTeam, setFilterTeam] = useState('all');

  // Most popular accessories based on current trends
  const featuredProducts = [
    // Kansas City Chiefs (Most Popular NFL Team)
    {
      id: 1,
      name: 'Chiefs Kingdom Lanyard with Detachable Keychain',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      price: 12.99,
      originalPrice: 16.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 2847,
      badge: 'Bestseller',
      description: 'Official Chiefs lanyard with breakaway safety feature and team logo keychain',
      colors: ['Red', 'Gold'],
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    {
      id: 2,
      name: 'Chiefs Arrowhead Stadium Seat Cushion',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      price: 24.99,
      originalPrice: 29.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 1923,
      badge: 'Hot',
      description: 'Weather-resistant stadium seat cushion with tie straps and team graphics',
      colors: ['Red', 'White'],
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    // Dallas Cowboys (2nd Most Popular NFL Team)
    {
      id: 3,
      name: 'Cowboys Star Logo Car Emblem Set',
      team: 'Dallas Cowboys',
      league: 'NFL',
      price: 19.99,
      originalPrice: 24.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 1654,
      badge: 'New',
      description: 'Chrome-finish car emblems featuring the iconic Cowboys star logo',
      colors: ['Chrome', 'Blue'],
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    {
      id: 4,
      name: 'Cowboys America\'s Team Phone Wallet',
      team: 'Dallas Cowboys',
      league: 'NFL',
      price: 16.99,
      originalPrice: 21.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 1342,
      badge: 'Sale',
      description: 'Magnetic phone wallet with RFID blocking and Cowboys logo',
      colors: ['Navy', 'Silver'],
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    // Alabama Crimson Tide (Most Popular NCAA Team)
    {
      id: 5,
      name: 'Alabama Crimson Tide Championship Banner',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      price: 34.99,
      originalPrice: 44.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 987,
      badge: 'Limited',
      description: 'Premium indoor/outdoor banner celebrating Alabama\'s championship legacy',
      colors: ['Crimson', 'White'],
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    {
      id: 6,
      name: 'Alabama Elephant Mascot Plush Keychain',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      price: 14.99,
      originalPrice: 18.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 756,
      badge: 'Trending',
      description: 'Adorable Big Al mascot keychain with authentic team colors',
      colors: ['Crimson', 'Gray'],
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    // Ohio State Buckeyes (2nd Most Popular NCAA Team)
    {
      id: 7,
      name: 'Ohio State Buckeyes Bottle Opener Keychain',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      price: 11.99,
      originalPrice: 15.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 623,
      badge: 'Popular',
      description: 'Stainless steel bottle opener with Ohio State logo and keyring',
      colors: ['Scarlet', 'Gray'],
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    },
    {
      id: 8,
      name: 'Buckeyes Game Day Cooler Bag',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      price: 29.99,
      originalPrice: 39.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 445,
      badge: 'Best Value',
      description: 'Insulated cooler bag perfect for tailgating with Ohio State branding',
      colors: ['Scarlet', 'Black'],
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    }
  ];

  const categories = [
    { name: 'Keychains & Lanyards', count: 45, icon: '🔑' },
    { name: 'Phone Cases & Wallets', count: 32, icon: '📱' },
    { name: 'Car Accessories', count: 28, icon: '🚗' },
    { name: 'Bags & Backpacks', count: 38, icon: '🎒' },
    { name: 'Banners & Flags', count: 41, icon: '🏁' },
    { name: 'Collectibles', count: 52, icon: '🏆' },
    { name: 'Stadium Gear', count: 24, icon: '🏟️' },
    { name: 'Drinkware', count: 67, icon: '🥤' }
  ];

  const teams = ['All Teams', 'Kansas City Chiefs', 'Dallas Cowboys', 'Alabama Crimson Tide', 'Ohio State Buckeyes'];

  const filteredProducts = filterTeam === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.team === filterTeam);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-electric-blue via-fan-blue-600 to-team-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🎯 Fan Accessories & Gear
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Team Accessories
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Complete your fan gear collection with authentic team accessories. From keychains to car emblems, show your team pride everywhere you go.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">300+</div>
                <div className="text-sm text-blue-200">Accessories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-200">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-blue-200">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="text-center cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-semibold mb-1">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{category.count} items</div>
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
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Available Colors:</div>
                    <div className="flex space-x-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ 
                            backgroundColor: color === 'Red' || color === 'Crimson' || color === 'Scarlet' ? '#DC2626' :
                                           color === 'Gold' ? '#FFB81C' :
                                           color === 'Blue' || color === 'Navy' ? '#1E40AF' :
                                           color === 'White' ? '#FFFFFF' :
                                           color === 'Chrome' || color === 'Silver' || color === 'Gray' ? '#9CA3AF' :
                                           color === 'Black' ? '#000000' : '#6B7280'
                          }}
                          title={color}
                        />
                      ))}
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
                <h3 className="font-semibold">Authentic Products</h3>
                <p className="text-sm text-muted-foreground">Official licensed merchandise</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Top Rated</h3>
                <p className="text-sm text-muted-foreground">4.8+ average rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 text-center">
        <Button variant="outline" size="lg">
          Load More Accessories
        </Button>
      </section>
    </Layout>
  );
}
