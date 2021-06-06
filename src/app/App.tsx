import React from 'react';
import { TaskContainer } from '../components/taskcontainer';
import { TodoStore } from '../components/taskcontainer/store'


function App() {
  return (
    <div className="App">
      <TaskContainer todoStore={TodoStore}/>
    </div>
  );
}

export default App;
