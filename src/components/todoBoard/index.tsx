'use client';

import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useState, useEffect } from 'react';
import SmartBar from '@/components/smartBar';
import useTaskStore from '@/stores/taskStore';
import ReactLoading from 'react-loading';
import { TaskTab } from '@/stores/taskStore';

export default function TodoBoard() {
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);
  const { initStore, todoStore, doneStore, setTodoStore, setDoneStore } =
    useTaskStore();
  const [todoList, todoItems, setTodoItems] = useDragAndDrop<
    HTMLUListElement,
    TaskTab
  >(todoStore, {
    group: 'todoList',
  });
  const [doneList, doneItems, setDoneItems] = useDragAndDrop<
    HTMLUListElement,
    TaskTab
  >(doneStore, {
    group: 'todoList',
  });

  useEffect(() => {
    initStore();
    setIsStoreInitialized(true);
  }, []);

  useEffect(() => {
    if (!isStoreInitialized) return;
    setTodoItems(todoStore);
    setDoneItems(doneStore);
  }, [isStoreInitialized]);

  useEffect(() => {
    if (!isStoreInitialized) return;
    setTodoStore(todoItems);
    setDoneStore(doneItems);
  }, [doneItems, todoItems]);

  if (!isStoreInitialized)
    return (
      <div className="flex justify-center items-center min-h-screen bg-acqua-soft-white">
        <ReactLoading
          type="spinningBubbles"
          color="#001D66"
          height={50}
          width={50}
        />
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-acqua-soft-white">
      <h1 className="text-3xl font-bold text-acqua-deep-blue my-6">
        Acqua Board
      </h1>
      <SmartBar
        todoItems={todoItems}
        doneItems={doneItems}
        setTodoItems={setTodoItems}
        setDoneItems={setDoneItems}
      />
      <div className="flex justify-center items-start gap-8 p-5">
        <ul
          ref={todoList}
          className="bg-acqua-yellow rounded-lg p-4 shadow-md w-80 h-96 overflow-y-auto"
        >
          {todoItems.map((todo) => (
            <li className="p-2 bg-white rounded-lg shadow mb-2" key={todo.task}>
              {todo.task}
            </li>
          ))}
        </ul>
        <ul
          ref={doneList}
          className="bg-acqua-darker-blue rounded-lg p-4 shadow-md w-80 text-white h-96 overflow-y-auto"
        >
          {doneItems.map((done) => (
            <li
              className="p-2 rounded-lg line-through decoration-acqua-retro-yellow decoration-2 shadow mb-2"
              key={done.task}
            >
              {done.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
