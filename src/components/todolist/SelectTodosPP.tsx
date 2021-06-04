import React, {useState, useEffect} from 'react';

interface SelectProps {
    setTodosPerPage: Function
}

export const SelectTodosPerPage : React.FC <SelectProps> = ({setTodosPerPage}) => {
    const [value, setValue] = useState(5);
    
    useEffect(() => {
        setTodosPerPage(value)    
    }, [value, setTodosPerPage]);

    return (
        <select value={value} onChange={(event) => setValue(parseInt(event.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
        </select>
    )
}