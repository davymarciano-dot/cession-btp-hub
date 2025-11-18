import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HealthStatusBadgeProps {
  status: 'healthy' | 'unhealthy' | 'warning';
  label?: string;
}

const HealthStatusBadge = ({ status, label }: HealthStatusBadgeProps) => {
  const config = {
    healthy: {
      icon: CheckCircle2,
      variant: "default" as const,
      className: "bg-green-500 hover:bg-green-600 text-white",
      text: label || "En ligne"
    },
    unhealthy: {
      icon: XCircle,
      variant: "destructive" as const,
      className: "",
      text: label || "Hors ligne"
    },
    warning: {
      icon: AlertTriangle,
      variant: "secondary" as const,
      className: "bg-yellow-500 hover:bg-yellow-600 text-white",
      text: label || "Attention"
    }
  };

  const { icon: Icon, variant, className, text } = config[status];

  return (
    <Badge variant={variant} className={`flex items-center gap-1.5 ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </Badge>
  );
};

export default HealthStatusBadge;
