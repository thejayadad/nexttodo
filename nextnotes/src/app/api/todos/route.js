import db from "@/app/lib/db";
import Todo from "../../../../model/Todo";

export async function GET(req) {
    await db.connect()

    try {
        const todos = await Todo.find({})
        return new Response(JSON.stringify(todos), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}
