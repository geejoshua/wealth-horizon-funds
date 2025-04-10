
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Repeat, CalendarCheck, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import LinkBankAccount from "@/components/LinkBankAccount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const autoInvestSchema = z.object({
  amount: z
    .string()
    .min(1, "Please enter an amount")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1000, {
      message: "Amount must be at least ₦1,000",
    }),
  frequency: z.string({
    required_error: "Please select a frequency",
  }),
  startDate: z.string({
    required_error: "Please select a start date",
  }),
});

type AutoInvestFormValues = z.infer<typeof autoInvestSchema>;

const AutoInvestSetup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUserData, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([5000]);

  const form = useForm<AutoInvestFormValues>({
    resolver: zodResolver(autoInvestSchema),
    defaultValues: {
      amount: "5000",
      frequency: "monthly",
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: AutoInvestFormValues) => {
    // Check if bank account is linked first
    if (!userData?.linkedBankAccount) {
      toast.error("Bank account required", {
        description: "Please link a bank account first"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Update user data with auto-invest settings
      updateUserData({
        autoInvest: {
          amount: Number(data.amount),
          frequency: data.frequency,
          startDate: data.startDate,
          status: "active",
        }
      });
      
      toast.success("Auto-invest set up successfully", {
        description: `₦${data.amount} will be invested ${data.frequency} starting ${new Date(data.startDate).toLocaleDateString()}`
      });
      
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to set up auto-invest", {
        description: "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    form.setValue("amount", value[0].toString());
  };

  const hasAutoInvest = userData?.autoInvest?.status === "active";
  const hasLinkedAccount = userData?.linkedBankAccount !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className={hasAutoInvest 
            ? "border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white" 
            : "bg-wealth-navy hover:bg-wealth-blue text-white"
          }
          variant={hasAutoInvest ? "outline" : "default"}
        >
          <Repeat className="h-4 w-4 mr-2" /> 
          {hasAutoInvest ? "Manage Auto-invest" : "Set Up Auto-invest"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{hasAutoInvest ? "Manage Auto-invest" : "Set Up Auto-invest"}</DialogTitle>
        </DialogHeader>
        
        {!hasLinkedAccount && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-wealth-navy mb-2">
              You need to link a bank account first to set up auto-invest
            </p>
            <LinkBankAccount />
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₦)</FormLabel>
                  <FormControl>
                    <div className="space-y-5">
                      <Input 
                        type="number" 
                        min="1000"
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          setSliderValue([Number(e.target.value) || 1000]);
                        }}
                      />
                      <Slider
                        min={1000}
                        max={100000}
                        step={1000}
                        value={sliderValue}
                        onValueChange={handleSliderChange}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₦1,000</span>
                        <span>₦100,000</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    First debit will happen on this date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={isSubmitting || !hasLinkedAccount}
              >
                {isSubmitting ? "Setting up..." : "Confirm Setup"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        
        {hasAutoInvest && (
          <div className="pt-3 border-t">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => {
                updateUserData({
                  autoInvest: {
                    ...userData.autoInvest,
                    status: "cancelled"
                  }
                });
                toast.info("Auto-invest cancelled", {
                  description: "Your automatic investments have been cancelled"
                });
                setIsOpen(false);
              }}
            >
              Cancel Auto-invest
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AutoInvestSetup;
