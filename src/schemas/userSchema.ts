import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { Arg, Field, ObjectType, Root } from "type-graphql";
import { RecordType } from "./recordSchema";
import { DocumentType } from "@typegoose/typegoose";
import RecordModel from "../models/RecordModel";

@ObjectType()
export class UserType {
  @Field((type) => ObjectIdScalar)
  readonly _id: ObjectId;

  @Field((type) => String)
  email: String;

  @Field((type) => String)
  password: String;

  @Field((type) => String)
  name: String;

  // @Prop({ type: () => RecordType })
  @Field((type) => UserType, { nullable: true })
  async userRecord(@Root() user: DocumentType<RecordType | null>) {
    return await RecordModel.findOne({ userId: user._id });
  }
}

@ObjectType()
class ErrorLocationsType {
  @Field((type) => Number)
  line: Number;

  @Field((type) => Number)
  column: Number;
}

@ObjectType()
class ErrorType {
  @Field((type) => String)
  message: String;

  @Field((type) => [String], { nullable: true })
  path: String[];

  @Field((type) => [ErrorLocationsType], { nullable: true })
  locations: ErrorLocationsType[];
}

@ObjectType()
export class UserErrorType {
  @Field((type) => [ErrorType])
  errors: [ErrorType];

  @Field((type) => Object)
  data: Object;
}
