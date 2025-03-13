
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWallet } from "@/context/WalletContext";

// Form schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  tagline: z.string().min(10, { message: "Tagline must be at least 10 characters" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }),
  category: z.string({ required_error: "Please select a category" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  targetAmount: z.coerce.number().positive({ message: "Target amount must be positive" }),
  tokenSymbol: z.string().min(2, { message: "Token symbol must be at least 2 characters" }).max(6),
  tokenPrice: z.coerce.number().positive({ message: "Token price must be positive" }),
  minInvestment: z.coerce.number().positive({ message: "Minimum investment must be positive" }).optional(),
  daysLeft: z.coerce.number().min(1, { message: "Campaign must run for at least 1 day" }).max(90),
});

const categories = ['DeFi', 'Metaverse', 'GreenTech', 'Infrastructure', 'NFT', 'Gaming'];

const CreateProject = () => {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      category: "",
      imageUrl: "",
      targetAmount: 100000,
      tokenSymbol: "",
      tokenPrice: 0.01,
      minInvestment: 100,
      daysLeft: 30,
    },
  });

  // Redirect if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wallet Connection Required</h2>
            <p className="text-gray-600 mb-8">
              You need to connect your wallet to create a new project.
            </p>
            <Button onClick={() => navigate('/projects')}>
              Return to Projects
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to create the project
    setTimeout(() => {
      // Create a new project object
      const newProject = {
        ...values,
        id: Date.now().toString(),
        raisedAmount: 0,
        investors: 0,
        createdBy: address
      };
      
      console.log("New project created:", newProject);
      
      // Show success toast
      toast({
        title: "Project Created Successfully",
        description: "Your project has been created and is now live.",
        duration: 5000,
      });
      
      setIsSubmitting(false);
      // Redirect to the project detail page
      navigate(`/project/${newProject.id}`);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Project</h1>
              <p className="text-gray-600">
                Create your blockchain project and start raising funds through tokenized equity.
              </p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 lg:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your blockchain project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input placeholder="A short, catchy description" {...field} />
                        </FormControl>
                        <FormDescription>
                          A brief description that captures your project's essence
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project in detail..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Use paragraphs separated by blank lines. Markdown supported.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category.toLowerCase()}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The category that best fits your project
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            A high-quality image representing your project
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Target ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1000" step="1000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Total funding amount you're looking to raise
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="minInvestment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Investment ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" step="1" {...field} />
                          </FormControl>
                          <FormDescription>
                            Smallest amount an investor can contribute
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="tokenSymbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Symbol</FormLabel>
                          <FormControl>
                            <Input placeholder="ETH" {...field} />
                          </FormControl>
                          <FormDescription>
                            2-6 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tokenPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0.0001" step="0.0001" {...field} />
                          </FormControl>
                          <FormDescription>
                            Initial token price
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="daysLeft"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Duration (days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="90" {...field} />
                          </FormControl>
                          <FormDescription>
                            1-90 days
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/projects')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Project..." : "Create Project"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateProject;
