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
  rows = rows.concat(Array(numberOfGuessesRamaining).fill(''))
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value
    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess)
      setGuess('')
      return;
    }
    setGuess(newGuess)
  }
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 mb-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>
      <div>
        <input
          type="text"
          value={guess}
          onChange={onChange}
        />
      </div>
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, index) => <WordRow key={index} letters={word}/>)}
      </main>
    </div>
  )
}

export default App