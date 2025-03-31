
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileEdit,
  Settings,
  ShoppingBag,
  Tag,
  Phone,
  LogOut,
  X,
  LayoutGrid,
  Users,
  Globe,
  Home,
  Info,
  Image,
  MessageSquare,
  FileText,
  FolderTree
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  const dashboardMenuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" /> },
  ];
  
  const contentManagementItems = [
    { path: "/admin/pages/home", label: "Home Page", icon: <Home className="mr-2 h-5 w-5" /> },
    { path: "/admin/pages/about", label: "About Page", icon: <Info className="mr-2 h-5 w-5" /> },
    { path: "/admin/pages/services", label: "Services Page", icon: <Settings className="mr-2 h-5 w-5" /> },
    { path: "/admin/pages/products", label: "Products Page", icon: <ShoppingBag className="mr-2 h-5 w-5" /> },
    { path: "/admin/pages/pricing", label: "Pricing Page", icon: <Tag className="mr-2 h-5 w-5" /> },
    { path: "/admin/pages/contact", label: "Contact Page", icon: <Phone className="mr-2 h-5 w-5" /> },
  ];

  const mediaManagementItems = [
    { path: "/admin/media", label: "Media Library", icon: <Image className="mr-2 h-5 w-5" /> },
  ];

  const blogManagementItems = [
    { path: "/admin/blog/posts", label: "Blog Posts", icon: <FileText className="mr-2 h-5 w-5" /> },
    { path: "/admin/blog/categories", label: "Categories", icon: <FolderTree className="mr-2 h-5 w-5" /> },
  ];

  const staffManagementItems = [
    { path: "/admin/staff", label: "Staff Management", icon: <Users className="mr-2 h-5 w-5" /> },
    { path: "/admin/permissions", label: "Permissions", icon: <Settings className="mr-2 h-5 w-5" /> },
  ];

  const messageManagementItems = [
    { path: "/admin/messages", label: "Contact Messages", icon: <MessageSquare className="mr-2 h-5 w-5" /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transition-transform duration-300 transform overflow-y-auto no-scrollbar
        md:relative md:translate-x-0 md:z-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-4 border-b flex justify-between items-center">
          <Link to="/admin/dashboard" className="font-bold text-xl flex items-center">
            <LayoutGrid className="mr-2 h-6 w-6" />
            Admin Panel
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            {user && (
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs mt-1 text-muted-foreground">Role: Admin</p>
              </div>
            )}
          </div>
          
          <nav className="space-y-1">
            {dashboardMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && onClose()}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(item.path) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"}
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <p className="text-xs uppercase font-medium text-muted-foreground mb-2 px-3">Content Management</p>
              {contentManagementItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && onClose()}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t">
              <p className="text-xs uppercase font-medium text-muted-foreground mb-2 px-3">Media</p>
              {mediaManagementItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && onClose()}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t">
              <p className="text-xs uppercase font-medium text-muted-foreground mb-2 px-3">Blog</p>
              {blogManagementItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && onClose()}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 mt-4 border-t">
              <p className="text-xs uppercase font-medium text-muted-foreground mb-2 px-3">Staff Management</p>
              {staffManagementItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && onClose()}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t">
              <p className="text-xs uppercase font-medium text-muted-foreground mb-2 px-3">Messages</p>
              {messageManagementItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && onClose()}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="pt-6 mt-6 border-t">
              <Link 
                to="/" 
                target="_blank"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10"
              >
                <Globe className="mr-2 h-5 w-5" />
                View Website
              </Link>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start mt-2 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
