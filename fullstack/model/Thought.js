import { Schema, model, models } from "mongoose";

const ThoughtSchema = new Schema({
  thought: {
    type: String,
    required: [true, "Thought is required"],
  },
  tags: {
    type: String,
    required: [true, "Tags is required"],
  },
  upvotes: {
    type: Array,
  },
  creator: { type: String },
});

const Thought = models.Thought || model("Thought", ThoughtSchema);

export default Thought;