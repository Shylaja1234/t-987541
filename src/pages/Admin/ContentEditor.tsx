
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTransition from "@/components/shared/PageTransition";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Edit, ImagePlus, Plus, Save, Trash2, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ContentSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: string;
  }>;
}

const ContentEditor = () => {
  const { pageId = "home" } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [isEditing, setIsEditing] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [currentSection, setCurrentSection] = useState<ContentSection | null>(null);

  // Mock data for each page
  useEffect(() => {
    // This would be replaced with an API call to get the actual content
    let mockData: ContentSection[] = [];
    
    switch (pageId) {
      case "home":
        setPageTitle("Home Page");
        mockData = [
          {
            id: "hero",
            title: "Welcome to Our Company",
            subtitle: "We provide the best services",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageUrl: "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          },
          {
            id: "features",
            title: "Our Features",
            content: "Check out what makes us different",
            items: [
              { id: "f1", title: "Quality", description: "We deliver high quality products" },
              { id: "f2", title: "Speed", description: "Fast delivery and service" },
              { id: "f3", title: "Support", description: "24/7 customer support" }
            ]
          }
        ];
        break;
      case "about":
        setPageTitle("About Page");
        mockData = [
          {
            id: "mission",
            title: "Our Mission",
            content: "To provide exceptional service and products to our customers."
          },
          {
            id: "team",
            title: "Our Team",
            content: "Meet our expert team of professionals",
            items: [
              { id: "t1", title: "John Doe", description: "CEO", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
              { id: "t2", title: "Jane Smith", description: "CTO", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg" }
            ]
          }
        ];
        break;
      case "services":
        setPageTitle("Services Page");
        mockData = [
          {
            id: "services-list",
            title: "Our Services",
            content: "Explore our range of services",
            items: [
              { id: "s1", title: "Consulting", description: "Expert advice for your business" },
              { id: "s2", title: "Development", description: "Custom software solutions" },
              { id: "s3", title: "Support", description: "Ongoing technical support" }
            ]
          }
        ];
        break;
      case "products":
        setPageTitle("Products Page");
        mockData = [
          {
            id: "products-list",
            title: "Our Products",
            content: "Browse our selection of products",
            items: [
              { id: "p1", title: "Product A", description: "High quality item", price: "$99.99", imageUrl: "https://placehold.co/400" },
              { id: "p2", title: "Product B", description: "Best seller", price: "$149.99", imageUrl: "https://placehold.co/400" },
              { id: "p3", title: "Product C", description: "New arrival", price: "$199.99", imageUrl: "https://placehold.co/400" }
            ]
          }
        ];
        break;
      case "pricing":
        setPageTitle("Pricing Page");
        mockData = [
          {
            id: "pricing-plans",
            title: "Our Pricing Plans",
            content: "Choose the plan that fits your needs",
            items: [
              { id: "pl1", title: "Basic", description: "For small businesses", price: "$29/month" },
              { id: "pl2", title: "Premium", description: "For growing businesses", price: "$99/month" },
              { id: "pl3", title: "Enterprise", description: "For large organizations", price: "$299/month" }
            ]
          }
        ];
        break;
      case "contact":
        setPageTitle("Contact Page");
        mockData = [
          {
            id: "contact-info",
            title: "Get in Touch",
            content: "Have questions? Contact us!",
            items: [
              { id: "c1", title: "Email", description: "info@example.com" },
              { id: "c2", title: "Phone", description: "+1 (555) 123-4567" },
              { id: "c3", title: "Address", description: "123 Main St, Anytown, USA" }
            ]
          }
        ];
        break;
      default:
        navigate("/admin/dashboard");
        break;
    }
    
    setSections(mockData);
  }, [pageId, navigate]);

  const handleSectionSelect = (section: ContentSection) => {
    setCurrentSection(section);
    setIsEditing(true);
  };

  const handleSectionChange = (field: string, value: string) => {
    if (!currentSection) return;
    
    setCurrentSection({
      ...currentSection,
      [field]: value
    });
  };

  const handleItemChange = (itemId: string, field: string, value: string) => {
    if (!currentSection || !currentSection.items) return;
    
    const updatedItems = currentSection.items.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    });
    
    setCurrentSection({
      ...currentSection,
      items: updatedItems
    });
  };

  const handleAddItem = () => {
    if (!currentSection) return;
    
    const newId = `new-${Date.now()}`;
    const newItem = { id: newId, title: "New Item" };
    
    setCurrentSection({
      ...currentSection,
      items: [...(currentSection.items || []), newItem]
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (!currentSection || !currentSection.items) return;
    
    const updatedItems = currentSection.items.filter(item => item.id !== itemId);
    
    setCurrentSection({
      ...currentSection,
      items: updatedItems
    });
  };

  const handleSave = () => {
    if (!currentSection) return;
    
    // Update the sections array with the edited section
    const updatedSections = sections.map(section => {
      if (section.id === currentSection.id) {
        return currentSection;
      }
      return section;
    });
    
    setSections(updatedSections);
    setIsEditing(false);
    
    // In a real app, you'd save to a database here
    toast({
      title: "Changes saved",
      description: "Your content has been updated successfully.",
    });
  };

  const handleAddSection = () => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "Add your content here"
    };
    
    setSections([...sections, newSection]);
    setCurrentSection(newSection);
    setIsEditing(true);
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(section => section.id !== sectionId);
    setSections(updatedSections);
    
    if (currentSection && currentSection.id === sectionId) {
      setCurrentSection(null);
      setIsEditing(false);
    }
    
    toast({
      title: "Section deleted",
      description: "The section has been removed.",
    });
  };

  const handlePublish = () => {
    // In a real app, this would push changes to the live site
    toast({
      title: "Changes published",
      description: "Your content is now live on the website.",
    });
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-6">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Edit {pageTitle}</h1>
              <p className="text-muted-foreground">Manage and update your content</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={handlePublish}>
                <Check className="mr-2 h-4 w-4" />
                Publish Changes
              </Button>
              <Button onClick={handleAddSection}>
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sections List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Page Sections</CardTitle>
                  <CardDescription>Select a section to edit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {sections.map(section => (
                      <div 
                        key={section.id}
                        className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors flex justify-between items-center
                          ${currentSection?.id === section.id ? 'border-primary bg-primary/10' : ''}
                        `}
                        onClick={() => handleSectionSelect(section)}
                      >
                        <div>
                          <p className="font-medium">{section.title}</p>
                          <p className="text-xs text-muted-foreground">Section ID: {section.id}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSectionSelect(section);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Section</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete the "{section.title}" section? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleDeleteSection(section.id)}
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Editor */}
            <div className="lg:col-span-2">
              {isEditing && currentSection ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Section: {currentSection.title}</CardTitle>
                    <CardDescription>Customize this section's content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        {currentSection.items && (
                          <TabsTrigger value="items">Items</TabsTrigger>
                        )}
                        <TabsTrigger value="media">Media</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Section Title</Label>
                          <Input 
                            id="title" 
                            value={currentSection.title} 
                            onChange={(e) => handleSectionChange('title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subtitle">Subtitle (optional)</Label>
                          <Input 
                            id="subtitle" 
                            value={currentSection.subtitle || ''} 
                            onChange={(e) => handleSectionChange('subtitle', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea 
                            id="content" 
                            value={currentSection.content || ''} 
                            onChange={(e) => handleSectionChange('content', e.target.value)}
                            rows={6}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="items" className="space-y-4">
                        {currentSection.items && currentSection.items.map((item, index) => (
                          <Card key={item.id}>
                            <CardHeader className="p-3 flex flex-row items-center justify-between">
                              <CardTitle className="text-base">Item {index + 1}</CardTitle>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-destructive h-8 w-8"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 space-y-3">
                              <div className="grid grid-cols-1 gap-3">
                                <div className="space-y-1">
                                  <Label htmlFor={`item-${item.id}-title`}>Title</Label>
                                  <Input 
                                    id={`item-${item.id}-title`} 
                                    value={item.title} 
                                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor={`item-${item.id}-description`}>Description</Label>
                                  <Textarea 
                                    id={`item-${item.id}-description`} 
                                    value={item.description || ''} 
                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                  />
                                </div>
                                {item.price !== undefined && (
                                  <div className="space-y-1">
                                    <Label htmlFor={`item-${item.id}-price`}>Price</Label>
                                    <Input 
                                      id={`item-${item.id}-price`} 
                                      value={item.price} 
                                      onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                    />
                                  </div>
                                )}
                                {item.imageUrl && (
                                  <div className="space-y-1">
                                    <Label>Image</Label>
                                    <div className="flex items-center space-x-2">
                                      <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="h-10 w-10 object-cover rounded-md"
                                      />
                                      <Button variant="outline" size="sm">
                                        <Upload className="h-4 w-4 mr-1" />
                                        Change
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <Button onClick={handleAddItem} variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Item
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="media" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Featured Image</Label>
                          {currentSection.imageUrl ? (
                            <div className="border rounded-md p-4">
                              <img
                                src={currentSection.imageUrl}
                                alt="Featured"
                                className="w-full h-48 object-cover rounded-md mb-2"
                              />
                              <div className="flex justify-between">
                                <Input
                                  value={currentSection.imageUrl}
                                  onChange={(e) => handleSectionChange('imageUrl', e.target.value)}
                                  className="flex-1 mr-2"
                                />
                                <Button variant="outline">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Change
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="border border-dashed rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                              <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">Click to upload an image</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Content Editor</CardTitle>
                      <CardDescription>Select a section from the list to start editing</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                      <div className="text-center">
                        <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          No section selected. Click on a section from the list to edit its content.
                        </p>
                        <Button onClick={handleAddSection}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Section
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default ContentEditor;
