import Thought from "@/model/Thought";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
      await connectToDB();
      const thoughts = await Thought.find({}).sort({ upvotes: -1 });
      return new Response(JSON.stringify(thoughts), { status: 200 });
    } catch (err) {
      return new Response("Failed to fetch all Thoughts", { status: 500 });
    }
  };