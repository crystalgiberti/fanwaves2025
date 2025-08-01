'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Palette, Download, Share2, ShoppingCart, RotateCcw, Type, Image, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

interface CustomDesign {
  team: string;
  productType: string;
  customText: string;
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  imageUrl?: string;
}

const teams = [
  // AFC East
  { value: 'patriots', label: 'New England Patriots', colors: { primary: '#002244', secondary: '#C60C30' }, league: 'NFL' },
  { value: 'bills', label: 'Buffalo Bills', colors: { primary: '#00338D', secondary: '#C60C30' }, league: 'NFL' },
  { value: 'dolphins', label: 'Miami Dolphins', colors: { primary: '#008E97', secondary: '#FC4C02' }, league: 'NFL' },
  { value: 'jets', label: 'New York Jets', colors: { primary: '#125740', secondary: '#000000' }, league: 'NFL' },

  // AFC North
  { value: 'ravens', label: 'Baltimore Ravens', colors: { primary: '#241773', secondary: '#000000' }, league: 'NFL' },
  { value: 'bengals', label: 'Cincinnati Bengals', colors: { primary: '#FB4F14', secondary: '#000000' }, league: 'NFL' },
  { value: 'browns', label: 'Cleveland Browns', colors: { primary: '#311D00', secondary: '#FF3C00' }, league: 'NFL' },
  { value: 'steelers', label: 'Pittsburgh Steelers', colors: { primary: '#FFB612', secondary: '#000000' }, league: 'NFL' },

  // AFC South
  { value: 'texans', label: 'Houston Texans', colors: { primary: '#03202F', secondary: '#A71930' }, league: 'NFL' },
  { value: 'colts', label: 'Indianapolis Colts', colors: { primary: '#002C5F', secondary: '#A2AAAD' }, league: 'NFL' },
  { value: 'jaguars', label: 'Jacksonville Jaguars', colors: { primary: '#006778', secondary: '#9F792C' }, league: 'NFL' },
  { value: 'titans', label: 'Tennessee Titans', colors: { primary: '#0C2340', secondary: '#4B92DB' }, league: 'NFL' },

  // AFC West
  { value: 'broncos', label: 'Denver Broncos', colors: { primary: '#FB4F14', secondary: '#002244' }, league: 'NFL' },
  { value: 'chiefs', label: 'Kansas City Chiefs', colors: { primary: '#E31837', secondary: '#FFB81C' }, league: 'NFL' },
  { value: 'raiders', label: 'Las Vegas Raiders', colors: { primary: '#000000', secondary: '#A5ACAF' }, league: 'NFL' },
  { value: 'chargers', label: 'Los Angeles Chargers', colors: { primary: '#0080C6', secondary: '#FFC20E' }, league: 'NFL' },

  // NFC East
  { value: 'cowboys', label: 'Dallas Cowboys', colors: { primary: '#003594', secondary: '#041E42' }, league: 'NFL' },
  { value: 'giants', label: 'New York Giants', colors: { primary: '#0B2265', secondary: '#A71930' }, league: 'NFL' },
  { value: 'eagles', label: 'Philadelphia Eagles', colors: { primary: '#004C54', secondary: '#A5ACAF' }, league: 'NFL' },
  { value: 'commanders', label: 'Washington Commanders', colors: { primary: '#5A1414', secondary: '#FFB612' }, league: 'NFL' },

  // NFC North
  { value: 'bears', label: 'Chicago Bears', colors: { primary: '#0B162A', secondary: '#C83803' }, league: 'NFL' },
  { value: 'lions', label: 'Detroit Lions', colors: { primary: '#0076B6', secondary: '#B0B7BC' }, league: 'NFL' },
  { value: 'packers', label: 'Green Bay Packers', colors: { primary: '#203731', secondary: '#FFB612' }, league: 'NFL' },
  { value: 'vikings', label: 'Minnesota Vikings', colors: { primary: '#4F2683', secondary: '#FFC62F' }, league: 'NFL' },

  // NFC South
  { value: 'falcons', label: 'Atlanta Falcons', colors: { primary: '#A71930', secondary: '#000000' }, league: 'NFL' },
  { value: 'panthers', label: 'Carolina Panthers', colors: { primary: '#0085CA', secondary: '#101820' }, league: 'NFL' },
  { value: 'saints', label: 'New Orleans Saints', colors: { primary: '#D3BC8D', secondary: '#101820' }, league: 'NFL' },
  { value: 'buccaneers', label: 'Tampa Bay Buccaneers', colors: { primary: '#D50A0A', secondary: '#FF7900' }, league: 'NFL' },

  // NFC West
  { value: 'cardinals', label: 'Arizona Cardinals', colors: { primary: '#97233F', secondary: '#000000' }, league: 'NFL' },
  { value: 'rams', label: 'Los Angeles Rams', colors: { primary: '#003594', secondary: '#FFA300' }, league: 'NFL' },
  { value: '49ers', label: 'San Francisco 49ers', colors: { primary: '#AA0000', secondary: '#B3995D' }, league: 'NFL' },
  { value: 'seahawks', label: 'Seattle Seahawks', colors: { primary: '#002244', secondary: '#69BE28' }, league: 'NFL' },

  // Top NCAA Teams
  { value: 'crimson-tide', label: 'Alabama Crimson Tide', colors: { primary: '#9E1B32', secondary: '#828A8F' }, league: 'NCAA' },
  { value: 'buckeyes', label: 'Ohio State Buckeyes', colors: { primary: '#BB0000', secondary: '#C0C0C0' }, league: 'NCAA' },
  { value: 'tigers-clemson', label: 'Clemson Tigers', colors: { primary: '#F66733', secondary: '#522D80' }, league: 'NCAA' },
  { value: 'bulldogs-georgia', label: 'Georgia Bulldogs', colors: { primary: '#BA0C2F', secondary: '#000000' }, league: 'NCAA' },
  { value: 'tigers-lsu', label: 'LSU Tigers', colors: { primary: '#461D7C', secondary: '#FDD023' }, league: 'NCAA' },
  { value: 'wolverines', label: 'Michigan Wolverines', colors: { primary: '#00274C', secondary: '#FFCB05' }, league: 'NCAA' },
  { value: 'fighting-irish', label: 'Notre Dame Fighting Irish', colors: { primary: '#0C2340', secondary: '#C99700' }, league: 'NCAA' },
  { value: 'sooners', label: 'Oklahoma Sooners', colors: { primary: '#841617', secondary: '#FDD023' }, league: 'NCAA' },
  { value: 'longhorns', label: 'Texas Longhorns', colors: { primary: '#BF5700', secondary: '#333F48' }, league: 'NCAA' },
  { value: 'aggies', label: 'Texas A&M Aggies', colors: { primary: '#500000', secondary: '#FFFFFF' }, league: 'NCAA' },
  { value: 'gators', label: 'Florida Gators', colors: { primary: '#0021A5', secondary: '#FA4616' }, league: 'NCAA' },
  { value: 'hurricanes', label: 'Miami Hurricanes', colors: { primary: '#F47321', secondary: '#046A38' }, league: 'NCAA' },
  { value: 'seminoles', label: 'Florida State Seminoles', colors: { primary: '#782F40', secondary: '#CEB888' }, league: 'NCAA' },
  { value: 'gamecocks', label: 'South Carolina Gamecocks', colors: { primary: '#73000A', secondary: '#000000' }, league: 'NCAA' },
  { value: 'wildcats-kentucky', label: 'Kentucky Wildcats', colors: { primary: '#0033A0', secondary: '#FFFFFF' }, league: 'NCAA' },
  { value: 'volunteers', label: 'Tennessee Volunteers', colors: { primary: '#FF8200', secondary: '#58595B' }, league: 'NCAA' },
  { value: 'commodores', label: 'Vanderbilt Commodores', colors: { primary: '#866D4B', secondary: '#000000' }, league: 'NCAA' },
  { value: 'wildcats-arizona', label: 'Arizona Wildcats', colors: { primary: '#003366', secondary: '#CC0033' }, league: 'NCAA' },
  { value: 'sun-devils', label: 'Arizona State Sun Devils', colors: { primary: '#8C1D40', secondary: '#FFC627' }, league: 'NCAA' },
  { value: 'golden-bears', label: 'California Golden Bears', colors: { primary: '#003262', secondary: '#FDB515' }, league: 'NCAA' },
  { value: 'bruins', label: 'UCLA Bruins', colors: { primary: '#2D68C4', secondary: '#FFD100' }, league: 'NCAA' },
  { value: 'trojans', label: 'USC Trojans', colors: { primary: '#990000', secondary: '#FFCC00' }, league: 'NCAA' },
  { value: 'cardinal', label: 'Stanford Cardinal', colors: { primary: '#8C1515', secondary: '#DAA900' }, league: 'NCAA' },
  { value: 'ducks', label: 'Oregon Ducks', colors: { primary: '#154733', secondary: '#FEE123' }, league: 'NCAA' },
  { value: 'beavers', label: 'Oregon State Beavers', colors: { primary: '#DC4405', secondary: '#000000' }, league: 'NCAA' },
  { value: 'huskies', label: 'Washington Huskies', colors: { primary: '#4B2E83', secondary: '#B7A57A' }, league: 'NCAA' },
  { value: 'cougars-wsu', label: 'Washington State Cougars', colors: { primary: '#981E32', secondary: '#5E6A71' }, league: 'NCAA' },
];

