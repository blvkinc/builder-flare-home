import { useState } from "react";
import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export function ArtworkCard({
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

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-border/60 transition-all duration-300 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLike}
              className="bg-background/90 hover:bg-background"
            >
              <Heart
                className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to={`/artwork/${id}`}>View Details</Link>
            </Button>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-xs text-white">{views}</span>
          </div>
          <div className="flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1">
            <Heart className="w-3 h-3 text-white" />
            <span className="text-xs text-white">{likeCount}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-medium text-foreground line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">
            by{" "}
            <Link
              to={`/artist/${artist.toLowerCase().replace(/\s+/g, "")}`}
              className="hover:text-foreground transition-colors"
            >
              {artist}
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            ${price}
          </span>
          <Button variant="outline" size="sm" className="text-xs">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
