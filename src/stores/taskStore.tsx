import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaskTab {
  taskGroup: number;
  task: string;
  priority: number;
  taskSteps: number;
}

export interface TaskStore {
  todoStore: TaskTab[];
  doneStore: TaskTab[];
  setTodoStore: (items: TaskTab[]) => void;
  setDoneStore: (items: TaskTab[]) => void;
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
              {
                taskGroup: 1,
                task: 'AI Fish or Phish',
                priority: 20,
                taskSteps: 3,
              },
              {
                taskGroup: 2,
                task: 'Compile Coral DB',
                priority: 10,
                taskSteps: 3,
              },
              {
                taskGroup: 3,
                task: 'AI Sub Navigation',
                priority: 15,
                taskSteps: 3,
              },
              {
                taskGroup: 4,
                task: 'Server Water Cooling',
                priority: 5,
                taskSteps: 3,
              },
              {
                taskGroup: 5,
                task: 'Whale Song AI',
                priority: 25,
                taskSteps: 3,
              },
              {
                taskGroup: 6,
                task: 'Marine Chatbot',
                priority: 30,
                taskSteps: 3,
              },
            ],
            doneStore: [
              {
                taskGroup: 7,
                task: 'Dolphin Comm Sim',
                priority: 0,
                taskSteps: 0,
              },
            ],
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
