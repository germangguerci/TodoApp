import React, {useState, useEffect} from 'react';

interface SelectProps {
    setTodosPerPage: Function
}

export const SelectTodosPerPage : React.FC <SelectProps> = ({setTodosPerPage}) => {
    const [value, setValue] = useState(15);
    
    useEffect(() => {
        setTodosPerPage(value)    
    }, [value, setTodosPerPage]);

    return (
        <select value={value} onChange={(event) => setValue(parseInt(event.target.value))}>
            <option defaultValue="" value="15" disabled>Rows per page</option>	
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="25">25 rows</option>
        </select>
    )
}