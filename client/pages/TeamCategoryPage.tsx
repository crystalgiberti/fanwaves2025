import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Heart, Filter, Grid3X3, List } from 'lucide-react';
import { getTeamBySlug, getCategoryBySlug } from '@shared/teams';
import { useState } from 'react';

export default function TeamCategoryPage() {
  const { teamSlug, categorySlug } = useParams<{
    teamSlug: string;
    categorySlug: string;
  }>();

  const path = window.location.pathname;
  const league = path.startsWith('/nfl') ? 'nfl' : 'ncaa' as 'nfl' | 'ncaa';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (!teamSlug || !categorySlug) {
    return <Layout><div>Invalid page</div></Layout>;
  }

  const team = getTeamBySlug(teamSlug, league);
  const category = getCategoryBySlug(categorySlug);
  
  if (!team || !category) {
    return <Layout><div>Team or category not found</div></Layout>;
  }

  // Sample products - in real app this would come from API
  const sampleProducts = [
    {
      id: 1,
      name: `${team.name} Official ${category.name}`,
      price: 29.99,
      originalPrice: 39.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 124,
      colors: ['Primary', 'White', 'Black'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: `${team.name} Premium ${category.name}`,
      price: 49.99,
      originalPrice: 59.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 89,
      colors: ['Primary', 'Secondary'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      badge: 'New'
    },
    {
      id: 3,
      name: `${team.name} Vintage ${category.name}`,
      price: 39.99,
      originalPrice: 49.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 156,
      colors: ['Vintage', 'Throwback'],
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'Limited'
    },
    {
      id: 4,
      name: `${team.name} Youth ${category.name}`,
      price: 19.99,
      originalPrice: 24.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 203,
      colors: ['Primary', 'White'],
      sizes: ['YS', 'YM', 'YL', 'YXL'],
      badge: 'Sale'
    },
  ];

  return (
    <Layout>
      {/* Breadcrumb Header */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to={`/${league}`} className="hover:text-primary">{league.toUpperCase()}</Link>
            <span>/</span>
            <Link to={`/${league}/${teamSlug}`} className="hover:text-primary">
              {team.city} {team.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {team.city} {team.name} {category.name}
              </h1>
              <p className="text-muted-foreground">
                {category.description} for {team.name} fans
              </p>
            </div>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/${league}/${teamSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing {sampleProducts.length} products
              </div>
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
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sampleProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2" style={{ backgroundColor: team.colors.primary }}>
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
                  <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold" style={{ color: team.colors.primary }}>
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
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
                            backgroundColor: color === 'Primary' ? team.colors.primary : 
                                           color === 'Secondary' ? team.colors.secondary : 
                                           color === 'White' ? '#FFFFFF' : 
                                           color === 'Black' ? '#000000' : '#999999'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Sizes:</div>
                    <div className="text-xs">{product.sizes.join(', ')}</div>
                  </div>
                  
                  <Button className="w-full" style={{ backgroundColor: team.colors.primary }}>
                    Add to Cart
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
          Load More Products
        </Button>
      </section>
    </Layout>
  );
}
