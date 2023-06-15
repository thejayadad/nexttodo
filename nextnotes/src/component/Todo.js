'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Todo = ({todo: {title, todo}}) => {
  return (
    <section>   
       <div >
        <p>{title}</p>
        <h2>{todo}</h2>
       </div>
    </section>
  )
}

export default Todo