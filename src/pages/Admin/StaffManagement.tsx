
import { useState } from "react";
import PageTransition from "@/components/shared/PageTransition";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  department: string;
  dateAdded: string;
}

// Mock staff data
const mockStaffData: StaffMember[] = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "admin", status: "active", department: "Management", dateAdded: "2023-08-15" },
  { id: 2, name: "Emily Johnson", email: "emily@example.com", role: "staff", status: "active", department: "Sales", dateAdded: "2023-09-20" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", role: "staff", status: "active", department: "Content", dateAdded: "2023-10-05" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "staff", status: "inactive", department: "Marketing", dateAdded: "2023-10-12" },
  { id: 5, name: "David Lee", email: "david@example.com", role: "staff", status: "active", department: "Support", dateAdded: "2023-11-01" },
];

const StaffManagement = () => {
  const { toast } = useToast();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(mockStaffData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState({
    name: "",
    email: "",
    role: "staff" as UserRole,
    department: ""
  });

  const filteredStaff = staffMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStaff = () => {
    const newMember: StaffMember = {
      id: staffMembers.length + 1,
      name: newStaffMember.name,
      email: newStaffMember.email,
      role: newStaffMember.role,
      department: newStaffMember.department,
      status: "active",
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setStaffMembers([...staffMembers, newMember]);
    setNewStaffMember({ name: "", email: "", role: "staff", department: "" });
    setIsAddStaffDialogOpen(false);
    
    toast({
      title: "Staff member added",
      description: `${newMember.name} has been added to the team.`,
    });
  };

  const handleStatusToggle = (id: number) => {
    setStaffMembers(staffMembers.map(member => 
      member.id === id 
        ? { ...member, status: member.status === "active" ? "inactive" : "active" } 
        : member
    ));

    const member = staffMembers.find(m => m.id === id);
    const newStatus = member?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `Staff status updated`,
      description: `${member?.name} is now ${newStatus}.`,
    });
  };

  const handleDelete = (id: number) => {
    const memberName = staffMembers.find(m => m.id === id)?.name;
    setStaffMembers(staffMembers.filter(member => member.id !== id));
    
    toast({
      title: "Staff member removed",
      description: `${memberName} has been removed from the system.`,
      variant: "destructive",
    });
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-6">
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Staff Management</h1>
              <p className="text-muted-foreground">Manage your team members and permissions</p>
            </div>
            <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Staff Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Staff Member</DialogTitle>
                  <DialogDescription>
                    Add a new staff member to your team. They will receive an email invitation.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Full name"
                      className="col-span-3"
                      value={newStaffMember.name}
                      onChange={(e) => setNewStaffMember({...newStaffMember, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right">
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="Email address"
                      className="col-span-3"
                      value={newStaffMember.email}
                      onChange={(e) => setNewStaffMember({...newStaffMember, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="role" className="text-right">
                      Role
                    </label>
                    <Select 
                      value={newStaffMember.role} 
                      onValueChange={(value) => setNewStaffMember({...newStaffMember, role: value as UserRole})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="department" className="text-right">
                      Department
                    </label>
                    <Input
                      id="department"
                      placeholder="Department"
                      className="col-span-3"
                      value={newStaffMember.department}
                      onChange={(e) => setNewStaffMember({...newStaffMember, department: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddStaffDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddStaff}>Add Staff Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search staff..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage team permissions and access</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>
                        <Badge variant={staff.role === "admin" ? "default" : "outline"}>
                          {staff.role === "admin" ? "Administrator" : "Staff"}
                        </Badge>
                      </TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <Badge variant={staff.status === "active" ? "default" : "secondary"}>
                          {staff.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{staff.dateAdded}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            title={staff.status === "active" ? "Deactivate" : "Activate"}
                            onClick={() => handleStatusToggle(staff.id)}
                          >
                            {staff.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            title="Delete"
                            onClick={() => handleDelete(staff.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default StaffManagement;
