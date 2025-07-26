import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, Palette, Type, Shirt, Zap, Users, Clock, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function CustomGearPage() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [customText, setCustomText] = useState('');

  // Popular custom gear options featuring top teams
  const customProducts = [
    // Kansas City Chiefs Custom Options
    {
      id: 1,
      name: 'Custom Chiefs Championship Hoodie',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      basePrice: 54.99,
      customPrice: 74.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 1847,
      badge: 'Bestseller',
      description: 'Design your own Chiefs championship hoodie with custom text and graphics',
      category: 'Hoodies',
      customOptions: ['Name', 'Number', 'Text', 'Graphics'],
      turnaround: '7-10 business days',
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    {
      id: 2,
      name: 'Custom Chiefs Fan Cave Sign',
      team: 'Kansas City Chiefs',
      league: 'NFL',
      basePrice: 39.99,
      customPrice: 59.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 923,
      badge: 'Popular',
      description: 'Personalized metal sign perfect for your Chiefs fan cave or office',
      category: 'Signs & Decor',
      customOptions: ['Name', 'Text', 'Size Options'],
      turnaround: '5-7 business days',
      teamColors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    // Dallas Cowboys Custom Options
    {
      id: 3,
      name: 'Custom Cowboys Star T-Shirt',
      team: 'Dallas Cowboys',
      league: 'NFL',
      basePrice: 24.99,
      customPrice: 34.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 1456,
      badge: 'Classic',
      description: 'Create your unique Cowboys t-shirt with custom name and star design',
      category: 'T-Shirts',
      customOptions: ['Name', 'Number', 'Star Color'],
      turnaround: '3-5 business days',
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    {
      id: 4,
      name: 'Custom Cowboys Phone Case',
      team: 'Dallas Cowboys',
      league: 'NFL',
      basePrice: 19.99,
      customPrice: 29.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 734,
      badge: 'Trending',
      description: 'Personalized phone case with Cowboys logo and your custom text',
      category: 'Phone Cases',
      customOptions: ['Name', 'Text', 'Photo Upload'],
      turnaround: '3-5 business days',
      teamColors: { primary: '#003594', secondary: '#041E42' }
    },
    // Alabama Custom Options
    {
      id: 5,
      name: 'Custom Alabama Championship Banner',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      basePrice: 49.99,
      customPrice: 79.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 567,
      badge: 'Champions',
      description: 'Custom banner celebrating Alabama victories with personalized text',
      category: 'Banners',
      customOptions: ['Text', 'Size', 'Championship Year'],
      turnaround: '7-10 business days',
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    {
      id: 6,
      name: 'Custom Alabama Crimson Tide Jersey',
      team: 'Alabama Crimson Tide',
      league: 'NCAA',
      basePrice: 69.99,
      customPrice: 99.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 892,
      badge: 'Premium',
      description: 'Create your own Alabama jersey with custom name and number',
      category: 'Jerseys',
      customOptions: ['Name', 'Number', 'Size'],
      turnaround: '10-14 business days',
      teamColors: { primary: '#9E1B32', secondary: '#828A8F' }
    },
    // Ohio State Custom Options
    {
      id: 7,
      name: 'Custom Ohio State Block O Mug',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      basePrice: 16.99,
      customPrice: 24.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 445,
      badge: 'Gift Idea',
      description: 'Personalized ceramic mug with Ohio State logo and custom text',
      category: 'Drinkware',
      customOptions: ['Name', 'Text', 'Graduation Year'],
      turnaround: '3-5 business days',
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    },
    {
      id: 8,
      name: 'Custom Buckeyes Car Decal',
      team: 'Ohio State Buckeyes',
      league: 'NCAA',
      basePrice: 12.99,
      customPrice: 19.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 623,
      badge: 'Weather Proof',
      description: 'Custom vinyl decal for your car with Ohio State logo and personal text',
      category: 'Car Accessories',
      customOptions: ['Name', 'Text', 'Size'],
      turnaround: '2-4 business days',
      teamColors: { primary: '#BB0000', secondary: '#C0C0C0' }
    }
  ];

  const categories = [
    { name: 'T-Shirts & Apparel', icon: '👕', count: 12, description: 'Custom clothing' },
    { name: 'Hoodies & Sweatshirts', icon: '🧥', count: 8, description: 'Warm custom wear' },
    { name: 'Jerseys', icon: '🏈', count: 6, description: 'Personalized jerseys' },
    { name: 'Phone Cases', icon: '📱', count: 15, description: 'Custom protection' },
    { name: 'Signs & Decor', icon: '🪧', count: 10, description: 'Fan cave essentials' },
    { name: 'Drinkware', icon: '☕', count: 18, description: 'Custom mugs & bottles' },
    { name: 'Car Accessories', icon: '🚗', count: 9, description: 'Vehicle customization' },
    { name: 'Banners & Flags', icon: '🏁', count: 7, description: 'Game day displays' }
  ];

  const customizationSteps = [
    {
      step: 1,
      title: 'Choose Your Product',
      description: 'Select from hundreds of customizable items',
      icon: <Shirt className="h-6 w-6" />
    },
    {
      step: 2,
      title: 'Pick Your Team',
      description: 'Choose your favorite NFL or NCAA team',
      icon: <Users className="h-6 w-6" />
    },
    {
      step: 3,
      title: 'Add Personal Touch',
      description: 'Add names, numbers, or custom text',
      icon: <Type className="h-6 w-6" />
    },
    {
      step: 4,
      title: 'Review & Order',
      description: 'Preview your design and place order',
      icon: <Zap className="h-6 w-6" />
    }
  ];

  const teams = ['Kansas City Chiefs', 'Dallas Cowboys', 'Alabama Crimson Tide', 'Ohio State Buckeyes'];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-electric-blue via-team-green to-team-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🎨 Design Your Own Gear
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Custom Fan Gear
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Create one-of-a-kind fan gear that's uniquely yours. From custom jerseys to personalized accessories, express your team spirit your way.
            </p>
            
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 mb-8">
              <Palette className="mr-2 h-5 w-5" />
              Start Customizing
            </Button>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-200">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm text-blue-200">Designs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-blue-200">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">How Custom Gear Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {customizationSteps.map((step) => (
              <Card key={step.step} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-electric-blue">{step.icon}</div>
                  </div>
                  <div className="text-sm text-electric-blue font-semibold mb-2">Step {step.step}</div>
                  <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Customizable Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="text-center cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-semibold mb-1">{category.name}</div>
                  <div className="text-xs text-muted-foreground mb-1">{category.description}</div>
                  <Badge variant="secondary" className="text-xs">{category.count} items</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Customizer */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Quick Custom Design</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Choose Your Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Product Type</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tshirt">T-Shirt</SelectItem>
                      <SelectItem value="hoodie">Hoodie</SelectItem>
                      <SelectItem value="jersey">Jersey</SelectItem>
                      <SelectItem value="mug">Mug</SelectItem>
                      <SelectItem value="phone-case">Phone Case</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Text</label>
                  <Textarea 
                    placeholder="Enter your custom text (name, number, message, etc.)"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <Button className="w-full" disabled={!selectedTeam || !selectedProduct}>
                  <Palette className="mr-2 h-4 w-4" />
                  Create Custom Design
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Custom Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Custom Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customProducts.map((product) => (
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
                    <div className="absolute bottom-2 right-2">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
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
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">From</span>
                        <span 
                          className="text-lg font-bold ml-1"
                          style={{ color: product.teamColors.primary }}
                        >
                          ${product.basePrice}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {product.turnaround}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Customize:</div>
                    <div className="flex flex-wrap gap-1">
                      {product.customOptions.slice(0, 3).map((option, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {option}
                        </Badge>
                      ))}
                      {product.customOptions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.customOptions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    style={{ backgroundColor: product.teamColors.primary }}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Customize Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Custom Gear?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Unlimited Creativity</h3>
              <p className="text-sm text-muted-foreground">Design exactly what you want with full customization options</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">High-quality materials and professional printing</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-sm text-muted-foreground">Most orders completed in 3-7 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-team-green to-electric-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Something Unique?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fans who've created their perfect custom gear. Start designing today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Palette className="mr-2 h-5 w-5" />
              Start Designing
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Browse Templates
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
