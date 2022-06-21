import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { Field, ObjectType, registerEnumType } from "type-graphql";

export enum Prayers {
  None = 0,
  Dawn = 10,
  Aduher = 5,
  Asr = 3,
  Maghreb = 4,
  Eshaa = 6,
  //   Sunnah=2
}

registerEnumType(Prayers, {
  name: "Prayers",
});

export enum Nuaffel {
  None = 0,
  Sunnah = 2,
  Quraan = 1,
}

registerEnumType(Nuaffel, {
  name: "Nuaffel",
});

@ObjectType()
export class RecordType {
  @Field((type) => ObjectIdScalar)
  readonly _id: ObjectId;

  @Field((type) => ObjectIdScalar)
  readonly userId: ObjectId;

  @Field((type) => Number)
  score: number;

  @Field((type) => [Prayers])
  prayers: Prayers[];

  @Field((type) => [Nuaffel])
  nuaffel: Nuaffel[];
}
