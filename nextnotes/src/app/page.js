'use client'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Todo from '@/component/Todo'


export async function fetchBlogs(){
  const res = await fetch('http://localhost:3000/api/todos', {cache: 'no-store'})

  return res.json()
}


export default async function Home() {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('')
  const todos = await fetchBlogs()


  
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
        required
        />
        <button type="submit">Create</button>
      </form>
      </section>
      <section>
        <h2>All Todo's</h2>
        {todos &&
          todos.map((element) => {
            return (
              <div key={element._id}>
                <h2>{element.title}</h2>
                <p>{element.todo}</p>
              </div>
            );
          })}
      </section>
    </main>
  )
}
