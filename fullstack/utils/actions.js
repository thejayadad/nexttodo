import Thought from "@/model/Thought";
import { connectToDB } from "./database";

export const submitThought = async (data) => {
    try {
      await connectToDB();
      const newThought = new Thought(data);
      await newThought.save();
    } catch (err) {
      console.log(err);
    }
  };