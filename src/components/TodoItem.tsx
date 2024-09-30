import { FC } from 'react';
import DateTimePicker from './DateTimePicker';

interface TodoItemProps {
    item: { id: number; name: string; dateTime: string | null; };
    onEdit: (item: { id: number; name: string; dateTime: string | null; }) => void;
    onDelete: (id: number) => void;
    onDateTimeChange: (id: number, date: string | null) => void;
}

const TodoItem: FC<TodoItemProps> = ({ item, onEdit, onDelete, onDateTimeChange }) => (
    //Main container for Item
    <div className= {`flex items-center justify-between border-b p-4 border-2 border-red-500 rounded-lg shadow-lg shadow-red-400/20 mb-3
                    ${item.dateTime && new Date(item.dateTime).getTime() < new Date().getTime() ? 'bg-orange-300' : 'bg-white'}`        //To check when set time is less than current time then it should set background color yello otherwise white
                    }>

        {/* Item name */}
        <div className="flex-none w-3/10 p-4 font-semibold">{item.name}</div>

        {/* Container for DateTimePicker, Edit button and Delete button */}
        <div className="flex items-center space-x-2">

            {/* DateTimePicker Component */}
            <DateTimePicker dateTime={item.dateTime} onChange={(date) => onDateTimeChange(item.id, date)} />
            
            {/* Edit Button */}
            <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2" onClick={() => onEdit(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.862 4.487a2.5 2.5 0 00-3.536 0L4 13.414V20h6.586l9.326-9.326a2.5 2.5 0 000-3.536l-3.448-3.447z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 3.125l2.5 2.5" />
                </svg>
            </button>

            {/* Delete Button */}
            <button type="button" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2" onClick={() => onDelete(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
);

export default TodoItem;


