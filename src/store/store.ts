import create from "zustand"
import { persist } from "zustand/middleware"
import { computeGuess, getRandomWord, GUESS_LENGTH, LetterState } from "../word-utils"
interface GuessRow {
  guess: string;
  result?: LetterState[];
}
interface StoreState {
  answer: string;
  rows: GuessRow[];
  keyboardLetterState: { [letter: string]: LetterState }
  addGuess: (guess: string) => void;
  gameState: 'playing' | 'won' | 'lose';
  newGame: (initialGuess?: string[]) => void;

}
export const useStore = create<StoreState>(
  persist(
    (set, get) => {
      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answer)
        const rows = [...get().rows, {
          guess,
          result: computeGuess(guess, get().answer)
        }];

        const keyboardLetterState = get().keyboardLetterState;
        result.forEach((letter, index) => {
          const resultGuessLetter = guess[index];
          const currentLetterState = keyboardLetterState[resultGuessLetter];
          switch (currentLetterState) {
            case LetterState.Match: break;
            case LetterState.Present:
              if (letter === LetterState.Miss) break;
            default:
              keyboardLetterState[resultGuessLetter] = letter;
              break;
          }
        })

        const computeGameState = result.every(i => i === LetterState.Match) ? 'won' : rows.length === GUESS_LENGTH ? "lose" : 'playing';

        set(() => ({
          rows,
          keyboardLetterState,
          gameState: computeGameState
        }))
      }

      return {
        answer: getRandomWord(),
        rows: [],
        gameState: 'playing',
        addGuess,
        keyboardLetterState: {},
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            gameState: 'playing',
            keyboardLetterState: {},
            rows: []
          });

          initialRows.forEach(addGuess);
        }
      }
    },
    {
      name: "storage",
      getStorage: () => sessionStorage
    }
  )
)