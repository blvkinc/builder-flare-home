import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  Eye,
  Share2,
  Flag,
  ShoppingBag,
  Clock,
  DollarSign,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

// Mock artwork data
const artworkData = {
  "1": {
    id: "1",
    title: "Neon Dreams",
    description:
      "A cyberpunk-inspired digital artwork exploring the intersection of technology and human consciousness. This piece represents the ethereal nature of digital dreams in a neon-lit urban landscape, where reality and virtuality blend seamlessly.",
    artist: {
      name: "CyberArt",
      username: "cyberart",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      followers: 12500,
    },
    price: 2.5,
    currency: "ETH",
    imageUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=800&fit=crop",
    category: "Illustration",
    tags: ["cyberpunk", "neon", "futuristic", "digital", "urban"],
    dimensions: "3840 × 2160",
    fileSize: "8.4 MB",
    format: "PNG",
    likes: 234,
    views: 1520,
    isLiked: false,
    createdAt: "2024-01-15",
    blockchain: "Ethereum",
    tokenId: "0x1a2b3c...",
    contract: "0xABC123...",
    royalties: "10%",
    history: [
      {
        event: "Listed",
        price: 2.5,
        from: "CyberArt",
        to: null,
        date: "2024-01-15",
        transaction: "0x1234...",
      },
      {
        event: "Minted",
        price: null,
        from: null,
        to: "CyberArt",
        date: "2024-01-15",
        transaction: "0x5678...",
      },
    ],
    properties: [
      { trait: "Style", value: "Cyberpunk" },
      { trait: "Color Scheme", value: "Neon" },
      { trait: "Mood", value: "Futuristic" },
      { trait: "Technique", value: "Digital Painting" },
    ],
  },
};

const relatedArtworks = [
  {
    id: "2",
    title: "Digital Void",
    artist: "VoidMaster",
    price: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 189,
    views: 987,
  },
  {
    id: "3",
    title: "Quantum Portal",
    artist: "QuantumAI",
    price: 3.8,
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    likes: 445,
    views: 2100,
  },
  {
    id: "4",
    title: "Future City",
    artist: "MetroDesign",
    price: 5.1,
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    likes: 356,
    views: 1789,
  },
];

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useUser();
  const { toast } = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(234);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const artwork = id ? artworkData[id as keyof typeof artworkData] : null;

  if (!artwork) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Artwork Not Found
            </h1>
            <p className="text-muted-foreground">
              The artwork you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/explore">Browse Artworks</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to like artworks",
      });
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to purchase artworks",
      });
      return;
    }

    setIsPurchaseDialogOpen(true);
  };

  const confirmPurchase = () => {
    toast({
      title: "Purchase initiated!",
      description:
        "Your transaction is being processed. You'll receive a confirmation shortly.",
    });
    setIsPurchaseDialogOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Artwork Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={isLiked ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500" : ""}`}
                    />
                    {likeCount}
                  </Button>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{artwork.views}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Artwork Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <Badge variant="secondary" className="mb-3">
                  {artwork.category}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {artwork.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Artist Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={artwork.artist.avatar}
                        alt={artwork.artist.name}
                      />
                      <AvatarFallback>
                        {artwork.artist.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-foreground">
                          {artwork.artist.name}
                        </h3>
                        {artwork.artist.verified && (
                          <CheckCircle className="w-4 h-4 text-neon" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {artwork.artist.followers.toLocaleString()} followers
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/artist/${artwork.artist.username}`}>
                          View Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price and Purchase */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Current Price
                      </p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-foreground">
                          {artwork.price}
                        </span>
                        <span className="text-lg text-muted-foreground">
                          {artwork.currency}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          (~${(artwork.price * 2400).toLocaleString()})
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Dialog
                        open={isPurchaseDialogOpen}
                        onOpenChange={setIsPurchaseDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1 bg-neon text-black hover:bg-neon/90"
                            onClick={handlePurchase}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Buy Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Purchase Artwork</DialogTitle>
                            <DialogDescription>
                              You're about to purchase "{artwork.title}" by{" "}
                              {artwork.artist.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                <img
                                  src={artwork.imageUrl}
                                  alt={artwork.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">
                                  {artwork.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  by {artwork.artist.name}
                                </p>
                                <p className="text-lg font-semibold text-foreground">
                                  {artwork.price} {artwork.currency}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Artwork Price</span>
                                <span>
                                  {artwork.price} {artwork.currency}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Platform Fee (2.5%)</span>
                                <span>
                                  {(artwork.price * 0.025).toFixed(3)}{" "}
                                  {artwork.currency}
                                </span>
                              </div>
                              <div className="flex justify-between font-semibold border-t border-border pt-2">
                                <span>Total</span>
                                <span>
                                  {(artwork.price * 1.025).toFixed(3)}{" "}
                                  {artwork.currency}
                                </span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setIsPurchaseDialogOpen(false)}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={confirmPurchase}
                                className="flex-1"
                              >
                                Confirm Purchase
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline">
                        <Clock className="w-4 h-4 mr-2" />
                        Make Offer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {artwork.properties.map((property, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-muted-foreground">
                        {property.trait}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {property.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Contract Address
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <span className="text-sm font-mono">
                        {artwork.contract.slice(0, 8)}...
                      </span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Token ID
                    </span>
                    <span className="text-sm font-mono text-foreground">
                      {artwork.tokenId.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Blockchain
                    </span>
                    <span className="text-sm text-foreground">
                      {artwork.blockchain}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Creator Royalties
                    </span>
                    <span className="text-sm text-foreground">
                      {artwork.royalties}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {artwork.history.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {event.event}
                          </span>
                          {event.price && (
                            <span className="text-sm text-foreground">
                              {event.price} ETH
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Artworks */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              More from this artist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
