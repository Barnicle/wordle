import React, { useEffect, useRef, useState } from "react";
import WordRow from "./components/WordRow"
import { useStore } from "./store/store"
import { GUESS_LENGTH, isValidWord, LETTER_LENGTH } from "./word-utils";

const App = () => {
  const state = useStore();
  const [guess, setGuess] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const addGuess = useStore(s => s.addGuess);
  const previousGuess = usePrevious(guess);
  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2000)
    }
    return () => clearTimeout(id)
  }, [showInvalidGuess])
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false)
      } else {
        setInvalidGuess(true)
        setGuess(previousGuess);
      }
    }

  }, [guess])

  let rows = [...state.rows];
  let currentRow = 0;
  if (rows.length < GUESS_LENGTH) currentRow = rows.push({ guess }) - 1;

  const guessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(''))

  const isGameOver = state.gameState !== 'playing';
  const startNewGame = () => {
    setGuess('')
  }
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 mb-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, index) =>
          <WordRow
            key={index}
            className={showInvalidGuess && currentRow === index ? 'animation-bounce' : ''}
            result={result}
            letters={guess} />)}
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
function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [guess, setGuess] = useState('');

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== LETTER_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === LETTER_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === LETTER_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  })

  return [guess, setGuess];
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
export default App