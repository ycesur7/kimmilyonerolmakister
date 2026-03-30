import { motion } from 'framer-motion';

const Sidebar = ({ moneyLadder, currentLevel }) => {
  const isCheckpoint = (level) => level === 5 || level === 10;

  return (
    <div className="w-80 bg-game-blue/50 rounded-lg p-6 border-2 border-game-gold/30">
      <h2 className="text-2xl font-bold text-game-gold mb-6 text-center">
        💰 Para Merdiveni
      </h2>
      <div className="space-y-2">
        {[...moneyLadder].reverse().map((item) => (
          <motion.div
            key={item.level}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: (15 - item.level) * 0.05 }}
            className={`p-4 rounded-lg text-xl font-bold transition-all ${
              item.level === currentLevel
                ? 'bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark scale-105 border-2 border-white'
                : item.level < currentLevel
                ? 'bg-green-700/50 text-green-300'
                : isCheckpoint(item.level)
                ? 'bg-game-purple/70 text-game-gold border-2 border-game-gold'
                : 'bg-game-dark/50 text-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{item.level}.</span>
              <span>{item.amount}</span>
              {isCheckpoint(item.level) && <span>🛡️</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
