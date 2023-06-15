'use client'
import React, {useState} from 'react'
import Axios from 'axios'
import Todo from '@/component/Todo'


export async function fetchTodos(){
  const mongoose = require("mongoose")
  const Todos = require("../../model/Todo")
  await mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

  const todos = await Todos.find().sort({ createdAt: 'desc'})
  console.log(todos)

  return todos

}

export default async function Home() {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('')

  const todos = await fetchTodos()
  
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
    <main>
      <h2>Hi There</h2>
      <section>
        <h2>Create Note</h2>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          onChange={(event)=>setTitle(event.target.value)}
          placeholder='Title'
        />
        <input
        type='text'
        onChange={(event)=>setTodo(event.target.value)}
        placeholder='TodDo'
        />
        <button type="submit">Create</button>
      </form>
      </section>
      <section>
        <h2>All Todo's</h2>
        {todos?.length > 0 ?
        todos.map((todo)=> (
          <Todo key={todo._id} todo={todo} />
        )) : <h3>No Todo</h3>
        
        }
      </section>
    </main>
  )
}

// todos.map((element) => {
//   return (
//     <>
//  <Todo key={element._id} element={todo}/>
//     </>
//   )
// })