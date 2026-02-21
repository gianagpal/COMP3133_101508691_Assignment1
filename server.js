require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const connectDB = require("./src/config/db");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

async function start() {
  const app = express();

  await connectDB(process.env.MONGO_URI);

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.get("/graphql", (req, res) => {
    res.send("GraphQL endpoint is ready. Use POST requests from Postman to /graphql.");
  });

  app.post(
    "/graphql",
    cors(),
    bodyParser.json({ limit: "10mb" }),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || "",
      }),
    })
  );

  app.get("/", (req, res) => res.send("API Running"));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

start();