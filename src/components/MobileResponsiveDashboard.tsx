import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const MobileResponsiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMenu, setShowMenu] = useState(false);
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const tabs = ['overview', 'stats', 'messages', 'actions'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const tabs = ['overview', 'stats', 'messages', 'actions'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
  });
  
  interface QuickStatProps {
    icon: string;
    value: string;
    label: string;
    trend?: number;
  }
  
  const QuickStat = ({ icon, value, label, trend }: QuickStatProps) => (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="bg-card rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-xs font-bold ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 && '+'}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
  
  interface ActionButtonProps {
    icon: string;
    label: string;
    color: string;
    onClick?: () => void;
  }
  
  const ActionButton = ({ icon, label, color, onClick }: ActionButtonProps) => (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 bg-${color}-100 rounded-xl`}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
  
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="grid grid-cols-4 h-16">
        {[
          { id: 'overview', icon: '🏠', label: 'Accueil' },
          { id: 'stats', icon: '📊', label: 'Stats' },
          { id: 'messages', icon: '💬', label: 'Messages' },
          { id: 'actions', icon: '⚡', label: 'Actions' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center relative ${
              activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-background pb-16" {...swipeHandlers}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">CessionBTP</h1>
            <p className="text-xs opacity-90">Bonjour, Jean 👋</p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="text-2xl">☰</span>
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-2xl font-bold">234</p>
            <p className="text-xs opacity-90">Vues</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs opacity-90">Messages</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">#5</p>
            <p className="text-xs opacity-90">Position</p>
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-4 shadow-sm">
                <h2 className="font-bold mb-3">📈 Performance du jour</h2>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">+23%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <QuickStat icon="👁️" value="45" label="Vues aujourd'hui" trend={12} />
                <QuickStat icon="💬" value="3" label="Nouveaux messages" />
                <QuickStat icon="⭐" value="8" label="Favoris" trend={5} />
                <QuickStat icon="🎯" value="2" label="Matchs IA" />
              </div>
              
              <div className="bg-card rounded-xl p-4 shadow-sm">
                <h3 className="font-bold mb-3">Actions rapides</h3>
                <div className="grid grid-cols-3 gap-3">
                  <ActionButton icon="🚀" label="Booster" color="blue" />
                  <ActionButton icon="📸" label="Photos" color="green" />
                  <ActionButton icon="✏️" label="Modifier" color="orange" />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-4 shadow-sm">
                <h2 className="font-bold mb-3">📊 Statistiques détaillées</h2>
                
                <div className="h-48 bg-secondary rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Graphique</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taux de conversion</span>
                    <span className="font-bold">3.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temps moyen</span>
                    <span className="font-bold">2m 45s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pages vues</span>
                    <span className="font-bold">342</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span>👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Acheteur {i}</p>
                      <p className="text-sm text-muted-foreground">Intéressé par votre entreprise...</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2h</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">🚀 Boostez votre annonce</h3>
                <p className="text-sm opacity-90 mb-4">
                  +300% de visibilité garantie
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold w-full">
                  Booster maintenant
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-card rounded-xl p-4 shadow-sm text-left">
                  <span className="text-2xl mb-2 block">📸</span>
                  <span className="text-sm font-semibold">Ajouter photos</span>
                </button>
                <button className="bg-card rounded-xl p-4 shadow-sm text-left">
                  <span className="text-2xl mb-2 block">🎥</span>
                  <span className="text-sm font-semibold">Visite 360°</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav />
      
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-card shadow-xl z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button onClick={() => setShowMenu(false)}>✕</button>
                </div>
                
                <nav className="space-y-4">
                  <a href="#" className="block py-2">Mon compte</a>
                  <a href="#" className="block py-2">Mes annonces</a>
                  <a href="#" className="block py-2">Paramètres</a>
                  <a href="#" className="block py-2">Aide</a>
                  <a href="#" className="block py-2 text-destructive">Déconnexion</a>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileResponsiveDashboard;
