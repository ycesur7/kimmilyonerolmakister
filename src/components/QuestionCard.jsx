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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-game-blue/80 rounded-lg p-8 mb-8 border-2 border-game-gold"
      >
        <p className="text-white text-3xl text-center font-semibold leading-relaxed">
          {question.question}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !eliminatedOptions.includes(index) && selectedAnswer === null && onAnswer(index)}
            disabled={selectedAnswer !== null || eliminatedOptions.includes(index)}
            className={`hexagon-button ${getButtonStyle(index)} p-8 text-white text-2xl font-bold transition-all duration-300 border-2 border-game-gold/50`}
          >
            <span className="text-game-gold mr-3">{letters[index]}:</span>
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
