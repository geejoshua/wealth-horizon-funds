
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
import { Link } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const bankAccountSchema = z.object({
  accountNumber: z
    .string()
    .length(10, "Account number must be 10 digits")
    .regex(/^\d+$/, "Must contain only numbers"),
  accountName: z.string().min(3, "Please enter your full account name"),
  bankName: z.string().min(2, "Please select a bank"),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

const LinkBankAccount = () => {
  const [isLinking, setIsLinking] = useState(false);
  const { updateUserData, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountNumber: "",
      accountName: "",
      bankName: "",
    },
  });

  const onSubmit = async (data: BankAccountFormValues) => {
    setIsLinking(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Update user data with linked account
      updateUserData({
        linkedBankAccount: {
          accountNumber: data.accountNumber,
          accountName: data.accountName,
          bankName: data.bankName,
        }
      });
      
      toast.success("Bank account linked successfully", {
        description: "Your account has been linked for auto-investments"
      });
      
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to link account", {
        description: "Please check your details and try again"
      });
    } finally {
      setIsLinking(false);
    }
  };

  const hasLinkedAccount = userData?.linkedBankAccount !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={hasLinkedAccount ? "outline" : "default"}
          className={hasLinkedAccount ? "border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white" : "bg-wealth-navy hover:bg-wealth-blue"}
          size="sm"
        >
          <Link className="h-4 w-4 mr-2" /> 
          {hasLinkedAccount ? "Change Bank Account" : "Link Bank Account"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link Bank Account</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Select your bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your 10-digit account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your account name" {...field} readOnly={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLinking}>
                {isLinking ? "Linking..." : "Link Account"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkBankAccount;
