import React, {useState, useEffect} from 'react';
import { DeleteAlert } from './alerts/DeleteAlert'

interface TodoProps {
    id: number
    title: String
    difficulty: Number
    completed: Boolean
    setOpenUpdate: Function
    bulkSelection: Array<number>
    setBulkSelection: Function
}

export const Todo: React.FC<TodoProps> = ({id, title, difficulty, completed, setOpenUpdate, bulkSelection, setBulkSelection}) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        bulkSelection.indexOf(id) === -1 && setSelected(false);
        bulkSelection.indexOf(id) !== -1 && setSelected(true);
    }, [bulkSelection, id])    
  
    const calculateDifficulty = ():string => {
        if(difficulty >= 5){
            return "Hard"
        }else if(difficulty >= 3){
            return "Medium"
        }
        return "Easy"
    }

    const handleSelect = () => {
        let newBulkValues = bulkSelection;
        if(bulkSelection.indexOf(id) !== -1){
            newBulkValues = bulkSelection.filter(item => item !== id)
        }else{
            newBulkValues = [...bulkSelection, id]
        }
        
        setBulkSelection(newBulkValues);
    }

    return (
    <tr>
        <td>
            <input type="checkbox" checked={selected} onChange={handleSelect}/>
        </td>
        <td>
            {title}
        </td>
        <td>
            {calculateDifficulty()}
        </td>
        <td>
            {completed ? "completed" : "incomplete"}
        </td>
        <td>
            <button onClick={() => setOpenUpdate({open: true, todoToUpdate: id})}>Edit</button>
            <DeleteAlert id={id} />
        </td>
    </tr>)
}