import create from "zustand"
import { persist } from "zustand/middleware"
import { getRandomWord } from "../word-utils"
interface StoreState {
  answer: string;
  guesses: string[]
  addGuess: (guess: string) => void
}
export const useStore = create<StoreState>(
  persist(
    (set) => ({
      answer: getRandomWord(),
      guesses: ['hello', 'solar', 'penny'],
      addGuess: (guess: string) => {
        set(state => ({
          guesses: [...state.guesses, guess]
        }))
      }
    }),
    {
      name: "food-storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  ))

  // useStore.persist.clearStorage()