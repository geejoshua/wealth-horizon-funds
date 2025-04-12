
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MessageSquare } from "lucide-react";

const supportSchema = z.object({
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
});

type SupportFormValues = z.infer<typeof supportSchema>;

const SupportSection = () => {
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });
  
  function onSubmit(data: SupportFormValues) {
    console.log("Support form submitted:", data);
    toast.success("Your message has been sent", {
      description: "We'll get back to you within 24 hours",
    });
    form.reset();
  }
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Get help with your account, investments, or platform usage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Phone className="h-8 w-8 text-wealth-navy mb-2" />
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Call us directly
                  </p>
                  <p className="font-medium mt-2">+234 800 1234 5678</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mon-Fri, 8am-6pm
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Mail className="h-8 w-8 text-wealth-navy mb-2" />
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send us an email
                  </p>
                  <p className="font-medium mt-2">support@wealthwise.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We respond within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <MessageSquare className="h-8 w-8 text-wealth-navy mb-2" />
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chat with our team
                  </p>
                  <Button variant="outline" className="mt-2" size="sm">
                    Start Chat
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-6" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="What is your inquiry about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your issue in detail" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Submit Ticket</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            Our support team typically responds within 24 hours during business days.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SupportSection;
