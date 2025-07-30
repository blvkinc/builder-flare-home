import { useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { ArtworkCardAnimated } from "@/components/ArtworkCardAnimated";
import { ArtistCardAnimated } from "@/components/ArtistCardAnimated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, DollarSign, Users, Zap, Brush, Eye, Heart, Sparkles, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
    name: "MetroDesign",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", 
    bio: "Urban-inspired digital art and futuristic cityscape designs",
    followers: 15200,
    totalSales: 123,
    artworkCount: 42
  }
];

export default function Index() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  const artworksRef = useRef(null);
  const artistsRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline();
      
      // Title animation with typewriter effect
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(ctaRef.current?.children,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Floating elements animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-10, 10)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });
        }
      });

      // Scroll-triggered animations
      gsap.fromTo(featuresRef.current?.children,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(artworksRef.current?.children,
        { opacity: 0, y: 60, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: artworksRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(artistsRef.current?.children,
        { opacity: 0, x: -100, rotation: -5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: artistsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for hero background
      gsap.to(heroRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      {/* Hero Section with Enhanced Animations */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(120, 255, 120, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(120, 255, 120, 0.05) 0%, transparent 50%)`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              ref={el => floatingElementsRef.current[i] = el}
              className={`absolute w-2 h-2 bg-neon rounded-full opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
          
          {/* Larger geometric shapes */}
          <div 
            ref={el => floatingElementsRef.current[12] = el}
            className="absolute top-20 left-10 w-20 h-20 border border-neon/20 rounded-full"
          />
          <div 
            ref={el => floatingElementsRef.current[13] = el}
            className="absolute bottom-40 right-20 w-16 h-16 border border-neon/30 rotate-45"
          />
          <div 
            ref={el => floatingElementsRef.current[14] = el}
            className="absolute top-1/3 right-10 w-12 h-12 bg-neon/10 rounded-full"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* No AI Art Badge */}
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="px-6 py-2 border-neon text-neon bg-neon/5 text-sm font-medium">
                <Ban className="w-4 h-4 mr-2" />
                100% Human-Created Art • No AI Generated Content
              </Badge>
            </div>

            <div className="space-y-6">
              <h1 
                ref={titleRef}
                className="text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-tight"
              >
                Where Real Artists
                <span className="block bg-gradient-to-r from-neon via-white to-neon bg-clip-text text-transparent">
                  Shape The Future
                </span>
              </h1>
              <p 
                ref={subtitleRef}
                className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Discover, collect, and trade authentic digital artworks from verified human creators. 
                <span className="text-neon font-medium"> Every piece is 100% human-made.</span>
              </p>
            </div>
            
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button asChild size="lg" className="bg-neon text-black hover:bg-neon/90 font-semibold px-8 py-4 text-lg group">
                <Link to="/auth">
                  Join The Movement
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-neon/50 hover:border-neon">
                <Link to="/explore">
                  <Eye className="mr-2 w-5 h-5" />
                  Explore Art
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon">10K+</div>
                <div className="text-sm text-muted-foreground">Verified Artists</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon">50K+</div>
                <div className="text-sm text-muted-foreground">Human Artworks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon">500+</div>
                <div className="text-sm text-muted-foreground">ETH Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Avt Section - Enhanced */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 border-neon/50 text-neon">
              <Sparkles className="w-4 h-4 mr-2" />
              The Avt Difference
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Why Choose Avt?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The only marketplace that guarantees 100% human creativity
            </p>
          </div>
          
          <div 
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div className="group text-center space-y-6 p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-neon/20 to-neon/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Brush className="w-10 h-10 text-neon" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Human-Only</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every artwork is verified to be 100% human-created. No AI, no exceptions. Pure human creativity.
              </p>
            </div>
            
            <div className="group text-center space-y-6 p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-neon/20 to-neon/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-neon" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Verified Artists</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rigorous verification process ensures only authentic human artists join our platform
              </p>
            </div>
            
            <div className="group text-center space-y-6 p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-neon/20 to-neon/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-10 h-10 text-neon" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Fair Royalties</h3>
              <p className="text-muted-foreground leading-relaxed">
                Artists keep 90% of sales with transparent, low fees that support real creators
              </p>
            </div>
            
            <div className="group text-center space-y-6 p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-neon/20 to-neon/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-neon" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Community First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built by artists, for artists. Your success is our mission and priority
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Art Carousel with Enhanced Animations */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-neon/50 text-neon">
              <Heart className="w-4 h-4 mr-2" />
              Handpicked Selection
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Featured Human Art</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated digital masterpieces from our most talented verified human artists
            </p>
          </div>
          
          <div 
            ref={artworksRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredArtworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <ArtworkCardAnimated {...artwork} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="group border-neon/50 hover:border-neon">
              <Link to="/explore">
                View All Human Artworks
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Artists Section with Enhanced Animations */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-neon/50 text-neon">
              <Users className="w-4 h-4 mr-2" />
              Verified Creators
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Human Artists</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the verified human artists shaping the future of digital art
            </p>
          </div>
          
          <div 
            ref={artistsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topArtists.map((artist, index) => (
              <div key={index} className="group">
                <ArtistCardAnimated {...artist} verified={true} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="group border-neon/50 hover:border-neon">
              <Link to="/artists">
                Discover More Human Artists
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Anti-AI Statement Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background via-neon/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-neon/10 rounded-full mb-8">
            <Ban className="w-10 h-10 text-neon" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
            Our Promise: <span className="text-neon">100% Human</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            In a world flooded with AI-generated content, Avt stands as a sanctuary for authentic human creativity. 
            Every artist is verified, every artwork is inspected, and every piece carries the irreplaceable touch of human imagination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">Manual Review</div>
              <div className="text-muted-foreground">Every submission is personally reviewed by our human curators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">Artist Verification</div>
              <div className="text-muted-foreground">Multi-step process to verify the human identity of each creator</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">Zero Tolerance</div>
              <div className="text-muted-foreground">Immediate ban for any AI-generated content discovered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-neon rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-semibold text-foreground">Avt</span>
              </div>
              <p className="text-muted-foreground">
                The future of digital art marketplace. Authentic, human-created, artist-first.
              </p>
              <Badge variant="outline" className="border-neon/50 text-neon">
                <Ban className="w-3 h-3 mr-1" />
                No AI Art Zone
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Marketplace</h4>
              <div className="space-y-3">
                <Link to="/explore" className="block text-muted-foreground hover:text-neon transition-colors">
                  Explore Human Art
                </Link>
                <Link to="/artists" className="block text-muted-foreground hover:text-neon transition-colors">
                  Verified Artists
                </Link>
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Categories
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Community</h4>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Discord
                </a>
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Twitter
                </a>
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Instagram
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Human Art Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Artist Verification
                </a>
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-neon transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2024 Avt. All rights reserved. Proudly supporting human creativity.
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Badge variant="outline" className="border-neon/30 text-neon text-xs">
                <Brush className="w-3 h-3 mr-1" />
                100% Human Art
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
