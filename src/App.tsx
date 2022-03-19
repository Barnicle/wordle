import React, { useState } from "react";
import WordRow from "./components/WordRow"
import { useStore } from "./store/store"
import { GUESS_LENGTH, LETTER_LENGTH } from "./word-utils";

const App = () => {
  const state = useStore();
  const [guess, setGuess] = useState('');
  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) rows.push(guess)
  const numberOfGuessesRamaining = GUESS_LENGTH - state.guesses.length;
  rows = rows.concat(Array(numberOfGuessesRamaining).fill(''));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value
    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess)
      setGuess('')
      return;
    }
    setGuess(newGuess)
  }
  const isGameOver = state.guesses.length === GUESS_LENGTH;
  const startNewGame = () => {
    // state.newGame();
    setGuess('')
  }
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 mb-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>
      <div>
        <input
          type="text"
          value={guess}
          disabled={isGameOver}
          onChange={onChange}
        />
      </div>
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, index) => <WordRow key={index} letters={word}/>)}
      </main>
      {isGameOver && (
        <div role="modal" className="absolute
        rounded text-center bg-white border
        left-0 right-0 top-1/4 p-6 w-3/4 mx-auto border-gray-500" >
          Game Over!
          <button onClick={startNewGame} className="block border rounder border-green-500 bg-green-500 p-2 mt-4 mx-auto">New Game</button>
        </div>
      )}
    </div>
  )
}

export default App