const productTypes = [
  // Apparel
  { value: 'tshirt', label: 'T-Shirt', basePrice: 24.99, category: 'Apparel' },
  { value: 'long-sleeve', label: 'Long Sleeve Shirt', basePrice: 29.99, category: 'Apparel' },
  { value: 'polo', label: 'Polo Shirt', basePrice: 34.99, category: 'Apparel' },
  { value: 'tank-top', label: 'Tank Top', basePrice: 22.99, category: 'Apparel' },
  { value: 'hoodie', label: 'Hoodie', basePrice: 54.99, category: 'Apparel' },
  { value: 'sweatshirt', label: 'Sweatshirt', basePrice: 49.99, category: 'Apparel' },
  { value: 'jacket', label: 'Jacket', basePrice: 79.99, category: 'Apparel' },
  { value: 'zip-hoodie', label: 'Zip-Up Hoodie', basePrice: 59.99, category: 'Apparel' },

  // Jerseys & Sports Wear
  { value: 'jersey', label: 'Jersey', basePrice: 89.99, category: 'Jerseys' },
  { value: 'youth-jersey', label: 'Youth Jersey', basePrice: 69.99, category: 'Jerseys' },
  { value: 'womens-jersey', label: "Women's Jersey", basePrice: 84.99, category: 'Jerseys' },
  { value: 'practice-jersey', label: 'Practice Jersey', basePrice: 39.99, category: 'Jerseys' },

  // Headwear
  { value: 'baseball-cap', label: 'Baseball Cap', basePrice: 29.99, category: 'Hats' },
  { value: 'snapback', label: 'Snapback Hat', basePrice: 32.99, category: 'Hats' },
  { value: 'fitted-hat', label: 'Fitted Hat', basePrice: 34.99, category: 'Hats' },
  { value: 'beanie', label: 'Beanie', basePrice: 19.99, category: 'Hats' },
  { value: 'visor', label: 'Visor', basePrice: 24.99, category: 'Hats' },
  { value: 'bucket-hat', label: 'Bucket Hat', basePrice: 27.99, category: 'Hats' },

  // Accessories
  { value: 'phone-case', label: 'Phone Case', basePrice: 19.99, category: 'Accessories' },
  { value: 'mug', label: 'Coffee Mug', basePrice: 16.99, category: 'Accessories' },
  { value: 'tumbler', label: 'Travel Tumbler', basePrice: 24.99, category: 'Accessories' },
  { value: 'water-bottle', label: 'Water Bottle', basePrice: 22.99, category: 'Accessories' },
  { value: 'keychain', label: 'Keychain', basePrice: 9.99, category: 'Accessories' },
  { value: 'lanyard', label: 'Lanyard', basePrice: 12.99, category: 'Accessories' },
  { value: 'towel', label: 'Towel', basePrice: 18.99, category: 'Accessories' },
  { value: 'blanket', label: 'Throw Blanket', basePrice: 39.99, category: 'Accessories' },

  // Signs & Decor
  { value: 'yard-sign', label: 'Yard Sign', basePrice: 29.99, category: 'Signs' },
  { value: 'car-decal', label: 'Car Decal', basePrice: 14.99, category: 'Signs' },
  { value: 'bumper-sticker', label: 'Bumper Sticker', basePrice: 4.99, category: 'Signs' },
  { value: 'flag', label: 'Team Flag', basePrice: 24.99, category: 'Signs' },
  { value: 'banner', label: 'Banner', basePrice: 34.99, category: 'Signs' },
  { value: 'poster', label: 'Poster', basePrice: 19.99, category: 'Signs' },

  // Bags
  { value: 'backpack', label: 'Backpack', basePrice: 49.99, category: 'Bags' },
  { value: 'duffle-bag', label: 'Duffle Bag', basePrice: 44.99, category: 'Bags' },
  { value: 'tote-bag', label: 'Tote Bag', basePrice: 19.99, category: 'Bags' },
  { value: 'gym-bag', label: 'Gym Bag', basePrice: 39.99, category: 'Bags' },
];

