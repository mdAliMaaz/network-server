import express from 'express';
import cors from 'cors';
import cookiePareser from "cookie-parser";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import imageRouter from "./routes/image.routes";
import { errorHandler, notFound } from "./middlewares/errorhandler";
import { v2 as cloudinary } from "cloudinary";

export const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
app.use("/api/v1/images", imageRouter);


// ? error handler
app.use(errorHandler);
app.use(notFound);