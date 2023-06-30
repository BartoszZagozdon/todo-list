import { ReactNode, createContext, useEffect, useState } from 'react';

import { TaskContextType } from '../types';

export const TaskContext = createContext<TaskContextType>({ tasks: [], setTasks: () => {} });

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<string[]>([]);

  console.log(tasks);

  const storage = localStorage.getItem('tasks');

  useEffect(()=>{
    storage ? setTasks(JSON.parse(storage)) : localStorage.setItem('tasks',JSON.stringify(tasks))
  },[])

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])


  

  return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};