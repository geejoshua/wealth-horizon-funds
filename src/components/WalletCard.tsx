
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import AutoInvestSetup from "./AutoInvestSetup";
import LinkBankAccount from "./LinkBankAccount";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const WalletCard = () => {
  const { userData, updateUserData } = useAuth();
  const [showButtons, setShowButtons] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

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

  const handleFund = () => {
    toast.info("Fund your wallet", {
      description: "Select a payment method to continue"
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-wealth-navy text-white py-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          <CardTitle className="text-lg">Naira Wallet</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-wealth-blue hover:text-white"
          onClick={() => setShowButtons(!showButtons)}
        >
          {showButtons ? "Close" : "Actions"}
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <p className="text-sm text-wealth-gray mb-1">Available Balance</p>
          <h2 className="text-3xl font-bold">₦{userData?.walletBalance.toLocaleString()}</h2>
        </div>

        {showButtons && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="bg-wealth-navy text-white hover:bg-wealth-blue flex gap-2 items-center"
                onClick={handleFund}
              >
                <Download size={16} />
                Fund Wallet
              </Button>
              <Button
                variant="outline"
                className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white flex gap-2 items-center"
                onClick={() => setWithdrawOpen(true)}
              >
                <ArrowUpRight size={16} />
                Withdraw
              </Button>
            </div>
            
            <div className="pt-2 border-t mt-3">
              <p className="text-sm text-wealth-gray mb-3">Auto-investment</p>
              <div className="flex flex-col gap-2">
                <AutoInvestSetup />
                <LinkBankAccount />
              </div>
            </div>
          </div>
        )}

        {/* If auto-invest is set up, show status */}
        {userData?.autoInvest?.status === "active" && !showButtons && (
          <div className="bg-blue-50 p-3 rounded-lg mt-3">
            <p className="text-sm font-medium text-wealth-navy">Auto-invest Active</p>
            <p className="text-xs text-wealth-gray mt-1">
              ₦{userData.autoInvest.amount.toLocaleString()} {userData.autoInvest.frequency}, 
              next debit on {new Date(userData.autoInvest.startDate).toLocaleDateString()}
            </p>
          </div>
        )}

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
      </CardContent>
    </Card>
  );
};

export default WalletCard;