const fontFamilies = [
  // Classic Sports Fonts
  { value: 'Impact, Arial Black, sans-serif', label: 'Impact (Classic Sports)', category: 'Sports' },
  { value: 'Anton, Impact, sans-serif', label: 'Anton (Bold Sports)', category: 'Sports' },
  { value: 'Bebas Neue, Arial Black, sans-serif', label: 'Bebas Neue (Modern Sports)', category: 'Sports' },
  { value: 'Oswald, Impact, sans-serif', label: 'Oswald (Athletic)', category: 'Sports' },
  { value: 'Teko, Arial Black, sans-serif', label: 'Teko (Jersey Style)', category: 'Sports' },
  { value: 'Fjalla One, Arial Black, sans-serif', label: 'Fjalla One (Strong)', category: 'Sports' },
  { value: 'Russo One, Impact, sans-serif', label: 'Russo One (Retro Sports)', category: 'Sports' },
  { value: 'Squada One, Arial Black, sans-serif', label: 'Squada One (Varsity)', category: 'Sports' },

  // Bold & Condensed
  { value: 'Arial Black, sans-serif', label: 'Arial Black (Bold)', category: 'Bold' },
  { value: 'Franklin Gothic Medium, Arial, sans-serif', label: 'Franklin Gothic (Football)', category: 'Bold' },
  { value: 'Trebuchet MS, Arial, sans-serif', label: 'Trebuchet MS (Clean Bold)', category: 'Bold' },
  { value: 'Helvetica Neue Condensed, Arial, sans-serif', label: 'Helvetica Condensed', category: 'Bold' },
  { value: 'Compacta, Arial Black, sans-serif', label: 'Compacta (Compressed)', category: 'Bold' },

  // Display & Decorative
  { value: 'Bangers, cursive', label: 'Bangers (Comic Style)', category: 'Display' },
  { value: 'Righteous, cursive', label: 'Righteous (Retro)', category: 'Display' },
  { value: 'Bungee, cursive', label: 'Bungee (3D Effect)', category: 'Display' },
  { value: 'Fredoka One, cursive', label: 'Fredoka One (Friendly Bold)', category: 'Display' },

  // Classic & Professional
  { value: 'Arial, sans-serif', label: 'Arial (Classic)', category: 'Classic' },
  { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica (Professional)', category: 'Classic' },
  { value: 'Times New Roman, serif', label: 'Times New Roman (Traditional)', category: 'Classic' },
  { value: 'Georgia, serif', label: 'Georgia (Elegant)', category: 'Classic' },
  { value: 'Verdana, sans-serif', label: 'Verdana (Clean)', category: 'Classic' },

  // Stencil & Military Style
  { value: 'Orbitron, monospace', label: 'Orbitron (Futuristic)', category: 'Stencil' },
  { value: 'Play, sans-serif', label: 'Play (Tech Style)', category: 'Stencil' },
  { value: 'Audiowide, cursive', label: 'Audiowide (Digital)', category: 'Stencil' },
];

export default function CustomGearDesigner() {
  const { addItem } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [design, setDesign] = useState<CustomDesign>({
    team: '',
    productType: '',
    customText: '',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    fontSize: 24,
    fontFamily: 'Impact, Arial Black, sans-serif',
    position: 'center',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const selectedTeam = teams.find(t => t.value === design.team);
  const selectedProduct = productTypes.find(p => p.value === design.productType);
  
  const customPrice = selectedProduct ? selectedProduct.basePrice + 10 : 0; // +$10 for customization

  const updateDesign = (updates: Partial<CustomDesign>) => {
    setDesign(prev => ({ ...prev, ...updates }));
  };

  const generatePreview = async () => {
    if (!design.team || !design.productType || !design.customText) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = selectedTeam?.colors.primary || design.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add team pattern/texture
      if (selectedTeam) {
        ctx.fillStyle = selectedTeam.colors.secondary;
        ctx.globalAlpha = 0.1;
        
        // Draw diagonal stripes pattern
        for (let i = 0; i < canvas.width + canvas.height; i += 20) {
          ctx.fillRect(i - canvas.height, 0, 10, canvas.height);
        }
        
        ctx.globalAlpha = 1;
      }

      // Draw text
      ctx.fillStyle = design.textColor;
      ctx.font = `${design.fontSize}px ${design.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Calculate text position
      let x = canvas.width / 2;
      let y = canvas.height / 2;

      switch (design.position) {
        case 'top':
          y = canvas.height * 0.25;
          break;
        case 'bottom':
          y = canvas.height * 0.75;
          break;
        case 'left':
          x = canvas.width * 0.25;
          break;
        case 'right':
          x = canvas.width * 0.75;
          break;
      }

      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Draw the text
      ctx.fillText(design.customText.toUpperCase(), x, y);

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setPreviewUrl(dataUrl);

    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addToCart = () => {
    if (!selectedTeam || !selectedProduct || !design.customText) return;

    const customItem = {
      id: Date.now(),
      name: `Custom ${selectedProduct.label} - ${selectedTeam.label}`,
      price: customPrice,
      image: previewUrl || '/placeholder.svg',
      team: design.team,
      category: 'custom',
      stock_status: 'instock' as const,
      attributes: {
        'Custom Text': design.customText,
        'Team': selectedTeam.label,
        'Product Type': selectedProduct.label,
        'Text Color': design.textColor,
        'Font': design.fontFamily,
        'Position': design.position,
      },
    };

    addItem(customItem, 1);
  };

  const downloadDesign = () => {
    if (!previewUrl) return;
    
    const link = document.createElement('a');
    link.download = `custom-${design.team}-${design.productType}.png`;
    link.href = previewUrl;
    link.click();
  };

  const shareDesign = async () => {
    if (!previewUrl) return;

    if (navigator.share) {
      try {
        // Convert dataURL to blob
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const file = new File([blob], 'custom-design.png', { type: 'image/png' });

        await navigator.share({
          title: 'My Custom Fan Gear Design',
          text: `Check out my custom ${selectedProduct?.label} design!`,
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Design link copied to clipboard!');
    }
  };

  const resetDesign = () => {
    setDesign({
      team: '',
      productType: '',
      customText: '',
      textColor: '#FFFFFF',
      backgroundColor: '#000000',
      fontSize: 24,
      fontFamily: 'Impact, Arial Black, sans-serif',
      position: 'center',
    });
    setPreviewUrl('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-electric-blue text-white">
            <Palette className="mr-2 h-4 w-4" />
            Custom Gear Designer
          </Badge>
          <h1 className="text-3xl font-bold mb-4">Design Your Own Fan Gear</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create unique, personalized merchandise for your favorite team. Design it your way, order it today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Design Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Type className="mr-2 h-5 w-5" />
                Design Options
              </CardTitle>
              <CardDescription>
                Customize every aspect of your gear
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Team Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Choose Your Team</label>
                <Select value={design.team} onValueChange={(value) => updateDesign({ team: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {['NFL', 'NCAA'].map(league => (
                      <div key={league}>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
                          {league} Teams
                        </div>
                        {teams
                          .filter(team => team.league === league)
                          .map(team => (
                            <SelectItem key={team.value} value={team.value}>
                              <div className="flex items-center space-x-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: team.colors.primary }}
                                />
                                <span>{team.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Type</label>
                <Select value={design.productType} onValueChange={(value) => updateDesign({ productType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {['Apparel', 'Jerseys', 'Hats', 'Accessories', 'Signs', 'Bags'].map(category => (
                      <div key={category}>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
                          {category}
                        </div>
                        {productTypes
                          .filter(product => product.category === category)
                          .map(product => (
                            <SelectItem key={product.value} value={product.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{product.label}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  ${(product.basePrice + 10).toFixed(2)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Text */}
              <div>
                <label className="block text-sm font-medium mb-2">Custom Text</label>
                <Textarea
                  placeholder="Enter your custom text (name, number, message, etc.)"
                  value={design.customText}
                  onChange={(e) => updateDesign({ customText: e.target.value })}
                  className="resize-none"
                  rows={3}
                />
              </div>

              {/* Text Styling */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Text Color</label>
                  <div className="flex space-x-2">
                    <Input
                      type="color"
                      value={design.textColor}
                      onChange={(e) => updateDesign({ textColor: e.target.value })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={design.textColor}
                      onChange={(e) => updateDesign({ textColor: e.target.value })}
                      placeholder="#FFFFFF"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <Input
                    type="range"
                    min="12"
                    max="48"
                    value={design.fontSize}
                    onChange={(e) => updateDesign({ fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-muted-foreground mt-1">
                    {design.fontSize}px
                  </div>
                </div>
              </div>

              {/* Font and Position */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Style</label>
                  <Select value={design.fontFamily} onValueChange={(value) => updateDesign({ fontFamily: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map(font => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font }}>{font.split(',')[0]}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Text Position</label>
                  <Select value={design.position} onValueChange={(value: any) => updateDesign({ position: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  onClick={generatePreview}
                  disabled={!design.team || !design.productType || !design.customText || isGenerating}
                  className="flex-1"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Generate Preview'}
                </Button>
                
                <Button variant="outline" onClick={resetDesign}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="mr-2 h-5 w-5" />
                Live Preview
              </CardTitle>
              <CardDescription>
                See how your design will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Design Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Configure your design and</p>
                    <p>click "Generate Preview"</p>
                  </div>
                )}
                
                {/* Invisible canvas for generating preview */}
                <canvas
                  ref={canvasRef}
                  className="hidden"
                  width={400}
                  height={400}
                />
              </div>

              {/* Preview Actions */}
              {previewUrl && (
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      ${customPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Includes $10 customization fee
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={downloadDesign}>
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={shareDesign}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      onClick={addToCart}
                      disabled={!selectedTeam || !selectedProduct || !design.customText}
                      className="col-span-1"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={addToCart}
                    disabled={!selectedTeam || !selectedProduct || !design.customText}
                    className="w-full"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart - ${customPrice.toFixed(2)}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
