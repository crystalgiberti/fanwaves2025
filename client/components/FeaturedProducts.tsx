import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, TrendingUp } from "lucide-react";
import { useWooCommerce } from "@/hooks/useWooCommerce";

interface FeaturedProductsProps {
  limit?: number;
}

export default function FeaturedProducts({ limit = 4 }: FeaturedProductsProps) {
  const { products, loading, error, fetchProducts } = useWooCommerce();

  useEffect(() => {
    fetchProducts({
      featured: true,
      limit: limit,
      orderby: "popularity",
      order: "desc",
    });
  }, [limit, fetchProducts]);

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Trending Now
              </h2>
              <p className="text-muted-foreground mt-2">
                Most popular items this week
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(limit)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-3 md:p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Trending Now
            </h2>
            <p className="text-muted-foreground mt-2">
              {error
                ? "Sample products (WooCommerce store connection pending)"
                : "Featured products from your store"}
            </p>
          </div>
          <Button variant="outline" asChild>
            <a
              href="https://fanwaves.fun/shop/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All
              <TrendingUp className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              🏪 Store Integration Status: Displaying sample products
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Add products in your WooCommerce admin to see them here
              automatically.
            </p>
            <details className="mt-2">
              <summary className="text-xs text-blue-500 cursor-pointer">
                Technical details
              </summary>
              <p className="text-xs text-blue-500 mt-1">{error}</p>
            </details>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, limit).map((product) => {
            const originalPrice = parseFloat(
              product.regular_price || product.price,
            );
            const salePrice = parseFloat(product.sale_price || product.price);
            const rating = parseFloat(product.average_rating || "0");

            // Determine badge text
            let badgeText = "";
            let badgeColor = "bg-electric-blue text-white";

            if (product.featured) {
              badgeText = "Bestseller";
            } else if (product.on_sale) {
              badgeText = "Sale";
              badgeColor = "bg-red-500 text-white";
            } else if (product.rating_count > 100) {
              badgeText = "Hot";
              badgeColor = "bg-orange-500 text-white";
            }

            return (
              <Card
                key={product.id}
                className="glass-product-card group cursor-pointer"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={
                        product.images[0]?.src ||
                        "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142"
                      }
                      alt={product.images[0]?.alt || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142";
                      }}
                    />
                    {badgeText && (
                      <Badge className={`absolute top-2 left-2 ${badgeColor}`}>
                        {badgeText}
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
                <CardContent className="p-3 md:p-4">
                  <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  {rating > 0 && (
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({product.rating_count})
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-electric-blue">
                      $
                      {product.on_sale
                        ? salePrice.toFixed(2)
                        : originalPrice.toFixed(2)}
                    </span>
                    {product.on_sale && originalPrice > salePrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
