"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import CreateListForm from "../form/createListForm";

export function Combobox({
  dataArray,
  onSelect,
}: {
  dataArray: { value: string; label: string }[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (value !== "") {
      onSelect(value);
    }
  }, [value, onSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-[#74481F] bg-opacity-20 hover:bg-[#74481F] border border-primary hover:border-[#512700] hover:text-white transition-all"
        >
          {value
            ? dataArray.find((data) => data.value === value)?.label
            : "Select list..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command className="bg-[#2A2A2A] bg-opacity-20 backdrop-blur-xl">
          <CommandInput placeholder="Select list..." />
          <CommandEmpty>
            <Dialog>
              <DialogTrigger asChild>
                <Button>No list found. Create one ?</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add pools to a custom list</DialogTitle>
                  <DialogDescription className="flex flex-col text-white pt-2"></DialogDescription>
                </DialogHeader>
                <CreateListForm />
              </DialogContent>
            </Dialog>
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {dataArray.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
