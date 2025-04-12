
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import PortfolioSummary from "@/components/PortfolioSummary";
import PerformanceChart from "@/components/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowUpRight, Download } from "lucide-react";

const Portfolio = () => {
  const { userData, updateUserData } = useAuth();
  const [topUpAmount, setTopUpAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  if (!userData) {
    return null; // Show nothing while loading user data
  }

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount > userData.walletBalance) {
      toast.error("Insufficient balance in your wallet");
      return;
    }

    // Update user data
    updateUserData({
      walletBalance: userData.walletBalance - amount,
      currentInvested: userData.currentInvested + amount,
      totalInvested: userData.totalInvested + amount
    });

    toast.success("Investment top-up successful", {
      description: `₦${amount.toLocaleString()} has been added to your investment`
    });
    
    setTopUpAmount("");
    setTopUpOpen(false);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Update user data
    updateUserData({
      walletBalance: userData.walletBalance - amount
    });

    toast.success("Withdrawal initiated", {
      description: `₦${amount.toLocaleString()} will be sent to your linked bank account`
    });
    
    setWithdrawAmount("");
    setWithdrawOpen(false);
  };

  // Calculate portfolio stats
  const totalValue = userData.currentInvested;
  const totalGain = userData.currentInvested - userData.totalInvested;
  const gainPercentage = userData.totalInvested > 0 
    ? Math.round((totalGain / userData.totalInvested) * 100 * 10) / 10
    : 0;

  // Sample asset distribution - in a real app, this would come from the API
  const assetDistribution = [
    { name: "Corporate Bonds", value: totalValue * 0.35, percentage: 35, color: "wealth-blue" },
    { name: "Government Bonds", value: totalValue * 0.25, percentage: 25, color: "wealth-navy" },
    { name: "Treasury Bills", value: totalValue * 0.20, percentage: 20, color: "blue-400" },
    { name: "Mutual Funds", value: totalValue * 0.15, percentage: 15, color: "blue-600" },
    { name: "Cash", value: totalValue * 0.05, percentage: 5, color: "gray-400" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main content */}
        <main className="flex-grow bg-gray-50 py-10 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-wealth-navy">
                  My Portfolio
                </h1>
                <p className="text-wealth-gray mt-1">
                  Track and manage your investment portfolio
                </p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Dialog open={topUpOpen} onOpenChange={setTopUpOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-wealth-navy text-white hover:bg-wealth-blue flex gap-2 items-center">
                      <Download size={16} />
                      Top Up Investment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Top Up Investment</DialogTitle>
                      <DialogDescription>
                        Add funds from your wallet to your investment portfolio
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm mb-2">Available Balance: ₦{userData.walletBalance.toLocaleString()}</p>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setTopUpOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleTopUp} 
                        className="bg-wealth-navy hover:bg-wealth-blue"
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white flex gap-2 items-center">
                      <ArrowUpRight size={16} />
                      Withdraw from Wallet
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw from Wallet</DialogTitle>
                      <DialogDescription>
                        Withdraw funds from your wallet to your bank account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm mb-2">Available Balance: ₦{userData.walletBalance.toLocaleString()}</p>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setWithdrawOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleWithdraw} 
                        className="bg-wealth-navy hover:bg-wealth-blue"
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="mb-8">
              <PortfolioSummary
                totalValue={totalValue}
                totalGain={totalGain}
                gainPercentage={gainPercentage}
                yearlyInterest={12.5}
                assetDistribution={assetDistribution}
              />
            </div>
            
            {/* Performance Chart */}
            <div className="mb-8">
              <PerformanceChart />
            </div>

            {/* Reinvestment Preference */}
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Reinvestment Preference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-wealth-gray">
                        {userData.reinvestReturns
                          ? "Your returns are automatically reinvested"
                          : "Your returns are sent to your wallet"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateUserData({
                          reinvestReturns: !userData.reinvestReturns
                        });
                        
                        toast.success("Preference updated", {
                          description: userData.reinvestReturns
                            ? "Returns will now be sent to your wallet"
                            : "Returns will now be automatically reinvested"
                        });
                      }}
                    >
                      {userData.reinvestReturns
                        ? "Stop Reinvesting"
                        : "Start Reinvesting"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
