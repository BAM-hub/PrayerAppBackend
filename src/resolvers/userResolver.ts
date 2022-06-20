import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ObjectId } from "mongodb";
import * as bcrypt from "bcryptjs";

import { EmailInterceptor } from "../middleware/emailInterceptor";
import { ObjectIdScalar } from "../myScalars/ObjectId";

import UserModel from "../models/UserModel";
import { UserType } from "../schemas/userSchema";

@Resolver(UserType)
export class UserResolver {
  // find all users
  @Query((returns) => [UserType])
  async users(): Promise<UserType[] | undefined> {
    return await UserModel.find({}).select("-password");
  }

  // find user by id
  @Query((returns) => UserType)
  async user(
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ): Promise<UserType | null> {
    return await UserModel.findById(_id);
  }

  // register user
  @Mutation((returns) => UserType, { nullable: true })
  @UseMiddleware(EmailInterceptor)
  async registerUser(
    @Arg("name", (type) => String) name: String,
    @Arg("email", (type) => String) email: String,
    @Arg("password", (type) => String) password: String
  ): Promise<UserType | null> {
    const exists = await UserModel.findOne({ email });

    if (exists) throw new Error("User already exists.");

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    return await user.save();
  }

  // login user
  @Query((returns) => UserType, { nullable: true })
  @UseMiddleware(EmailInterceptor)
  async loginUser(
    @Arg("email", (type) => String) email: String,
    @Arg("password", (type) => String) password: string
  ): Promise<UserType | null> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid Credintials");

    const isMatch = await bcrypt.compare(password, user.password.toString());

    if (!isMatch) throw new Error("Invalid Credintials");

    return user;
  }

  // delete user
  @Mutation((returns) => UserType, { nullable: true })
  async deleteUser(
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ): Promise<null | UserType> {
    return await UserModel.findByIdAndDelete(_id);
  }
}
