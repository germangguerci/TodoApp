import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TodoStore } from './store';
import { Todo } from './todo';
import { SelectTodosPerPage } from './selects/SelectTodosPP';
import { AddTodoModal } from './modals/AddTodoModal';
import { UpdateTodoModal } from './modals/UpdateTodoModal';
import { SelectBulkAction } from './selects/SelectBulkAction';
import { BulkActionAlert } from './alerts/BulkActionAlert';
import SimpleAlert from './alerts/SimpleAlert';
import DoneAllIcon from '@material-ui/icons/DoneAll';

export const TaskContainer: React.FC = observer(() => {

    const [todosPerPage, setTodosPerPage] = useState(15);
    const [page, setCurrentPage] = useState(1); 
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState({open: false, todoToUpdate: 0});
    const [bulkSelection, setBulkSelection] = useState<Array<number>>([]);
    const [bulkAction, setBulkAction] = useState('');

    const selectAllTasks = () => {
        let startIndex = ((page - 1) * todosPerPage)
        let arr = TodoStore.todos.slice(startIndex, (startIndex + todosPerPage))
        let newBulkSelection = [...bulkSelection]
        arr.forEach(item => newBulkSelection.indexOf(item.id) === -1 && newBulkSelection.push(item.id))
        setBulkSelection(newBulkSelection);
    }

    const displayTasks = () => {
        let count = 0; 
        return TodoStore.todos.map((todo, index) => {
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
        if(TodoStore.todos[(page * todosPerPage)]){
            setCurrentPage(page + 1)
        }
    }

    return <div className="taskContainer">
                <div className="taskHeader">
                    <h2>Tasks</h2>
                    <button onClick={() => setOpenAdd(true)}>Add task</button>
                </div>

                <SimpleAlert />
                {openAdd && <AddTodoModal openAdd={openAdd} setOpenAdd={setOpenAdd} todoStore={TodoStore}/>}
                {openUpdate.open && <UpdateTodoModal openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />}
                
                <div className="tableOptions">
                    <SelectBulkAction setBulkAction={setBulkAction} bulkAction={bulkAction}/>
                    {(bulkAction !== '' && bulkSelection.length > 0) && 
                    <BulkActionAlert bulkSelection={bulkSelection} bulkAction={bulkAction} setBulkSelection={setBulkSelection}/>}
                    <SelectTodosPerPage setTodosPerPage={setTodosPerPage} setCurrentPage={setCurrentPage}/>
                </div>

                <div className="tableContainer">
                    <table >
                        <tbody>
                            <tr>
                                <td><DoneAllIcon fontSize="small" onClick={() => selectAllTasks()}/></td>
                                <th>Title</th>
                                <th>Difficulty</th>
                                <th>Status</th>
                            </tr>
                            {displayTasks()}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    {page > 1 && <button onClick={previousPage}>{"<"}</button>}
                    <span>{page}</span>
                    {TodoStore.todos[(page * todosPerPage)] && <button onClick={nextPage}> {">"} </button>}
                </div>
    </div>
});