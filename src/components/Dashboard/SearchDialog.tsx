"use client";

import * as React from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Dashboard</CommandItem>
          <CommandItem>Transactions</CommandItem>
          <CommandItem>My Goals</CommandItem>
          <CommandItem>Investment</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
