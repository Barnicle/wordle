import React, { useEffect, useRef, useState } from "react";
import GameOverModal from "./components/GameOverModal";
import Keyboard from "./components/Keybord";
import WordRow from "./components/WordRow"
import useStore from "./store"
import { GUESS_LENGTH, isValidWord, WORD_LENGTH } from "./word-utils";

const App = () => {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const addGuess = useStore(s => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    let id: NodeJS.Timer;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2000)
    }
    return () => clearTimeout(id)
  }, [showInvalidGuess])

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
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
    state.newGame();
    setGuess('');
  }
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 mb-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>
      <main className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, index) =>
          <WordRow
            key={index}
            className={showInvalidGuess && currentRow === index ? 'animation-bounce' : ''}
            result={result}
            letters={guess} />)}
      </main>
      <Keyboard onClick={(letter) => addGuessLetter(letter)}/>
      {isGameOver && <GameOverModal onClick={startNewGame} />}
    </div>
  )
}
function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>, (letter: string) => void] {
  const [guess, setGuess] = useState('');

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === WORD_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess.toUpperCase();
      }

      return newGuess.toUpperCase();
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

  return [guess, setGuess, addGuessLetter];
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
export default App