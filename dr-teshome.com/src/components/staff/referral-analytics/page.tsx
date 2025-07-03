// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Users, Globe, UserCheck, MessageCircle, Download } from "lucide-react"
// import {
//   ChartContainer,
//   LineChart,
//   BarChart,
//   PieChart,
//   Line,
//   Bar,
//   Pie,
//   Cell,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CustomTooltip,
// } from "@/components/ui/chart"

// export function ReferralAnalytics() {
//   const referralStats = [
//     {
//       title: "Top Referral Source",
//       value: "Direct/Walk-in",
//       description: "32% of patients",
//       icon: Users,
//       trend: "+5%",
//     },
//     {
//       title: "Doctor Referrals",
//       value: "38",
//       description: "This month",
//       icon: UserCheck,
//       trend: "+12%",
//     },
//     {
//       title: "Online Conversions",
//       value: "28",
//       description: "From website",
//       icon: Globe,
//       trend: "+18%",
//     },
//     {
//       title: "Social Media",
//       value: "15",
//       description: "From social platforms",
//       icon: MessageCircle,
//       trend: "+25%",
//     },
//   ]

//   const referralSourceData = [
//     { name: "Direct/Walk-in", value: 45, percentage: 32, growth: "+5%" },
//     { name: "Doctor Referral", value: 38, percentage: 27, growth: "+12%" },
//     { name: "Online Search", value: 28, percentage: 20, growth: "+18%" },
//     { name: "Social Media", value: 15, percentage: 11, growth: "+25%" },
//     { name: "Word of Mouth", value: 10, percentage: 7, growth: "+8%" },
//     { name: "Insurance Provider", value: 4, percentage: 3, growth: "-2%" },
//   ]

//   const monthlyReferralData = [
//     { name: "Jan", direct: 12, doctor: 8, online: 6, social: 3, wordOfMouth: 2, insurance: 1 },
//     { name: "Feb", direct: 15, doctor: 10, online: 7, social: 4, wordOfMouth: 3, insurance: 1 },
//     { name: "Mar", direct: 13, doctor: 9, online: 8, social: 5, wordOfMouth: 2, insurance: 1 },
//     { name: "Apr", direct: 18, doctor: 12, online: 9, social: 6, wordOfMouth: 4, insurance: 1 },
//     { name: "May", direct: 16, doctor: 11, online: 10, social: 4, wordOfMouth: 3, insurance: 1 },
//     { name: "Jun", direct: 14, doctor: 13, online: 8, social: 5, wordOfMouth: 3, insurance: 1 },
//   ]

//   // Quarterly data
//   const quarterlyReferralData = [
//     { name: "Q1 2024", direct: 40, doctor: 27, online: 21, social: 12, wordOfMouth: 7, insurance: 3 },
//     { name: "Q2 2024", direct: 48, doctor: 36, online: 27, social: 15, wordOfMouth: 10, insurance: 3 },
//     { name: "Q3 2024", direct: 52, doctor: 42, online: 32, social: 18, wordOfMouth: 12, insurance: 4 },
//     { name: "Q4 2024", direct: 58, doctor: 45, online: 35, social: 22, wordOfMouth: 14, insurance: 5 },
//   ]

//   // Year over year comparison
//   const yearlyComparisonData = [
//     { name: "2022", patients: 320 },
//     { name: "2023", patients: 420 },
//     { name: "2024", patients: 520 },
//     { name: "2025 (Projected)", patients: 650 },
//   ]

//   // Referral conversion rates
//   const conversionRateData = [
//     { name: "Direct/Walk-in", rate: 85 },
//     { name: "Doctor Referral", rate: 92 },
//     { name: "Online Search", rate: 45 },
//     { name: "Social Media", rate: 38 },
//     { name: "Word of Mouth", rate: 78 },
//     { name: "Insurance Provider", rate: 65 },
//   ]

