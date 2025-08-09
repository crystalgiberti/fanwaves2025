import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Zap } from "lucide-react";

export default function LiveEventBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-3 px-4 animate-pulse">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 animate-bounce" />
          <Badge className="bg-white/20 text-white border-white/30 animate-pulse">
            🔴 LIVE NOW
          </Badge>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <span>🏈 JAGS vs STEELERS PRESEASON GAME!</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>1601 E Duval St - Across from Gate 3</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>Until End of Game</span>
        </div>
      </div>
    </div>
  );
}
