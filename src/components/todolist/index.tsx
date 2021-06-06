import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { TodoStoreImpl } from './store';
import { Todo } from './todo';
import { SelectTodosPerPage } from './selects/SelectTodosPP';
import { AddTodoModal } from './modals/AddTodoModal';
import { UpdateTodoModal } from './modals/UpdateTodoModal';
import { SelectBulkAction } from './selects/SelectBulkAction';
import { BulkActionAlert } from './alerts/BulkActionAlert';
import SimpleAlert from './alerts/SimpleAlert';

interface TodoListProps {
    todoStore: TodoStoreImpl
}

export const TodoList: React.FC<TodoListProps> = observer(({todoStore}) => {

  
    const [todosPerPage, setTodosPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1); 
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState({open: false, todoToUpdate: 0});
    const [bulkSelection, setBulkSelection] = useState<Array<number>>([]);
    const [bulkAction, setBulkAction] = useState('');

    useEffect(() => {
        !todoStore.todos[(page * todosPerPage)] && setCurrentPage(1);
        // eslint-disable-next-line
    }, [todosPerPage])

    const displayTasks = () => {
        let count = 0; 
        return todoStore.todos.map((todo, index) => {
            if((index >= (page - 1) * todosPerPage) && count < todosPerPage){
                count++
                return <Todo key={index} id={todo.id} title={todo.title} difficulty={todo.difficulty} completed={todo.completed} 
                setOpenUpdate={setOpenUpdate} bulkSelection={bulkSelection} setBulkSelection={setBulkSelection}/>
            }
            return null
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

    return <div className="TodoList">
                <div>
                    <h1>Tasks</h1>
                    <button onClick={() => setOpenAdd(true)}>Add task</button>
                </div>

                <SimpleAlert />
                {openAdd && <AddTodoModal openAdd={openAdd} setOpenAdd={setOpenAdd} todoStore={todoStore}/>}
                {openUpdate.open && <UpdateTodoModal openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />}
                
                <div>
                    <SelectTodosPerPage setTodosPerPage={setTodosPerPage} />
                    <SelectBulkAction setBulkAction={setBulkAction} bulkAction={bulkAction}/>
                    {(bulkAction !== '' && bulkSelection.length > 0) && <BulkActionAlert bulkSelection={bulkSelection} bulkAction={bulkAction} setBulkSelection={setBulkSelection}/>}
                </div>

                <table >
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th>Completed</th>
                            <th>Quick Actions</th>
                        </tr>
                    {displayTasks()}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={previousPage}>{"<"}</button>
                    <span>{page}</span>
                    <button onClick={nextPage}> {">"} </button>
                </div>
    </div>
});