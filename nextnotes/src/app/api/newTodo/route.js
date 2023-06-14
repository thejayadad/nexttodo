import db from "@/app/lib/db";

import Todo from "../../../../model/Todo";

export async function POST(req){
    await db.connect()
    try {
        const body = await req.json()
        const newNote = await Todo.create(body)

        return new Response(JSON.stringify(newNote), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }


}