import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const Loading = ({ className, size = "md", text }: LoadingProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
};

export const LoadingScreen = ({ text = "Laden..." }: { text?: string }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card/90 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-border/50 animate-scale-in">
        <Loading size="lg" text={text} />
      </div>
    </div>
  );
};