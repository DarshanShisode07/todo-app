import { FC } from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
    todoItems: { id: number; name: string; dateTime: string | null; }[];
    onEdit: (item: { id: number; name: string; dateTime: string | null; }) => void;
    onDelete: (id: number) => void;
    onDateTimeChange: (id: number, date: string | null) => void;
}

const TodoList: FC<TodoListProps> = ({ todoItems, onEdit, onDelete, onDateTimeChange }) => (
    //TodoList container
    <div className="flex-1 p-4">
        {todoItems.map((item) => (              //Map function for adding TodoItem in list
            //  TodoItem component
            <TodoItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} onDateTimeChange={onDateTimeChange} />
        ))}
    </div>
);

export default TodoList;
