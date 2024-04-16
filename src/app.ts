import express from 'express';
import cors from 'cors';
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import { errorHandler, notFound } from "./middlewares/errorhandler";
import cookiePareser from "cookie-parser";

export const app = express();

// !middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiePareser());

// !routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// ? error handler
app.use(errorHandler);
app.use(notFound);