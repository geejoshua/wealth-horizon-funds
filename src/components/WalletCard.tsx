
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, CreditCard, Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const WalletCard = () => {
  const { userData } = useAuth();
  const [showButtons, setShowButtons] = useState(false);

  const handleWithdraw = () => {
    toast.info("Withdrawal initiated", {
      description: "You'll receive your funds within 24 hours"
    });
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
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
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
              onClick={handleWithdraw}
            >
              <ArrowUpRight size={16} />
              Withdraw
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletCard;
