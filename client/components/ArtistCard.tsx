import { Button } from "@/components/ui/button";
import { Users, ShoppingBag } from "lucide-react";

interface ArtistCardProps {
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  totalSales: number;
  artworkCount: number;
  isFollowing?: boolean;
}

export function ArtistCard({ 
  name, 
  avatar, 
  bio, 
  followers, 
  totalSales, 
  artworkCount, 
  isFollowing = false 
}: ArtistCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:border-border/60 transition-all duration-300 hover:scale-[1.02]">
      {/* Avatar and basic info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <img 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-sm font-medium text-foreground">{followers.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-sm font-medium text-foreground">{totalSales}</div>
          <div className="text-xs text-muted-foreground">Sales</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">{artworkCount}</div>
          <div className="text-xs text-muted-foreground">Artworks</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <Button 
          variant={isFollowing ? "secondary" : "default"} 
          size="sm" 
          className="flex-1"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          View Profile
        </Button>
      </div>
    </div>
  );
}
