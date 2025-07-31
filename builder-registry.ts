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
];
