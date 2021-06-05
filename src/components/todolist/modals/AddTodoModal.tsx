import React, { useState } from 'react';
import { TodoStoreImpl } from '../store'

interface addTodoModalProps {
    openAdd: Boolean
    setOpenAdd: Function
    todoStore: TodoStoreImpl
}

export const AddTodoModal: React.FC<addTodoModalProps> = ({openAdd, setOpenAdd, todoStore}) => {

    const [value, setValue] = useState('');
    const [difficulty, setDifficulty] = useState(0); 

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setOpenAdd(false)}>&times;</span>
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
                        todoStore.addTodo(value, difficulty);
                        setValue('');
                    }
                }}>submit</button>
            </div>
        </div>
  )
}