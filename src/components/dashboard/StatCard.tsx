import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  trend?: string;
}

export const StatCard = ({ icon, value, label, trend }: StatCardProps) => {
  const isPositive = trend?.startsWith('+');
  const hasTrend = trend && trend !== '+0%' && trend !== '-0%';
  
  return (
    <Card className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{icon}</div>
          {hasTrend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
              isPositive 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />
      </CardContent>
    </Card>
  );
};
