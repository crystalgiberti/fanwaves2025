import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Camera, Users } from "lucide-react";

export default function GameDayBlog() {
  const blogImages = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F96e45babd3124d2eb3e0979134e407b1?format=webp&width=800",
      alt: "Fan Waves Payment Sign - We Accept Digital Payments",
      caption: "Digital payments accepted - Venmo, Zelle, Cash App!"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F7716e56fed024be897212ff9cafbd336?format=webp&width=800",
      alt: "Jaguars Fan Gear Display",
      caption: "Fresh Jags gear for the home team fans!"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fef597d91a7a34f639f76fc74c83eb73d?format=webp&width=800",
      alt: "Fan Merchandise Setup",
      caption: "Premium fan accessories and team gear"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fca2de94cc2a14639adf3c6ef9b17aeaf?format=webp&width=800",
      alt: "Steelers Corner Display",
      caption: "Steelers fans - we've got you covered too!"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F3321584b9f7a40be985c211d945a6fff?format=webp&width=800",
      alt: "More Steelers Merchandise",
      caption: "Black and Gold gear for Steelers Nation"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F7f22002da44a49cdaa4763ab34b4ea1e?format=webp&width=800",
      alt: "Terrible Towels Display",
      caption: "Official Terrible Towels - a Pittsburgh classic!"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card className="glass-card max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-teal-500 text-white">🐆 JAGUARS</Badge>
              <Badge className="bg-yellow-500 text-black">🖤 STEELERS</Badge>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              🏈 Preseason Showdown: Jags vs Steelers
            </CardTitle>
            <p className="text-lg text-muted-foreground mb-6">
              Live from our popup shop at 1601 E Duval Street!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg">
                <MapPin className="h-5 w-5 text-electric-blue" />
                <div className="text-sm">
                  <div className="font-semibold">1601 E Duval St</div>
                  <div className="text-muted-foreground">Across from Gate 3</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg">
                <Clock className="h-5 w-5 text-electric-blue" />
                <div className="text-sm">
                  <div className="font-semibold">Game Day Hours</div>
                  <div className="text-muted-foreground">Until End of Game</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg">
                <Users className="h-5 w-5 text-electric-blue" />
                <div className="text-sm">
                  <div className="font-semibold">Both Teams</div>
                  <div className="text-muted-foreground">Jags & Steelers Gear</div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-center text-lg leading-relaxed">
                We're LIVE at today's Jaguars vs Steelers preseason game with the freshest fan gear for both teams! 
                Whether you're riding with the Jags at home or representing Steelers Nation, 
                we've got premium merchandise to show your team spirit.
              </p>
              
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Live from the Popup
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogImages.map((image, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-muted">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {image.caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-teal-500/10 to-yellow-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">What We've Got Today:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-teal-600 mb-2">🐆 Jaguars Gear</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Teal jerseys and fan chains</li>
                    <li>• Official team hats and caps</li>
                    <li>• Jacksonville accessories</li>
                    <li>• Custom Jags merchandise</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-2">🖤 Steelers Gear</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Official Terrible Towels</li>
                    <li>• Black and Gold apparel</li>
                    <li>• Steelers hats and chains</li>
                    <li>• Pittsburgh fan accessories</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-electric-blue/10 rounded-lg">
              <h3 className="text-xl font-bold mb-2">💳 Easy Payment Options</h3>
              <p className="text-muted-foreground mb-4">
                We accept Venmo, Zelle, Cash App, and cash - no hassle, just gear!
              </p>
              <Badge className="bg-electric-blue text-white px-4 py-2">
                Come Find Us at Gate 3! 📍
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
