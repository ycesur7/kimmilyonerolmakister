import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhoneJoker = ({ correctAnswer, onClose }) => {
  const [isRinging, setIsRinging] = useState(true);
  const [message, setMessage] = useState('');
  const [confidence, setConfidence] = useState(0);
  const letters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    // 2 saniye telefon çalma animasyonu
    setTimeout(() => {
      setIsRinging(false);
      
      // %70 ihtimalle çok emin
      // %30 ihtimalle kararsız veya düşük güven
      const isConfident = Math.random() < 0.7;
      
      if (isConfident) {
        // Çok emin (doğru cevap)
        const conf = 75 + Math.floor(Math.random() * 20); // 75-95%
        setConfidence(conf);
        setMessage(`Bence cevap ${letters[correctAnswer]} şıkkı. %${conf} eminim!`);
      } else {
        // Kararsız veya düşük güven
        const isUnsure = Math.random() < 0.5;
        
        if (isUnsure) {
          // İki şık arasında kararsız
          const wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswer);
          const confusedOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
          const conf = 50 + Math.floor(Math.random() * 15); // 50-65%
          setConfidence(conf);
          setMessage(`Emin değilim ama ${letters[correctAnswer]} veya ${letters[confusedOption]} olabilir. Sanırım ${letters[correctAnswer]}... %${conf} güvenle.`);
        } else {
          // Düşük güven ama doğru
          const conf = 55 + Math.floor(Math.random() * 15); // 55-70%
          setConfidence(conf);
          setMessage(`Tam emin değilim ama bence ${letters[correctAnswer]} şıkkı. %${conf} ihtimalle doğru olabilir.`);
        }
      }
    }, 2000);
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
          initial={{ scale: 0.5, rotateZ: -10 }}
          animate={{ scale: 1, rotateZ: 0 }}
          exit={{ scale: 0.5, rotateZ: 10 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 rounded-lg p-12 border-4 border-game-gold max-w-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {isRinging ? (
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="text-9xl mb-6"
              >
                📞
              </motion.div>
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-white text-3xl font-bold"
              >
                Aranıyor...
              </motion.p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.h2 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-5xl font-bold text-game-gold mb-8 text-center drop-shadow-lg"
              >
                📞 Telefon Jokeri
              </motion.h2>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-black/30 rounded-lg p-8 mb-8 border-2 border-game-gold/50"
              >
                <p className="text-white text-2xl leading-relaxed text-center">
                  "{message}"
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-center mb-6"
              >
                <div className="inline-block bg-game-gold/20 rounded-full px-8 py-4 border-2 border-game-gold">
                  <span className="text-game-gold text-3xl font-bold">
                    Güven: %{confidence}
                  </span>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full px-8 py-4 text-2xl bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark rounded-lg font-bold shadow-xl"
              >
                Teşekkürler!
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhoneJoker;
