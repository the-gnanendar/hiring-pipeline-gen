
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Candidate } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  status: z.enum(["new", "reviewing", "interview", "offer", "rejected"]),
  experience: z.number().min(0).optional(),
  education: z.string().optional(),
  resume: z.string().optional(),
});

interface CreateCandidateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Omit<Candidate, "id" | "date" | "initials">) => void;
  initialData?: Partial<Candidate>;
  mode?: "create" | "edit";
}

export function CreateCandidateForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode = "create",
}: CreateCandidateFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      position: initialData?.position || "",
      status: initialData?.status || "new",
      experience: initialData?.experience,
      education: initialData?.education?.[0] || "",
      resume: initialData?.resume || "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Convert education from string to array
      const education = values.education ? [values.education] : undefined;
      
      // In a real app, we would send this to an API
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (onSubmit) {
        onSubmit({
          name: values.name,
          email: values.email,
          position: values.position,
          status: values.status,
          phone: values.phone,
          experience: values.experience,
          education: education,
          resume: values.resume,
        });
      }
      
      toast({
        title: mode === "create" ? "Candidate added" : "Candidate updated",
        description: mode === "create" 
          ? "The candidate has been successfully added." 
          : "The candidate has been successfully updated.",
      });
      
      if (mode === "create") {
        form.reset();
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while ${mode === "create" ? "adding" : "updating"} the candidate.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {mode === "create" ? "Add New Candidate" : "Edit Candidate"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applied Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="5" 
                        {...field}
                        value={field.value || ''} 
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Education (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor's in Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Resume URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/resume.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-ats-600 hover:bg-ats-700"
              >
                {isSubmitting 
                  ? (mode === "create" ? "Adding..." : "Updating...") 
                  : (mode === "create" ? "Add Candidate" : "Update Candidate")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
