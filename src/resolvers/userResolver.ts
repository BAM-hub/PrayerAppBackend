import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserType } from "../schemas/userSchema";
import UserModel from "../models/UserModel";

@Resolver(UserType)
export class UserResolver {
  // find user by id
  @Query(() => UserType)
  async user(@Arg("_id") _id: String): Promise<UserType | null> {
    return await UserModel.findById(_id);
  }

  // add user
  @Mutation(() => UserType)
  async addUser(@Arg("name") name: String) {
    const user = new UserModel({
      name,
    });

    await user.save();
    return user;
  }

  // delete user
  @Mutation(() => UserType)
  async deleteUser(@Arg("_id") _id: String) {
    return await UserModel.findByIdAndDelete(_id);
  }
}
