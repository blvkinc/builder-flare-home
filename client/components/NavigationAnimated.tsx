import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, User, ShoppingBag, LogOut, Settings, Palette, Ban } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { gsap } from "gsap";

export function NavigationAnimated() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useUser();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const search = searchRef.current;
    const links = linksRef.current;

    if (!nav || !logo || !search || !links) return;

    // Initial animation on mount
    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo([logo, search, links.children],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
    );

    // Logo hover animation
    const handleLogoHover = () => {
      const logoIcon = logo.querySelector('.logo-icon');
      const logoText = logo.querySelector('.logo-text');

      if (logoIcon) {
        gsap.to(logoIcon, {
          rotation: 360,
          duration: 0.6,
          ease: "power2.out"
        });
      }

      if (logoText) {
        logoText.classList.add('text-neon');
        logoText.classList.remove('text-foreground');
      }
    };

    const handleLogoLeave = () => {
      const logoText = logo.querySelector('.logo-text');

      if (logoText) {
        logoText.classList.remove('text-neon');
        logoText.classList.add('text-foreground');
      }
    };

    logo.addEventListener('mouseenter', handleLogoHover);
    logo.addEventListener('mouseleave', handleLogoLeave);

    // Search focus animation
    const searchInput = search.querySelector('input');
    if (searchInput) {
      const handleSearchFocus = () => {
        gsap.to(search, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleSearchBlur = () => {
        gsap.to(search, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      searchInput.addEventListener('focus', handleSearchFocus);
      searchInput.addEventListener('blur', handleSearchBlur);

      return () => {
        logo.removeEventListener('mouseenter', handleLogoHover);
        logo.removeEventListener('mouseleave', handleLogoLeave);
        searchInput.removeEventListener('focus', handleSearchFocus);
        searchInput.removeEventListener('blur', handleSearchBlur);
      };
    }

    return () => {
      logo.removeEventListener('mouseenter', handleLogoHover);
      logo.removeEventListener('mouseleave', handleLogoLeave);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" ref={logoRef} className="flex items-center space-x-2 group">
            <div className="logo-icon w-8 h-8 bg-neon rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="logo-text text-xl font-semibold text-foreground transition-colors">Avt</span>
            <Badge variant="outline" className="hidden sm:flex border-neon/50 text-neon text-xs">
              <Ban className="w-2 h-2 mr-1" />
              No AI
            </Badge>
          </Link>

          {/* Navigation Links */}
          <div ref={linksRef} className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-300 hover:text-neon hover:scale-105 ${
                isActive("/") ? "text-neon" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`text-sm font-medium transition-all duration-300 hover:text-neon hover:scale-105 ${
                isActive("/explore") ? "text-neon" : "text-muted-foreground"
              }`}
            >
              Explore
            </Link>
            <Link
              to="/artists"
              className={`text-sm font-medium transition-all duration-300 hover:text-neon hover:scale-105 ${
                isActive("/artists") ? "text-neon" : "text-muted-foreground"
              }`}
            >
              Artists
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-all duration-300 hover:text-neon hover:scale-105 ${
                  isActive("/dashboard") ? "text-neon" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div ref={searchRef} className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search human art..."
                  className="w-64 pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neon focus:border-neon transition-all duration-300"
                />
              </div>
            </div>
            
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="hover:bg-neon/10 hover:text-neon transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </Button>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:scale-110 transition-transform">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-neon text-black">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                        <Badge variant="outline" className="w-fit border-neon/50 text-neon text-xs">
                          {user?.role === "artist" ? "Verified Artist" : "Collector"}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        {user?.role === "artist" ? (
                          <Palette className="mr-2 h-4 w-4" />
                        ) : (
                          <User className="mr-2 h-4 w-4" />
                        )}
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="default" size="sm" className="bg-neon text-black hover:bg-neon/90 hover:scale-105 transition-all">
                <Link to="/auth">Join Avt</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
