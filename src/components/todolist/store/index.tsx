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
           toggleTodo: action,
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

    toggleTodo(id: number) {
        const index = this.todos.findIndex(item => item.id === id);
        if (index > -1) {
            this.todos[index].completed = !this.todos[index].completed;
        }
    }
}

export const TodoStore = new TodoStoreImpl();