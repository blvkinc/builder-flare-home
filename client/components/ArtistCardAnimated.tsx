import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBag, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

interface ArtistCardProps {
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  totalSales: number;
  artworkCount: number;
  isFollowing?: boolean;
  verified?: boolean;
}

export function ArtistCardAnimated({ 
  name, 
  avatar, 
  bio, 
  followers, 
  totalSales, 
  artworkCount, 
  isFollowing = false,
  verified = true
}: ArtistCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const avatarEl = avatarRef.current;
    const stats = statsRef.current;

    if (!card || !avatarEl || !stats) return;

    const handleMouseEnter = () => {
      if (card) {
        gsap.to(card, {
          y: -6,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      if (avatarEl) {
        gsap.to(avatarEl, {
          scale: 1.1,
          rotation: 2,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      if (stats && stats.children.length > 0) {
        gsap.to(stats.children, {
          y: -3,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      if (card) {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      if (avatarEl) {
        gsap.to(avatarEl, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      if (stats && stats.children.length > 0) {
        gsap.to(stats.children, {
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-card rounded-xl border border-border p-6 hover:border-neon/30 transition-colors duration-300 cursor-pointer"
    >
      {/* Avatar and basic info */}
      <div className="flex items-start space-x-4 mb-4">
        <div ref={avatarRef} className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0 ring-2 ring-transparent hover:ring-neon/50 transition-all duration-300">
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-black" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <span>{name}</span>
            {verified && <CheckCircle className="w-4 h-4 text-neon" />}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-sm font-bold text-foreground">{followers.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-sm font-bold text-foreground">{totalSales}</div>
          <div className="text-xs text-muted-foreground">Sales</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-foreground">{artworkCount}</div>
          <div className="text-xs text-muted-foreground">Artworks</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <Button 
          variant={isFollowing ? "secondary" : "default"} 
          size="sm" 
          className={`flex-1 transition-all duration-300 ${
            isFollowing 
              ? "bg-neon/20 text-neon hover:bg-neon/30" 
              : "bg-neon text-black hover:bg-neon/90"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button variant="outline" size="sm" className="flex-1 border-neon/50 hover:border-neon hover:bg-neon/10" asChild>
          <Link to={`/artist/${name.toLowerCase().replace(/\s+/g, '')}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
}
