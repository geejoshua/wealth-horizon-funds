
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface InvestmentCardProps {
  name: string;
  rate: string;
  risk: string;
  term: string;
  minInvestment: string;
  icon: React.ReactNode;
  onInvestClick: () => void;
}

const InvestmentCard = ({
  name,
  rate,
  risk,
  term,
  minInvestment,
  icon,
  onInvestClick,
}: InvestmentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3 items-center">
            {icon}
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <div>
            <p className="text-sm text-wealth-gray">Annual Return</p>
            <p className="font-semibold text-green-600">{rate}</p>
          </div>
          <div>
            <p className="text-sm text-wealth-gray">Term</p>
            <p className="font-semibold">{term}</p>
          </div>
          <div>
            <p className="text-sm text-wealth-gray">Minimum</p>
            <p className="font-semibold">{minInvestment}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-wealth-navy hover:bg-wealth-blue"
          onClick={onInvestClick}
        >
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvestmentCard;
