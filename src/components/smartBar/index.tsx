import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineWaterDrop } from 'react-icons/md';
import ReactLoading from 'react-loading';
import { TaskInfo } from '@/stores/taskStore';

interface SmartBarProps {
  setTodoItems: Dispatch<SetStateAction<TaskInfo[]>>;
  setDoneItems: Dispatch<SetStateAction<TaskInfo[]>>;
  todoItems: TaskInfo[];
  doneItems: TaskInfo[];
}

export default function SmartBar({
  setDoneItems,
  setTodoItems,
  todoItems,
  doneItems,
}: SmartBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const askGpt = async (input: string) => {
    setIsLoading(true);
    const response = await fetch('/api/openai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: input,
        todo: todoItems,
        done: doneItems,
      }),
    });
    if (response.ok) {
      try {
        const result = await response.json();
        const data = JSON.parse(result.choices[0].message.content);
        if (data.todo && data.done) {
          setTodoItems(data.todo);
          setDoneItems(data.done);
        }
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (value === '') return;

    const wantedItemInTodo = todoItems.find((item) => item.task === value);
    const wantedItemInDone = doneItems.find((item) => item.task === value);

    if (wantedItemInTodo) {
      setDoneItems((prev) => [...prev, wantedItemInTodo]);
      setTodoItems((prev) => prev.filter((item) => item !== wantedItemInTodo));
    } else if (wantedItemInDone) {
      setTodoItems((prev) => [...prev, wantedItemInDone]);
      setDoneItems((prev) => prev.filter((item) => item !== wantedItemInDone));
    } else {
      askGpt(value);
    }
    setValue('');
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-dark-monster">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.target.value);
        }}
        placeholder="Type something..."
        className={`flex-1 p-2 text-base border rounded-lg border-gray-300 `}
        style={
          error
            ? { borderColor: 'red', borderWidth: '3px', borderStyle: 'solid' }
            : {}
        }
      />
      {isLoading ? (
        <div
          className="bg-acqua-deep-blue hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
          style={{ backgroundColor: '#1c64fd3a' }}
        >
          <ReactLoading type="bars" color="#ffffff" height={20} width={20} />
        </div>
      ) : (
        <button
          onClick={handleSend}
          className="hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
          title="Send"
          style={{ backgroundColor: '#1c64fd3a' }}
        >
          <MdOutlineWaterDrop className="text-xl" />
        </button>
      )}
    </div>
  );
}
