import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, Filter, Grid3X3, List, ShoppingBag, Truck, Shield, Award } from 'lucide-react';
import { useState } from 'react';

export default function JerseysPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Most popular jerseys based on current trends and top players
  const featuredProducts = [
    // Kansas City Chiefs (Most Popular NFL Team)
    {
      id: 1,
      name: 'Patrick Mahomes #15 Chiefs Home Jersey',
      player: 'Patrick Mahomes',
      number: '15',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      price: 109.99,
      originalPrice: 149.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 4582,
      badge: 'MVP',
      description: 'Official Nike Game Jersey featuring Patrick Mahomes #15 in Chiefs home red',
      type: 'Game Jersey',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      colors: ['Red', 'White'],
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    {
      id: 2,
      name: 'Travis Kelce #87 Chiefs Away Jersey',
      player: 'Travis Kelce',
      number: '87',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      price: 104.99,
      originalPrice: 139.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 3247,
      badge: 'All-Pro',
      description: 'Official Nike Game Jersey featuring Travis Kelce #87 in Chiefs away white',
      type: 'Game Jersey',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Red'],
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    // Dallas Cowboys (2nd Most Popular NFL Team)
    {
      id: 3,
      name: 'Dak Prescott #4 Cowboys Home Jersey',
      player: 'Dak Prescott',
      number: '4',
      team: 'Dallas Cowboys',
      league: 'NFL',
      price: 99.99,
      originalPrice: 129.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 2856,
      badge: 'Captain',
      description: 'Official Nike Game Jersey featuring Dak Prescott #4 in Cowboys home navy',
      type: 'Game Jersey',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      colors: ['Navy', 'Silver'],
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    {
      id: 4,
      name: 'CeeDee Lamb #88 Cowboys Away Jersey',
      player: 'CeeDee Lamb',
      number: '88',
      team: 'Dallas Cowboys',
      league: 'NFL',
      price: 94.99,
      originalPrice: 124.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 1943,
      badge: 'Rising Star',
      description: 'Official Nike Game Jersey featuring CeeDee Lamb #88 in Cowboys away white',
      type: 'Game Jersey',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Navy'],
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    // Alabama Crimson Tide (Most Popular NCAA Team)
    {
      id: 5,
      name: 'Alabama Crimson Tide #2 Home Jersey',
      player: 'Custom Name',
      number: '2',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      price: 79.99,
      originalPrice: 99.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 1654,
      badge: 'Champions',
      description: 'Official Nike replica jersey in Alabama home crimson with customizable name',
      type: 'Replica Jersey',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Crimson', 'White'],
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    {
      id: 6,
      name: 'Alabama Crimson Tide #18 Away Jersey',
      player: 'Custom Name',
      number: '18',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      price: 74.99,
      originalPrice: 94.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 1287,
      badge: 'Classic',
      description: 'Official Nike replica jersey in Alabama away white with customizable name',
      type: 'Replica Jersey',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Crimson'],
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    // Ohio State Buckeyes (2nd Most Popular NCAA Team)
    {
      id: 7,
      name: 'Ohio State Buckeyes #1 Home Jersey',
      player: 'Custom Name',
      number: '1',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      price: 76.99,
      originalPrice: 96.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 923,
      badge: 'Heritage',
      description: 'Official Nike replica jersey in Ohio State home scarlet with customizable name',
      type: 'Replica Jersey',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Scarlet', 'Gray'],
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    },
    {
      id: 8,
      name: 'Ohio State Buckeyes #97 Away Jersey',
      player: 'Custom Name',
      number: '97',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      price: 71.99,
      originalPrice: 91.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 756,
      badge: 'Tradition',
      description: 'Official Nike replica jersey in Ohio State away white with customizable name',
      type: 'Replica Jersey',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      colors: ['White', 'Scarlet'],
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    }
  ];

  const jerseyTypes = [
    { name: 'All Types', value: 'all', count: 8, description: 'Every jersey style' },
    { name: 'Game Jersey', value: 'game-jersey', count: 4, description: 'Official game replica' },
    { name: 'Replica Jersey', value: 'replica-jersey', count: 4, description: 'High-quality replica' },
    { name: 'Authentic Jersey', value: 'authentic-jersey', count: 0, description: 'Game-worn style' },
    { name: 'Throwback Jersey', value: 'throwback-jersey', count: 0, description: 'Vintage designs' }
  ];

  const teams = ['All Teams', 'Kansas City Chiefs', 'Dallas Cowboys', 'Alabama Crimson Tide', 'Ohio State Buckeyes'];

  const filteredProducts = featuredProducts.filter(product => {
    if (filterTeam !== 'all' && product.team !== filterTeam) return false;
    if (filterType !== 'all' && product.type.toLowerCase().replace(' ', '-') !== filterType) return false;
    return true;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-fan-blue-800 via-team-red to-team-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🏟️ Official Team Jerseys
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Team Jerseys
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Represent your favorite players and teams with authentic jerseys. From MVP quarterbacks to championship squads, find the perfect jersey to show your allegiance.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-blue-200">Jerseys</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-200">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-blue-200">Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-blue-200">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jersey Types */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Jersey Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {jerseyTypes.map((type, index) => (
              <Card 
                key={index} 
                className={`text-center cursor-pointer transition-all ${
                  filterType === type.value ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                }`}
                onClick={() => setFilterType(type.value)}
              >
                <CardContent className="p-4">
                  <div className="text-lg font-semibold mb-1">{type.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{type.description}</div>
                  <Badge variant="secondary" className="text-xs">{type.count} available</Badge>
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
                  <SelectItem value="newest">Newest Players</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {featuredProducts.length} jerseys
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
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-muted">
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
                    {product.number && (
                      <div 
                        className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: product.teamColors.primary }}
                      >
                        {product.number}
                      </div>
                    )}
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
                  
                  <CardTitle className="text-base font-semibold mb-1">
                    {product.player} #{product.number}
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
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {product.type}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {product.sizes.length} sizes
                    </div>
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

      {/* Jersey Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Jerseys?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Official Licensed</h3>
              <p className="text-sm text-muted-foreground">Authentic team and player merchandise</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Nike and official brand construction</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Perfect Fit</h3>
              <p className="text-sm text-muted-foreground">Comprehensive size guide available</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $75</p>
            </div>
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 text-center">
        <Button variant="outline" size="lg">
          Load More Jerseys
        </Button>
      </section>
    </Layout>
  );
}
