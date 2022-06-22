import "reflect-metadata";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";

import {
  CheckNuaffel,
  RecordResolver,
  CheckPrayer,
} from "./resolvers/RecoerdResolver";
import { UserResolver } from "./resolvers/userResolver";
import connectDB from "./config/db";

const app = express();

connectDB();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RecordResolver, CheckNuaffel, CheckPrayer],
  });
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  const PORT = 8000;

  app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
};

main();
