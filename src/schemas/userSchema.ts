import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { Field, ObjectType } from "type-graphql";

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
