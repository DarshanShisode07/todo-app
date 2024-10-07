import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';

interface SortingButtonsProps {
    onSortAscending: ()=> void;
    onSortDescending: ()=> void;
}

const SortingButtons: FC<SortingButtonsProps> = ({onSortAscending, onSortDescending}) => {
  return (
    // Sorting Buttons Container
    <div className='flex flex-col '>
        {/* Ascending Sorting Button */}
        <button onClick={()=>onSortAscending()}><FontAwesomeIcon icon={faSortAsc} className="text-1xl text-white hover:text-red-500" /></button>
        
         {/* Descending Sorting Button */}
        <button onClick={()=>onSortDescending()}><FontAwesomeIcon icon={faSortDesc} className="text-1xl text-white hover:text-red-500" /></button>
    </div>
  )
}

export default SortingButtons




