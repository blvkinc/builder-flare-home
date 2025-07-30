import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ExternalLink, MapPin, Calendar, CheckCircle, Eye, Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

// Mock artist data
const artistData = {
  cyberart: {
    id: "cyberart",
    name: "CyberArt",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=400&fit=crop",
    bio: "Digital artist specializing in cyberpunk and futuristic aesthetics. Creating immersive worlds that blend technology with human emotion. Based in Neo Tokyo, working on the intersection of AI and traditional art.",
    location: "Neo Tokyo",
    joinDate: "January 2023",
    verified: true,
    followers: 12500,
    following: 234,
    totalSales: 89,
    totalVolume: 245.7,
    artworkCount: 24,
    socialLinks: {
      website: "https://cyberart.com",
      twitter: "https://twitter.com/cyberart",
      instagram: "https://instagram.com/cyberart"
    },
    artworks: [
      {
        id: "1",
        title: "Neon Dreams",
        artist: "CyberArt",
        price: 2.5,
        imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
        likes: 234,
        views: 1520
      },
      {
        id: "2",
        title: "Digital Void",
        artist: "CyberArt", 
        price: 4.2,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        likes: 189,
        views: 987
      },
      {
        id: "3",
        title: "Quantum Portal",
        artist: "CyberArt",
        price: 3.8,
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
        likes: 445,
        views: 2100
      },
      {
        id: "4",
        title: "Future City",
        artist: "CyberArt",
        price: 5.1,
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
        likes: 356,
        views: 1789
      }
    ],
    collections: [
      {
        name: "Cyberpunk Series",
        count: 12,
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=300&h=300&fit=crop"
      },
      {
        name: "Digital Landscapes",
        count: 8,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop"
      }
    ]
  }
};

export default function ArtistProfile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useUser();
  
  const artist = username ? artistData[username as keyof typeof artistData] : null;
  const isOwnProfile = currentUser?.name.toLowerCase().replace(/\s+/g, '') === username;

  if (!artist) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">Artist Not Found</h1>
            <p className="text-muted-foreground">The artist profile you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/artists">Browse Artists</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 bg-muted overflow-hidden">
          <img 
            src={artist.coverImage} 
            alt={`${artist.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 sm:-mt-24 lg:-mt-32">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-background border-4 border-background">
                  <img 
                    src={artist.avatar} 
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {artist.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-black" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center space-x-2">
                      <span>{artist.name}</span>
                      {artist.verified && (
                        <CheckCircle className="w-6 h-6 text-neon" />
                      )}
                    </h1>
                    <div className="flex flex-wrap items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      {artist.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{artist.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {artist.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    {isOwnProfile ? (
                      <Button variant="outline">Edit Profile</Button>
                    ) : (
                      <>
                        <Button variant="outline">
                          <Users className="w-4 h-4 mr-2" />
                          Follow
                        </Button>
                        <Button>Message</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{artist.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{artist.totalSales}</div>
                <div className="text-sm text-muted-foreground">Sales</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{artist.totalVolume}</div>
                <div className="text-sm text-muted-foreground">Volume (ETH)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{artist.artworkCount}</div>
                <div className="text-sm text-muted-foreground">Artworks</div>
              </CardContent>
            </Card>
          </div>

          {/* Bio and Links */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
                  
                  {Object.keys(artist.socialLinks).length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-foreground mb-3">Links</h4>
                      <div className="flex flex-wrap gap-2">
                        {artist.socialLinks.website && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={artist.socialLinks.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Website
                            </a>
                          </Button>
                        )}
                        {artist.socialLinks.twitter && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                              Twitter
                            </a>
                          </Button>
                        )}
                        {artist.socialLinks.instagram && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                              Instagram
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Collections */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Collections</h3>
                  <div className="space-y-3">
                    {artist.collections.map((collection, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{collection.name}</p>
                          <p className="text-xs text-muted-foreground">{collection.count} items</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Artworks */}
          <div className="mt-8 mb-8">
            <Tabs defaultValue="artworks" className="space-y-6">
              <TabsList>
                <TabsTrigger value="artworks">Artworks ({artist.artworkCount})</TabsTrigger>
                <TabsTrigger value="collections">Collections ({artist.collections.length})</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="artworks" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {artist.artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} {...artwork} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="collections" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artist.collections.map((collection, index) => (
                    <Card key={index} className="overflow-hidden hover:border-border/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                      <div className="aspect-square bg-muted overflow-hidden">
                        <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-foreground">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground">{collection.count} items</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-neon rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-foreground">Listed <span className="font-medium">Quantum Portal</span> for 3.8 ETH</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-neon rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-foreground">Sold <span className="font-medium">Neon Dreams</span> to @collector123</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-neon rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-foreground">Created <span className="font-medium">Cyberpunk Series</span> collection</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
