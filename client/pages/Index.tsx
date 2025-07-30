import { Layout } from "@/components/Layout";
import { ArtworkCard } from "@/components/ArtworkCard";
import { ArtistCard } from "@/components/ArtistCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, DollarSign, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const featuredArtworks = [
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
    artist: "VoidMaster",
    price: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 189,
    views: 987
  },
  {
    id: "3",
    title: "Quantum Portal",
    artist: "QuantumAI",
    price: 3.8,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    likes: 445,
    views: 2100
  },
  {
    id: "4",
    title: "Future City",
    artist: "MetroDesign",
    price: 5.1,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    likes: 356,
    views: 1789
  }
];

const topArtists = [
  {
    name: "CyberArt",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Digital artist specializing in cyberpunk and futuristic aesthetics",
    followers: 12500,
    totalSales: 89,
    artworkCount: 24
  },
  {
    name: "VoidMaster", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=100&h=100&fit=crop&crop=face",
    bio: "Abstract digital compositions exploring the void between reality and dreams",
    followers: 8900,
    totalSales: 67,
    artworkCount: 31
  },
  {
    name: "QuantumAI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", 
    bio: "AI-assisted generative art pushing the boundaries of digital creativity",
    followers: 15200,
    totalSales: 123,
    artworkCount: 42
  }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,_255,_120,_0.1),transparent_50%)]"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-neon to-white bg-clip-text text-transparent">
                  Digital Art
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover, collect, and trade unique digital artworks from the world's most innovative creators on Avt's decentralized marketplace.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="bg-neon text-black hover:bg-neon/90 font-semibold px-8">
                <Link to="/auth">
                  Join Avt
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/explore">Explore Art</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-neon rounded-full animate-glow"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-neon rounded-full animate-glow"></div>
        <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-white/60 rounded-full animate-glow"></div>
      </section>

      {/* Featured Art Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Artworks</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Curated digital masterpieces from our most talented artists
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/explore">
                View All Artworks
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Artists Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Trending Creators</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the visionary artists shaping the future of digital art
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topArtists.map((artist, index) => (
              <ArtistCard key={index} {...artist} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/artists">
                Discover More Artists
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Avt Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose Avt?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The next-generation platform built for artists and collectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Secure</h3>
              <p className="text-muted-foreground">
                Your art and transactions are protected by cutting-edge blockchain technology
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Decentralized</h3>
              <p className="text-muted-foreground">
                True ownership and control of your digital assets without intermediaries
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto">
                <DollarSign className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Low Fees</h3>
              <p className="text-muted-foreground">
                Keep more of your earnings with our minimal transaction fees
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Artist-First</h3>
              <p className="text-muted-foreground">
                Built by artists, for artists. Your success is our priority
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-neon rounded-sm flex items-center justify-center">
                  <span className="text-black font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-semibold text-foreground">Avt</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The future of digital art marketplace. Secure, decentralized, artist-first.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Marketplace</h4>
              <div className="space-y-2 text-sm">
                <Link to="/explore" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Explore Art
                </Link>
                <Link to="/artists" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Artists
                </Link>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Community</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Discord
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Avt. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
}
