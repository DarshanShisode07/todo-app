'use client'

import { useEffect, useState } from "react";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export interface TodoItem {
    id: number;
    name: string;
    dateTime: string | null;
}

function Home() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [todoName, setTodoName] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);

    //For stroring the data in LocalStorage
    useEffect(() => {
        const data = localStorage.getItem("todoItems");

        //To check if data is there or not
        if (data) {
            const parsedData = JSON.parse(data);
            if (Array.isArray(parsedData)) {
                setTodoItems(parsedData);
            }
        }
    }, []);

    //function to add item using Enterkey
    const onEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newTodoItem = event.currentTarget.value.trim();  //storing the value fetched from inputfield

            //To check if user entered input or not
            if (newTodoItem) {
                if (editId !== null) {  //For edit check
                    handleEditItem(newTodoItem);
                } else {                // For Adding item
                    const newTodoItems: TodoItem = {
                        id: Math.floor(10000 + Math.random() * 90000),  //providing unique id to each item and id will be of 5 digits
                        name: newTodoItem,                              //assigning value to name using newTodoItem(which is user enterd item name)
                        dateTime: null                                  // datetime is set as null as initially no need to set date time
                    };
                    const updatedTodoItems = [...todoItems, newTodoItems]; 
                    setTodoItems(updatedTodoItems);                     //For updating todoItems in UI as well
                    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
                }
                setTodoName('');                                        //For cleaing the input field after entering the item name inside input field
                event.currentTarget.value = '';                         //to get the value from the event which is currently trarget 
            }
        }
    };

    //Function to handle Delete button using id as param
    const handleDeleteButton =(id: number) => {
        const newAddedTodoItems = todoItems.filter((item) => item.id !== id);       // Filter method to remove the item with id rev=ceived from param
        setTodoItems(newAddedTodoItems);                                            //For updating todoItems in UI as well //As previously item is deleted

        localStorage.setItem("todoItems", JSON.stringify(newAddedTodoItems));
    };

    //Function to handle Edit button using item as param
    const handleEditButton = (item: TodoItem) => {
        setEditId(item.id);                                                         //For track purpose of item id
        setTodoName(item.name);                                                     //to set the name of item
    };

    //Function to handle edit an item
    const handleEditItem = (newName: string) => {                                   //Receiving new edited name as param
        const updatedTodoItems = todoItems.map(item =>                              //map function for getting the item which needs to edit using id
            item.id === editId ? { ...item, name: newName } : item
        );
        setTodoItems(updatedTodoItems);                                             //For storing the todoItems with newly edited item name
        localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
        setEditId(null);                                                            //To set the editID as null for edited item
    };

    //Function to handle Date and Time for an item
    const handleDateTimeChange = (id: number, date: string | null) => {
        const updatedTodoItems = todoItems.map((item) => {                          //Map method for choosing the item for which we have to edit Date and Time 
            return item.id === id ? { ...item, dateTime: date } : item;             //finding item using map and storing the Date and Time in updatedTodoItems variable
        });
        setTodoItems(updatedTodoItems);                                             //Updating the todoItems list for updating on UI as well
        localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
    };

    return (
        <div className="relative flex flex-col h-screen bg-gray-100">
            <div className="flex-grow mb-20 overflow-auto">
                {/* TodoList Component */}
                <TodoList todoItems={todoItems} onEdit={handleEditButton} onDelete={handleDeleteButton} onDateTimeChange={handleDateTimeChange} />
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white p-4 max-h-[88px] z-50">
                {/* TodoInput field Component */}
                <TodoInput todoName={todoName} setTodoName={setTodoName} onEnterKey={onEnterKey} />
            </div>
        </div>
    );
}

export default Home;
