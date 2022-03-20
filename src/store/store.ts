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

        const computeGameState = result.every(i => i === LetterState.Match) ? 'won' : rows.length === GUESS_LENGTH ? "lose" : 'playing'
        set(() => ({
          rows,
          gameState: computeGameState
        }))
      }

      return {
        answer: getRandomWord(),
        rows: [],
        gameState: 'playing',
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            gameState: 'playing',
            rows: []
          });

          initialRows.forEach(addGuess);
        }
      }
    },
    {
      name: "storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
)

  // useStore.persist.clearStorage()