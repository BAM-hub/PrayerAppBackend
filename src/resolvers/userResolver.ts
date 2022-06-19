import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserType } from "../schemas/userSchema";
import UserModel from "../models/UserModel";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { ObjectId } from "mongodb";
import { type } from "os";

@Resolver(UserType)
export class UserResolver {
  // find all users
  @Query((returns) => [UserType])
  async users(): Promise<UserType[] | undefined> {
    return await UserModel.find({});
  }

  // find user by id
  @Query((returns) => UserType)
  async user(
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ): Promise<UserType | null> {
    return await UserModel.findById(_id);
  }

  // add user
  @Mutation((returns) => UserType)
  async addUser(@Arg("name", (type) => String) name: String) {
    const user = new UserModel({
      name,
    });

    await user.save();
    return user;
  }

  // delete user
  @Mutation(() => UserType)
  async deleteUser(
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ): Promise<null | UserType> {
    return await UserModel.findByIdAndDelete(_id);
  }
}
