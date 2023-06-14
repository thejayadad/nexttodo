
'use client'
import React, {useState} from 'react'
import Axios from 'axios'


export default function Createnotes(){
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
        <input
          type="text"
          required
          onChange={(event)=>setTitle(event.target.value)}
        />
        <input
        type='text'
        onChange={(event)=>setTodo(event.target.value)}
        required
        />
        <button type="submit">Create</button>
      </form>
   </section>
  )
}

