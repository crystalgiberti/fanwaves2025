import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingBag, Grid3X3 } from "lucide-react";
import { getTeamBySlug, PRODUCT_CATEGORIES } from "@shared/teams";

export default function TeamPage() {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const path = window.location.pathname;
  const league = path.startsWith("/nfl") ? "nfl" : ("ncaa" as "nfl" | "ncaa");

  if (!teamSlug) {
    return (
      <Layout>
        <div>Invalid team page</div>
      </Layout>
    );
  }

  const team = getTeamBySlug(teamSlug, league);

  if (!team) {
    return (
      <Layout>
        <div>Team not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 text-white"
        style={{
          background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link to={`/${league}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {league.toUpperCase()}
              </Link>
            </Button>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              {team.conference} {team.division && `- ${team.division}`}
            </Badge>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{team.city}</h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white/90">
              {team.name}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl">
              Official {team.city} {team.name} fan gear and merchandise. Show
              your team pride with authentic apparel and accessories.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Shop {team.name} Gear
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Browse our complete collection of {team.city} {team.name}{" "}
              merchandise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: team.colors.primary }}
                  >
                    {category.id === "hats" && (
                      <Grid3X3 className="h-8 w-8" />
                    )}
                    {category.id === "shirts" && (
                      <ShoppingBag className="h-8 w-8" />
                    )}
                    {category.id === "jerseys" && (
                      <Star className="h-8 w-8" />
                    )}
                    {category.id === "accessories" && (
                      <Grid3X3 className="h-8 w-8" />
                    )}
                    {category.id === "ladies" && (
                      <ShoppingBag className="h-8 w-8" />
                    )}
                    {category.id === "pants" && (
                      <Grid3X3 className="h-8 w-8" />
                    )}
                    {category.id === "outerwear" && (
                      <ShoppingBag className="h-8 w-8" />
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link to={`/${league}/${teamSlug}/${category.slug}`}>
                      Shop Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">
                Products Available
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.8★</div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">
                Shipping Over $50
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white relative"
        style={{
          background: `linear-gradient(135deg, ${team.colors.secondary} 0%, ${team.colors.primary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Show Your {team.name} Pride?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of {team.name} fans who trust Fan Waves for their
            game day gear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link to={`/${league}/${teamSlug}`}>
                Shop All {team.name} Gear
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/custom">Custom Team Gear</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
