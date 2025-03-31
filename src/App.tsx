
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import RequireAuth from "@/components/shared/RequireAuth";

// Pages
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import PricingPage from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Login";
import FavoritesPage from "./pages/Favorites";
import UnauthorizedPage from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import ContentEditor from "./pages/Admin/ContentEditor";
import MediaLibrary from "./pages/Admin/MediaLibrary";
import StaffManagement from "./pages/Admin/StaffManagement";
import Permissions from "./pages/Admin/Permissions";
import BlogPosts from "./pages/Admin/BlogPosts";
import BlogCategories from "./pages/Admin/BlogCategories";
import Messages from "./pages/Admin/Messages";

// Staff Pages
import StaffDashboard from "./pages/Staff/Dashboard";
import ProductsManagement from "./pages/Staff/ProductsManagement";
import PricingManagement from "./pages/Staff/PricingManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <BrowserRouter>
                <Toaster />
                <Sonner />
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route 
                      path="/favorites" 
                      element={
                        <RequireAuth>
                          <FavoritesPage />
                        </RequireAuth>
                      } 
                    />
                    
                    {/* Admin Routes */}
                    <Route 
                      path="/admin/dashboard" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <Dashboard />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/pages/:pageId" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <ContentEditor />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/media" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <MediaLibrary />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/staff" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <StaffManagement />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/permissions" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <Permissions />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/blog/posts" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <BlogPosts />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/blog/categories" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <BlogCategories />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/admin/messages" 
                      element={
                        <RequireAuth allowedRoles={["admin"]}>
                          <Messages />
                        </RequireAuth>
                      } 
                    />
                    
                    {/* Staff Routes */}
                    <Route 
                      path="/staff/dashboard" 
                      element={
                        <RequireAuth allowedRoles={["staff", "admin"]}>
                          <StaffDashboard />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/staff/products" 
                      element={
                        <RequireAuth allowedRoles={["staff", "admin"]}>
                          <ProductsManagement />
                        </RequireAuth>
                      } 
                    />
                    <Route 
                      path="/staff/pricing" 
                      element={
                        <RequireAuth allowedRoles={["staff", "admin"]}>
                          <PricingManagement />
                        </RequireAuth>
                      } 
                    />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </BrowserRouter>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
