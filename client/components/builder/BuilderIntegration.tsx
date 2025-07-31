'use client';

import { useEffect, useRef } from 'react';
import { builder, Builder, BuilderComponent } from '@builder.io/react';
import { customComponents } from '../../../builder-registry';
import { useTheme } from '../ThemeProvider';
import { useResponsive } from '../../hooks/useResponsive';

// Initialize Builder.io
builder.init('87091a742c05463799bae52525d7477c');

// Register all custom components
customComponents.forEach((component) => {
  Builder.registerComponent(component.component, {
    name: component.name,
    inputs: component.inputs,
    canHaveChildren: component.canHaveChildren,
  });
});

// Register editor plugins and enhance the editing experience
Builder.register('editor.settings', {
  designTokens: {
    colors: [
      { name: 'Fan Blue Primary', value: '#3b82f6' },
      { name: 'Electric Blue', value: '#00d4ff' },
      { name: 'Team Red', value: '#dc2626' },
      { name: 'Team Green', value: '#16a34a' },
      { name: 'Team Orange', value: '#ea580c' },
      { name: 'Chiefs Red', value: '#E31837' },
      { name: 'Chiefs Gold', value: '#FFB81C' },
      { name: 'Cowboys Blue', value: '#003594' },
      { name: 'Cowboys Navy', value: '#041E42' },
      { name: 'Alabama Crimson', value: '#9E1B32' },
      { name: 'Alabama Gray', value: '#828A8F' },
      { name: 'Buckeyes Red', value: '#BB0000' },
      { name: 'Buckeyes Silver', value: '#C0C0C0' },
    ],
    spacing: [
      { name: 'XS', value: '4px' },
      { name: 'Small', value: '8px' },
      { name: 'Medium', value: '16px' },
      { name: 'Large', value: '24px' },
      { name: 'XL', value: '32px' },
      { name: '2XL', value: '48px' },
      { name: '3XL', value: '64px' },
    ],
    fontFamily: [
      { name: 'System', value: 'system-ui, -apple-system, sans-serif' },
      { name: 'Heading', value: 'Inter, system-ui, sans-serif' },
      { name: 'Body', value: 'system-ui, sans-serif' },
      { name: 'Mono', value: 'SF Mono, Consolas, monospace' },
    ],
    fontSize: [
      { name: 'XS', value: '12px' },
      { name: 'SM', value: '14px' },
      { name: 'Base', value: '16px' },
      { name: 'LG', value: '18px' },
      { name: 'XL', value: '20px' },
      { name: '2XL', value: '24px' },
      { name: '3XL', value: '30px' },
      { name: '4XL', value: '36px' },
      { name: '5XL', value: '48px' },
      { name: '6XL', value: '60px' },
    ],
    borderRadius: [
      { name: 'None', value: '0px' },
      { name: 'Small', value: '4px' },
      { name: 'Medium', value: '8px' },
      { name: 'Large', value: '12px' },
      { name: 'XL', value: '16px' },
      { name: 'Full', value: '9999px' },
    ],
    boxShadow: [
      { name: 'None', value: 'none' },
      { name: 'Small', value: '0 1px 2px rgba(0, 0, 0, 0.05)' },
      { name: 'Medium', value: '0 4px 6px rgba(0, 0, 0, 0.1)' },
      { name: 'Large', value: '0 10px 15px rgba(0, 0, 0, 0.1)' },
      { name: 'XL', value: '0 20px 25px rgba(0, 0, 0, 0.1)' },
      { name: 'Glow', value: '0 0 20px rgba(0, 212, 255, 0.5)' },
    ],
  },
});

// Enhanced Builder Component with Fan Waves theming
interface FanWavesBuilderProps {
  model: string;
  content?: any;
  apiKey?: string;
  data?: Record<string, any>;
  onContentUpdate?: (content: any) => void;
}

export function FanWavesBuilder({
  model,
  content,
  apiKey = '87091a742c05463799bae52525d7477c',
  data,
  onContentUpdate,
}: FanWavesBuilderProps) {
  const { theme, teamColors } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const builderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject theme-specific CSS variables for Builder.io editor
    if (typeof window !== 'undefined' && builderRef.current) {
      const builderElement = builderRef.current;
      
      // Apply theme colors to Builder.io components
      Object.entries(teamColors).forEach(([key, value]) => {
        builderElement.style.setProperty(`--fan-waves-${key}`, value);
      });
      
      // Add responsive classes
      builderElement.className = `
        fan-waves-builder
        ${isMobile ? 'mobile' : ''}
        ${isTablet ? 'tablet' : ''}
        ${theme}
      `;
    }
  }, [theme, teamColors, isMobile, isTablet]);

  // Enhanced data context for Builder.io
  const builderData = {
    ...data,
    theme,
    teamColors,
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    fanWavesContext: {
      brandColors: {
        primary: '#00d4ff',
        secondary: '#3b82f6',
        accent: '#16a34a',
      },
      breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280,
      },
    },
  };

  return (
    <div ref={builderRef} className="fan-waves-builder-container">
      <BuilderComponent
        model={model}
        content={content}
        apiKey={apiKey}
        data={builderData}
        onContentLoaded={(content) => {
          onContentUpdate?.(content);
        }}
      />
    </div>
  );
}

// Advanced Builder.io hooks for Fan Waves
export function useBuilderContent(model: string, options?: any) {
  const { theme } = useTheme();
  const { isMobile } = useResponsive();
  
  return builder.get(model, {
    ...options,
    userAttributes: {
      ...options?.userAttributes,
      theme,
      device: isMobile ? 'mobile' : 'desktop',
    },
  });
}

// Builder.io Image Optimization
export function BuilderImage({
  src,
  alt,
  width,
  height,
  className,
  responsive = true,
  quality = 80,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  responsive?: boolean;
  quality?: number;
}) {
  const { isMobile } = useResponsive();
  
  // Generate responsive image URLs
  const optimizedSrc = src.includes('cdn.builder.io') 
    ? `${src}?quality=${quality}&width=${isMobile ? 640 : width || 1200}&format=webp`
    : src;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${responsive ? 'max-w-full h-auto' : ''}`}
      loading="lazy"
    />
  );
}

// Team-specific Builder.io component
export function TeamBuilderSection({
  teamSlug,
  model = 'team-section',
  fallbackContent,
}: {
  teamSlug: string;
  model?: string;
  fallbackContent?: React.ReactNode;
}) {
  const content = useBuilderContent(model, {
    userAttributes: {
      urlPath: `/teams/${teamSlug}`,
      team: teamSlug,
    },
  });

  if (!content && !fallbackContent) {
    return null;
  }

  return content ? (
    <FanWavesBuilder
      model={model}
      content={content}
      data={{ teamSlug }}
    />
  ) : (
    <>{fallbackContent}</>
  );
}

export default FanWavesBuilder;
