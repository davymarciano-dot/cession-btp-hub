import { ReactNode } from "react";

interface StatCounterProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
}

const StatCounter = ({ value, label, icon }: StatCounterProps) => {
  return (
    <div className="text-center">
      {icon && <div className="text-4xl mb-2">{icon}</div>}
      <div className="text-6xl font-bold mb-2">{value}</div>
      <p className="text-xl text-white/90">{label}</p>
    </div>
  );
};

export default StatCounter;
