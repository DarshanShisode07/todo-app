import { FC } from 'react';

interface TodoInputProps {
    todoName: string;
    setTodoName: (name: string) => void;
    onEnterKey: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TodoInput: FC<TodoInputProps> = ({ todoName, setTodoName, onEnterKey }) => (
    //Inputfield to add item
    <input                                                                        
        type="text" 
        className="h-14 text-xl w-3/5 border border-gray-300 rounded-full p-4 mx-auto block bg-gray-100 outline-none font-semibold z-50 focus:outline-none hover:border-red-500"
        placeholder="Add a new task..."
        value={todoName}
        onChange={(e) => setTodoName(e.currentTarget.value)}
        onKeyDown={onEnterKey}
    />
);

export default TodoInput;
