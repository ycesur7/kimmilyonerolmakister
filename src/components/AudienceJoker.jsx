import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AudienceJoker = ({ correctAnswer, onClose }) => {
  const [percentages, setPercentages] = useState([0, 0, 0, 0]);
  const [isAnimating, setIsAnimating] = useState(true);
  const letters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    // Animasyon için rastgele değerler
    const interval = setInterval(() => {
      setPercentages([
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ]);
    }, 100);

    // 3 saniye sonra gerçek sonuçları göster
    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
      
      // %80 ihtimalle doğru cevap açık ara önde
      // %20 ihtimalle iki şık arasında kararsız
      const isConfused = Math.random() < 0.2;
      
      if (isConfused) {
        // İki şık arasında kararsız (doğru cevap + bir yanlış)
        const wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswer);
        const confusedOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        
        const correctPercent = 40 + Math.floor(Math.random() * 15); // 40-55%
        const confusedPercent = 35 + Math.floor(Math.random() * 15); // 35-50%
        const remaining = 100 - correctPercent - confusedPercent;
        
        const final = [0, 0, 0, 0];
        final[correctAnswer] = correctPercent;
        final[confusedOption] = confusedPercent;
        
        // Kalan yüzdeyi diğer ikisine dağıt
        const others = [0, 1, 2, 3].filter(i => i !== correctAnswer && i !== confusedOption);
        final[others[0]] = Math.floor(remaining / 2);
        final[others[1]] = remaining - final[others[0]];
        
        setPercentages(final);
      } else {
        // Doğru cevap açık ara önde
        const correctPercent = 65 + Math.floor(Math.random() * 20); // 65-85%
        const remaining = 100 - correctPercent;
        
        const final = [0, 0, 0, 0];
        final[correctAnswer] = correctPercent;
        
        // Kalan yüzdeyi diğer üçe dağıt
        const wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswer);
        wrongOptions.forEach((idx, i) => {
          if (i === wrongOptions.length - 1) {
            final[idx] = remaining - final.reduce((sum, val, j) => 
              j !== correctAnswer && j !== idx ? sum + val : sum, 0
            );
          } else {
            final[idx] = Math.floor(Math.random() * (remaining / 3));
          }
        });
        
        setPercentages(final);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [correctAnswer]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, rotateY: -90 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0.5, rotateY: 90 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="bg-gradient-to-br from-game-blue via-game-purple to-game-blue/90 rounded-lg p-12 border-4 border-game-gold max-w-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-game-gold mb-8 text-center drop-shadow-lg"
          >
            👥 Seyirci Oylaması
          </motion.h2>

          <div className="flex items-end justify-around gap-6 h-80 mb-8">
            {percentages.map((percent, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isAnimating ? '100%' : `${percent * 3}px` }}
                  transition={{ duration: isAnimating ? 0.1 : 0.8, type: "spring" }}
                  className={`w-full rounded-t-lg relative ${
                    idx === correctAnswer && !isAnimating
                      ? 'bg-gradient-to-t from-green-600 to-green-400'
                      : 'bg-gradient-to-t from-blue-600 to-blue-400'
                  }`}
                  style={{ maxHeight: '300px' }}
                >
                  {!isAnimating && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold"
                    >
                      %{percent}
                    </motion.div>
                  )}
                </motion.div>
                <div className="mt-4 text-game-gold text-3xl font-bold">
                  {letters[idx]}
                </div>
              </div>
            ))}
          </div>

          {!isAnimating && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full px-8 py-4 text-2xl bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark rounded-lg font-bold shadow-xl"
            >
              Devam Et
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudienceJoker;
