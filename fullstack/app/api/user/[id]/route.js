
import Thought from "@/model/Thought";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
      await connectToDB();
  
      const userThoughts = await Thought.find({ creator: params.id }).sort({
        createAt: -1,
      });
  
      return new Response(JSON.stringify(userThoughts), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch all Thoughts", { status: 500 });
    }
  };
  