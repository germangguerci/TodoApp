import React, {useState, useEffect} from 'react';

interface SelectProps {
    setTodosPerPage: Function
    setCurrentPage: Function
}

export const SelectTodosPerPage : React.FC <SelectProps> = ({setTodosPerPage, setCurrentPage}) => {
    const [value, setValue] = useState(15);
    
    useEffect(() => {
        setTodosPerPage(value)    
        setCurrentPage(1)
    }, [value, setTodosPerPage, setCurrentPage]);

    return (
        <select className={"selectTodosPP"} value={value} onChange={(event) => setValue(parseInt(event.target.value))}>
            <option defaultValue="" value="15" disabled>Rows per page</option>	
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="25">25 rows</option>
        </select>
    )
}