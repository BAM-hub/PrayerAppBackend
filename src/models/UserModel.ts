import mongoose from "mongoose";
import { UserType } from "src/schemas/userSchema";

const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserType>("User", UserSchema);
