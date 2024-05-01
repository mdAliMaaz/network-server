const dotenv = require("dotenv").config();
import { server } from "./socket";
import { connectDb } from "./database";

const PORT = process.env.PORT || 8000;

connectDb().then(() =>
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT} 🚀`);
  })
);
