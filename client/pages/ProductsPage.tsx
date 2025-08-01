import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, Filter, Grid3X3, List, ShoppingBag, Search, TrendingUp, Award } from 'lucide-react';
import { useCart } from '@/lib/cart';

// Types for WooCommerce products
interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  featured: boolean;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  short_description: string;
  average_rating: string;
  rating_count: number;
  stock_status: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();

  // Mock products while WooCommerce integration loads
  const mockProducts: WooCommerceProduct[] = [
    {
      id: 1,
      name: 'Chiefs Super Bowl Champions Hat',
      slug: 'chiefs-super-bowl-hat',
      type: 'simple',
      status: 'publish',
      featured: true,
      price: '29.99',
      regular_price: '34.99',
      sale_price: '29.99',
      on_sale: true,
      images: [{ id: 1, src: '/placeholder.svg', alt: 'Chiefs Hat' }],
      categories: [{ id: 11, name: 'Hats', slug: 'hats' }, { id: 100, name: 'Kansas City Chiefs', slug: 'chiefs' }],
      short_description: 'Official Super Bowl Champions snapback hat with embroidered logos',
      average_rating: '4.8',
      rating_count: 156,
      stock_status: 'instock'
    },
    {
      id: 2,
      name: 'Patrick Mahomes #15 Jersey',
      slug: 'mahomes-jersey',
      type: 'simple',
      status: 'publish',
      featured: true,
      price: '109.99',
      regular_price: '139.99',
      sale_price: '109.99',
      on_sale: true,
      images: [{ id: 2, src: '/placeholder.svg', alt: 'Mahomes Jersey' }],
      categories: [{ id: 10, name: 'Jerseys', slug: 'jerseys' }, { id: 100, name: 'Kansas City Chiefs', slug: 'chiefs' }],
      short_description: 'Official Nike Game Jersey featuring Patrick Mahomes #15',
      average_rating: '4.9',
      rating_count: 203,
      stock_status: 'instock'
    },
    {
      id: 3,
      name: 'Cowboys Star Logo Keychain',
      slug: 'cowboys-keychain',
      type: 'simple',
      status: 'publish',
      featured: false,
      price: '12.99',
      regular_price: '12.99',
      sale_price: '',
      on_sale: false,
      images: [{ id: 3, src: '/placeholder.svg', alt: 'Cowboys Keychain' }],
      categories: [{ id: 13, name: 'Accessories', slug: 'accessories' }, { id: 101, name: 'Dallas Cowboys', slug: 'cowboys' }],
      short_description: 'Premium metal keychain with Cowboys star logo',
      average_rating: '4.6',
      rating_count: 89,
      stock_status: 'instock'
    },
    {
      id: 4,
      name: 'Alabama Crimson Tide Championship T-Shirt',
      slug: 'alabama-championship-tee',
      type: 'simple',
      status: 'publish',
      featured: true,
      price: '24.99',
      regular_price: '29.99',
      sale_price: '24.99',
      on_sale: true,
      images: [{ id: 4, src: '/placeholder.svg', alt: 'Alabama T-Shirt' }],
      categories: [{ id: 12, name: 'T-Shirts', slug: 't-shirts' }, { id: 200, name: 'Alabama Crimson Tide', slug: 'alabama' }],
      short_description: 'Celebrate Alabama\'s championship with this premium cotton tee',
      average_rating: '4.7',
      rating_count: 142,
      stock_status: 'instock'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: mockProducts.length },
    { id: 'hats', name: 'Hats & Caps', count: mockProducts.filter(p => p.categories.some(c => c.slug === 'hats')).length },
    { id: 'jerseys', name: 'Jerseys', count: mockProducts.filter(p => p.categories.some(c => c.slug === 'jerseys')).length },
    { id: 'accessories', name: 'Accessories', count: mockProducts.filter(p => p.categories.some(c => c.slug === 'accessories')).length },
    { id: 't-shirts', name: 'T-Shirts', count: mockProducts.filter(p => p.categories.some(c => c.slug === 't-shirts')).length },
  ];

  useEffect(() => {
    // TODO: Replace with actual WooCommerce API call
    // fetchProducts();
    
    // For now, use mock data
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filterCategory !== 'all' && !product.categories.some(cat => cat.slug === filterCategory)) {
      return false;
    }
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAddToCart = (product: WooCommerceProduct) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.images[0]?.src || '/placeholder.svg',
      teamSlug: product.categories.find(cat => cat.id >= 100)?.slug || 'general'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-electric-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-electric-blue via-fan-blue-600 to-team-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-3 md:mb-4 bg-white/20 text-white border-white/30">
              🛍️ Official Team Merchandise
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Shop All Products
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Discover our complete collection of NFL and NCAA fan gear. From jerseys to accessories, find everything you need to show your team spirit.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mb-6 md:mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm text-blue-200">Products</div>
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

      {/* Category Filters */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className={`text-center cursor-pointer transition-all ${
                  filterCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                }`}
                onClick={() => setFilterCategory(category.id)}
              >
                <CardContent className="p-4">
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
                Showing {filteredProducts.length} of {products.length} products
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
          <div className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img 
                      src={product.images[0]?.src || '/placeholder.svg'} 
                      alt={product.images[0]?.alt || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.on_sale && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        Sale
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-2 right-2 bg-electric-blue text-white">
                        <Award className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-4">
                  <div className="mb-2">
                    {product.categories.map((category) => (
                      <Badge 
                        key={category.id}
                        variant="outline" 
                        className="text-xs mr-1 mb-1"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  
                  <CardDescription className="text-sm mb-3 line-clamp-2">
                    {product.short_description}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.average_rating}</span>
                    <span className="text-sm text-muted-foreground">({product.rating_count})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-electric-blue">
                      ${product.price}
                    </span>
                    {product.on_sale && product.regular_price !== product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.regular_price}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_status !== 'instock'}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 text-center">
        <Button variant="outline" size="lg">
          <TrendingUp className="mr-2 h-4 w-4" />
          Load More Products
        </Button>
      </section>
    </Layout>
  );
}
