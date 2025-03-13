
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InvestmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    name: string;
    tokenSymbol: string;
    tokenPrice: number;
    minInvestment?: number;
  };
}

const InvestmentModal = ({ open, onOpenChange, project }: InvestmentModalProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState(project.minInvestment || 100);
  const [step, setStep] = useState(1);
  
  const tokenAmount = amount / project.tokenPrice;
  
  const handleInvest = () => {
    // Here you would integrate with a payment provider or crypto wallet
    toast({
      title: "Investment Initiated",
      description: `You are investing $${amount.toLocaleString()} in ${project.name}`,
      duration: 5000,
    });
    
    // Move to confirmation step
    setStep(2);
    
    // In a real app, you would wait for the transaction to complete
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };
  
  const resetAndClose = () => {
    setStep(1);
    setAmount(project.minInvestment || 100);
    onOpenChange(false);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Invest in {project.name}</DialogTitle>
              <DialogDescription>
                Purchase {project.tokenSymbol} tokens to support this startup and potentially earn returns on your investment.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="investment-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={project.minInvestment || 50}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">USD</span>
                </div>
                
                <Slider
                  value={[amount]}
                  min={project.minInvestment || 50}
                  max={5000}
                  step={50}
                  onValueChange={(value) => setAmount(value[0])}
                  className="mt-2"
                />
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${project.minInvestment || 50}</span>
                  <span>$5,000</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-blue-700">Investment Summary</h4>
                    <ul className="mt-2 space-y-1 text-sm text-blue-600">
                      <li className="flex justify-between">
                        <span>Token Price:</span>
                        <span className="font-medium">${project.tokenPrice}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tokens to Receive:</span>
                        <span className="font-medium">{tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {project.tokenSymbol}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Investment Amount:</span>
                        <span className="font-medium">${amount.toLocaleString()}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={resetAndClose}>Cancel</Button>
              <Button onClick={handleInvest} className="gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        );
        
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Processing Investment</DialogTitle>
              <DialogDescription>
                Please wait while we process your investment...
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm text-gray-500">
                Connecting to payment provider...
              </p>
            </div>
            
            <DialogFooter>
              <Button variant="outline" disabled>Cancel</Button>
              <Button disabled>Continue</Button>
            </DialogFooter>
          </>
        );
        
      case 3:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Investment Successful!</DialogTitle>
              <DialogDescription>
                Congratulations on your investment in {project.name}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900">
                You've successfully invested ${amount.toLocaleString()}
              </h3>
              
              <p className="text-sm text-gray-500">
                You have received {tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {project.tokenSymbol} tokens. 
                You can track your investment in your portfolio.
              </p>
              
              <div className="p-4 bg-blue-50 rounded-lg text-left mt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <span className="font-medium">What's next?</span>
                    <p className="mt-1 text-blue-600">
                      You'll receive an email confirmation with details of your investment. 
                      The tokens will be added to your connected wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={resetAndClose} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
