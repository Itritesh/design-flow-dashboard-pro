
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkEntry } from "@/types/workTypes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns";

interface WorkGraphsProps {
  entries: WorkEntry[];
}

const WorkGraphs = ({ entries }: WorkGraphsProps) => {
  // Data for work assigned per day
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dailyWorkData = last7Days.map(day => {
    const count = entries.filter(entry => isSameDay(new Date(entry.date), day)).length;
    return {
      date: format(day, "MMM dd"),
      count,
    };
  });

  // Data for payments per month
  const thisMonth = new Date();
  const monthDays = eachDayOfInterval({
    start: startOfMonth(thisMonth),
    end: endOfMonth(thisMonth),
  });

  const cumulativePayments = monthDays.map((day, index) => {
    const entriesUntilDay = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return (
        isSameMonth(entryDate, thisMonth) && 
        entryDate.getDate() <= day.getDate()
      );
    });
    
    const totalAmount = entriesUntilDay.reduce((sum, entry) => sum + entry.amount, 0);
    
    return {
      date: format(day, "dd"),
      amount: totalAmount,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="card-gradient animate-fade-in hover-scale">
        <CardHeader>
          <CardTitle>Work Assigned (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyWorkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 17, 18, 0.95)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar dataKey="count" fill="#00BFB3" name="Work Items" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="card-gradient animate-fade-in hover-scale">
        <CardHeader>
          <CardTitle>Monthly Payment Accumulation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cumulativePayments}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 17, 18, 0.95)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6A5ACD"
                fill="#6A5ACD50"
                name="Cumulative Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkGraphs;
