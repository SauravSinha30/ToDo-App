import React from 'react';
import tick from '../assets/tick.jpg';
import not_tick from '../assets/not_tick.png';
import edit from '../assets/edit.png';
import deleteIcon from '../assets/delete.jpg';

const TodoItems = ({text,id,completed,deleteTodo,toggle,editTodo}) => { 
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img className='w-7' src={completed ? tick : not_tick} alt="" />
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${completed ? "line-through" : ""}`}>{text}</p>
        </div>
        <img onClick={()=>{editTodo(id)}} className='w-6 cursor-pointer' src={edit} alt="" />
        <img onClick={()=>{deleteTodo(id)}} className='w-7 cursor-pointer' src={deleteIcon} alt="" />
    </div>
  );
}
export default TodoItems;