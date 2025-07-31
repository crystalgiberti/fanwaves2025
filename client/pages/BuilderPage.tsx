import { useEffect } from 'react';
import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';

// Initialize Builder.io with your API key
builder.init('87091a742c05463799bae52525d7477c');

export default function BuilderPage() {
  const location = useLocation();
  const isPreviewing = useIsPreviewing();
  
  useEffect(() => {
    // Track page view for analytics
    builder.trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <BuilderComponent
        model="page"
        apiKey="87091a742c05463799bae52525d7477c"
        content={null}
      />
      {!isPreviewing && (
        <div className="p-8 text-center text-muted-foreground">
          <h2 className="text-xl font-semibold mb-2">Builder.io Editor Active</h2>
          <p>Visit your Builder.io dashboard to create and edit content for this page.</p>
          <p className="text-sm mt-2">Path: {location.pathname}</p>
        </div>
      )}
    </Layout>
  );
}
