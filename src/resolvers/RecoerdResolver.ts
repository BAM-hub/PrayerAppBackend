import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { Nuaffel, Prayers, RecordType } from "../schemas/recordSchema";
import UserModel from "../models/UserModel";
import RecordModel from "../models/RecordModel";

function createBaseResolver<T extends ClassType<RecordType>>(
  suffix: String,
  returnType: T,
  inputType: any,
  field: string
  // entity: any
) {
  @Resolver((returns) => RecordType)
  class BaseResolver {
    @Mutation((returns) => returnType, { name: `check${suffix}` })
    async check(
      @Arg(`${suffix.toLocaleLowerCase()}`, (type) => inputType, {
        nullable: true,
      })
      data: typeof inputType,
      @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
    ): Promise<T | null> {
      const record = await RecordModel.findOneAndUpdate({ userId: _id }, [
        {
          $set: {
            [field]: { $concatArrays: [`$${field}`, [data]] },
          },
        },
        {
          $set: {
            score: { $add: [{ $sum: "$prayers" }, { $sum: "$nuaffel" }] },
          },
        },
      ]);

      if (record) return await RecordModel.findOne({ userId: _id });

      const newRecord: any = new RecordModel({
        userId: _id,
        score: data,
        [field]: [data],
      });

      return await newRecord.save();
    }
  }

  return BaseResolver;
}

export const CheckPrayer = createBaseResolver(
  "Prayer",
  RecordType,
  Prayers,
  "prayers"
);

export const CheckNuaffel = createBaseResolver(
  "Nuaffel",
  RecordType,
  Nuaffel,
  "nuaffel"
);

@Resolver(RecordType)
export class RecordResolver {
  //get user record
  @Query((returns) => RecordType)
  async getUserRecord(
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ): Promise<RecordType | null> {
    return await UserModel.findById(_id);
  }
}
