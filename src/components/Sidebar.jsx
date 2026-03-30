import { motion } from 'framer-motion';

const Sidebar = ({ moneyLadder, currentLevel }) => {
  const isCheckpoint = (level) => level === 5 || level === 10;

  return (
    <div className="w-80 bg-gradient-to-b from-game-blue/70 to-game-purple/70 rounded-lg p-6 border-4 border-game-gold/50 shadow-2xl backdrop-blur-sm">
      <motion.h2 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-game-gold mb-6 text-center drop-shadow-lg"
      >
        💰 Para Merdiveni
      </motion.h2>
      <div className="space-y-2">
        {[...moneyLadder].reverse().map((item, idx) => (
          <motion.div
            key={item.level}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05, type: "spring" }}
            whileHover={item.level >= currentLevel ? { scale: 1.03, x: -5 } : {}}
            className={`p-4 rounded-lg text-xl font-bold transition-all ${
              item.level === currentLevel
                ? 'bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark scale-110 border-4 border-white shadow-2xl animate-pulse'
                : item.level < currentLevel
                ? 'bg-green-700/60 text-green-200 border-2 border-green-400'
                : isCheckpoint(item.level)
                ? 'bg-gradient-to-r from-game-purple to-purple-900 text-game-gold border-4 border-game-gold shadow-lg'
                : 'bg-game-dark/60 text-white/70 border-2 border-game-gold/20'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{item.level}.</span>
              <span>{item.amount}</span>
              {isCheckpoint(item.level) && <span className="text-2xl">🛡️</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
