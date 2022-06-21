import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Nuaffel, Prayers, RecordType } from "../schemas/recordSchema";
import UserModel from "../models/UserModel";
import RecordModel from "../models/RecordModel";

@Resolver(RecordType)
export class RecordResolver {
  //get user record
  @Query((returns) => RecordType)
  async getUserRecord(
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ): Promise<RecordType | null> {
    return await UserModel.findById(_id);
  }

  @Mutation((returns) => RecordType)
  async checkDeed(
    @Arg("prayer", (type) => Prayers, { nullable: true }) prayer: Prayers,
    @Arg("nuaffel", (type) => Nuaffel, { nullable: true }) nuaffel: Nuaffel,
    @Arg("_id", (type) => ObjectIdScalar) _id: ObjectId
  ) {
    // hint might refactor to useing switch instead for fewer test cases
    let record = await RecordModel.findOne({ userId: _id });

    if (!record) {
      let newRecord = new RecordModel({
        userId: _id,
        score: prayer ? prayer : nuaffel ? nuaffel : 0,
      });

      if (prayer) newRecord.prayers = [prayer];
      if (nuaffel) newRecord.nuaffel = [nuaffel];

      return await newRecord.save();
    }

    if (prayer) {
      record.prayers = [...record.prayers, prayer];
      record.score = record.score + prayer;
    }
    if (nuaffel) {
      record.nuaffel = [...record.nuaffel, nuaffel];
      record.score = record.score + nuaffel;
    }

    return await record.save();
  }
}
