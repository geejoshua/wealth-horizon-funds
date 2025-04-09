
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioSummary from "@/components/PortfolioSummary";
import PerformanceChart from "@/components/PerformanceChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus, Filter } from "lucide-react";

const Dashboard = () => {
  const [period, setPeriod] = useState("1y");

  const portfolioData = {
    totalValue: 124750.63,
    totalGain: 12480.25,
    gainPercentage: 11.2,
    yearlyInterest: 7.8,
    assetDistribution: [
      { name: "Corporate Bonds", value: 43678.95, percentage: 35, color: "wealth-navy" },
      { name: "Government Bonds", value: 31187.66, percentage: 25, color: "wealth-blue" },
      { name: "Treasury Bills", value: 24950.13, percentage: 20, color: "blue-400" },
      { name: "Mutual Funds", value: 18712.59, percentage: 15, color: "cyan-400" },
      { name: "Cash", value: 6237.53, percentage: 5, color: "green-400" },
    ],
  };

  const recentTransactions = [
    {
      date: "2023-04-02",
      description: "Corporate Bond Fund Purchase",
      amount: -10000,
      status: "completed",
    },
    {
      date: "2023-03-15",
      description: "Treasury Bill Interest",
      amount: 187.5,
      status: "completed",
    },
    {
      date: "2023-03-01",
      description: "Dividend Payment",
      amount: 320.75,
      status: "completed",
    },
    {
      date: "2023-02-15",
      description: "Portfolio Management Fee",
      amount: -125.0,
      status: "completed",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-wealth-navy">
                Welcome back, Alex
              </h1>
              <p className="text-wealth-gray mt-1">
                Here's the latest overview of your investments
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button
                variant="outline"
                className="flex gap-2 items-center border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white"
              >
                <Download size={16} />
                Export Report
              </Button>
              <Button className="flex gap-2 items-center bg-wealth-navy hover:bg-wealth-blue">
                <Plus size={16} />
                New Investment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Performance Overview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={period === "1m" ? "default" : "outline"}
                      size="sm"
                      className={period === "1m" ? "bg-wealth-navy" : ""}
                      onClick={() => setPeriod("1m")}
                    >
                      1M
                    </Button>
                    <Button
                      variant={period === "3m" ? "default" : "outline"}
                      size="sm"
                      className={period === "3m" ? "bg-wealth-navy" : ""}
                      onClick={() => setPeriod("3m")}
                    >
                      3M
                    </Button>
                    <Button
                      variant={period === "1y" ? "default" : "outline"}
                      size="sm"
                      className={period === "1y" ? "bg-wealth-navy" : ""}
                      onClick={() => setPeriod("1y")}
                    >
                      1Y
                    </Button>
                    <Button
                      variant={period === "all" ? "default" : "outline"}
                      size="sm"
                      className={period === "all" ? "bg-wealth-navy" : ""}
                      onClick={() => setPeriod("all")}
                    >
                      All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <PerformanceChart />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <PortfolioSummary
                totalValue={portfolioData.totalValue}
                totalGain={portfolioData.totalGain}
                gainPercentage={portfolioData.gainPercentage}
                yearlyInterest={portfolioData.yearlyInterest}
                assetDistribution={portfolioData.assetDistribution}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="flex gap-2 items-center">
                  <Filter size={16} />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-4 text-sm text-wealth-gray font-medium">Date</th>
                        <th className="p-4 text-sm text-wealth-gray font-medium">Description</th>
                        <th className="p-4 text-sm text-wealth-gray font-medium">Amount</th>
                        <th className="p-4 text-sm text-wealth-gray font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 text-sm">{formatDate(transaction.date)}</td>
                          <td className="p-4 text-sm font-medium">{transaction.description}</td>
                          <td 
                            className={`p-4 text-sm font-medium ${
                              transaction.amount < 0 ? "text-wealth-navy" : "text-green-600"
                            }`}
                          >
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 text-xs font-medium uppercase bg-green-100 text-green-800 rounded">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="link" className="text-wealth-blue">View All Transactions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
