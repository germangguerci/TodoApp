import React, { useState } from 'react';
import { TodoStoreImpl } from '../store'

interface addTodoModalProps {
    openAdd: Boolean
    setOpenAdd: Function
    todoStore: TodoStoreImpl
}

export const AddTodoModal: React.FC<addTodoModalProps> = ({setOpenAdd, todoStore}) => {

    const [value, setValue] = useState('');
    const [difficulty, setDifficulty] = useState(0); 

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setOpenAdd(false)}>&times;</span>
                <label>Title:
                    <input
                        value={value}
                        onChange={(event) => { 
                            setValue(event.target.value);
                        }}
                        type="text" />  
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
                <button onClick={() => {
                    if (value) {
                        todoStore.addTodo(value, difficulty);
                        setValue('');
                        setDifficulty(0);
                    }
                }}>Add task</button>
            </div>
        </div>
  )
}