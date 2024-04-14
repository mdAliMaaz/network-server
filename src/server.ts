const dotenv = require('dotenv').config();

import { app } from "./app"
import { connectDb } from "./database";

const PORT = process.env.PORT || 8000;

connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} 🚀`);
  })
);

