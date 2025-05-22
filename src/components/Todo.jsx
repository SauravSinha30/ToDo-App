import React, { useEffect, useRef, useState } from 'react';
import todo from '../assets/todo.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  );
  const [darkMode, setDarkMode] = useState(false);
   const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef();
  const priorityRef = useRef();

  const add = () => {
    const inputValue = inputRef.current.value.trim();
    const priorityValue = priorityRef.current.value;

    if (inputValue === '') return;

    if (editId !== null) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editId
            ? { ...todo, text: inputValue, priority: priorityValue }
            : todo
        )
      );
      setEditId(null);
      setEditText('');
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        priority: priorityValue,
        completed: false,
      };

      setTodoList((prev) => [...prev, newTodo]);
    }

    inputRef.current.value = '';
    priorityRef.current.value = 'Medium';
  };

  const deleteTodo = (id) => {
    setTodoList((prevTods) => prevTods.filter((todo) => todo.id !== id));
  };
  const editTodo = (id) => {
    const todoToEdit = todoList.find((todo) => todo.id === id);
    if (todoToEdit) {
      inputRef.current.value = todoToEdit.text;
      priorityRef.current.value = todoToEdit.priority;
      setEditId(id);
      setEditText(todoToEdit.text);
    }
  };

  const toggle = (id) => {
    setTodoList((prevTods) =>
      prevTods.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const sortedTodoList = [...todoList].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-400 text-black'
      } place-self-center w-11/12 max-w-md flex flex-col py-7 min-h-[550px] rounded-xl transition-colors duration-300`}
    >
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo} alt='' />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      <div className='flex justify-between items-center my-4 px-4'>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='border px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-700'
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className='flex flex-col sm:flex-row items-center gap-3 my-5 bg-gray-200 p-4 rounded-xl'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-4 pr-2 rounded-full placeholder:text-slate-600'
          type='text'
          placeholder='Add a new task'
        />
        <select
          ref={priorityRef}
          defaultValue='Medium'
          className='px-4 py-2 rounded-md bg-slate-500 text-black border border-gray-300'
        >
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
        <button
          onClick={add}
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
        >
          ADD +
        </button>
      </div>

      <div className='px-4'>
        {sortedTodoList.map((item) => (
          <TodoItems
            key={item.id}
            text={`${item.text} (${item.priority})`}
            id={item.id}
            completed={item.completed}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;