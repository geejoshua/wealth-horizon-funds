
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pinSchema = z
  .object({
    currentPin: z
      .string()
      .length(4, { message: "PIN must be exactly 4 digits" })
      .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
    newPin: z
      .string()
      .length(4, { message: "PIN must be exactly 4 digits" })
      .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
    confirmPin: z
      .string()
      .length(4, { message: "PIN must be exactly 4 digits" })
      .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });

type PinFormValues = z.infer<typeof pinSchema>;

const PinChangeForm = () => {
  const form = useForm<PinFormValues>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      currentPin: "",
      newPin: "",
      confirmPin: "",
    },
  });
  
  function onSubmit(data: PinFormValues) {
    // In a real app, this would call an API
    console.log("PIN change form submitted:", data);
    
    toast.success("Security PIN changed successfully");
    form.reset();
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Security PIN</CardTitle>
        <CardDescription>
          Update your transaction security PIN. This PIN is used to authorize financial transactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current PIN</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      maxLength={4}
                      inputMode="numeric"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New PIN</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      maxLength={4}
                      inputMode="numeric"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New PIN</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      maxLength={4}
                      inputMode="numeric"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Change PIN</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PinChangeForm;
