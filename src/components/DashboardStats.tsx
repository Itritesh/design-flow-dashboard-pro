
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkEntry } from "@/types/workTypes";
import { format, isSameDay, isSameMonth } from "date-fns";

interface DashboardStatsProps {
  entries: WorkEntry[];
}

const DashboardStats = ({ entries }: DashboardStatsProps) => {
  // Calculate total entries for today
  const today = new Date();
  const todayEntries = entries.filter(entry => 
    isSameDay(new Date(entry.date), today)
  );
  
  // Calculate entries for current month
  const currentMonthEntries = entries.filter(entry => 
    isSameMonth(new Date(entry.date), today)
  );
  
  // Calculate total amount
  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);
  
  // Calculate current month amount
  const currentMonthAmount = currentMonthEntries.reduce(
    (sum, entry) => sum + entry.amount, 
    0
  );

  // Calculate average amount per work item
  const averageAmount = entries.length > 0 
    ? Math.round(totalAmount / entries.length) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="card-gradient animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <CardDescription>Today's Entries</CardDescription>
          <CardTitle className="text-3xl font-bold">{todayEntries.length}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            Work items assigned today
          </p>
        </CardContent>
      </Card>

      <Card className="card-gradient animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-3xl font-bold">{currentMonthEntries.length}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            Work items in {format(today, 'MMMM')}
          </p>
        </CardContent>
      </Card>

      <Card className="card-gradient animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <CardDescription>Monthly Revenue</CardDescription>
          <CardTitle className="text-3xl font-bold">₹{currentMonthAmount.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            Total amount for {format(today, 'MMMM')}
          </p>
        </CardContent>
      </Card>

      <Card className="card-gradient animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <CardDescription>Average Amount</CardDescription>
          <CardTitle className="text-3xl font-bold">₹{averageAmount.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            Average payment per work item
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
