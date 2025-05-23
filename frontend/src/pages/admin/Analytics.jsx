import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const userGrowthData = [
    { name: 'Jan', students: 120, owners: 65 },
    { name: 'Feb', students: 135, owners: 80 },
    { name: 'Mar', students: 147, owners: 82 },
    { name: 'Apr', students: 162, owners: 91 },
    { name: 'May', students: 184, owners: 105 },
    { name: 'Jun', students: 203, owners: 110 },
    { name: 'Jul', students: 225, owners: 120 },
    { name: 'Aug', students: 261, owners: 132 },
    { name: 'Sep', students: 280, owners: 145 },
    { name: 'Oct', students: 305, owners: 157 },
    { name: 'Nov', students: 330, owners: 168 },
    { name: 'Dec', students: 349, owners: 180 },
  ];

  const propertyListingsData = [
    { name: 'Jan', listings: 45 },
    { name: 'Feb', listings: 52 },
    { name: 'Mar', listings: 49 },
    { name: 'Apr', listings: 63 },
    { name: 'May', listings: 75 },
    { name: 'Jun', listings: 82 },
    { name: 'Jul', listings: 70 },
    { name: 'Aug', listings: 95 },
    { name: 'Sep', listings: 102 },
    { name: 'Oct', listings: 113 },
    { name: 'Nov', listings: 125 },
    { name: 'Dec', listings: 138 },
  ];

  const locationData = [
    { name: 'Downtown', value: 35 },
    { name: 'Near Campus', value: 45 },
    { name: 'Suburbs', value: 15 },
    { name: 'Other Areas', value: 5 },
  ];

  const propertyTypeData = [
    { name: 'Studio', value: 25 },
    { name: '1 Bedroom', value: 35 },
    { name: '2 Bedroom', value: 30 },
    { name: '3+ Bedroom', value: 10 },
  ];

  const userEngagementData = [
    { name: 'Week 1', pageViews: 850, listings: 32, inquiries: 15 },
    { name: 'Week 2', pageViews: 790, listings: 28, inquiries: 12 },
    { name: 'Week 3', pageViews: 910, listings: 45, inquiries: 20 },
    { name: 'Week 4', pageViews: 980, listings: 50, inquiries: 25 },
  ];

  const COLORS = ['#8B5CF6', '#0EA5E9', '#10B981', '#F97316'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-admin-text">Analytics</h1>
        <p className="text-muted-foreground">Platform performance and statistics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">742</div>
            <p className="text-xs text-muted-foreground">+4.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rent Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$975</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">624</div>
            <p className="text-xs text-muted-foreground">+12.8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly growth of student and property owner accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="owners" stroke="#0EA5E9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Listings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Property Listings</CardTitle>
            <CardDescription>Monthly number of new property listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyListingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="listings" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Weekly platform activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pageViews" fill="#8B5CF6" />
                  <Bar dataKey="listings" fill="#0EA5E9" />
                  <Bar dataKey="inquiries" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Locations Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Property Locations</CardTitle>
            <CardDescription>Distribution of listed properties by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Distribution of properties by bedroom count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;