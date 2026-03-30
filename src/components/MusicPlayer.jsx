import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = ({ musicUrl, onMusicEnd }) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // YouTube video ID'sini çıkar
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(musicUrl);

  const handleReady = () => {
    setIsReady(true);
    setIsPlaying(true);
    
    // 30 saniye sonra müziği durdur ve oyunu başlat
    setTimeout(() => {
      setIsPlaying(false);
      onMusicEnd();
    }, 30000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <div className="bg-game-blue/90 rounded-lg p-8 border-4 border-game-gold max-w-2xl">
        <h2 className="text-4xl font-bold text-game-gold mb-6 text-center">
          🎵 Müzik Sorusu
        </h2>
        
        <p className="text-white text-2xl mb-6 text-center">
          Şarkıyı dinleyin ve sanatçısını tahmin edin!
        </p>

        {!isReady ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReady}
            className="w-full px-12 py-6 text-3xl bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark rounded-lg font-bold"
          >
            ▶️ Hazırım, Müziği Çal!
          </motion.button>
        ) : (
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=0&end=30`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-game-gold text-xl text-center animate-pulse">
              🎵 Müzik çalıyor... (30 saniye)
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