//   const topReferringDoctors = [
//     { name: "Dr. Sarah Johnson", specialty: "Internal Medicine", referrals: 12, hospital: "Black Lion Hospital" },
//     { name: "Dr. Michael Chen", specialty: "Sports Medicine", referrals: 8, hospital: "Tikur Anbessa Hospital" },
//     { name: "Dr. Fatima Al-Rashid", specialty: "Rheumatology", referrals: 6, hospital: "St. Paul's Hospital" },
//     { name: "Dr. James Wilson", specialty: "Emergency Medicine", referrals: 5, hospital: "Zewditu Hospital" },
//     { name: "Dr. Aisha Osman", specialty: "Family Medicine", referrals: 4, hospital: "Yekatit 12 Hospital" },
//   ]

//   const onlineSourceData = [
//     { source: "Google Search", visits: 450, conversions: 18, rate: "4.0%" },
//     { source: "Website Direct", visits: 320, conversions: 8, rate: "2.5%" },
//     { source: "Facebook", visits: 180, conversions: 9, rate: "5.0%" },
//     { source: "Instagram", visits: 120, conversions: 4, rate: "3.3%" },
//     { source: "LinkedIn", visits: 80, conversions: 2, rate: "2.5%" },
//   ]

//   // Hospital referral data
//   const hospitalReferralData = [
//     { name: "Black Lion Hospital", value: 24 },
//     { name: "Tikur Anbessa Hospital", value: 18 },
//     { name: "St. Paul's Hospital", value: 15 },
//     { name: "Zewditu Hospital", value: 12 },
//     { name: "Yekatit 12 Hospital", value: 8 },
//     { name: "Other Hospitals", value: 6 },
//   ]

//   // Specialty referral data
//   const specialtyReferralData = [
//     { name: "Internal Medicine", value: 22 },
//     { name: "Sports Medicine", value: 18 },
//     { name: "Rheumatology", value: 14 },
//     { name: "Emergency Medicine", value: 12 },
//     { name: "Family Medicine", value: 10 },
//     { name: "Other Specialties", value: 8 },
//   ]

