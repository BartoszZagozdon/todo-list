import { FormEvent, useContext, useState } from 'react';
import { styled } from 'styled-components';

import { TaskContext } from '../context/TaskProvider';
import { useSpring, animated } from '@react-spring/web';

const AnimatedPlus = styled.span<{ animate: string }>`
  font-size: 100px;
  color: ${({ animate }) => (animate === 'true' ? 'red' : 'green')};
  transform: ${({ animate }) => (animate === 'true' ? 'rotate(45deg)' : 'rotate(0deg)')};
  transition: all 0.8s ease;
  line-height: 50%;
  display: inline-block;
  margin-top: 20px;
`;

const TaskAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AddButton = styled.button`
  font-size: 50px;
  font-weight: 600;
  color: green;
  background-color: transparent;
  border: 0;
  line-height: 50%;
`;

const TaskForm = styled.form`
  display: flex;
  //margin-top: 30px;
`;

const TaskInput = styled.input``;

export const AddTask = () => {
  const [isTaskAdd, setIsTaskAdd] = useState<boolean>(false);

  const { tasks, setTasks } = useContext(TaskContext);

  const formAnimation = useSpring({
    opacity: isTaskAdd ? 1 : 0,
    transform: isTaskAdd ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const handleTaskAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let task: string = e.currentTarget.task.value;
    if (tasks.includes(task)) {
      alert('Tasks cannot have the same name!');
    } else {
      setTasks((tasks) => [...tasks, task]);
    }
  };

  return (
    <TaskAddContainer>
      <AddButton onClick={() => setIsTaskAdd(!isTaskAdd)}>
        <AnimatedPlus animate={isTaskAdd ? 'true' : 'false'}>+</AnimatedPlus>
      </AddButton>
      {isTaskAdd && (
        <animated.div style={{ ...formAnimation, marginTop: '30px' }}>
          <TaskForm onSubmit={handleTaskAdd}>
            <TaskInput name="task" />
            <AddButton type="submit">+</AddButton>
          </TaskForm>
        </animated.div>
      )}
    </TaskAddContainer>
  );
};
