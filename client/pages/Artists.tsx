import { Layout } from "@/components/Layout";
import { ArtistCard } from "@/components/ArtistCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle } from "lucide-react";
import { useState } from "react";

const featuredArtists = [
  {
    name: "CyberArt",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Digital artist specializing in cyberpunk and futuristic aesthetics",
    followers: 12500,
    totalSales: 89,
    artworkCount: 24,
    isFollowing: false
  },
  {
    name: "VoidMaster",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=100&h=100&fit=crop&crop=face",
    bio: "Abstract digital compositions exploring the void between reality and dreams",
    followers: 8900,
    totalSales: 67,
    artworkCount: 31,
    isFollowing: false
  },
  {
    name: "QuantumAI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "AI-assisted generative art pushing the boundaries of digital creativity",
    followers: 15200,
    totalSales: 123,
    artworkCount: 42,
    isFollowing: false
  },
  {
    name: "MetroDesign",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    bio: "Urban-inspired digital art and futuristic cityscape designs",
    followers: 9800,
    totalSales: 76,
    artworkCount: 28,
    isFollowing: false
  },
  {
    name: "HoloVision",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Creating immersive holographic-style digital art experiences",
    followers: 11300,
    totalSales: 94,
    artworkCount: 35,
    isFollowing: false
  },
  {
    name: "NeonStorm",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Vibrant neon aesthetics merged with storm-like energy patterns",
    followers: 7600,
    totalSales: 52,
    artworkCount: 19,
    isFollowing: false
  }
];

export default function Artists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("followers");

  const filteredArtists = featuredArtists
    .filter(artist =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "sales":
          return b.totalSales - a.totalSales;
        case "artworks":
          return b.artworkCount - a.artworkCount;
        case "followers":
        default:
          return b.followers - a.followers;
      }
    });

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="outline" className="border-neon/50 text-neon">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verified Human Artists
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Featured Human Artists</h1>
            <p className="text-muted-foreground text-lg">
              Discover and follow verified human digital artists on Avt. Each creator is personally verified to ensure authentic human creativity.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search artists..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="followers">Most Followers</SelectItem>
                <SelectItem value="sales">Most Sales</SelectItem>
                <SelectItem value="artworks">Most Artworks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Artists Grid */}
          {filteredArtists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtists.map((artist, index) => (
                <ArtistCard key={index} {...artist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No artists found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms
              </p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredArtists.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Artists
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
