import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User, ShoppingBag, LogOut, Settings, Palette } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export function Navigation() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useUser();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neon rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Avt</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                isActive("/") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                isActive("/explore") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Explore
            </Link>
            <Link
              to="/artists"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                isActive("/artists") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Artists
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search art..."
                  className="w-64 pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm">
                  <ShoppingBag className="w-4 h-4" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
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
              <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                <Link to="/auth">Join Avt</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
