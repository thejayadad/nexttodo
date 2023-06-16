import Thought from "@/model/Thought";
import { connectToDB } from "@/utils/database";


export const PATCH = async (request, { params }) => {
    const { userId } = await request.json();
  
    try {
      await connectToDB();
      const existingThought = await Thought.findById(params.id);
  
      if (!existingThought.upvotes.includes(userId)) {
        await existingThought.updateOne({ $push: { upvotes: userId } });
      } else {
        await existingThought.updateOne({ $pull: { upvotes: userId } });
      }
  
      return new Response("Thought Upvotes/Downvoted", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Error Updating Thought", { status: 500 });
    }
  };
  
  export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
      const selectedThought = await Thought.findById(params.id);
      await selectedThought.deleteOne();
  
      return new Response("Thought Deleted", { status: 200 });
    } catch (err) {
      return new Response("Error Deleteing Thought", { status: 500 });
    }
  };