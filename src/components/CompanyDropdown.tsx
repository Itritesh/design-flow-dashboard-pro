
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const defaultCompanies = [
  { value: "hyundai", label: "Hyundai" },
  { value: "mahindra", label: "Mahindra" },
  { value: "mahindra-bev", label: "Mahindra BEV" },
  { value: "audi", label: "Audi" },
  { value: "kia", label: "Kia" },
  { value: "mg", label: "MG" },
  { value: "mg-select", label: "MG Select" },
];

interface CompanyDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CompanyDropdown = ({ value, onChange }: CompanyDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState(defaultCompanies);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    const savedCompanies = localStorage.getItem("companies");
    if (savedCompanies) {
      setCompanies([...defaultCompanies, ...JSON.parse(savedCompanies)]);
    }
  }, []);

  const addCompany = () => {
    if (newCompany.trim() === "") return;
    
    const normalizedValue = newCompany.toLowerCase().replace(/\s+/g, "-");
    const newCompanyObj = { value: normalizedValue, label: newCompany.trim() };
    
    const updatedCompanies = [...companies, newCompanyObj];
    setCompanies(updatedCompanies);
    
    // Save custom companies to localStorage
    const customCompanies = updatedCompanies.filter(
      (company) => !defaultCompanies.some((def) => def.value === company.value)
    );
    localStorage.setItem("companies", JSON.stringify(customCompanies));
    
    setDialogOpen(false);
    setNewCompany("");
    onChange(normalizedValue);
    toast.success(`Added ${newCompany.trim()} to companies`);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? companies.find((company) => company.value === value)?.label
              : "Select company"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 z-50">
          <Command>
            <CommandInput placeholder="Search company..." />
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.value}
                  onSelect={() => {
                    onChange(company.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === company.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {company.label}
                </CommandItem>
              ))}
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  setDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add new company
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                placeholder="Company name"
                className="col-span-4"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addCompany}>Add Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyDropdown;
