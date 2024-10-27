import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bomb from '../assets/boom.png';

const Grid = () => {
  const [grid, setGrid] = useState(createGrid());
  const [money, setMoney] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize grid with at least 4 bombs and random diamonds
  function createGrid() {
    const grid = Array(20).fill({ type: 'empty', revealed: false });
    let bombCount = 0;

    // Place at least 4 bombs in random positions
    while (bombCount < 4) {
      const randomIndex = Math.floor(Math.random() * 20);
      if (grid[randomIndex].type === 'empty') {
        grid[randomIndex] = { type: 'bomb', revealed: false };
        bombCount++;
      }
    }

    // Fill remaining grid with diamonds and empty spaces randomly
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].type === 'empty') {
        grid[i] = {
          type: Math.random() < 0.3 ? 'diamond' : 'empty', // 30% chance for diamond, rest empty
          revealed: false,
        };
      }
    }

    return grid;
  }

  const handleBoxClick = (index) => {
    if (gameOver || grid[index].revealed) return;

    const newGrid = [...grid];
    newGrid[index].revealed = true;

    if (newGrid[index].type === 'bomb') {
      setGameOver(true);
    } else if (newGrid[index].type === 'diamond') {
      setMoney(money + 10); // Add $10 for each diamond
    }

    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(createGrid());
    setMoney(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Diamond Collector Game</h1>
      <p className="text-xl mb-4">Money: ${money}</p>

      <div className="grid grid-cols-5 gap-4">
        {grid.map((box, index) => (
          <motion.div
            key={index}
            className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleBoxClick(index)}
          >
            {box.revealed && (
              <span className="text-2xl">
                {box.type === 'diamond' ? '💎' : box.type === 'bomb' ? '💣' : ''}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <motion.div
            className="  text-black p-6 w-full max-w-[600px] flex items-center flex-col rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={bomb} alt="Bomb" className='w-28 ' />
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Game Over..</h2>
            <p className="mb-4 text-white">You earned: ${money}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Grid;
