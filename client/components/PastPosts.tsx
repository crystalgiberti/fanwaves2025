import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Camera } from "lucide-react";

export default function PastPosts() {
  const pastPost = {
    date: "August 17, 2024",
    title: "Jags vs Steelers Preseason Game",
    location: "1601 E Duval St - Across from Gate 3",
    summary: "Live from our popup shop during the Jaguars vs Steelers preseason game with fresh fan gear for both teams!",
    images: [
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F96e45babd3124d2eb3e0979134e407b1?format=webp&width=400",
        alt: "Fan Waves Payment Setup"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F7f22002da44a49cdaa4763ab34b4ea1e?format=webp&width=400",
        alt: "Terrible Towels Display"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fca2de94cc2a14639adf3c6ef9b17aeaf?format=webp&width=400",
        alt: "Steelers Merchandise"
      }
    ]
  };

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            Recent Game Day Events
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Check out our latest popup events and game day experiences
          </p>
        </div>

        <Card className="glass-card max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{pastPost.date}</span>
            </div>
            <CardTitle className="text-xl md:text-2xl">{pastPost.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{pastPost.location}</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-6">{pastPost.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {pastPost.images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg aspect-square bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">🐆 Jaguars</Badge>
              <Badge variant="secondary">🖤 Steelers</Badge>
              <Badge variant="secondary">🏈 Preseason</Badge>
              <Badge variant="secondary">📍 Popup Event</Badge>
            </div>

            <div className="text-center">
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                View Full Gallery
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
