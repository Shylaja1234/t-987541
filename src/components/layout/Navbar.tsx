
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Heart, User, Cog, LayoutDashboard, ShoppingBag, Globe, LogOut } from "lucide-react";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileSidebar from "./MobileSidebar";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { favorites } = useFavorites();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Check if user is on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");
  
  // Check if user is on staff pages
  const isStaffPage = location.pathname.startsWith("/staff");
  
  // Determine if we should show panel navbar (for admin or staff)
  const shouldShowPanelNavbar = isAdminPage || isStaffPage;

  // For staff/admin who are browsing the regular site
  const isStaffOrAdmin = user?.role === "admin" || user?.role === "staff";
  const isViewingMainSite = !shouldShowPanelNavbar && isStaffOrAdmin;
  
  // Auto-close sidebar when navigating
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // If user is admin/staff and on the main website,
  // redirect to the appropriate panel
  useEffect(() => {
    if (isAuthenticated && isStaffOrAdmin && !shouldShowPanelNavbar && !isViewingMainSite) {
      if (user?.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (user?.role === "staff") {
        window.location.href = "/staff/dashboard";
      }
    }
  }, [isAuthenticated, isStaffOrAdmin, shouldShowPanelNavbar, isViewingMainSite, user?.role]);

  // Handle admin panel header
  if (isAdminPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="font-bold text-xl flex items-center">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Admin Panel
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" size="sm" className="hidden sm:flex">
                <a href="/" target="_blank">
                  <Globe className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">View Website</span>
                </a>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Handle staff panel header
  if (isStaffPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/staff/dashboard" className="font-bold text-xl flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Staff Panel
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" size="sm" className="hidden sm:flex">
                <a href="/" target="_blank">
                  <Globe className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">View Website</span>
                </a>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // For regular site visitors and staff/admin viewing the main site
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <nav className="hidden md:flex ml-10 space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.href} className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-foreground"
                }>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {isAuthenticated ? (
              <>
                {/* Return to panel button for staff/admin who are viewing the main site */}
                {isViewingMainSite && (
                  <Button asChild variant="outline" size="sm" className="mr-2">
                    <Link to={user?.role === "admin" ? "/admin/dashboard" : "/staff/dashboard"}>
                      <LayoutDashboard className="mr-1 h-4 w-4" />
                      <span className="hidden lg:inline">Return to Panel</span>
                    </Link>
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      <span className="hidden lg:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!isStaffOrAdmin && (
                      <DropdownMenuItem>
                        <Link to="/profile" className="flex items-center w-full">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="flex items-center w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    {user?.role === "staff" && (
                      <DropdownMenuItem asChild>
                        <Link to="/staff/dashboard" className="flex items-center w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Staff Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Only show these buttons for regular users or staff/admin when viewing the site */}
                <Button asChild variant="ghost" size="sm">
                  <Link to="/favorites" className="relative">
                    <Heart className="h-4 w-4" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full px-1 text-xs">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full px-1 text-xs">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
          
          <div className="md:hidden">
            <Button variant="outline" size="icon" onClick={() => setMobileSidebarOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
            <MobileSidebar 
              isOpen={isMobileSidebarOpen} 
              onOpenChange={setMobileSidebarOpen}
              userRole={user?.role} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
