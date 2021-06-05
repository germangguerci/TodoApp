import React from 'react';
import { observer } from 'mobx-react';
import { TodoStore } from '../store';

interface TodoProps {
    id: number
    title: String
    difficulty: Number
    completed: Boolean
    setOpenUpdate: Function
}

export const Todo: React.FC<TodoProps> = observer(({id, title, difficulty, completed, setOpenUpdate}) => {

    const calculateDifficulty = ():string => {
        if(difficulty >= 5){
            return "Hard"
        }else if(difficulty >= 3){
            return "Medium"
        }
        return "Easy"
    }

    return (
    <li>
        <div>
            <span>{title}</span>
            <span>{calculateDifficulty()}</span>
            <span>{completed ? "completo" : ""}</span>
        </div>
        <button onClick={() => setOpenUpdate({open: true, todoToUpdate: id})}>Edit</button>
        <button onClick={() => TodoStore.deleteTodo(id)}>Delete</button> 
    </li>)
})