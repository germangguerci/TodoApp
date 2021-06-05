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
    const [completed, setCompleted] = useState('false');

    useEffect(() => {
        setTitle(TodoStore.todos[openUpdate.todoToUpdate]?.title)
    }, [openUpdate])

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

                <input
                    value={completed}
                    onChange={(event) => setCompleted(event.target.value)}
                    type="checkbox" 
                />

                <button onClick={() => {
                    if (title) {
                        //todoStore.addTodo(value, difficulty);  
                        setTitle('');
                    }
                }}>submit</button>
            </div>
        </div>
  )
})