//   // Colors for charts
//   const pieColors = ["#2e8b57", "#3c9d64", "#4aaf72", "#5bb380", "#75b798", "#9fcfbb"]

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Referral Source Analytics</h2>
//           <p className="text-muted-foreground">Track and analyze where your patients are coming from.</p>
//         </div>
//         <div className="flex space-x-2">
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Time period" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="week">This Week</SelectItem>
//               <SelectItem value="month">This Month</SelectItem>
//               <SelectItem value="quarter">This Quarter</SelectItem>
//               <SelectItem value="year">This Year</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {referralStats.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//               <stat.icon className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground">
//                 <span className={stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.trend}</span>{" "}
//                 {stat.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Referral Source Distribution</CardTitle>
//             <CardDescription>Current breakdown of patient referral sources</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer className="h-full w-full" data={referralSourceData} xField="name" yFields={["value"]}>
//               <PieChart>
//                 <Pie
//                   data={referralSourceData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
//                 >
//                   {referralSourceData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `${value} patients`} />
//                 <Legend />
//               </PieChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Referral Trends</CardTitle>
//             <CardDescription>Referral source performance over time</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer
//               className="h-full w-full"
//               data={monthlyReferralData}
//               xField="name"
//               yFields={["direct", "doctor", "online"]}
//             >
//               <LineChart data={monthlyReferralData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="direct"
//                   stroke="#2e8b57"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                   name="Direct/Walk-in"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="doctor"
//                   stroke="#3c9d64"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                   name="Doctor Referral"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="online"
//                   stroke="#4aaf72"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                   name="Online Search"
//                 />
//               </LineChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Quarterly Referral Growth</CardTitle>
//             <CardDescription>Quarterly comparison of referral sources</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer
//               className="h-full w-full"
//               data={quarterlyReferralData}
//               xField="name"
//               yFields={["direct", "doctor", "online", "social"]}
//             >
//               <BarChart data={quarterlyReferralData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Bar dataKey="direct" stackId="a" fill="#2e8b57" name="Direct/Walk-in" />
//                 <Bar dataKey="doctor" stackId="a" fill="#3c9d64" name="Doctor Referral" />
//                 <Bar dataKey="online" stackId="a" fill="#4aaf72" name="Online Search" />
//                 <Bar dataKey="social" stackId="a" fill="#75b798" name="Social Media" />
//               </BarChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Yearly Patient Growth</CardTitle>
//             <CardDescription>Year over year patient acquisition</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer className="h-full w-full" data={yearlyComparisonData} xField="name" yFields={["patients"]}>
//               <BarChart data={yearlyComparisonData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="patients" fill="#2e8b57" name="Total Patients" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Referral Conversion Rates</CardTitle>
//             <CardDescription>Percentage of referrals that become patients</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer className="h-full w-full" data={conversionRateData} xField="name" yFields={["rate"]}>
//               <BarChart data={conversionRateData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis type="number" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis
//                   dataKey="name"
//                   type="category"
//                   stroke="#6b7280"
//                   fontSize={12}
//                   tickLine={false}
//                   axisLine={false}
//                   width={120}
//                 />
//                 <Tooltip formatter={(value) => `${value}%`} />
//                 <Bar dataKey="rate" fill="#2e8b57" name="Conversion Rate" radius={[0, 4, 4, 0]} />
//               </BarChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Top Referring Doctors</CardTitle>
//             <CardDescription>Healthcare professionals who refer patients to your practice</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {topReferringDoctors.map((doctor, index) => (
//                 <div key={doctor.name} className="flex items-center justify-between p-3 border rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
//                       {index + 1}
//                     </div>
//                     <div>
//                       <p className="font-medium">{doctor.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {doctor.specialty} • {doctor.hospital}
//                       </p>
//                     </div>
//                   </div>
//                   <Badge variant="secondary">{doctor.referrals} referrals</Badge>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Hospital Referral Sources</CardTitle>
//             <CardDescription>Breakdown of referring hospitals</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer className="h-full w-full" data={hospitalReferralData} xField="name" yFields={["value"]}>
//               <PieChart>
//                 <Pie
//                   data={hospitalReferralData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
//                 >
//                   {hospitalReferralData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `${value} referrals`} />
//                 <Legend />
//               </PieChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Specialty Referral Sources</CardTitle>
//             <CardDescription>Breakdown of referring medical specialties</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ChartContainer className="h-full w-full" data={specialtyReferralData} xField="name" yFields={["value"]}>
//               <PieChart>
//                 <Pie
//                   data={specialtyReferralData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
//                 >
//                   {specialtyReferralData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `${value} referrals`} />
//                 <Legend />
//               </PieChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Online Source Performance</CardTitle>
//           <CardDescription>Digital channels and their conversion rates</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {onlineSourceData.map((source) => (
//               <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg">
//                 <div>
//                   <p className="font-medium">{source.source}</p>
//                   <p className="text-sm text-muted-foreground">{source.visits} visits</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">{source.conversions} conversions</p>
//                   <p className="text-sm text-muted-foreground">{source.rate} rate</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Referral Source Summary</CardTitle>
//           <CardDescription>Detailed breakdown of all referral sources with growth metrics</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {referralSourceData.map((source) => (
//               <div key={source.name} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-3 h-3 rounded-full bg-primary"></div>
//                   <div>
//                     <p className="font-medium">{source.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {source.value} patients ({source.percentage}%)
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="text-right">
//                     <p className="text-sm font-medium">Growth</p>
//                     <p className={`text-sm ${source.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
//                       {source.growth}
//                     </p>
//                   </div>
//                   <div className="w-24 bg-gray-200 rounded-full h-2">
//                     <div className="bg-primary h-2 rounded-full" style={{ width: `${source.percentage * 2}%` }}></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
