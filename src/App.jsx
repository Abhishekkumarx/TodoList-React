
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo,setNewTodo]= useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');


  //load todo from local storage
  useEffect(()=>{
    const storedTodos = localStorage.getItem("todos");
    if(storedTodos){
      //console.log("Loaded from localStorage:", storedTodos);
      setTodos(JSON.parse(storedTodos));
    }
  },[]);

  //save to local storage
  useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos))
  },[todos]);

  
  
  const handleAdd =()=>{
    if(newTodo.trim()==="") return;
    
    const newTask = {text: newTodo,completed: false};
    setTodos([newTask,...todos])
    setNewTodo("");
    
  };
  
  const handleDelete = (index) =>{
    const updatedTodos = todos.filter((_,i)=> i!=index )
    setTodos(updatedTodos);
  };
  
  const handleToggle = (index) =>{
    const updated =todos.map((todo,i)=>{
      if(i===index){
        return {...todo , completed : !todo.completed};
      }
      return todo;
    });
    setTodos(updated);
  };
  
  const handleEdit = (index) =>{
    setEditingIndex(index);
    setEditedText(todos[index].text);
  };
  
  //save edited
  
  const handleSave=(index)=>{
    const updatedTodos = todos.map((todo,i)=>{
      if(i===index){
        return {...todo, text: editedText};
      }
      return todo;
    });
    
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditedText('');
  }
  
  const remaining = todos.filter(todo => !todo.completed).length;
  
  return (
    <>
  <div className='w-full min-h-screen bg-[#414141] flex justify-center items-start pt-32 p-4'>
  <div className='w-11/12 md:w-1/2 lg:w-1/3 min-w-[280px] bg-white rounded-xl shadow-lg p-4 sm:p-8'>
    <h1 className='text-[#414141] font-semibold text-xl sm:text-2xl md:text-3xl text-center mb-4'>
      To-Do List</h1>
    
    <p className='text-center text-gray-500 text-sm mb-6'>
      You have {remaining} task{remaining !== 1 ? 's' : ''} remaining.
    </p>

    <div className='flex flex-col sm:flex-row gap-4'> 
      <input 
      type='text'
      placeholder='Add your todo'
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value) }
      className='flex-1 bg-gray-200 rounded-2xl p-3'
      />


      <button 
      onClick={handleAdd}
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
          checked={todo.completed}
          onChange={()=>handleToggle(index)}
          className='cursor-pointer w-4 h-4 flex-shrink-0'
          >
          </input>
          {editingIndex === index ? (
  <input
    type="text"
    value={editedText}
    onChange={(e) => setEditedText(e.target.value)}
    className="flex-1 bg-gray-200 rounded-xl p-1"
  />
) : (
  <span
    className={`break-all ${
      todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
    }`}
  >
    {todo.text}
  </span>
)}           


        </div>
        <div className='flex items-center gap-1.5 flex-shrink-0'>


          {editingIndex === index ? (
  <button
    onClick={() => handleSave(index)}
    className='text-green-600 hover:text-green-800 text-lg font-semibold'
  >
    Save
  </button>
) : (
  <button
    onClick={() => handleEdit(index)}
    className='cursor-pointer text-xl'
  >
    ✏️
  </button>
)}


          <button 
          onClick={()=>handleDelete(index)}
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
