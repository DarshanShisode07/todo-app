import React, { FC } from 'react'
import TodoSearch from './TodoSearch'
import SortingButtons from './SortingButtons'; 

interface TodoNavbarProps{
    onSearch: (value:string)=>void;
    onSortAscending: ()=> void;
    onSortDescending: ()=> void;
}

const TodoNavbar: FC<TodoNavbarProps>  = ({onSearch, onSortAscending, onSortDescending}) => {
  return (
    //Navbar Container
    <div className='flex'>
        {/* Search Component */}
      <TodoSearch onSearch={onSearch}></TodoSearch> 

      {/* Sorting buttons Components                         */}
      <SortingButtons onSortAscending={onSortAscending} onSortDescending={onSortDescending}></SortingButtons>
    </div>
  )
}

export default TodoNavbar
