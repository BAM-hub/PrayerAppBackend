import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id!: String;
  @Field()
  name!: String;
}
