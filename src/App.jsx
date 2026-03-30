import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './components/QuestionCard';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import AudienceJoker from './components/AudienceJoker';
import PhoneJoker from './components/PhoneJoker';
import questionsData from './data/questions.json';
import './App.css';

const moneyLadder = [
  { level: 1, amount: '1.000 TL' },
  { level: 2, amount: '2.000 TL' },
  { level: 3, amount: '3.000 TL' },
  { level: 4, amount: '5.000 TL' },
  { level: 5, amount: '10.000 TL' },
  { level: 6, amount: '25.000 TL' },
  { level: 7, amount: '50.000 TL' },
  { level: 8, amount: '100.000 TL' },
  { level: 9, amount: '200.000 TL' },
  { level: 10, amount: '500.000 TL' },
  { level: 11, amount: '750.000 TL' },
  { level: 12, amount: '1.000.000 TL' },
  { level: 13, amount: '1.500.000 TL' },
  { level: 14, amount: '2.000.000 TL' },
  { level: 15, amount: '5.000.000 TL' }
];

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    audience: true,
    phone: true
  });
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(40);
  const [leaderboard, setLeaderboard] = useState([]);
  const [finalAmount, setFinalAmount] = useState('0 TL');
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [musicEnded, setMusicEnded] = useState(false);
  const [showAudienceJoker, setShowAudienceJoker] = useState(false);
  const [showPhoneJoker, setShowPhoneJoker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState(null);
  
  const thinkingMusicRef = useRef(null);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('milyoner-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
    
    // Ses dosyalarını yükle
    thinkingMusicRef.current = new Audio('/sounds/thinking.mp3');
    thinkingMusicRef.current.loop = true;
    thinkingMusicRef.current.volume = 0.5;
    correctSoundRef.current = new Audio('/sounds/correct.mp3');
    correctSoundRef.current.volume = 0.7;
    wrongSoundRef.current = new Audio('/sounds/wrong.mp3');
    wrongSoundRef.current.volume = 0.7;
    
    return () => {
      // Cleanup
      thinkingMusicRef.current?.pause();
      correctSoundRef.current?.pause();
      wrongSoundRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    // Baraj sonrası (11-15) sorularda süre yok
    const hasTimer = currentLevel <= 10;
    
    if (gameState === 'playing' && hasTimer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (hasTimer && timeLeft === 0 && gameState === 'playing') {
      handleWrongAnswer();
    }
  }, [timeLeft, gameState, currentLevel]);
  
  useEffect(() => {
    // Müzik kontrolü
    if (gameState === 'playing' && !showMusicPlayer) {
      // Müzik sorusu değilse thinking müziğini çal
      thinkingMusicRef.current?.play().catch(e => {
        console.log('Müzik çalınamadı:', e);
        // Kullanıcı etkileşimi gerekebilir
      });
    } else {
      thinkingMusicRef.current?.pause();
      if (thinkingMusicRef.current) thinkingMusicRef.current.currentTime = 0;
    }
  }, [gameState, showMusicPlayer]);

  const startGame = () => {
    if (playerName.trim()) {
      setGameState('playing');
      setCurrentLevel(1);
      loadQuestion(1);
      
      // İlk tıklamada sesleri aktif et
      const enableAudio = () => {
        thinkingMusicRef.current?.play().then(() => {
          thinkingMusicRef.current.pause();
          thinkingMusicRef.current.currentTime = 0;
        }).catch(e => console.log('Ses hazırlama:', e));
      };
      enableAudio();
    }
  };

  const loadQuestion = (level) => {
    const levelQuestions = questionsData.filter(q => q.level === level);
    const randomQuestion = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setEliminatedOptions([]);
    setMusicEnded(false);
    
    // Müzik sorusu mu kontrol et
    if (randomQuestion.spotifyId) {
      setShowMusicPlayer(true);
      setTimeLeft(null); // Müzik bitene kadar süre başlamasın
    } else {
      setShowMusicPlayer(false);
      // Baraj sonrası (11-15) sorularda süre yok
      setTimeLeft(level <= 10 ? 40 : null);
    }
  };

  const handleAnswerClick = (index) => {
    setPendingAnswer(index);
    setShowConfirmation(true);
  };

  const confirmAnswer = () => {
    setShowConfirmation(false);
    setSelectedAnswer(pendingAnswer);
    
    // Thinking müziğini durdur
    if (thinkingMusicRef.current) {
      thinkingMusicRef.current.pause();
      thinkingMusicRef.current.currentTime = 0;
    }
    
    setTimeout(() => {
      if (pendingAnswer === currentQuestion.answer) {
        // Doğru cevap sesi (10 saniye alkış)
        if (correctSoundRef.current) {
          correctSoundRef.current.currentTime = 0;
          correctSoundRef.current.play().catch(e => console.log('Ses çalınamadı:', e));
        }
        
        setTimeout(() => {
          if (currentLevel === 15) {
            endGame(moneyLadder[currentLevel - 1].amount);
          } else {
            const nextLevel = currentLevel + 1;
            setCurrentLevel(nextLevel);
            setSelectedAnswer(null);
            setPendingAnswer(null);
            loadQuestion(nextLevel);
          }
        }, 10000); // 10 saniye alkış sesi
      } else {
        // Yanlış cevap sesi
        if (wrongSoundRef.current) {
          wrongSoundRef.current.currentTime = 0;
          wrongSoundRef.current.play().catch(e => console.log('Ses çalınamadı:', e));
        }
        setTimeout(() => handleWrongAnswer(), 3000);
      }
    }, 2000); // Animasyon için 2 saniye bekle
  };

  const cancelAnswer = () => {
    setShowConfirmation(false);
    setPendingAnswer(null);
  };
  
  const handleMusicEnd = () => {
    setShowMusicPlayer(false);
    setMusicEnded(true);
    // Müzik bittikten sonra süreyi başlat
    setTimeLeft(currentLevel <= 10 ? 40 : null);
    // Thinking müziğini başlat
    if (thinkingMusicRef.current) {
      thinkingMusicRef.current.currentTime = 0;
      thinkingMusicRef.current.play().catch(e => console.log('Müzik çalınamadı:', e));
    }
  };

  const handleWrongAnswer = () => {
    let amount = '0 TL';
    if (currentLevel > 10) amount = moneyLadder[9].amount;
    else if (currentLevel > 5) amount = moneyLadder[4].amount;
    endGame(amount);
  };

  const endGame = (amount) => {
    setFinalAmount(amount);
    setGameState('gameover');
    const now = new Date();
    const newEntry = { 
      name: playerName, 
      amount, 
      level: currentLevel,
      date: now.toLocaleDateString('tr-TR'),
      time: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [...leaderboard, newEntry].sort((a, b) => {
      const aVal = parseInt(a.amount.replace(/\D/g, ''));
      const bVal = parseInt(b.amount.replace(/\D/g, ''));
      return bVal - aVal;
    }).slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem('milyoner-leaderboard', JSON.stringify(updated));
  };

  const quitGame = () => {
    const amount = currentLevel > 1 ? moneyLadder[currentLevel - 2].amount : '0 TL';
    endGame(amount);
  };

  const useFiftyFifty = () => {
    if (!jokers.fiftyFifty || eliminatedOptions.length > 0) return;
    const wrongOptions = [0, 1, 2, 3].filter(i => i !== currentQuestion.answer);
    const toEliminate = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(toEliminate);
    setJokers({ ...jokers, fiftyFifty: false });
  };

  const useAudience = () => {
    if (!jokers.audience) return;
    setShowAudienceJoker(true);
    setJokers({ ...jokers, audience: false });
  };

  const usePhone = () => {
    if (!jokers.phone) return;
    setShowPhoneJoker(true);
    setJokers({ ...jokers, phone: false });
  };

  const resetGame = () => {
    setGameState('welcome');
    setPlayerName('');
    setCurrentLevel(1);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setPendingAnswer(null);
    setShowConfirmation(false);
    setJokers({ fiftyFifty: true, audience: true, phone: true });
    setEliminatedOptions([]);
    setTimeLeft(40);
    
    // Tüm sesleri durdur
    if (thinkingMusicRef.current) {
      thinkingMusicRef.current.pause();
      thinkingMusicRef.current.currentTime = 0;
    }
    if (correctSoundRef.current) {
      correctSoundRef.current.pause();
      correctSoundRef.current.currentTime = 0;
    }
    if (wrongSoundRef.current) {
      wrongSoundRef.current.pause();
      wrongSoundRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="text-7xl font-bold text-game-gold mb-8 drop-shadow-2xl"
            >
              Kim Milyoner Olmak İster?
            </motion.h1>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="text"
                placeholder="Adınızı girin"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && startGame()}
                className="px-6 py-4 text-2xl rounded-lg bg-game-blue text-white border-2 border-game-gold mb-6 w-96 focus:outline-none focus:ring-4 focus:ring-game-gold/50"
              />
            </motion.div>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-12 py-4 text-2xl bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark rounded-lg font-bold shadow-2xl"
            >
              🎮 Oyuna Başla
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-7xl flex gap-8"
          >
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                  {playerName} - Soru {currentLevel}/15
                </div>
                {currentLevel <= 10 ? (
                  <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-game-gold'}`}>
                    ⏱️ {timeLeft}s
                  </div>
                ) : (
                  <div className="text-2xl text-game-gold font-bold">
                    ⏱️ Süresiz
                  </div>
                )}
              </div>

              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onAnswer={handleAnswerClick}
                eliminatedOptions={eliminatedOptions}
                pendingAnswer={pendingAnswer}
              />

              <div className="mt-6 flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={useFiftyFifty}
                  disabled={!jokers.fiftyFifty}
                  className={`px-6 py-3 text-xl rounded-lg font-bold transition-all shadow-lg ${
                    jokers.fiftyFifty
                      ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  ✂️ 50:50
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={useAudience}
                  disabled={!jokers.audience}
                  className={`px-6 py-3 text-xl rounded-lg font-bold transition-all shadow-lg ${
                    jokers.audience
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  👥 Seyirci
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={usePhone}
                  disabled={!jokers.phone}
                  className={`px-6 py-3 text-xl rounded-lg font-bold transition-all shadow-lg ${
                    jokers.phone
                      ? 'bg-gradient-to-r from-green-600 to-green-800 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  📞 Telefon
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={quitGame}
                  className="px-6 py-3 text-xl bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-bold shadow-lg"
                >
                  🚪 Çekil
                </motion.button>
              </div>
            </div>

            <Sidebar
              moneyLadder={moneyLadder}
              currentLevel={currentLevel}
            />
            
            {/* Müzik Player */}
            {showMusicPlayer && currentQuestion.spotifyId && (
              <MusicPlayer
                spotifyId={currentQuestion.spotifyId}
                onMusicEnd={handleMusicEnd}
              />
            )}
            
            {/* Seyirci Jokeri */}
            {showAudienceJoker && (
              <AudienceJoker
                correctAnswer={currentQuestion.answer}
                onClose={() => setShowAudienceJoker(false)}
              />
            )}
            
            {/* Telefon Jokeri */}
            {showPhoneJoker && (
              <PhoneJoker
                correctAnswer={currentQuestion.answer}
                onClose={() => setShowPhoneJoker(false)}
              />
            )}
            
            {/* Onay Dialogu */}
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.5, rotateY: -90 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-gradient-to-br from-game-blue via-game-purple to-game-blue/90 rounded-lg p-12 border-4 border-game-gold shadow-2xl max-w-2xl"
                >
                  <motion.h2 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-5xl font-bold text-game-gold mb-8 text-center"
                  >
                    ⚠️ Emin misiniz?
                  </motion.h2>
                  <p className="text-white text-3xl mb-8 text-center">
                    <span className="text-game-gold font-bold">{['A', 'B', 'C', 'D'][pendingAnswer]}</span> şıkkını seçtiniz
                  </p>
                  <div className="flex gap-6 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={confirmAnswer}
                      className="px-10 py-5 text-3xl bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg font-bold shadow-xl"
                    >
                      ✓ Evet, Eminim
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={cancelAnswer}
                      className="px-10 py-5 text-3xl bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-bold shadow-xl"
                    >
                      ✗ Hayır, Vazgeç
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameState === 'gameover' && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center"
          >
            <motion.h1 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-6xl font-bold text-game-gold mb-6 drop-shadow-2xl"
            >
              🎊 Oyun Bitti!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl text-white mb-4"
            >
              {playerName}, kazandığınız miktar:
            </motion.p>
            <motion.p 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
              className="text-7xl font-bold text-game-gold mb-8 drop-shadow-2xl animate-pulse"
            >
              {finalAmount}
            </motion.p>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-game-blue/70 to-game-purple/70 rounded-lg p-6 mb-8 max-w-2xl mx-auto border-4 border-game-gold/50 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-game-gold mb-4 text-center">🏆 Liderlik Tablosu</h2>
              {leaderboard.length === 0 ? (
                <p className="text-white text-xl text-center py-4">Henüz kayıt yok</p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.1 + idx * 0.1 }}
                      className="bg-game-dark/50 rounded-lg p-4 border border-game-gold/30 hover:bg-game-gold/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-game-gold font-bold text-2xl w-8">{idx + 1}.</span>
                          <div>
                            <p className="text-white text-xl font-bold">{entry.name}</p>
                            <p className="text-gray-300 text-sm">
                              Seviye {entry.level} • {entry.date} {entry.time}
                            </p>
                          </div>
                        </div>
                        <span className="text-game-gold font-bold text-2xl">{entry.amount}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="px-12 py-4 text-2xl bg-gradient-to-r from-game-gold to-yellow-600 text-game-dark rounded-lg font-bold shadow-2xl"
            >
              🔄 Yeniden Oyna
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
