import { cn } from "@/lib/shad/utils";
import { Loader2Icon } from "lucide-react";

export function FullLoader({ className }: { className?: string }) {
  return (
    <div className="flex flex-col items-center justify-center grow">
      <Loader2Icon className={cn("animate-spin w-12 h-12", className)} />
    </div>
  )
}
