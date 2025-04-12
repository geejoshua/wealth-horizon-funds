
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wallet, CreditCard, Building, Smartphone, Info } from "lucide-react";
import { toast } from "sonner";

const FundWallet = () => {
  const { userData, updateUserData } = useAuth();
  const [fundAmount, setFundAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [fundMethodOpen, setFundMethodOpen] = useState(false);

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount > userData?.walletBalance!) {
      toast.error("Insufficient balance");
      return;
    }

    updateUserData({
      walletBalance: userData!.walletBalance - amount
    });

    toast.success("Withdrawal initiated", {
      description: "You'll receive your funds within 24 hours"
    });
    
    setWithdrawAmount("");
    setWithdrawOpen(false);
  };

  const handleFund = (method: string) => {
    const amount = parseFloat(fundAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // In a real app, this would redirect to a payment gateway
    // For demo purposes, we'll just update the wallet balance
    updateUserData({
      walletBalance: userData!.walletBalance + amount
    });

    toast.success("Wallet funded successfully", {
      description: `₦${amount.toLocaleString()} added via ${method}`
    });
    
    setFundAmount("");
    setFundMethodOpen(false);
  };

  if (!userData) {
    return null; // Show nothing while loading user data
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main content */}
        <main className="flex-grow bg-gray-50 py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-wealth-navy mb-6">
              Fund Wallet
            </h1>

            {/* Wallet Card */}
            <Card className="mb-8">
              <CardHeader className="bg-wealth-navy text-white py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-6 w-6" />
                  <CardTitle className="text-lg">Naira Wallet</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-wealth-gray mb-1">Available Balance</p>
                  <h2 className="text-3xl font-bold">₦{userData?.walletBalance.toLocaleString()}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setFundMethodOpen(true)}
                    className="bg-wealth-navy text-white hover:bg-wealth-blue flex gap-2 items-center"
                  >
                    <CreditCard size={16} />
                    Fund Wallet
                  </Button>
                  <Button
                    onClick={() => setWithdrawOpen(true)}
                    variant="outline"
                    className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white flex gap-2 items-center"
                  >
                    <Wallet size={16} />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fund Wallet Methods Dialog */}
            <Dialog open={fundMethodOpen} onOpenChange={setFundMethodOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Fund Your Wallet</DialogTitle>
                  <DialogDescription>
                    Choose your preferred payment method
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Amount (₦)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                    />
                  </div>

                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="card" className="flex gap-2 items-center">
                        <CreditCard size={16} />
                        <span className="hidden sm:inline">Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="bank" className="flex gap-2 items-center">
                        <Building size={16} />
                        <span className="hidden sm:inline">Bank</span>
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="flex gap-2 items-center">
                        <Smartphone size={16} />
                        <span className="hidden sm:inline">Mobile</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-md flex gap-2">
                        <Info size={18} className="text-wealth-navy flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-wealth-navy">
                          Fund your wallet securely using your debit or credit card.
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleFund("Card Payment")}
                        className="w-full bg-wealth-navy hover:bg-wealth-blue"
                      >
                        Proceed with Card
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="bank" className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-md flex gap-2">
                        <Info size={18} className="text-wealth-navy flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-wealth-navy">
                          Make a direct bank transfer to fund your wallet.
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleFund("Bank Transfer")}
                        className="w-full bg-wealth-navy hover:bg-wealth-blue"
                      >
                        Proceed with Bank Transfer
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="mobile" className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-md flex gap-2">
                        <Info size={18} className="text-wealth-navy flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-wealth-navy">
                          Use mobile money services to fund your wallet.
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleFund("Mobile Money")}
                        className="w-full bg-wealth-navy hover:bg-wealth-blue"
                      >
                        Proceed with Mobile Money
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>

            {/* Withdraw Dialog */}
            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw from Wallet</DialogTitle>
                  <DialogDescription>
                    Withdraw funds from your wallet to your bank account
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm mb-2">Available Balance: ₦{userData?.walletBalance.toLocaleString()}</p>
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default FundWallet;
