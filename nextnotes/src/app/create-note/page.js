
'use client'
import React, {useState} from 'react'
import Axios from 'axios'


const Createnotes = () => {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('')

  
  const handleSubmit = () =>{
    const todoObj = {
      title: title,
      todo: todo
    }
    Axios.post('/api/newTodo', todoObj)
    .then(()=>{
      alert('Todo added')
    })
  }

   
  return (
   <section>
    <h2>Create Notes</h2>
    <form onSubmit={handleSubmit}>
    <label for="title">Title</label>
        <input
          type="text"
          id="title"
          required
          onChange={(event)=>setTitle(event.target.value)}
        />
        <input
        type='text'
        onChange={(event)=>setTodo(event.target.value)}
        required
        id="todo"
        />
        <button type="submit">Create</button>
      </form>
   </section>
  )
}

export default Createnotes