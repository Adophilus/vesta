import { Input } from "@/components/shad/ui/input";
import { SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div className="p-4">
      <div className="relative">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" />
      </div>
    </div>
  )
}
