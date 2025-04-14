
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface InvestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: {
    name: string;
    minInvestment: string;
  } | null;
  investAmount: string;
  onInvestAmountChange: (value: string) => void;
  onInvestSubmit: () => void;
  walletBalance?: number;
}

const InvestDialog = ({
  open,
  onOpenChange,
  selectedProduct,
  investAmount,
  onInvestAmountChange,
  onInvestSubmit,
  walletBalance = 0,
}: InvestDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invest in {selectedProduct?.name}</DialogTitle>
          <DialogDescription>
            Enter the amount you want to invest
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <p className="text-sm text-wealth-gray">
            Minimum Investment: {selectedProduct?.minInvestment}
          </p>
          <p className="text-sm text-wealth-gray">
            Wallet Balance: ${walletBalance?.toLocaleString() || 0}
          </p>
          <Input
            type="number"
            placeholder="Enter amount"
            value={investAmount}
            onChange={(e) => onInvestAmountChange(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              onOpenChange(false);
              onInvestAmountChange("");
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={onInvestSubmit}
            className="bg-wealth-navy hover:bg-wealth-blue"
          >
            Confirm Investment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestDialog;
