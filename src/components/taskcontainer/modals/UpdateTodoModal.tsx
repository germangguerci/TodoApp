import React, { useState, useEffect } from 'react';
import {observer} from 'mobx-react';
import { TodoStore } from '../store';

interface openUpdate{
    open: Boolean
    todoToUpdate: number
}

interface updateTodoModalProps {
    openUpdate: openUpdate
    setOpenUpdate: Function
}

export const UpdateTodoModal: React.FC<updateTodoModalProps> = observer(({openUpdate, setOpenUpdate}) => {

    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState(0); 
    const [completed, setCompleted] = useState(false);

    const myTodo = TodoStore.todos.find(item => item.id === openUpdate.todoToUpdate);

    useEffect(() => {

        if(myTodo){
            setTitle(myTodo.title)
            setDifficulty(myTodo.difficulty)
            setCompleted(myTodo.completed)
        }
    }, [openUpdate, myTodo])

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setOpenUpdate(false)}>&times;</span>
                <label>Title: 
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text" 
                    />
                </label> 

                <label>Difficulty: {difficulty} 
                    <input
                        value={difficulty}
                        onChange={(event) => setDifficulty(parseInt(event.target.value))}
                        type="range"
                        min="1"
                        max="5"
                        step="1" 
                    />
                </label>  

                <label>Status: 
                    <button className="statusButton" onClick={() => setCompleted(!completed)}>
                        {completed && "Done"}
                        {!completed && "To Do"}
                    </button>
                </label>

                <button onClick={() => {
                    title && TodoStore.updateTodo(openUpdate.todoToUpdate, title, difficulty, completed)
                    setOpenUpdate(false);
                }}>submit</button>
            </div>
        </div>
  )
})