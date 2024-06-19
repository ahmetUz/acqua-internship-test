import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskStore {
  todoStore: string[];
  doneStore: string[];
  setTodoStore: (items: string[]) => void;
  setDoneStore: (items: string[]) => void;
  initStore: () => void;
}

const useTaskStore = create(
  persist<TaskStore>(
    (set, get) => ({
      todoStore: [],
      doneStore: [],
      setTodoStore: (items) => set({ todoStore: items }),
      setDoneStore: (items) => set({ doneStore: items }),
      initStore: () => {
        const { todoStore, doneStore } = get();
        if (todoStore.length === 0 && doneStore.length === 0) {
          set({
            todoStore: [
              'AI Fish or Phish',
              'Compile Coral DB',
              'AI Sub Navigation',
              'Server Water Cooling',
              'Whale Song AI',
              'Marine Chatbot',
            ],
            doneStore: ['Dolphin Comm Sim'],
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
