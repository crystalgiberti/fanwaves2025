'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Hero Section Component
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showStats?: boolean;
  children?: ReactNode;
}

export const HeroSection = (props: HeroSectionProps) => {
  return (
    <section 
      className="relative overflow-hidden py-20 md:py-32 text-white"
      style={{
        background: props.backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.backgroundImage})`
          : props.backgroundGradient || 'linear-gradient(135deg, #00d4ff, #3b82f6)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
            {props.title}
          </h1>
          {props.subtitle && (
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {props.subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {props.ctaText && (
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                asChild
              >
                <a href={props.ctaLink || '#'}>{props.ctaText}</a>
              </Button>
            )}
            {props.secondaryCtaText && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href={props.secondaryCtaLink || '#'}>{props.secondaryCtaText}</a>
              </Button>
            )}
          </div>

          {props.showStats && (
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
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
          )}

          {props.children}
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full floating-icon"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full floating-icon" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full floating-icon" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

// Team Showcase Component
interface TeamShowcaseProps {
  teams: Array<{
    name: string;
    logo?: string;
    colors: { primary: string; secondary: string };
    link: string;
  }>;
  title?: string;
  columns?: number;
}

export const TeamShowcase = (props: TeamShowcaseProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">{props.title}</h2>
        )}
        <div className={cn(
          "grid gap-6",
          props.columns === 2 && "grid-cols-1 md:grid-cols-2",
          props.columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          props.columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          !props.columns && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {props.teams.map((team, index) => (
            <a 
              key={index}
              href={team.link}
              className="team-card-hover block"
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <div 
                  className="h-48 relative"
                  style={{
                    background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})`
                  }}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{team.name}</h3>
                  </div>
                  {team.logo && (
                    <img 
                      src={team.logo} 
                      alt={team.name}
                      className="absolute top-4 right-4 w-12 h-12 object-contain"
                    />
                  )}
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Grid Component
interface ProductGridProps {
  products: Array<{
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    badge?: string;
    badgeColor?: string;
    rating?: number;
    reviews?: number;
  }>;
  title?: string;
  columns?: number;
}

export const ProductGrid = (props: ProductGridProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">{props.title}</h2>
        )}
        <div className={cn(
          "grid gap-6",
          props.columns === 2 && "grid-cols-1 md:grid-cols-2",
          props.columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          props.columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          !props.columns && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}>
          {props.products.map((product, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge 
                      className="absolute top-2 left-2"
                      style={{ backgroundColor: product.badgeColor || '#00d4ff' }}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-base font-semibold mb-2">
                  {product.name}
                </CardTitle>
                
                {product.rating && (
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                    {product.reviews && (
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Interactive Team Stats Component
interface TeamStatsProps {
  stats: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  teamColors?: { primary: string; secondary: string };
  title?: string;
}

export const TeamStats = (props: TeamStatsProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">{props.title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: props.teamColors?.primary || '#00d4ff' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated Feature List
interface FeatureListProps {
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  title?: string;
  layout?: 'horizontal' | 'vertical';
}

export const FeatureList = (props: FeatureListProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">{props.title}</h2>
        )}
        <div className={cn(
          "grid gap-8",
          props.layout === 'horizontal' ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 max-w-2xl mx-auto"
        )}>
          {props.features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-4 fan-waves-entrance"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {feature.icon && (
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              )}
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
