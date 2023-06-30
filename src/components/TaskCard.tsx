import { FormEvent, useContext, useState } from 'react';
import { styled } from 'styled-components';
import { TaskContext } from '../context/TaskProvider';

import { AddButton } from './AddTask';

const TaskCardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 40px;
  background-color: white;
  color: black;
  border: 1px solid green;
  padding-block: 30px;
`;

const DelButton = styled.button`
  font-size: 50px;
  font-weight: 600;
  color: red;
  background-color: transparent;
  border: 0;
  line-height: 50%;
  margin-left: 20px;
`;

const EditButton = styled.button`
  font-size: 40px;
  font-weight: 600;
  color: #8b8000;
  background-color: transparent;
  border: 0;
  line-height: 50%;
  margin-left: auto;
`;

const TaskEditInput = styled.input`
  background-color: white;
  color: black;
`;

export const TaskCard: React.FC<{ task: string }> = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const [isEditing, setIsEditing] = useState(false);

  const delTask = (taskToDel: string) => {
    const newList = tasks.filter((task) => task !== taskToDel);

    setTasks(newList);
  };

  const editTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedTask = e.currentTarget.edit.value;

    if (tasks.includes(editedTask)) {
      alert('Tasks cannot have the same name!');
    } else {
      const taskIndex = tasks.findIndex((taskToEdit) => taskToEdit === task);

      const newList = tasks;

      newList[taskIndex] = editedTask;

      console.log(newList);

      setTasks([...newList]);
      setIsEditing(false);
    }
  };

  return (
    <TaskCardStyled>
      {isEditing ? (
        <form onSubmit={editTask} style={{ display: 'flex' }}>
          <TaskEditInput name="edit" type="text" defaultValue={task} />
          <AddButton type="submit">+</AddButton>
          <EditButton onClick={() => setIsEditing(!isEditing)}>E</EditButton>
        </form>
      ) : (
        <>
          {task}
          <EditButton onClick={() => setIsEditing(!isEditing)}>E</EditButton>
          <DelButton onClick={() => delTask(task)}>
            <div style={{ transform: 'rotate(45deg)' }}>+</div>
          </DelButton>
        </>
      )}
    </TaskCardStyled>
  );
};
