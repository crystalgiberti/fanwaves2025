import { type RegisteredComponent } from "@builder.io/sdk-react";
import dynamic from 'next/dynamic';

// Dynamic imports for all your Fan Waves components
const Layout = dynamic(() =>
  import('./client/components/Layout').then(mod => ({ default: mod.default }))
);

const Button = dynamic(() =>
  import('./client/components/ui/button').then(mod => ({ default: mod.Button }))
);

const Card = dynamic(() =>
  import('./client/components/ui/card').then(mod => ({ default: mod.Card }))
);

// Advanced Builder components
const HeroSection = dynamic(() =>
  import('./client/components/builder/AdvancedComponents').then(mod => ({ default: mod.HeroSection }))
);

const TeamShowcase = dynamic(() =>
  import('./client/components/builder/AdvancedComponents').then(mod => ({ default: mod.TeamShowcase }))
);

const ProductGrid = dynamic(() =>
  import('./client/components/builder/AdvancedComponents').then(mod => ({ default: mod.ProductGrid }))
);

const TeamStats = dynamic(() =>
  import('./client/components/builder/AdvancedComponents').then(mod => ({ default: mod.TeamStats }))
);

const FeatureList = dynamic(() =>
  import('./client/components/builder/AdvancedComponents').then(mod => ({ default: mod.FeatureList }))
);

export const customComponents: RegisteredComponent[] = [
  {
    component: Layout,
    name: 'FanWavesLayout',
    inputs: [
      {
        name: 'children',
        type: 'blocks',
        hideFromUI: true,
        helperText: 'This is where the page content will be rendered',
      },
    ],
    canHaveChildren: true,
  },
  {
    component: Button,
    name: 'FanWavesButton',
    inputs: [
      {
        name: 'variant',
        type: 'text',
        enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        defaultValue: 'default',
      },
      {
        name: 'size',
        type: 'text',
        enum: ['default', 'sm', 'lg', 'icon'],
        defaultValue: 'default',
      },
      {
        name: 'children',
        type: 'text',
        defaultValue: 'Click me',
      },
      {
        name: 'className',
        type: 'text',
        advanced: true,
      },
    ],
  },
  {
    component: Card,
    name: 'FanWavesCard',
    inputs: [
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Card Title',
      },
      {
        name: 'description',
        type: 'text',
        defaultValue: 'Card description',
      },
      {
        name: 'className',
        type: 'text',
        advanced: true,
      },
    ],
    canHaveChildren: true,
  },
  {
    component: HeroSection,
    name: 'HeroSection',
    inputs: [
      {
        name: 'title',
        type: 'text',
        required: true,
        defaultValue: 'Welcome to Fan Waves',
      },
      {
        name: 'subtitle',
        type: 'text',
        defaultValue: 'Your ultimate destination for team gear',
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      },
      {
        name: 'backgroundGradient',
        type: 'text',
        defaultValue: 'linear-gradient(135deg, #00d4ff, #3b82f6)',
        advanced: true,
      },
      {
        name: 'ctaText',
        type: 'text',
        defaultValue: 'Shop Now',
      },
      {
        name: 'ctaLink',
        type: 'url',
        defaultValue: '/products',
      },
      {
        name: 'secondaryCtaText',
        type: 'text',
        defaultValue: 'Learn More',
      },
      {
        name: 'secondaryCtaLink',
        type: 'url',
        defaultValue: '/about',
      },
      {
        name: 'showStats',
        type: 'boolean',
        defaultValue: true,
      },
    ],
    canHaveChildren: true,
  },
  {
    component: TeamShowcase,
    name: 'TeamShowcase',
    inputs: [
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Featured Teams',
      },
      {
        name: 'columns',
        type: 'number',
        enum: [2, 3, 4],
        defaultValue: 4,
      },
      {
        name: 'teams',
        type: 'list',
        subFields: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'logo',
            type: 'file',
            allowedFileTypes: ['png', 'svg', 'jpg'],
          },
          {
            name: 'colors',
            type: 'object',
            subFields: [
              {
                name: 'primary',
                type: 'color',
                defaultValue: '#3b82f6',
              },
              {
                name: 'secondary',
                type: 'color',
                defaultValue: '#1e40af',
              },
            ],
          },
          {
            name: 'link',
            type: 'url',
            required: true,
          },
        ],
        defaultValue: [
          {
            name: 'Dallas Cowboys',
            colors: { primary: '#003594', secondary: '#041E42' },
            link: '/nfl/cowboys',
          },
          {
            name: 'Kansas City Chiefs',
            colors: { primary: '#E31837', secondary: '#FFB81C' },
            link: '/nfl/chiefs',
          },
        ],
      },
    ],
  },
  {
    component: ProductGrid,
    name: 'ProductGrid',
    inputs: [
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Featured Products',
      },
      {
        name: 'columns',
        type: 'number',
        enum: [2, 3, 4],
        defaultValue: 4,
      },
      {
        name: 'products',
        type: 'list',
        subFields: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'price',
            type: 'text',
            required: true,
          },
          {
            name: 'originalPrice',
            type: 'text',
          },
          {
            name: 'image',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png'],
            required: true,
          },
          {
            name: 'badge',
            type: 'text',
          },
          {
            name: 'badgeColor',
            type: 'color',
            defaultValue: '#00d4ff',
          },
          {
            name: 'rating',
            type: 'number',
            max: 5,
            min: 0,
            step: 0.1,
          },
          {
            name: 'reviews',
            type: 'number',
          },
        ],
        defaultValue: [
          {
            name: 'Team Jersey',
            price: '$79.99',
            originalPrice: '$99.99',
            image: '/placeholder.svg',
            badge: 'Sale',
            rating: 4.8,
            reviews: 156,
          },
        ],
      },
    ],
  },
  {
    component: TeamStats,
    name: 'TeamStats',
    inputs: [
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Team Statistics',
      },
      {
        name: 'teamColors',
        type: 'object',
        subFields: [
          {
            name: 'primary',
            type: 'color',
            defaultValue: '#00d4ff',
          },
          {
            name: 'secondary',
            type: 'color',
            defaultValue: '#3b82f6',
          },
        ],
      },
      {
        name: 'stats',
        type: 'list',
        subFields: [
          {
            name: 'label',
            type: 'text',
            required: true,
          },
          {
            name: 'value',
            type: 'text',
            required: true,
          },
          {
            name: 'icon',
            type: 'text',
          },
        ],
        defaultValue: [
          { label: 'Championships', value: '5' },
          { label: 'Playoff Appearances', value: '23' },
          { label: 'Win Percentage', value: '67%' },
          { label: 'Fan Rating', value: '4.9★' },
        ],
      },
    ],
  },
  {
    component: FeatureList,
    name: 'FeatureList',
    inputs: [
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Why Choose Fan Waves',
      },
      {
        name: 'layout',
        type: 'text',
        enum: ['horizontal', 'vertical'],
        defaultValue: 'horizontal',
      },
      {
        name: 'features',
        type: 'list',
        subFields: [
          {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            type: 'text',
            required: true,
          },
          {
            name: 'icon',
            type: 'text',
          },
        ],
        defaultValue: [
          {
            title: 'Authentic Gear',
            description: 'Official licensed merchandise from your favorite teams',
            icon: '✅',
          },
          {
            title: 'Fast Shipping',
            description: 'Free shipping on orders over $50, delivered fast',
            icon: '🚀',
          },
          {
            title: 'Fan Guarantee',
            description: '100% satisfaction guarantee or your money back',
            icon: '💯',
          },
        ],
      },
    ],
  },
];
