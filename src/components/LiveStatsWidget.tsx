import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LiveStatsWidget = () => {
  const [stats, setStats] = useState({
    newToday: 8,
    activeBuyers: 42,
    salesThisWeek: 5,
    lastSaleHours: 3,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeBuyers: Math.floor(Math.random() * 20) + 35,
        lastSaleHours: Math.floor(Math.random() * 12) + 1,
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100"
    >
      {/* Live badge */}
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-3 h-3 bg-red-500 rounded-full"
        />
        <span className="text-red-500 font-bold text-sm uppercase tracking-wide">
          🔴 LIVE
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-sm text-gray-600">Nouvelles aujourd'hui</span>
          </div>
          <div className="text-2xl font-black text-orange-600">
            {stats.newToday}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span className="text-sm text-gray-600">Acheteurs actifs</span>
          </div>
          <motion.div 
            key={stats.activeBuyers}
            initial={{ scale: 1.2, color: "#3b82f6" }}
            animate={{ scale: 1, color: "#2563eb" }}
            className="text-2xl font-black text-blue-600"
          >
            {stats.activeBuyers}
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-sm text-gray-600">Ventes cette semaine</span>
          </div>
          <div className="text-2xl font-black text-green-600">
            {stats.salesThisWeek}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>⏱️</span>
            <span>Dernière vente: Il y a {stats.lastSaleHours}h</span>
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <motion.div
        animate={{ 
          boxShadow: [
            "0 0 0 0 rgba(59, 130, 246, 0.4)",
            "0 0 0 20px rgba(59, 130, 246, 0)",
          ]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
};

export default LiveStatsWidget;
