import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaskInfo {
  taskGroup: number;
  task: string;
  priority: number;
}

export interface TaskStore {
  todoStore: TaskInfo[];
  doneStore: TaskInfo[];
  setTodoStore: (items: TaskInfo[]) => void;
  setDoneStore: (items: TaskInfo[]) => void;
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
                priority: 0,
              },
              {
                taskGroup: 2,
                task: 'Compile Coral DB',
                priority: 0,
              },
              {
                taskGroup: 3,
                task: 'AI Sub Navigation',
                priority: 0,
              },
              {
                taskGroup: 4,
                task: 'Server Water Coolings',
                priority: 0,
              },
              {
                taskGroup: 5,
                task: 'Whale Song AI',
                priority: 0,
              },
              {
                taskGroup: 6,
                task: 'Marine Chatbot',
                priority: 0,
              },
            ],
            doneStore: [
              {
                taskGroup: 7,
                task: 'Dolphin Comm Sim',
                priority: 0,
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
