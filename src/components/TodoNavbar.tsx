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
    <div className='flex'>
      <TodoSearch onSearch={onSearch}></TodoSearch>
      <SortingButtons onSortAscending={onSortAscending} onSortDescending={onSortDescending}></SortingButtons>
    </div>
  )
}

export default TodoNavbar
