// components/Dashboard/Blog/Filters.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Filter, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface FiltersProps {
  filters: {
    author: string;
    category: string;
    date: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      author: string;
      category: string;
      date: string;
    }>
  >;
  uniqueAuthors: string[];
  uniqueCategories: string[];
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  uniqueAuthors,
  uniqueCategories,
  date,
  setDate,
}) => {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-[#0a0a0a] mt-[85px] rounded-md">
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-teal-500" />
            <span className="text-lg font-semibold text-white">Filters</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setFilters({ author: "all", category: "all", date: "all" })
            }
            className="text-orange-500 hover:text-orange-400"
          >
            Clear all
          </Button>
        </div>

        <div className="space-y-4">
          {/* Author Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Author</label>
            <div className="space-y-2">
              {uniqueAuthors.map((author) => (
                <div key={author} className="flex items-center space-x-2">
                  <Checkbox
                    id={author}
                    checked={filters.author === author}
                    onCheckedChange={() => handleFilterChange("author", author)}
                  />
                  <label htmlFor={author} className="text-sm text-gray-300 cursor-pointer">
                    {author}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Category</label>
            <div className="space-y-2">
              {uniqueCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.category === category}
                    onCheckedChange={() => handleFilterChange("category", category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm text-gray-300 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    date ? "text-black" : "text-gray-600"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (newDate) {
                      handleFilterChange("date", format(newDate, "yyyy-MM-dd"));
                    } else {
                      handleFilterChange("date", "all");
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
