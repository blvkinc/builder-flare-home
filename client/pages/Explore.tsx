import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Ban,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

// Mock data for artworks
const allArtworks = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "CyberArt",
    price: 2.5,
    imageUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
    likes: 234,
    views: 1520,
    category: "Illustration",
    tags: ["cyberpunk", "neon", "futuristic"],
  },
  {
    id: "2",
    title: "Digital Void",
    artist: "VoidMaster",
    price: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 189,
    views: 987,
    category: "Abstract",
    tags: ["abstract", "void", "minimalist"],
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
    category: "3D",
    tags: ["quantum", "portal", "sci-fi"],
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
    category: "Concept Art",
    tags: ["city", "future", "architecture"],
  },
  {
    id: "5",
    title: "Holographic Dreams",
    artist: "HoloVision",
    price: 6.3,
    imageUrl:
      "https://images.unsplash.com/photo-1614630482437-8e5e7e5ad725?w=400&h=400&fit=crop",
    likes: 567,
    views: 2890,
    category: "Animation",
    tags: ["hologram", "dreams", "surreal"],
  },
  {
    id: "6",
    title: "Neural Network",
    artist: "AIArtist",
    price: 1.9,
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",
    likes: 123,
    views: 567,
    category: "Illustration",
    tags: ["ai", "neural", "network"],
  },
];

const categories = [
  "All",
  "Illustration",
  "3D",
  "Animation",
  "Concept Art",
  "Abstract",
];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags from all artworks
  const allTags = Array.from(
    new Set(allArtworks.flatMap((artwork) => artwork.tags)),
  );

  // Filter and sort artworks
  const filteredArtworks = allArtworks
    .filter((artwork) => {
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || artwork.category === selectedCategory;
      const matchesPrice =
        artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => artwork.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesPrice && matchesTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes - a.likes;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0; // newest - would use timestamp in real app
      }
    });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 10]);
    setSelectedTags([]);
    setSearchQuery("");
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="outline" className="border-neon/50 text-neon">
                <Ban className="w-4 h-4 mr-2" />
                100% Human Art
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Explore Human Digital Art
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover unique digital artworks from verified human creators.
              Every piece is authentic and AI-free.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search artworks, artists, or tags..."
                className="pl-12 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Categories */}
              <div className="flex items-center space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="h-6 w-px bg-border" />

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Advanced Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {(selectedTags.length > 0 ||
                      priceRange[0] > 0 ||
                      priceRange[1] < 10) && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                      >
                        {selectedTags.length +
                          (priceRange[0] > 0 || priceRange[1] < 10 ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search with detailed filters
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <Label>Price Range (ETH)</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]} ETH</span>
                        <span>{priceRange[1]} ETH</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                      <Label>Tags</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {allTags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={tag}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() => toggleTag(tag)}
                            />
                            <Label htmlFor={tag} className="text-sm capitalize">
                              {tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="h-6 w-px bg-border" />

              {/* View Mode */}
              <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedTags.length > 0 ||
              selectedCategory !== "All" ||
              priceRange[0] > 0 ||
              priceRange[1] < 10) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {selectedCategory !== "All" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory("All")}
                  >
                    {selectedCategory} ×
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 10) && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setPriceRange([0, 10])}
                  >
                    {priceRange[0]}-{priceRange[1]} ETH ×
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredArtworks.length} artwork
              {filteredArtworks.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Artwork Grid */}
          {filteredArtworks.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {filteredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No artworks found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredArtworks.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Artworks
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
