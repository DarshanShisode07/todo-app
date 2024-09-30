import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { FC } from 'react';

interface DateTimePickerProps {
    dateTime: string | null;
    onChange: (date: string | null) => void;
}

const DateTimePicker: FC<DateTimePickerProps> = ({ dateTime, onChange }) => (
    <div >
        <Datetime               //react component
            value={dateTime ? new Date(dateTime) : undefined}           // to check if date and time is there or not. If yes create date object else store undefined
            onChange={(date) => {
                let isoString = null;
                if (date instanceof Date) {                             // to check date type respect to Date
                    isoString = date.toISOString();                     // conversion into ISO String 
                } else if (moment.isMoment(date) && date.isValid()) {   // to check date type respect to moment .isMoment
                    isoString = date.toISOString();                     // conversion into ISO String 
                }
                onChange(isoString);                                    // passing ISO string to onChange prop function
            }}
            inputProps={{
                placeholder: 'MM/DD/YYYY 00:00',    
                readOnly: true,                                         //for not able to edit using keyboard in DateTime input
                className: 'overflow-visible w-full bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center z-10' // Added z-10
            }}
        />
    </div>
);

export default DateTimePicker;

