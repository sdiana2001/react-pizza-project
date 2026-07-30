import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../../redux/slices/todo';
import { useState } from 'react';

const ToDo = () => {
  const todos = useSelector((state) => state.todos.value);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleAdd = () => {
    dispatch(addTask(text));
    setText('');
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите задачу..."
        />
        <button type="submit" className="create">
          Создать
        </button>

        <ul className="myTasks">
          {todos.map((task) => (
            <li>{task}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default ToDo;
