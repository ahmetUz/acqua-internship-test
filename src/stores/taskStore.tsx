import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskStore {
  todo: string[];
  done: string[];
  setTodoStore: (items: string[]) => void;
  setDoneStore: (items: string[]) => void;
  initStore: () => void;
}

const useTaskStore = create(
  persist<TaskStore>(
    (set, get) => ({
      todo: [],
      done: [],
      setTodoStore: (items) => set({ todo: items }),
      setDoneStore: (items) => set({ done: items }),
      initStore: () => {
        const { todo, done } = get();
        if (todo.length === 0 && done.length === 0) {
          set({
            todo: [
              'AI Fish or Phish',
              'Compile Coral DB',
              'AI Sub Navigation',
              'Server Water Cooling',
              'Whale Song AI',
              'Marine Chatbot',
            ],
            done: ['Dolphin Comm Sim'],
          });
        }
      },
    }),
    {
      name: 'task-store',
    },
  ),
);

export default useTaskStore;
