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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Trash, Flag, Check } from 'lucide-react';

const FeedbackPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const initialFeedbacks = [
    { id: 1, user: 'John Smith', userType: 'student', category: 'suggestion', subject: 'Feature Request', message: 'It would be great if we could save our favorite listings for quick access later.', dateSubmitted: '2023-10-15', status: 'unread' },
    { id: 2, user: 'Michael Brown', userType: 'owner', category: 'complaint', subject: 'Payment Issue', message: 'The payment system is not processing my transactions correctly. Please fix this issue.', dateSubmitted: '2023-11-20', status: 'flagged' },
    { id: 3, user: 'Alice Johnson', userType: 'student', category: 'complaint', subject: 'Inaccurate Property Info', message: 'The property listing at 123 Main St showed 2 bathrooms, but there is only 1.', dateSubmitted: '2023-09-05', status: 'resolved' },
    { id: 4, user: 'Sarah Williams', userType: 'owner', category: 'suggestion', subject: 'Owner Dashboard Improvement', message: 'Please add more analytics to the owner dashboard to track property views.', dateSubmitted: '2023-10-30', status: 'unread' },
    { id: 5, user: 'David Lee', userType: 'student', category: 'bug', subject: 'App Crashes', message: 'The app crashes when I try to upload more than 3 images to my profile.', dateSubmitted: '2023-12-01', status: 'in-progress' },
    { id: 6, user: 'Emily Davis', userType: 'owner', category: 'praise', subject: 'Great Platform', message: "I'm very happy with how easy it is to list my properties on your platform!", dateSubmitted: '2023-08-15', status: 'resolved' },
  ];

  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  const stats = {
    total: feedbacks.length,
    unread: feedbacks.filter(f => f.status === 'unread').length,
    flagged: feedbacks.filter(f => f.status === 'flagged').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length,
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch =
      feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || feedback.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleMarkAsRead = (id) => {
    setFeedbacks(feedbacks.map(f =>
      f.id === id && f.status === 'unread' ? { ...f, status: 'in-progress' } : f
    ));
    toast({
      title: "Marked as in progress",
      description: "Feedback has been marked as in progress",
    });
  };

  const handleFlag = (id) => {
    const updated = feedbacks.map(f =>
      f.id === id ? { ...f, status: f.status === 'flagged' ? 'in-progress' : 'flagged' } : f
    );
    setFeedbacks(updated);
    const isFlagged = feedbacks.find(f => f.id === id)?.status !== 'flagged';
    toast({
      title: `Feedback ${isFlagged ? "flagged" : "unflagged"}`,
      description: `The feedback has been ${isFlagged ? "flagged" : "unflagged"}`,
      variant: isFlagged ? "destructive" : "default",
    });
  };

  const handleResolve = (id) => {
    setFeedbacks(feedbacks.map(f =>
      f.id === id ? { ...f, status: 'resolved' } : f
    ));
    toast({
      title: "Feedback resolved",
      description: "The feedback has been marked as resolved",
    });
  };

  const handleDeleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(f => f.id !== id));
    toast({
      title: "Feedback deleted",
      description: "Feedback entry has been removed",
      variant: "destructive",
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'suggestion': return 'bg-blue-50 text-admin-info border-admin-info';
      case 'complaint': return 'bg-red-50 text-admin-danger border-admin-danger';
      case 'bug': return 'bg-amber-50 text-admin-warning border-admin-warning';
      case 'praise': return 'bg-green-50 text-admin-success border-admin-success';
      default: return 'bg-gray-50 text-gray-600 border-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-admin-secondary/10 text-admin-secondary';
      case 'flagged': return 'bg-red-50 text-admin-danger';
      case 'in-progress': return 'bg-amber-50 text-admin-warning';
      case 'resolved': return 'bg-green-50 text-admin-success';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-admin-text">Feedback & Reports</h1>
        <p className="text-muted-foreground">Manage user feedback and reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {['total', 'unread', 'flagged', 'resolved'].map((key) => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                key === 'unread' ? 'text-admin-secondary' :
                key === 'flagged' ? 'text-admin-danger' :
                key === 'resolved' ? 'text-admin-success' : ''
              }`}>
                {stats[key]}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setCategoryFilter}>
          <TabsList>
            {['all', 'suggestion', 'complaint', 'bug', 'praise'].map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div className="font-medium">{feedback.user}</div>
                    <div className="text-xs text-muted-foreground capitalize">{feedback.userType}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${getCategoryColor(feedback.category)}`}
                    >
                      {feedback.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{feedback.subject}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[300px]">{feedback.message}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-sm font-medium px-2 py-1 rounded-md capitalize ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </div>
                  </TableCell>
                  <TableCell>{feedback.dateSubmitted}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {feedback.status === 'unread' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(feedback.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Mark as Read
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleFlag(feedback.id)}
                      className="text-admin-danger"
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleResolve(feedback.id)}
                      className="text-admin-success"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDeleteFeedback(feedback.id)}
                      className="text-admin-danger"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No feedback matches your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeedbackPage;
