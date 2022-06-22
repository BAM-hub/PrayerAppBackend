import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { RecordType } from "src/schemas/recordSchema";

const RecordSchema = new mongoose.Schema<RecordType>({
  userId: {
    type: ObjectId,
  },
  score: {
    type: Number,
    default: 0,
  },
  prayers: {
    type: [Number],
    enum: [0, 1, 2, 3, 4, 5],
    default: [0],
  },
  nuaffel: {
    type: [Number],
    enum: [0, 1, 2],
    default: [0],
  },
});

export default mongoose.model<RecordType>("Record", RecordSchema);
