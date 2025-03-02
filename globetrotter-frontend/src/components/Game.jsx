import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { FaRegSmile, FaRegFrown } from "react-icons/fa";

const Game = () => {
  const [destination, setDestination] = useState(null);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const fetchNewQuestion = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/destination/random`);
    setDestination(res.data);
    setFeedback(null);
    setSelected("");
  };

  const handleSubmit = async () => {
    if (!selected) return;
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/destination/submit`, {
      answer: selected,
      destinationId: destination._id,
    });
    setFeedback(res.data);
    if (res.data.isCorrect) setScore(score + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6 text-white">
      {feedback?.isCorrect && <Confetti />}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Guess the Destination</h1>
        <p className="text-lg text-gray-600 mt-4">{destination?.clues[0]}</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {destination?.options.map((opt, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(opt)}
              className={`p-3 rounded-lg font-semibold ${
                selected === opt ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>

        <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg">
          Submit
        </button>

        {feedback && (
          <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {feedback.isCorrect ? (
              <div className="flex items-center justify-center gap-2 text-green-500">
                <FaRegSmile size={30} /> <span>🎉 Correct! Fun Fact: {feedback.funFact}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-red-500">
                <FaRegFrown size={30} /> <span>😢 Wrong! Fun Fact: {feedback.funFact}</span>
              </div>
            )}
            <button onClick={fetchNewQuestion} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
              Next Question
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-6 text-lg">Score: {score}</div>
    </div>
  );
};

export default Game;
