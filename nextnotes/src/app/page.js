'use client'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'


export async function fetchBlogs(){
  const res = await Axios.get('http://localhost:3000/api/todos', {cache: 'no-store'})

  return res.data;
}


export default async function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [todoId, setTodoId] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogs();
      setTodos(data);
    };
    fetchData();
  }, [fetchBlogs]);

  const editForm = (title, todo, todoId) => {
      setVisibility(visibility => !visibility)
      setTitle(title)
      setTodo(todo)
      setTodoId(todoId)
  }

  const updateTodo = async (todoId) =>{
      const todoObj = {
          title: title,
          todo: todo
        }
        console.log(todoObj)
       await Axios.put(`/api/updateTodo?id=${todoId}`, todoObj)
        .then(()=>{
          window.location.reload(false)
        })
  }

  
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
                <button onClick={() => editForm(element.title, element.todo, element._id)}>Edit</button>
              </div>
            );
          })}
      </section>
      
      {visibility && <div >
        <h1>Update Todo</h1>
        <form>
          <div className="mb-3">
            <label for="title" >Title</label>
            <input type="text"  id="title" aria-describedby="emailHelp" value={title} onChange={(event)=>setTitle(event.target.value)}/>          
          </div>
          <div className="mb-3">
            <label for="todo">Todo</label>
            <input type="text"  id="todo" value={todo} aria-describedby="emailHelp" onChange={(event)=>setTodo(event.target.value)}/>          
          </div>
          <button type="submit"  onClick={()=>updateTodo(todoId)}>Submit</button>
          <button onClick={()=>setVisibility(visibility => !visibility)}>Cancel</button>
        </form>
      </div>}
    </main>
  )
}

{/* <div key={element._id}>
<h2>{element.title}</h2>
<p>{element.todo}</p>
</div> */}