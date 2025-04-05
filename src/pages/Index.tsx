
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import WorkEntryForm from "@/components/WorkEntryForm";
import WorkTable from "@/components/WorkTable";
import DashboardStats from "@/components/DashboardStats";
import WorkGraphs from "@/components/WorkGraphs";
import { WorkEntry } from "@/types/workTypes";
import { Toaster } from "sonner";

const LOCAL_STORAGE_KEY = "design-work-entries";

const Index = () => {
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        // Convert string dates back to Date objects
        const processedEntries = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          createdAt: new Date(entry.createdAt)
        }));
        setWorkEntries(processedEntries);
      } catch (error) {
        console.error("Failed to parse saved entries:", error);
      }
    }
  }, []);

  const addWorkEntry = (entry: WorkEntry) => {
    const updatedEntries = [entry, ...workEntries];
    setWorkEntries(updatedEntries);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
  };

  const removeWorkEntry = (id: string) => {
    const updatedEntries = workEntries.filter(entry => entry.id !== id);
    setWorkEntries(updatedEntries);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <DashboardStats entries={workEntries} />
        
        <div className="my-6">
          <WorkEntryForm addWorkEntry={addWorkEntry} />
        </div>
        
        <div className="my-6">
          <WorkTable entries={workEntries} removeWorkEntry={removeWorkEntry} />
        </div>
        
        <WorkGraphs entries={workEntries} />
        
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default Index;
