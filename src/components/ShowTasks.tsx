import { useContext } from 'react';
import { styled } from 'styled-components';

import { TaskContext } from '../context/TaskProvider';
import { TaskCard } from './TaskCard';

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const ShowTasks = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <TasksContainer>
      {tasks.map((task: string, index) => {
        return <TaskCard task={task} key={index} />;
      })}
    </TasksContainer>
  );
};
