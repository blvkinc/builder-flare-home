import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, RefreshCw, Search, Filter, Ban, Zap } from "lucide-react";

// Mock data for artworks in verification
const verificationQueue = [
  {
    id: "v1",
    title: "Cosmic Nebula",
    artist: "StarArtist",
    uploadDate: "2024-01-20T10:30:00Z",
    status: "pending",
    progress: 0,
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=300&fit=crop",
    estimatedTime: "5 minutes",
    priority: "normal",
    flags: []
  },
  {
    id: "v2",
    title: "Digital Dreams",
    artist: "TechVision",
    uploadDate: "2024-01-20T09:15:00Z",
    status: "analyzing",
    progress: 35,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
    estimatedTime: "2 minutes",
    priority: "normal",
    flags: []
  },
  {
    id: "v3",
    title: "Abstract Flow",
    artist: "FlowMaster",
    uploadDate: "2024-01-20T08:45:00Z",
    status: "human_review",
    progress: 75,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    estimatedTime: "Manual review",
    priority: "high",
    flags: ["edge_case"]
  },
  {
    id: "v4",
    title: "Neon Cityscape",
    artist: "CyberArt",
    uploadDate: "2024-01-20T07:20:00Z",
    status: "verified",
    progress: 100,
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=300&h=300&fit=crop",
    estimatedTime: "Complete",
    priority: "normal",
    flags: []
  },
  {
    id: "v5",
    title: "Suspicious Pattern",
    artist: "UnknownUser",
    uploadDate: "2024-01-20T06:10:00Z",
    status: "rejected",
    progress: 100,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
    estimatedTime: "Rejected",
    priority: "normal",
    flags: ["ai_detected", "pattern_match"]
  },
  {
    id: "v6",
    title: "Geometric Harmony",
    artist: "MathArtist",
    uploadDate: "2024-01-20T05:30:00Z",
    status: "processing",
    progress: 15,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop",
    estimatedTime: "8 minutes",
    priority: "normal",
    flags: []
  }
];

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
  processing: { icon: RefreshCw, color: "text-blue-500", bg: "bg-blue-500/10", label: "Processing" },
  analyzing: { icon: Zap, color: "text-neon", bg: "bg-neon/10", label: "AI Analysis" },
  human_review: { icon: Eye, color: "text-orange-500", bg: "bg-orange-500/10", label: "Human Review" },
  verified: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Verified Human" },
  rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Rejected" }
};

export default function Verification() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredArtworks = verificationQueue
    .filter(artwork => {
      const matchesStatus = selectedStatus === "all" || artwork.status === selectedStatus;
      const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { "high": 3, "normal": 2, "low": 1 };
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
        case "oldest":
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        case "newest":
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

  const getStatusCounts = () => {
    const counts = verificationQueue.reduce((acc, artwork) => {
      acc[artwork.status] = (acc[artwork.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="outline" className="border-neon/50 text-neon">
                <Ban className="w-4 h-4 mr-2" />
                AI Verification System
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Artwork Verification Queue</h1>
            <p className="text-muted-foreground text-lg">
              Real-time monitoring of artwork submissions being verified for human authenticity
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500">{statusCounts.pending || 0}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-neon">{statusCounts.analyzing || 0}</div>
                <div className="text-xs text-muted-foreground">Analyzing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{statusCounts.human_review || 0}</div>
                <div className="text-xs text-muted-foreground">Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{statusCounts.verified || 0}</div>
                <div className="text-xs text-muted-foreground">Verified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{statusCounts.rejected || 0}</div>
                <div className="text-xs text-muted-foreground">Rejected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{verificationQueue.length}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search artworks or artists..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="analyzing">AI Analysis</SelectItem>
                <SelectItem value="human_review">Human Review</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Verification Queue */}
          <div className="space-y-4">
            {filteredArtworks.length > 0 ? (
              filteredArtworks.map((artwork) => {
                const StatusIcon = statusConfig[artwork.status as keyof typeof statusConfig].icon;
                const statusColor = statusConfig[artwork.status as keyof typeof statusConfig].color;
                const statusBg = statusConfig[artwork.status as keyof typeof statusConfig].bg;
                const statusLabel = statusConfig[artwork.status as keyof typeof statusConfig].label;

                return (
                  <Card key={artwork.id} className="hover:border-neon/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Artwork Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={artwork.imageUrl} 
                            alt={artwork.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">{artwork.title}</h3>
                              <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Uploaded {new Date(artwork.uploadDate).toLocaleString()}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {artwork.priority === "high" && (
                                <Badge variant="destructive" className="text-xs">High Priority</Badge>
                              )}
                              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${statusBg}`}>
                                <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                                <span className={`text-sm font-medium ${statusColor}`}>{statusLabel}</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Verification Progress</span>
                              <span className="text-sm text-muted-foreground">{artwork.progress}%</span>
                            </div>
                            <Progress 
                              value={artwork.progress} 
                              className="h-2"
                              style={{
                                backgroundColor: 'hsl(var(--muted))'
                              }}
                            />
                          </div>

                          {/* Status Details */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-muted-foreground">
                                ETA: {artwork.estimatedTime}
                              </span>
                              {artwork.flags.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  <AlertCircle className="w-4 h-4 text-orange-500" />
                                  <span className="text-xs text-orange-500">
                                    {artwork.flags.join(", ")}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                Details
                              </Button>
                              {artwork.status === "human_review" && (
                                <Button variant="default" size="sm" className="bg-neon text-black hover:bg-neon/90">
                                  Review Now
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No artworks found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Load More */}
          {filteredArtworks.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Submissions
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
