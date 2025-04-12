
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, TrendingUp, Repeat, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import AutoInvestSetup from "./AutoInvestSetup";

const InvestmentSummary = () => {
  const { userData } = useAuth();

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "₦0.00";
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Calculate earnings
  const earnings = userData ? (userData.currentInvested - userData.totalInvested) : 0;
  const earningsPercentage = userData ? ((earnings / userData.totalInvested) * 100).toFixed(1) : "0";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-wealth-blue" />
          Investment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-wealth-gray mb-1">Total Invested</p>
            <h3 className="text-xl font-semibold">
              {formatCurrency(userData?.totalInvested)}
            </h3>
          </div>
          
          <div>
            <p className="text-sm text-wealth-gray mb-1">Current Value</p>
            <h3 className="text-xl font-semibold">
              {formatCurrency(userData?.currentInvested)}
            </h3>
          </div>
          
          <div>
            <p className="text-sm text-wealth-gray mb-1">Total Deductions</p>
            <h3 className="text-xl font-semibold">
              {formatCurrency(userData?.totalDeductions)}
            </h3>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-wealth-silver p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-wealth-gray">Earnings</p>
              <h3 className="text-lg font-medium flex items-center gap-1">
                {formatCurrency(earnings)}
                <span className="text-green-600 text-sm">+{earningsPercentage}%</span>
              </h3>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-3">
            {userData?.reinvestReturns && (
              <div className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                <RefreshCw className="h-3 w-3" />
                <span>Auto-reinvesting returns</span>
              </div>
            )}
            <AutoInvestSetup />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentSummary;
