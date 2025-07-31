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
  { value: 'chiefs', label: 'Kansas City Chiefs', colors: { primary: '#E31837', secondary: '#FFB81C' } },
  { value: 'cowboys', label: 'Dallas Cowboys', colors: { primary: '#003594', secondary: '#041E42' } },
  { value: 'crimson-tide', label: 'Alabama Crimson Tide', colors: { primary: '#9E1B32', secondary: '#828A8F' } },
  { value: 'buckeyes', label: 'Ohio State Buckeyes', colors: { primary: '#BB0000', secondary: '#C0C0C0' } },
  { value: 'patriots', label: 'New England Patriots', colors: { primary: '#002244', secondary: '#C60C30' } },
  { value: 'packers', label: 'Green Bay Packers', colors: { primary: '#203731', secondary: '#FFB612' } },
];

const productTypes = [
  { value: 'tshirt', label: 'T-Shirt', basePrice: 24.99 },
  { value: 'hoodie', label: 'Hoodie', basePrice: 54.99 },
  { value: 'jersey', label: 'Jersey', basePrice: 79.99 },
  { value: 'mug', label: 'Mug', basePrice: 16.99 },
  { value: 'phone-case', label: 'Phone Case', basePrice: 19.99 },
  { value: 'hat', label: 'Hat', basePrice: 29.99 },
];

const fontFamilies = [
  'Arial, sans-serif',
  'Times New Roman, serif',
  'Impact, sans-serif',
  'Georgia, serif',
  'Verdana, sans-serif',
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
    fontFamily: 'Impact, sans-serif',
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
      fontFamily: 'Impact, sans-serif',
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
                  <SelectContent>
                    {teams.map(team => (
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
                  <SelectContent>
                    {productTypes.map(product => (
                      <SelectItem key={product.value} value={product.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{product.label}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ${(product.basePrice + 10).toFixed(2)}
                          </span>
                        </div>
                      </SelectItem>
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
