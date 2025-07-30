import { useState, useRef, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  likes?: number;
  views?: number;
  isLiked?: boolean;
}

export function ArtworkCardAnimated({
  id,
  title,
  artist,
  price,
  imageUrl,
  likes = 0,
  views = 0,
  isLiked = false,
}: ArtworkCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const stats = statsRef.current;

    if (!card || !image || !overlay || !stats) return;

    const handleMouseEnter = () => {
      if (card) {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (stats) {
        gsap.to(stats, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    };

    const handleMouseLeave = () => {
      if (card) {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (stats) {
        gsap.to(stats, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    // Animate heart
    const heartElement = document.querySelector(`#heart-${id}`);
    if (heartElement) {
      gsap.to(heartElement, {
        scale: 1.3,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-neon/30 transition-colors duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          ref={imageRef}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/50 opacity-0 flex items-center justify-center"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLike}
              className="bg-background/90 hover:bg-background backdrop-blur-sm"
            >
              <Heart
                id={`heart-${id}`}
                className={`w-4 h-4 transition-colors ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button
              variant="default"
              size="sm"
              asChild
              className="backdrop-blur-sm"
            >
              <Link to={`/artwork/${id}`}>View Details</Link>
            </Button>
          </div>
        </div>

        {/* Stats overlay */}
        <div
          ref={statsRef}
          className="absolute top-3 right-3 flex items-center space-x-2 opacity-0 translate-y-2"
        >
          <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">{views}</span>
          </div>
          <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
            <Heart className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">{likeCount}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-neon transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            by{" "}
            <Link
              to={`/artist/${artist.toLowerCase().replace(/\s+/g, "")}`}
              className="hover:text-neon transition-colors font-medium"
            >
              {artist}
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">{price} ETH</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-neon/50 hover:border-neon hover:bg-neon/10"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
