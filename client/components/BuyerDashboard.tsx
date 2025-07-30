import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { ArtworkCard } from "./ArtworkCard";
import { ArtistCard } from "./ArtistCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Users, Bell, TrendingUp, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const purchasedArtworks = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "CyberArt",
    price: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
    likes: 234,
    views: 1520,
    purchaseDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Digital Void",
    artist: "VoidMaster", 
    price: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 189,
    views: 987,
    purchaseDate: "2024-01-10"
  }
];

const favoriteArtworks = [
  {
    id: "3",
    title: "Quantum Portal",
    artist: "QuantumAI",
    price: 3.8,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    likes: 445,
    views: 2100,
    isLiked: true
  },
  {
    id: "4",
    title: "Future City",
    artist: "MetroDesign",
    price: 5.1,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    likes: 356,
    views: 1789,
    isLiked: true
  }
];

const followedArtists = [
  {
    name: "CyberArt",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Digital artist specializing in cyberpunk aesthetics",
    followers: 12500,
    totalSales: 89,
    artworkCount: 24,
    isFollowing: true
  },
  {
    name: "VoidMaster",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=100&h=100&fit=crop&crop=face", 
    bio: "Abstract digital compositions exploring the void",
    followers: 8900,
    totalSales: 67,
    artworkCount: 31,
    isFollowing: true
  }
];

const feedItems = [
  {
    id: "1",
    type: "new_artwork",
    artist: "CyberArt",
    title: "Holographic Sunset",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1614630482437-8e5e7e5ad725?w=400&h=400&fit=crop"
  },
  {
    id: "2",
    type: "price_drop",
    artist: "VoidMaster",
    title: "Abstract Chaos",
    oldPrice: 5.2,
    newPrice: 3.8,
    time: "6 hours ago",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop"
  },
  {
    id: "3",
    type: "trending",
    title: "Neural Networks collection is trending",
    artist: "AIArtist",
    time: "1 day ago"
  }
];

export function BuyerDashboard() {
  const { user } = useUser();
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover new artworks and manage your collection
              </p>
            </div>
            <Button className="relative">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artworks Owned</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchasedArtworks.length}</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favoriteArtworks.length}</div>
              <p className="text-xs text-muted-foreground">
                Artworks you've liked
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Following</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{followedArtists.length}</div>
              <p className="text-xs text-muted-foreground">
                Artists you follow
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {purchasedArtworks.reduce((sum, art) => sum + art.price, 0).toFixed(1)} ETH
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime purchases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="feed">Personalized Feed</TabsTrigger>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          {/* Personalized Feed */}
          <TabsContent value="feed" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Feed</h2>
              <p className="text-muted-foreground mb-6">
                Latest updates from artists you follow and personalized recommendations
              </p>
              
              <div className="space-y-6">
                {feedItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {item.image && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              {item.type === "new_artwork" && (
                                <div>
                                  <p className="text-foreground font-medium">
                                    <span className="text-neon">{item.artist}</span> released a new artwork
                                  </p>
                                  <p className="text-muted-foreground text-sm mt-1">{item.title}</p>
                                </div>
                              )}
                              {item.type === "price_drop" && (
                                <div>
                                  <p className="text-foreground font-medium">
                                    Price drop on <span className="text-neon">{item.title}</span>
                                  </p>
                                  <p className="text-muted-foreground text-sm mt-1">
                                    by {item.artist} • 
                                    <span className="line-through ml-1">{item.oldPrice} ETH</span>
                                    <span className="text-neon ml-2">{item.newPrice} ETH</span>
                                  </p>
                                </div>
                              )}
                              {item.type === "trending" && (
                                <div>
                                  <p className="text-foreground font-medium flex items-center">
                                    <TrendingUp className="w-4 h-4 text-neon mr-2" />
                                    {item.title}
                                  </p>
                                  <p className="text-muted-foreground text-sm mt-1">by {item.artist}</p>
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* My Collection */}
          <TabsContent value="collection" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">My Collection</h2>
                <p className="text-muted-foreground">Artworks you own</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/explore">
                  <Eye className="w-4 h-4 mr-2" />
                  Browse More
                </Link>
              </Button>
            </div>
            
            {purchasedArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {purchasedArtworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} {...artwork} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No artworks yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your collection by exploring amazing digital art
                  </p>
                  <Button asChild>
                    <Link to="/explore">Explore Artworks</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Favorites</h2>
              <p className="text-muted-foreground">Artworks you've liked</p>
            </div>
            
            {favoriteArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteArtworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} {...artwork} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Heart artworks you love to save them here
                  </p>
                  <Button asChild>
                    <Link to="/explore">Discover Art</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Following */}
          <TabsContent value="following" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Following</h2>
              <p className="text-muted-foreground">Artists you follow</p>
            </div>
            
            {followedArtists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {followedArtists.map((artist, index) => (
                  <ArtistCard key={index} {...artist} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Not following anyone yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Follow artists to see their latest work in your feed
                  </p>
                  <Button asChild>
                    <Link to="/artists">Discover Artists</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
