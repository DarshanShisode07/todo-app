import React from 'react'

interface TodoSearchProps {
  onSearch: (value: string) => void; 
}

const TodoSearch: React.FC<TodoSearchProps> = ({onSearch}) => {
  return (
    // <nav className="flex items-center justify-between">
    //   <form className="flex items-center">
    //     <input
    //       className="form-control mr-2 pl-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
    //       type="search"
    //       placeholder="Search"
    //       aria-label="Search"
    //       onChange={(event)=> onSearch(event.target.value)} 
    //     />
    //   </form>
    // </nav>
    <nav className="flex items-center justify-between">
      <div className="flex items-center w-full">
        <input
          className="mr-2 pl-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(event)=> onSearch(event.target.value)} // Use the handler
        />
      </div>
    </nav>
  )
}

export default TodoSearch

// <button
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
//           type="submit"
//         >
//           Search
//         </button>













 // <div>
    //     <input 
    //         type='text'
    //         className="h-10 text-l w-2/5 border border-gray-600 rounded-lg p-4 mx-auto block bg-gray-200 outline-none font-normal z-50"
    //         placeholder="Search Here"

    //     ></input>
    // </div>
    // <div className="relative w-2/5 mx-auto">
    //     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    //         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    //             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    //         </svg>
    //     </div>
    //     <input type="search" id="default-search" className="block h-3 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Here..." />
    //     <button type="submit" className="text-white absolute text-0.75  end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ lineHeight: '0.7rem', bottom: '0.2rem' }}>Search</button>
    // </div>