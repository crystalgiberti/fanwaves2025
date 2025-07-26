import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.slice(1) || 'page';
  const pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="h-8 w-8 text-electric-blue" />
              </div>
              <CardTitle className="text-2xl">
                {pageTitle} Page Coming Soon!
              </CardTitle>
              <CardDescription className="text-base">
                We're working hard to bring you an amazing {pageName} experience. Check back soon for the latest Fan Waves gear and updates!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                In the meantime, explore our other collections and discover the best fan gear for your favorite teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/products">
                    Browse Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
