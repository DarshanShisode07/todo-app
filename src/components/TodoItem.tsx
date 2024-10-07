import { FC, useRef, useState } from 'react';
import DateTimePicker from './DateTimePicker';



interface TodoItemProps {
    item: { id: number; name: string; dateTime: string | null; createTime:string; checked:boolean; subItems: SubItem[];};
    onChecked: (id:number) => void;
    onAdd: (id:number, name: string) => void;
    onEdit: ( id: number, name: string) => void;
    onDelete: (id: number) => void;
    onDateTimeChange: (id: number, date: string | null) => void;
    onDragStart: (id:number) => void;
    onDrop: (id:number) => void;
}

interface SubItem {
    id: number;
    name: string;
}

const TodoItem: FC<TodoItemProps> = ({ item, onChecked, onAdd, onEdit, onDelete, onDateTimeChange, onDragStart, onDrop}) => (

    //Main container for Item
    <div className= {`flex items-center justify-between border-b p-2 border-2 border-red-500 rounded-lg shadow-lg shadow-red-400/20 mb-3 
                    ${item.dateTime && new Date(item.dateTime).getTime() < new Date().getTime() ? 'bg-orange-300' : 'bg-purple-300'}`}        //To check when set time is less than current time then it should set background color yello otherwise white
                    draggable
                    onDragStart={() => onDragStart(item.id)}
                    onDragOver={(e)=> e.preventDefault()} 
                    onDrop={() => onDrop(item.id)}
                    >

        {/* Item name */}
        <div className='flex'>
            <input type="checkbox"  onChange={()=> onChecked(item.id)}/>
            <div className='justify-start'>
                <div className={`${item.checked? 'line-through': 'no-underline'}  flex-none w-3/10 pb-0 p-4 font-semibold `}>{item.name}</div>
                <div className="flex-none w-3/10  pl-4 font-normal text-gray-500 italic">{item.createTime}</div>
                {/* {isInputVisible && (<input type='text' className='hidden'></input>)} */}
            </div>
        </div>

        {/* Container for DateTimePicker, Edit button and Delete button */}
        <div className="flex items-center space-x-2">

            {/* DateTimePicker Component */}
            <DateTimePicker dateTime={item.dateTime} onChange={(date) => onDateTimeChange(item.id, date)} />
            
             {/* Add SubItem Button */}
            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-2" onClick={() => onAdd(item.id, item.name)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Edit Button */}
            <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2" onClick={() => onEdit(item.id, item.name)}>
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