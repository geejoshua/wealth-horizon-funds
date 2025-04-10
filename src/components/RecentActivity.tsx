
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "deposit",
      description: "Wallet Funding",
      amount: 50000,
      date: "2023-04-05T10:23:00",
    },
    {
      id: 2,
      type: "investment",
      description: "Corporate Bond Purchase",
      amount: -30000,
      date: "2023-04-04T14:15:00",
    },
    {
      id: 3,
      type: "earnings",
      description: "Dividend Payment",
      amount: 1250,
      date: "2023-04-03T09:45:00",
    },
    {
      id: 4,
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: -15000,
      date: "2023-04-01T16:30:00",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft size={16} className="text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight size={16} className="text-wealth-navy" />;
      case 'investment':
        return <ArrowUpRight size={16} className="text-wealth-blue" />;
      case 'earnings':
        return <ArrowDownLeft size={16} className="text-green-600" />;
      default:
        return <Clock size={16} className="text-wealth-gray" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-wealth-blue" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  activity.amount > 0 ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-xs text-wealth-gray">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </div>
              <span className={`font-medium ${
                activity.amount > 0 ? 'text-green-600' : 'text-wealth-navy'
              }`}>
                {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="ghost" className="text-wealth-blue">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
