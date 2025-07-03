import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar, FileText, Users, TrendingUp } from "lucide-react"
import {
  ChartContainer,
  XAxis,
  YAxis,
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  Tooltip,
  Legend,
  CartesianGrid,
  CustomTooltip,
} from "@/src/components/ui/chart"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Appointments",
      value: "24",
      description: "Today",
      icon: Calendar,
      trend: "+12%",
    },
    {
      title: "Patient Resources",
      value: "156",
      description: "Published",
      icon: FileText,
      trend: "+8%",
    },
    {
      title: "Blog Posts",
      value: "42",
      description: "This month",
      icon: Users,
      trend: "+23%",
    },
    {
      title: "Website Views",
      value: "2,847",
      description: "This week",
      icon: TrendingUp,
      trend: "+15%",
    },
  ]

  // Appointment data by month
  const appointmentData = [
    { name: "Jan", appointments: 45 },
    { name: "Feb", appointments: 52 },
    { name: "Mar", appointments: 49 },
    { name: "Apr", appointments: 62 },
    { name: "May", appointments: 58 },
    { name: "Jun", appointments: 65 },
    { name: "Jul", appointments: 68 },
    { name: "Aug", appointments: 72 },
    { name: "Sep", appointments: 75 },
    { name: "Oct", appointments: 82 },
    { name: "Nov", appointments: 78 },
    { name: "Dec", appointments: 70 },
  ]

  // Website traffic data
  const trafficData = [
    { name: "Jan", views: 1200, visitors: 800 },
    { name: "Feb", views: 1400, visitors: 950 },
    { name: "Mar", views: 1300, visitors: 870 },
    { name: "Apr", views: 1500, visitors: 1000 },
    { name: "May", views: 1700, visitors: 1100 },
    { name: "Jun", views: 1600, visitors: 1050 },
  ]

  // Procedure distribution data
  const procedureData = [
    { name: "Knee Surgery", value: 35 },
    { name: "Hip Replacement", value: 25 },
    { name: "Shoulder Repair", value: 20 },
    { name: "Ankle Surgery", value: 15 },
    { name: "Other", value: 5 },
  ]

  // Patient age distribution
  const ageDistributionData = [
    { name: "0-18", count: 5 },
    { name: "19-30", count: 15 },
    { name: "31-45", count: 25 },
    { name: "46-60", count: 35 },
    { name: "61-75", count: 15 },
    { name: "76+", count: 5 },
  ]

  // Add this data after the existing chart data
  const referralSourceData = [
    { name: "Direct/Walk-in", value: 45 },
    { name: "Doctor Referral", value: 38 },
    { name: "Online Search", value: 28 },
    { name: "Social Media", value: 15 },
    { name: "Word of Mouth", value: 10 },
    { name: "Insurance Provider", value: 4 },
  ]

  // Add this new chart data for referral trends
  const referralTrendData = [
    { name: "Jan", direct: 12, doctor: 8, online: 6, social: 3, wordOfMouth: 2 },
    { name: "Feb", direct: 15, doctor: 10, online: 7, social: 4, wordOfMouth: 3 },
    { name: "Mar", direct: 13, doctor: 9, online: 8, social: 5, wordOfMouth: 2 },
    { name: "Apr", direct: 18, doctor: 12, online: 9, social: 6, wordOfMouth: 4 },
    { name: "May", direct: 16, doctor: 11, online: 10, social: 4, wordOfMouth: 3 },
    { name: "Jun", direct: 14, doctor: 13, online: 8, social: 5, wordOfMouth: 3 },
  ]

  // Colors for charts
  const pieColors = ["#2e8b57", "#3c9d64", "#4aaf72", "#5bb380", "#75b798", "#9fcfbb"]

  return (
    <div className="space-y-6 bg-white text-black">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your practice today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.trend}</span> from {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
            <CardDescription>Number of appointments per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer className="h-full w-full" data={appointmentData} xField="name" yFields={["appointments"]}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="appointments" fill="#2e8b57" name="Appointments" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Page views and unique visitors</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer className="h-full w-full" data={trafficData} xField="name" yFields={["views", "visitors"]}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#2e8b57"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Page Views"
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#75b798"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Unique Visitors"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Procedure Distribution</CardTitle>
            <CardDescription>Types of procedures performed</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer className="h-full w-full" data={procedureData} xField="name" yFields={["value"]}>
              <PieChart>
                <Pie
                  data={procedureData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {procedureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Age Distribution</CardTitle>
            <CardDescription>Patient demographics by age group</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer className="h-full w-full" data={ageDistributionData} xField="name" yFields={["count"]}>
              <BarChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#2e8b57" name="Patients" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Referral Sources</CardTitle>
            <CardDescription>Where patients are coming from</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer className="h-full w-full" data={referralSourceData} xField="name" yFields={["value"]}>
              <PieChart>
                <Pie
                  data={referralSourceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }: { name: string; percent: number }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {referralSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} patients`} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Referral Source Trends</CardTitle>
          <CardDescription>Monthly breakdown of patient referral sources</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer
            className="h-full w-full"
            data={referralTrendData}
            xField="name"
            yFields={["direct", "doctor", "online", "social", "wordOfMouth"]}
          >
            <LineChart data={referralTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="direct"
                stroke="#2e8b57"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Direct/Walk-in"
              />
              <Line
                type="monotone"
                dataKey="doctor"
                stroke="#3c9d64"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Doctor Referral"
              />
              <Line
                type="monotone"
                dataKey="online"
                stroke="#4aaf72"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Online Search"
              />
              <Line
                type="monotone"
                dataKey="social"
                stroke="#75b798"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Social Media"
              />
              <Line
                type="monotone"
                dataKey="wordOfMouth"
                stroke="#9fcfbb"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Word of Mouth"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New appointment scheduled</p>
                <p className="text-xs text-muted-foreground">John Doe - 2:00 PM today</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Blog post published</p>
                <p className="text-xs text-muted-foreground">"Understanding Knee Replacement Surgery" - 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Resource updated</p>
                <p className="text-xs text-muted-foreground">"Post-Surgery Recovery Guide" - 3 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alem Bekele</p>
                <p className="text-xs text-muted-foreground">Knee Consultation</p>
              </div>
              <div className="text-sm text-muted-foreground">10:00 AM</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Dawit Haile</p>
                <p className="text-xs text-muted-foreground">Post-Op Follow-up</p>
              </div>
              <div className="text-sm text-muted-foreground">2:30 PM</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Hanan Ahmed</p>
                <p className="text-xs text-muted-foreground">Shoulder Injury Assessment</p>
              </div>
              <div className="text-sm text-muted-foreground">4:00 PM</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
