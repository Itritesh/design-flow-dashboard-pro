
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "./Calendar";
import CompanyDropdown from "./CompanyDropdown";
import { WorkEntry } from "@/types/workTypes";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface WorkEntryFormProps {
  addWorkEntry: (entry: WorkEntry) => void;
}

const WorkEntryForm = ({ addWorkEntry }: WorkEntryFormProps) => {
  const [designerName, setDesignerName] = useState("");
  const [workType, setWorkType] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!designerName || !workType || !date || !company || !amount || isNaN(Number(amount))) {
      toast.error("Please fill in all fields correctly");
      return;
    }
    
    const entry: WorkEntry = {
      id: Date.now().toString(),
      designerName,
      workType,
      date,
      company,
      amount: Number(amount),
      createdAt: new Date(),
    };
    
    addWorkEntry(entry);
    toast.success("Work entry added successfully");
    
    // Reset form
    setDesignerName("");
    setWorkType("");
    setDate(new Date());
    setCompany("");
    setAmount("");
  };

  return (
    <Card className="card-gradient animate-fade-in hover-scale w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            New Work Entry
          </CardTitle>
          <CardDescription>Add details about the design work assigned</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Designer Name</Label>
              <Input 
                id="name" 
                placeholder="Enter designer name"
                value={designerName}
                onChange={(e) => setDesignerName(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workType">Work Type</Label>
              <Input 
                id="workType" 
                placeholder="e.g., Poster, Banner, Logo"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Client Company</Label>
              <CompanyDropdown value={company} onChange={setCompany} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input 
                id="amount" 
                type="number"
                placeholder="Enter payment amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Add Work Entry</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WorkEntryForm;
