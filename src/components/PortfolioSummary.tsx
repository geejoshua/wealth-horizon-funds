
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, TrendingUp, DollarSign, Percent } from "lucide-react";

interface PortfolioSummaryProps {
  totalValue: number;
  totalGain: number;
  gainPercentage: number;
  yearlyInterest: number;
  assetDistribution: {
    name: string;
    value: number;
    percentage: number;
    color: string;
  }[];
}

const PortfolioSummary = ({
  totalValue,
  totalGain,
  gainPercentage,
  yearlyInterest,
  assetDistribution,
}: PortfolioSummaryProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Overview of your current investments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-wealth-silver p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-wealth-gray">Total Value</span>
              <DollarSign className="h-4 w-4 text-wealth-blue" />
            </div>
            <div className="text-2xl font-semibold">{formatCurrency(totalValue)}</div>
          </div>
          
          <div className="bg-wealth-silver p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-wealth-gray">Total Gain</span>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-semibold text-green-600">{formatCurrency(totalGain)}</div>
          </div>
          
          <div className="bg-wealth-silver p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-wealth-gray">Gain %</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-semibold text-green-600">+{gainPercentage}%</div>
          </div>
          
          <div className="bg-wealth-silver p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-wealth-gray">Annual Interest</span>
              <Percent className="h-4 w-4 text-wealth-blue" />
            </div>
            <div className="text-2xl font-semibold">{yearlyInterest}%</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-base font-medium mb-4">Asset Distribution</h4>
          <div className="space-y-4">
            {assetDistribution.map((asset, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{asset.name}</span>
                  <span className="font-medium">{formatCurrency(asset.value)} ({asset.percentage}%)</span>
                </div>
                <Progress 
                  value={asset.percentage} 
                  className={`h-2 bg-gray-100`}
                  style={{ 
                    "--progress-background": `var(--${asset.color})` 
                  } as React.CSSProperties} 
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
