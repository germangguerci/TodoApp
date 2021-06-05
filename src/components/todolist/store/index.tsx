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
}

export const TodoStore = new TodoStoreImpl();