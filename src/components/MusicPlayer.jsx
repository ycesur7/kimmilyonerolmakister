import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = ({ spotifyId, onMusicEnd }) => {
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (isReady && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      onMusicEnd();
    }
  }, [isReady, countdown, onMusicEnd]);

  const handleReady = () => {
    setIsReady(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
    >
      <div className="bg-gradient-to-br from-game-blue via-game-purple to-game-blue/90 rounded-lg p-12 border-4 border-game-gold max-w-3xl shadow-2xl">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-game-gold mb-8 text-center drop-shadow-lg"
        >
          🎵 Müzik Sorusu
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-3xl mb-8 text-center leading-relaxed"
        >
          Şarkıyı dinleyin ve sanatçısını tahmin edin!
        </motion.p>

        {!isReady ? (
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReady}
            className="w-full px-12 py-8 text-4xl bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark rounded-lg font-bold shadow-2xl"
          >
            ▶️ Hazırım, Müziği Çal!
          </motion.button>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-black/50 rounded-lg p-4 border-2 border-game-gold mb-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-center"
              >
                <div className="text-6xl mb-2">🎵</div>
                <p className="text-game-gold text-3xl font-bold">{countdown}s</p>
                <p className="text-white text-lg mt-2">Dikkatle dinleyin</p>
              </motion.div>
            </div>
            
            {/* Spotify Embed */}
            <iframe
              src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
