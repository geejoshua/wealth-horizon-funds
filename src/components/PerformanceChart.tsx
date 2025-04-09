
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const performanceData = [
  { month: 'Jan', returns: 3.2, benchmark: 2.8 },
  { month: 'Feb', returns: 3.5, benchmark: 3.0 },
  { month: 'Mar', returns: 3.3, benchmark: 2.9 },
  { month: 'Apr', returns: 4.0, benchmark: 3.2 },
  { month: 'May', returns: 3.8, benchmark: 3.4 },
  { month: 'Jun', returns: 4.2, benchmark: 3.6 },
  { month: 'Jul', returns: 4.5, benchmark: 3.7 },
  { month: 'Aug', returns: 4.7, benchmark: 3.8 },
  { month: 'Sep', returns: 4.3, benchmark: 3.5 },
  { month: 'Oct', returns: 4.8, benchmark: 3.9 },
  { month: 'Nov', returns: 5.0, benchmark: 4.1 },
  { month: 'Dec', returns: 5.2, benchmark: 4.3 },
];

const assetAllocation = [
  { name: 'Corporate Bonds', value: 35 },
  { name: 'Government Bonds', value: 25 },
  { name: 'Treasury Bills', value: 20 },
  { name: 'Mutual Funds', value: 15 },
  { name: 'Cash', value: 5 },
];

const COLORS = ['#0E57B5', '#41729F', '#5885AF', '#274C77', '#6998AB'];

const PerformanceChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-wealth-navy">Portfolio Performance</CardTitle>
        <CardDescription>Track how your investments have performed over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="returns" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="comparison">Benchmark Comparison</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="returns" className="pt-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <Line
                    type="monotone"
                    dataKey="returns"
                    stroke="#0E57B5"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="pt-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <Bar dataKey="returns" fill="#0E57B5" name="Your Returns" />
                  <Bar dataKey="benchmark" fill="#D4AF37" name="Market Benchmark" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="allocation" className="pt-6">
            <div className="h-80 w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {assetAllocation.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
