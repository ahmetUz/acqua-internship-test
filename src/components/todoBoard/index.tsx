'use client';

import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useState, useEffect } from 'react';
import SmartBar from '@/components/smartBar';
import useTaskStore from '@/stores/taskStore';

export default function TodoBoard() {
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);
  const { initStore, todo, done, setTodoStore, setDoneStore } = useTaskStore();

  useEffect(() => {
    initStore();
    setIsStoreInitialized(true);
  }, [initStore]);

  const [todoList, todoItems, setTodoItems] = useDragAndDrop<
    HTMLUListElement,
    string
  >(todo, {
    group: 'todoList',
  });

  const [doneList, doneItems, setDoneItems] = useDragAndDrop<
    HTMLUListElement,
    string
  >(done, {
    group: 'todoList',
  });

  useEffect(() => {
    if (!isStoreInitialized) return;
    setTodoItems(todo);
    setDoneItems(done);
  }, [todo, done, isStoreInitialized, setTodoItems, setDoneItems]);

  useEffect(() => {
    if (!isStoreInitialized) return;
    setTodoStore(todoItems);
  }, [isStoreInitialized, setTodoStore, todoItems]);

  useEffect(() => {
    if (!isStoreInitialized) return;
    setDoneStore(doneItems);
  }, [doneItems, isStoreInitialized, setDoneStore]);

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
          className="bg-acqua-yellow rounded-lg p-4 shadow-md w-80 h-96"
        >
          {todoItems.map((todo) => (
            <li className="p-2 bg-white rounded-lg shadow mb-2" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
        <ul
          ref={doneList}
          className="bg-acqua-darker-blue rounded-lg p-4 shadow-md w-80 text-white h-96"
        >
          {doneItems.map((done) => (
            <li
              className="p-2 rounded-lg line-through decoration-acqua-retro-yellow decoration-2 shadow mb-2"
              key={done}
            >
              {done}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
