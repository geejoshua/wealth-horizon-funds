
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { useAuth } from "@/context/AuthContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const timeRanges = [
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "all" },
];

const PortfolioChart = () => {
  const [activeRange, setActiveRange] = useState("1y");
  const { userData } = useAuth();
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!userData?.portfolioGrowth) return [];
    
    const now = new Date();
    const data = [...userData.portfolioGrowth];
    
    switch (activeRange) {
      case "1m":
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return data.filter(item => new Date(item.date) >= oneMonthAgo);
      case "3m":
        const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
        return data.filter(item => new Date(item.date) >= threeMonthsAgo);
      case "6m":
        const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
        return data.filter(item => new Date(item.date) >= sixMonthsAgo);
      case "1y":
        return data; // Full year data
      case "all":
        return data; // All data
      default:
        return data;
    }
  };

  const chartData = getFilteredData();
  
  // Format for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatXAxis = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-NG', { month: 'short' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{formatXAxis(label)}</p>
          <p className="text-sm font-medium text-wealth-blue">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Portfolio Growth</CardTitle>
          <div className="flex items-center gap-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={activeRange === range.value ? "default" : "outline"}
                size="sm"
                className={activeRange === range.value ? "bg-wealth-navy" : ""}
                onClick={() => setActiveRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 mt-4">
          <ChartContainer
            config={{
              portfolio: {
                label: "Portfolio",
                color: 'var(--wealth-blue)',
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--wealth-blue)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--wealth-blue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatXAxis}
                  minTickGap={30}
                />
                <YAxis
                  tickFormatter={(value) => formatCurrency(value).replace('₦', '')}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 5000', 'dataMax + 5000']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Portfolio"
                  stroke="var(--wealth-blue)"
                  fill="url(#colorPortfolio)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioChart;
