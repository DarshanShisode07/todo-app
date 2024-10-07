// import { FC } from 'react';
// import TodoItem from './TodoItem';

// interface TodoListProps {
//     todoItems: { id: number; name: string; dateTime: string | null; }[];
//     // onEdit: (item: { id: number; name: string; dateTime: string | null; }) => void;
//     onEdit: (item: { id: number; name: string; dateTime: string | null; }) => void;

//     onDelete: (id: number) => void;
//     onDateTimeChange: (id: number, date: string | null) => void;
// }

// const TodoList: FC<TodoListProps> = ({ todoItems, onEdit, onDelete, onDateTimeChange }) => (
//     //TodoList container
//     <div className="flex-1 p-4">
//         {todoItems.map((item) => (              //Map function for adding TodoItem in list
//             //  TodoItem component
//             <TodoItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} onDateTimeChange={onDateTimeChange} />
//         ))}
//     </div>
// );

// export default TodoList;

import { FC } from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
    todoItems: { id: number; name: string; dateTime: string | null; createTime:string; checked:boolean; subItems: SubItem[];}[];
    onChecked: (id:number) => void;
    onEdit: ( id: number, name: string ) => void;
    onDelete: (id: number) => void;
    onDateTimeChange: (id: number, date: string | null) => void;
    onDragStart: (id:number) => void;
    onDrop: (id:number) => void;
    onAdd: (id: number, name: string) => void;
}

interface SubItem {
    id: number;
    name: string;
}


const TodoList: FC<TodoListProps> = ({ todoItems, onChecked, onAdd, onEdit, onDelete, onDateTimeChange, onDragStart, onDrop }) => (
    //TodoList container
    <div className="flex-1 p-4 pl-0">
        {todoItems.map((item) => (              //Map function for adding TodoItem in list
            //  TodoItem component
            <TodoItem key={item.id} item={item} onChecked={onChecked} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} onDateTimeChange={onDateTimeChange} onDragStart={onDragStart} onDrop={onDrop}/>
        ))}
    </div>
);

export default TodoList;
