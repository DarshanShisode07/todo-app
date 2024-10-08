'use client'

import { useEffect, useRef, useState } from "react";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import TodoSearch from "@/components/TodoSearch";
import TodoNavbar from "@/components/TodoNavbar";
import TodoItem from "@/components/TodoItem";
import { tr } from "date-fns/locale";

export interface TodoItem {
    id: number;
    name: string;
    dateTime: string | null;
    createTime: string;
    checked:boolean;
    subItems: SubItem[];
}

interface SubItem {
    id: number;
    name: string;
}



function Home() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [todoName, setTodoName] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);
    // const [isChecked, setIsChecked] = useState(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<TodoItem[]>([]);
    // const [sortItems, setSortedItems] = useState<TodoItem[]>([]);
    const [draggedId, setDraggedId] = useState<number | null>(null);
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [sortAscending, setSortAscending] = useState<boolean>(false);
    const [sortDescending, setSortDescending] = useState<boolean>(false);

    //For stroring the data in LocalStorage
    useEffect(() => {
        const data = localStorage.getItem("todoItems");

        //To check if data is there or not
        if (data) {
            const parsedData = JSON.parse(data);
            if (Array.isArray(parsedData)) {
                setTodoItems(parsedData);
                setFilteredItems(parsedData);
            }
        }
    }, []);

    
    useEffect(() => {
        if (searchValue === '') {
        setFilteredItems(todoItems); // Reset to original items if search is empty
        } else {
            const loweCaseValue = searchValue.toLowerCase();
            const filtered = todoItems.filter(item =>
                item.name.toLowerCase().includes(loweCaseValue)
        );
        setFilteredItems(filtered); // Update search results based on input
        }
    }, [searchValue, todoItems]);

    useEffect(() =>{    
        if(sortAscending){
            const sortAscending = [...todoItems].sort((a,b) =>{ 
                return new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
            });

        setTodoItems(sortAscending);
        setSortAscending(true);
        }
    },[todoItems, sortAscending]);
    
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
                        dateTime: null,                                  // datetime is set as null as initially no need to set date time
                        createTime:new Date().toLocaleString(),
    //Need to check if by default checked is false or it is setted to false once click Enter key                    
                        checked:false,
                        subItems:[]
                    };
                    const updatedTodoItems = [...todoItems, newTodoItems]; 
                    setTodoItems(updatedTodoItems);                     //For updating todoItems in UI as well
                    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
                    setFilteredItems(updatedTodoItems);
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
        setFilteredItems(newAddedTodoItems);
    };

    //Function to handle Edit button using item as param
    const handleEditButton = (id:number, name:string) => {
        setEditId(id);                                                         //For track purpose of item id
        setTodoName(name);                                                     //to set the name of item
    };

    //Function to handle edit an item
    const handleEditItem = (newName: string) => {                                   //Receiving new edited name as param
        const updatedTodoItems = todoItems.map(item =>                              //map function for getting the item which needs to edit using id
            item.id === editId ? { ...item, name: newName } : item
        );
        setTodoItems(updatedTodoItems);                                             //For storing the todoItems with newly edited item name
        localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
        setFilteredItems(updatedTodoItems);
        setEditId(null);                                                            //To set the editID as null for edited item
    };

    //Function to handle Date and Time for an item
    const handleDateTimeChange = (id: number, date: string | null) => {
        const updatedTodoItems = todoItems.map((item) => {                          //Map method for choosing the item for which we have to edit Date and Time 
            return item.id === id ? { ...item, dateTime: date } : item;             //finding item using map and storing the Date and Time in updatedTodoItems variable
        });
        setTodoItems(updatedTodoItems);                                             //Updating the todoItems list for updating on UI as well
        localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
        setFilteredItems(updatedTodoItems);
    };

    //Function to handle Checkbox for an item
    const handleCheckBox = (id:number) =>{
        const newTodoList = todoItems.map(item =>{
            if(item.id==id){
                return {...item, checked:!item.checked}
            }
            return item;
        }); 
        setTodoItems(newTodoList);
        localStorage.setItem("todoItems", JSON.stringify(newTodoList));
        setFilteredItems(newTodoList);
    };

     // Function to handle Search functinality
    const handleSearch = (value: string) => {
        setSearchValue(value); // Update search input
    };

    // Function to handle Drag and Drop Functionality
    // handleDragStart function is called when we start dragging item
    const handleDragStart = (id:number)=>{
        setDraggedId(id);
        // console.log(id)
    };

    // handleDragStop function is called when we drop the item over other item
    const handleDrop = (id:number)=>{
        //Checking 1.if the dragged item is drop anywhere 2.If the drag item drop at same place
        if(draggedId === null || draggedId == id) 
            return;

        const draggedTodoItems = [...todoItems]; //Providing todoItems using Spread Operator
        const draggedPosition = draggedTodoItems.findIndex(item => item.id === draggedId); //Finding position of dragged item
        const draggedOverPosition = draggedTodoItems.findIndex(item => item.id === id); //Finding position of item on which dragged item is drop

        //Logic for Drag element and other will be sort 
        // const [draggedItem] = draggedTodoItems.splice(draggedPosition, 1); // Remove the dragged item
        // draggedTodoItems.splice(draggedOverPosition, 0, draggedItem); // Insert it at the target index


        //Logic for Swapping the id of dragged item and dragged over item
        const draggedItem = draggedTodoItems[draggedPosition];
        draggedTodoItems[draggedPosition] = draggedTodoItems[draggedOverPosition];
        draggedTodoItems[draggedOverPosition] = draggedItem

        setTodoItems(draggedTodoItems);     //Updating the TodoItems
        localStorage.setItem("todoItems", JSON.stringify(draggedTodoItems));    //For storing permenant position
        setDraggedId(null); // Reset the dragged item
    }


    //handle Ascending Sort Function
    const handleSortAsc = ()=> {                                                
        const sortAscending = [...todoItems].sort((a,b) =>{                             //Using Sort Function
            return new Date(a.createTime).getTime() - new Date(b.createTime).getTime()  //Conversion of string into time
        });

        setTodoItems(sortAscending);    //Updating the TodoItems
    }

    //handle Descending Sort Function
    const handleSortDesc = ()=> {
        const sortDescending = [...todoItems].sort((a,b) =>{                            //Using Sort Function
            return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()  //Conversion of string into time
        });

        setTodoItems(sortDescending);       //Updating the TodoItems
    }


    //handle Add sub item function
    const handleAddSubItem = (id:number)=>{
        console.log("SubItem");
    }

    return (
        // Main Container
        <div className="relative flex flex-col h-screen bg-black">
            {/* Navbar Container */}
            <div className="fixed top-0 left-0 right-0  bg-black p-4 z-10">
                {/* TodoNavbar Component */}
                <TodoNavbar onSearch={handleSearch} onSortAscending={handleSortAsc} onSortDescending={handleSortDesc}></TodoNavbar>
            </div>

            {/* Todo items List Container */}
            <div className="flex-1 overflow-y-auto pt-16 pb-16 px-4" style={{ height: 'calc(100vh - 150px)' }}>
                {/* TodoList Component */}
                <TodoList todoItems={filteredItems} onChecked={handleCheckBox} onAdd={handleAddSubItem} onEdit={handleEditButton} onDelete={handleDeleteButton} onDateTimeChange={handleDateTimeChange} onDragStart={handleDragStart} onDrop={handleDrop} />
            </div>

            {/* Todo Items Input Container */}
            <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
                {/* TodoInput field Component */}
                <TodoInput todoName={todoName} setTodoName={setTodoName} onEnterKey={onEnterKey} />
            </div>
        </div>
    );
}

export default Home;
