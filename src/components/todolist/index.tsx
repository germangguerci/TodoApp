import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TodoStoreImpl } from './store';
import { Todo } from './todo';
import {SelectTodosPerPage} from './SelectTodosPP';


interface TodoListProps {
    todoStore: TodoStoreImpl
}

export const TodoList: React.FC<TodoListProps> = observer(({todoStore}) => {

    const [value, setValue] = useState('');
    const [difficulty, setDifficulty] = useState(0); 
    const [todosPerPage, setTodosPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1); 

    const displayTodos = () => {
        let count = 0; 
        return todoStore.todos.map((todo, index) => {
            if((index >= (page - 1) * todosPerPage) && count < todosPerPage){
                count++
                return <Todo key={index} title={todo.title} difficulty={todo.difficulty} completed={todo.completed}/>
            }
        })
    }

    const previousPage = () => {
        page >= 2 && setCurrentPage(page + -1)
    }

    const nextPage = () => {
        if(todoStore.todos[(page * todosPerPage)]){
            setCurrentPage(page + 1)
        }
    }

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

        <button onClick={previousPage}>Previous page</button>
        <button onClick={nextPage}>Next page</button>
        <SelectTodosPerPage setTodosPerPage={setTodosPerPage} />
        <span>Page: {page}</span>
        <ul>
            {displayTodos()}
        </ul>

    </div>
});