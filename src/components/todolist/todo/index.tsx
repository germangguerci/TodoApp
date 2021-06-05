import React from 'react';

interface TodoProps {
    id: Number
    title: String
    difficulty: Number
    completed: Boolean
    setOpenUpdate: Function
}

export const Todo: React.FC<TodoProps> = ({id, title, difficulty, completed, setOpenUpdate}) => {

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
            <span>{completed ? "x" : ""}</span>
            <span>{title}</span>
            <span>{calculateDifficulty()}</span>
        </div>
        <button onClick={() => setOpenUpdate({open: true, todoToUpdate: id})}>Open</button>
    </li>)
}