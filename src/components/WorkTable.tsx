
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkEntry } from "@/types/workTypes";
import { format } from "date-fns";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface WorkTableProps {
  entries: WorkEntry[];
  removeWorkEntry: (id: string) => void;
}

type SortField = "designerName" | "date" | "company" | "amount";
type SortDirection = "asc" | "desc";

const WorkTable = ({ entries, removeWorkEntry }: WorkTableProps) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    if (sortField === "amount") {
      return sortDirection === "asc" 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    }
    
    // For string fields
    const valueA = String(a[sortField]).toLowerCase();
    const valueB = String(b[sortField]).toLowerCase();
    
    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

  const handleDelete = (id: string) => {
    removeWorkEntry(id);
    toast.success("Work entry deleted");
  };

  return (
    <Card className="card-gradient animate-fade-in hover-scale w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Work Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Total Payments: ₹{totalAmount.toLocaleString()}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button variant="ghost" onClick={() => handleSort("designerName")}>
                  Designer Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Work Type</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("company")}>
                  Company
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => handleSort("amount")}>
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No work entries yet. Add your first entry above.
                </TableCell>
              </TableRow>
            ) : (
              sortedEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.designerName}</TableCell>
                  <TableCell>{entry.workType}</TableCell>
                  <TableCell>{format(new Date(entry.date), "PPP")}</TableCell>
                  <TableCell className="capitalize">
                    {entry.company.replace("-", " ")}
                  </TableCell>
                  <TableCell className="text-right">₹{entry.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(entry.id)}
                      className="p-1 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WorkTable;
