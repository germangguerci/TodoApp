import React from 'react';
import {TodoList} from '../components/todolist';
import { TodoStore } from '../components/todolist/store'


function App() {
  return (
    <div className="App">
      <TodoList todoStore={TodoStore}/>
    </div>
  );
}

export default App;
