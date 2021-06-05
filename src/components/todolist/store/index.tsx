import { action, makeObservable, observable } from "mobx";

interface TodoItem {
    id: number;
    title: string;
    difficulty: number;
    completed: boolean;
}

export class TodoStoreImpl {

    todos: TodoItem[] = [];
    currentId: number = 0;
    

    constructor() {
        makeObservable(this, {
           todos: observable,
           addTodo: action,
           updateTodo: action,
           deleteTodo: action,
        });
    }

    addTodo(title: string, difficulty: number) {
        const item: TodoItem = {
            id: this.currentId++,
            title,
            difficulty,
            completed: false
        };
        this.todos.push(item);
    }

    updateTodo(id: number, title: string, difficulty: number, completed: boolean) {
        const index = this.todos.findIndex(item => item.id === id);
        if (index > -1) {
            this.todos[index] = {
                id,
                title,
                difficulty,
                completed
            }
        }
    }

    deleteTodo(id:number) {
        this.todos = this.todos.filter(item => item.id !== id);
    }

    bulkDelete(bulkSelection: Array<number>) {
        this.todos = this.todos.filter(item => bulkSelection.indexOf(item.id) === -1);
    }

    bulkUpdate(bulkSelection: Array<number>) {
        this.todos = this.todos.map(item => {
            if(bulkSelection.indexOf(item.id) !== -1){
                return {...item, completed: true};
            }
            return item
        })
    }
}

export const TodoStore = new TodoStoreImpl();