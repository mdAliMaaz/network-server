import express from 'express';
import cors from 'cors';
import userRouter from "./routes/user.routes";
import { errorHandler, notFound } from "./middlewares/errorhandler";
import cookiePareser  from 'cookie-parser'

export const app = express();

// !middlewares
app.use(express.json());
app.use(cors());
app.use(cookiePareser());

// !routes
app.use("/api/v1/users", userRouter);

// ? error handler
app.use(errorHandler);
app.use(notFound);