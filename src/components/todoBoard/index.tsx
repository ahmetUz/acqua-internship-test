'use client';

import './style.css';
import ReactLoading from 'react-loading';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useState, useEffect } from 'react';
import SmartBar from '@/components/smartBar';
import { TaskInfo } from '@/stores/taskStore';
import useTaskStore from '@/stores/taskStore';
import Task from '@/components/task';

export default function TodoBoard() {
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);
  const { initStore, todoStore, doneStore, setTodoStore, setDoneStore } =
    useTaskStore();
  const [todoList, todoItems, setTodoItems] = useDragAndDrop<
    HTMLUListElement,
    TaskInfo
  >(todoStore, {
    group: 'todoList',
  });
  const [doneList, doneItems, setDoneItems] = useDragAndDrop<
    HTMLUListElement,
    TaskInfo
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
      <div className="flex justify-center items-center min-h-screen bg-dark-monster">
        <ReactLoading
          type="spinningBubbles"
          color="#ffffff"
          height={50}
          width={50}
        />
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-dark-monster">
      <h1 className="title"> Acqua Board </h1>
      <SmartBar
        todoItems={todoItems}
        doneItems={doneItems}
        setTodoItems={setTodoItems}
        setDoneItems={setDoneItems}
      />
      <div className="flex justify-center items-start gap-8 p-5">
        <ul ref={todoList} className="todo-board">
          {todoItems.map((todo) => (
            <Task key={todo.task} task={todo} isDone={false} />
          ))}
        </ul>
        <ul ref={doneList} className="done-board">
          {doneItems.map((done, index) => (
            <Task key={index} task={done} isDone={true} />
          ))}
        </ul>
      </div>
    </div>
  );
}
