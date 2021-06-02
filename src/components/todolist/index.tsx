import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TodoStoreImpl } from './store';
import { Todo } from './todo';


interface TodoListProps {
    todoStore: TodoStoreImpl
}

export const TodoList: React.FC<TodoListProps> = observer(({todoStore}) => {

    const [value, setValue] = useState<string>('');
    const [difficulty, setDifficulty] = useState<number>(0); 

    return <div>
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

        <ul>
            {todoStore.todos.map(todo => {
                return <Todo title={todo.title} difficulty={todo.difficulty} completed={todo.completed}/>
            })}
        </ul>

    </div>
});