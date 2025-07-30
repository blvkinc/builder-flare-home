import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { ArtworkCard } from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, DollarSign, Eye, Heart, TrendingUp, Users, Plus, BarChart3, Calendar, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from "react-router-dom";

// Mock data
const salesData = [
  { month: 'Jan', earnings: 1200, sales: 8 },
  { month: 'Feb', earnings: 1800, sales: 12 },
  { month: 'Mar', earnings: 2200, sales: 15 },
  { month: 'Apr', earnings: 1900, sales: 11 },
  { month: 'May', earnings: 2800, sales: 18 },
  { month: 'Jun', earnings: 3200, sales: 22 },
];

const myArtworks = [
  {
    id: "1",
    title: "Cyberpunk Dreams",
    artist: "You",
    price: 3.5,
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
    likes: 234,
    views: 1520,
    status: "active",
    sales: 5
  },
  {
    id: "2",
    title: "Digital Horizon",
    artist: "You",
    price: 2.8,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 189,
    views: 987,
    status: "active",
    sales: 3
  },
  {
    id: "3",
    title: "Neon Cityscape",
    artist: "You",
    price: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    likes: 356,
    views: 1789,
    status: "sold",
    sales: 8
  }
];

const recentSales = [
  {
    artwork: "Cyberpunk Dreams",
    buyer: "ArtCollector42",
    price: 3.5,
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=100&h=100&fit=crop"
  },
  {
    artwork: "Digital Horizon", 
    buyer: "CryptoArt_Fan",
    price: 2.8,
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
  },
  {
    artwork: "Neon Cityscape",
    buyer: "FutureVision",
    price: 4.2,
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop"
  }
];

const followers = [
  {
    name: "ArtCollector42",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    followDate: "2024-01-01"
  },
  {
    name: "CryptoArt_Fan",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=100&h=100&fit=crop&crop=face",
    followDate: "2024-01-05"
  },
  {
    name: "FutureVision",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    followDate: "2024-01-08"
  }
];

export function ArtistDashboard() {
  const { user } = useUser();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    file: null as File | null
  });

  const totalEarnings = salesData.reduce((sum, month) => sum + month.earnings, 0);
  const totalSales = salesData.reduce((sum, month) => sum + month.sales, 0);
  const totalViews = myArtworks.reduce((sum, artwork) => sum + artwork.views, 0);
  const totalLikes = myArtworks.reduce((sum, artwork) => sum + artwork.likes, 0);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle artwork upload
    console.log("Uploading artwork:", uploadForm);
    setIsUploadOpen(false);
    setUploadForm({
      title: "",
      description: "",
      price: "",
      category: "",
      tags: "",
      file: null
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Artist Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your artworks, track sales, and grow your audience
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Badge variant="outline" className="border-neon/50 text-neon">
                  <Clock className="w-3 h-3 mr-1" />
                  2 artworks in verification
                </Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/verification" className="text-neon hover:text-neon/80">
                    View Status →
                  </Link>
                </Button>
              </div>
            </div>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="bg-neon text-black hover:bg-neon/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Artwork
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Artwork</DialogTitle>
                  <DialogDescription>
                    Share your digital creation with the world
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="artwork-file">Artwork File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drop your artwork here or click to browse
                      </p>
                      <Input
                        id="artwork-file"
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Give your artwork a name"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your artwork"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (ETH)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={uploadForm.price}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={uploadForm.category} onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="illustration">Illustration</SelectItem>
                          <SelectItem value="3d">3D</SelectItem>
                          <SelectItem value="animation">Animation</SelectItem>
                          <SelectItem value="concept-art">Concept Art</SelectItem>
                          <SelectItem value="abstract">Abstract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="cyberpunk, neon, futuristic (comma-separated)"
                      value={uploadForm.tags}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Upload
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalEarnings / 1000).toFixed(1)}K ETH</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalViews / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.followers?.toLocaleString() || 0}</div>
              <p className="text-xs text-muted-foreground">
                +12 new this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Monthly earnings over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "8px" 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="hsl(var(--neon))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--neon))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales Volume</CardTitle>
              <CardDescription>Number of artworks sold per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "8px" 
                    }} 
                  />
                  <Bar dataKey="sales" fill="hsl(var(--neon))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="artworks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* My Artworks */}
          <TabsContent value="artworks" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">My Artworks</h2>
                <p className="text-muted-foreground">Manage your digital art collection</p>
              </div>
              <Button onClick={() => setIsUploadOpen(true)} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myArtworks.map((artwork) => (
                <div key={artwork.id} className="relative">
                  <ArtworkCard {...artwork} />
                  <div className="absolute top-2 right-2">
                    <Badge variant={artwork.status === "active" ? "default" : "secondary"}>
                      {artwork.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Sales History */}
          <TabsContent value="sales" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Sales History</h2>
              <p className="text-muted-foreground">Track your recent sales and earnings</p>
            </div>
            
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={sale.image} alt={sale.artwork} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-foreground font-medium">{sale.artwork}</p>
                            <p className="text-muted-foreground text-sm">Sold to {sale.buyer}</p>
                            <p className="text-xs text-muted-foreground mt-1">{sale.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-neon">{sale.price} ETH</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Followers */}
          <TabsContent value="followers" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Followers</h2>
              <p className="text-muted-foreground">People who follow your work</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {followers.map((follower, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <img src={follower.avatar} alt={follower.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium">{follower.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Following since {follower.followDate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Analytics</h2>
              <p className="text-muted-foreground">Detailed insights into your artwork performance</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Artworks</CardTitle>
                  <CardDescription>Based on views and likes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myArtworks.sort((a, b) => b.views - a.views).map((artwork, index) => (
                      <div key={artwork.id} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-neon"></div>
                        <span className="text-sm text-foreground">{artwork.title}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {artwork.views} views
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>How people interact with your art</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Total Likes</span>
                      <span className="text-sm font-medium">{totalLikes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Total Views</span>
                      <span className="text-sm font-medium">{totalViews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Engagement Rate</span>
                      <span className="text-sm font-medium">
                        {((totalLikes / totalViews) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
