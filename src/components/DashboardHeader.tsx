
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { format } from "date-fns";

const DashboardHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
          Design Work Dashboard
        </h1>
        <p className="text-muted-foreground animate-slide-in">
          Track your design projects and payments
        </p>
      </div>
      <div className="flex items-center space-x-4 animate-fade-in">
        <div className="text-right hidden sm:block">
          <div className="text-sm text-muted-foreground">
            {format(currentDateTime, "EEEE")}
          </div>
          <div className="text-xl font-medium">
            {format(currentDateTime, "d MMMM yyyy")}
          </div>
          <div className="text-sm font-medium">
            {format(currentDateTime, "h:mm:ss a")}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
