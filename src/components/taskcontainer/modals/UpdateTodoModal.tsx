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
                <p>Some text in the Modal..</p>
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    type="text" 
                />  
                
                <input
                    value={difficulty}
                    onChange={(event) => setDifficulty(parseInt(event.target.value))}
                    type="number" 
                />  

                <button onClick={() => setCompleted(!completed)}>
                    {completed && "Set incomplet"}
                    {!completed && "Set completed"}
                </button>

                <button onClick={() => {
                    if (title) {
                        TodoStore.updateTodo(openUpdate.todoToUpdate, title, difficulty, completed)
                        setTitle('');
                    }
                }}>submit</button>
            </div>
        </div>
  )
})