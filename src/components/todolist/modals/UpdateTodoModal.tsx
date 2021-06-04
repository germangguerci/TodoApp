import React, { useState } from 'react';
import { TodoStoreImpl } from '../store'

interface updateTodoModalProps {
    openUpdate: Boolean
    setOpenUpdate: Function
    todoStore: TodoStoreImpl
}

export const UpdateTodoModal: React.FC<updateTodoModalProps> = ({openUpdate, setOpenUpdate, todoStore}) => {

    const [value, setValue] = useState('');
    const [difficulty, setDifficulty] = useState(0); 

    return (
        <div id="myModal" className={`modal ${openUpdate ? "modal--block" : "modal--hidden"}`}>
            <div className="modal-content">
                <span className="close" onClick={() => setOpenUpdate(false)}>&times;</span>
                <p>Some text in the Modal..</p>
                <input
                    value={value}
                    onChange={(event) => { 
                        setValue(event.target.value);
                    }}
                    type="text" />  
                
                <input
                value={difficulty}
                onChange={(event) => { 
                    setDifficulty(parseInt(event.target.value));
                }}
                type="number" />  

                <button onClick={() => {
                    if (value) {
                        //todoStore.addTodo(value, difficulty);
                        setValue('');
                    }
                }}>submit</button>
            </div>
        </div>
  )
}