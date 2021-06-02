import React from 'react';

interface TodoProps {
    title: string
    difficulty: number
    completed: boolean
}

export const Todo: React.FC<TodoProps> = ({title, difficulty, completed}) => {

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
    </li>)
}