import './App.css';

import { TaskProvider } from './context/TaskProvider';

import { AddTask } from './components/AddTask';
import { ShowTasks } from './components/ShowTasks';

function App() {
  return (
    <TaskProvider>
      <AddTask />
      <ShowTasks />
    </TaskProvider>
  );
}

export default App;
