import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
  @Field((type) => ObjectIdScalar)
  readonly _id: ObjectId;

  @Field((type) => String)
  name: String;
}
