import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10",
        "rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        "transition-all duration-300 hover:bg-white/15 dark:hover:bg-black/15",
        className
      )}
    >
      {children}
    </div>
  );
};
