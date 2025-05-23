import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Trash, Check, X } from 'lucide-react';

const PropertiesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const initialProperties = [
    {
      id: 1,
      title: 'Modern Studio Apartment',
      owner: 'Michael Brown',
      location: '123 University Ave',
      price: 850,
      status: 'active',
      dateAdded: '2023-10-15',
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 2,
      title: 'Cozy 2BHK Near Campus',
      owner: 'Emily Davis',
      location: '456 College St',
      price: 1200,
      status: 'pending',
      dateAdded: '2023-11-20',
      bedrooms: 2,
      bathrooms: 1
    },
    {
      id: 3,
      title: 'Spacious 3BHK Apartment',
      owner: 'Jennifer Taylor',
      location: '789 Main St',
      price: 1500,
      status: 'active',
      dateAdded: '2023-09-05',
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 4,
      title: 'Student Housing Complex',
      owner: 'Robert Wilson',
      location: '101 Dorm Road',
      price: 650,
      status: 'inactive',
      dateAdded: '2023-10-30',
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 5,
      title: 'Luxury Penthouse Suite',
      owner: 'Sarah Williams',
      location: '202 Luxury Ave',
      price: 2500,
      status: 'active',
      dateAdded: '2023-12-01',
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 6,
      title: 'Budget Single Room',
      owner: 'Michael Brown',
      location: '303 Economy St',
      price: 500,
      status: 'pending',
      dateAdded: '2023-08-15',
      bedrooms: 1,
      bathrooms: 1
    },
  ];

  const [properties, setProperties] = useState(initialProperties);

  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    pending: properties.filter(p => p.status === 'pending').length,
    inactive: properties.filter(p => p.status === 'inactive').length
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status: 'active' } : p));
    toast({
      title: 'Property Approved',
      description: 'This listing is now active.'
    });
  };

  const handleReject = (id) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status: 'inactive' } : p));
    toast({
      title: 'Property Rejected',
      description: 'This listing is now inactive.',
      variant: 'destructive'
    });
  };

  const handleDelete = (id) => {
    const property = properties.find(p => p.id === id);
    setProperties(properties.filter(p => p.id !== id));
    toast({
      title: 'Property Deleted',
      description: `"${property.title}" has been removed.`,
      variant: 'destructive'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-admin-text">Property Listings</h1>
        <p className="text-muted-foreground">Manage and monitor all property listings</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-success">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-warning">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-danger">{stats.inactive}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price/month</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    <div>
                      {property.title}
                      <div className="text-xs text-muted-foreground">
                        {property.bedrooms} BD | {property.bathrooms} BA
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>${property.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        property.status === 'active'
                          ? 'bg-green-50 text-admin-success border-admin-success'
                          : property.status === 'pending'
                          ? 'bg-amber-50 text-admin-warning border-admin-warning'
                          : 'bg-red-50 text-admin-danger border-admin-danger'
                      }
                    >
                      {property.status === 'active' && <Check className="h-3 w-3 mr-1" />}
                      {property.status === 'inactive' && <X className="h-3 w-3 mr-1" />}
                      <span className="capitalize">{property.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{property.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {property.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-admin-success hover:bg-admin-success hover:text-white"
                            onClick={() => handleApprove(property.id)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-admin-danger hover:bg-admin-danger hover:text-white"
                            onClick={() => handleReject(property.id)}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-admin-danger hover:bg-admin-danger hover:text-white"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No properties found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertiesPage;
