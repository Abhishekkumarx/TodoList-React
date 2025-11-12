
import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {text: "Next", completed: false },
    {text: "poster", completed:false },
  ]);
  const [newTodo,setNewTodo]= useState("")

  const handleAdd =()=>{
    if(newTodo.trim()==="") return;

    const newTask = {text: newTodo,completed: false};
    setTodos([...todos,newTask])
    setNewTodo("");

  };
  

return (
<>
  <div className='w-full min-h-screen bg-[#414141] flex justify-center items-start pt-32 p-4'>
  <div className='w-11/12 md:w-1/2 lg:w-1/3 min-w-[280px] bg-white rounded-xl shadow-lg p-4 sm:p-8'>
    <h1 className='text-[#414141] font-semibold text-xl sm:text-2xl md:text-3xl text-center mb-4'>
      To-Do List</h1>
    
    <p className='text-center text-gray-500 text-sm mb-6'>
      You have {todos.length} tasks remaining.
    </p>

    <div className='flex flex-col sm:flex-row gap-4'> 
      <input 
      type='text'
      placeholder='Add your todo'
      className='flex-1 bg-gray-200 rounded-2xl p-3'
      />


      <button 
      className='bg-orange-500 text-white rounded-2xl p-3 px-5 cursor-pointer whitespace-nowrap'
      >
      Add</button>
    </div>
    
    {/*steps to display todos dynamitically   */}
    <ul className='mt-6 space-y-3'>
      {todos.map((todo,index)=>(

        <li key={index} className='flex justify-between items-center bg-gray-100 px-3 py-1 rounded-xl'> 
        <div className='flex items-center gap-1.5 min-w-0'>
          <input
          type='checkbox'
          className='cursor-pointer w-4 h-4 flex-shrink-0'
          >
          </input>
          <span className="break-all text-gray-800">
            {todo.text}
          </span>
        </div>
        <div className='flex items-center gap-1.5 flex-shrink-0'>
          <button
          className='cursor-pointer text-xl'>✏️
          </button>
          <button 
          className='text-red-500 hover:text-red-700 justify-end font-bold sm:text-2xl lg:text-2xl cursor-pointer'
          >
          X</button>
        </div>
      </li>

      ))}

    </ul>
  </div>
  </div>
</>
)
}
export default App
