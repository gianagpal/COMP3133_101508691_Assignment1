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

  const allowedOrigins = [
    "http://localhost:4200",
    "https://101508691-comp3133-assignment2-g1i5-gvnnkkkq5.vercel.app"
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  };

  app.use(cors(corsOptions));
  app.options("/graphql", cors(corsOptions));

  await connectDB(process.env.MONGO_URI);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.get("/", (req, res) => {
    res.send("API Running");
  });

  app.get("/graphql", (req, res) => {
    res.send("GraphQL endpoint is ready. Use POST requests to /graphql.");
  });

  app.use(
    "/graphql",
    bodyParser.json({ limit: "10mb" }),
    cors(corsOptions),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || "",
      }),
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

start();