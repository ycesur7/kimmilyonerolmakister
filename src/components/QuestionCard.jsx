import { motion } from 'framer-motion';

const QuestionCard = ({ question, selectedAnswer, onAnswer, eliminatedOptions }) => {
  const letters = ['A', 'B', 'C', 'D'];

  const getButtonStyle = (index) => {
    if (eliminatedOptions.includes(index)) {
      return 'bg-gray-700 opacity-30 cursor-not-allowed';
    }
    if (selectedAnswer === index) {
      if (index === question.answer) {
        return 'bg-gradient-to-r from-green-500 to-green-700 scale-105';
      } else {
        return 'bg-gradient-to-r from-red-500 to-red-700 scale-105';
      }
    }
    return 'bg-gradient-to-r from-game-blue to-game-purple hover:scale-105';
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ y: -50, opacity: 0, rotateX: -15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-gradient-to-br from-game-blue via-game-purple to-game-blue/80 rounded-lg p-8 mb-8 border-4 border-game-gold shadow-2xl"
      >
        <motion.p 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-white text-3xl text-center font-semibold leading-relaxed"
        >
          {question.question}
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !eliminatedOptions.includes(index) && selectedAnswer === null && onAnswer(index)}
            disabled={selectedAnswer !== null || eliminatedOptions.includes(index)}
            className={`hexagon-button ${getButtonStyle(index)} p-8 text-white text-2xl font-bold transition-all duration-300 border-2 border-game-gold/50 shadow-xl`}
          >
            <span className="text-game-gold mr-3 text-3xl">{letters[index]}:</span>
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
