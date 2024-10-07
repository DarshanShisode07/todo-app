import React from 'react'

interface TodoSearchProps {
  onSearch: (value: string) => void; 
}

const TodoSearch: React.FC<TodoSearchProps> = ({onSearch}) => {
  return (

    // Search Container
    <nav className="flex items-center justify-between">
      <div className="flex items-center w-full">
        <input
          className="mr-2 pl-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(event)=> onSearch(event.target.value)} // For getting the value from search
        />
      </div>
    </nav>
  )
}

export default TodoSearch
