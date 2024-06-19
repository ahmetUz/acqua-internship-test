import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineWaterDrop } from 'react-icons/md';
import ReactLoading from 'react-loading';

interface SmartBarProps {
  setTodoItems: Dispatch<SetStateAction<string[]>>;
  setDoneItems: Dispatch<SetStateAction<string[]>>;
  todoItems: string[];
  doneItems: string[];
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
        console.log(result.choices[0].message.content);
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

    const wantedItemInTodo = todoItems.find((item) => item === value);
    const wantedItemInDone = doneItems.find((item) => item === value);

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
    <div className="flex items-center gap-4 p-4 bg-acqua-soft-white">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.target.value);
        }}
        placeholder="Type something..."
        className={`flex-1 p-2 text-base border rounded-lg border-gray-300 ${
          error ? 'border-red-500' : ''
        }`}
      />
      {isLoading ? (
        <div className="bg-acqua-deep-blue hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out">
          <ReactLoading type="bars" color="#ffffff" height={20} width={20} />
        </div>
      ) : (
        <button
          onClick={handleSend}
          className="bg-acqua-deep-blue hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
          title="Send"
        >
          <MdOutlineWaterDrop className="text-xl" />
        </button>
      )}
    </div>
  );
}
