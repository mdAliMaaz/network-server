import express from 'express';
import cors from 'cors';
import userRouter from "./routes/user.routes";
import { errorHandler, notFound } from "./middlewares/errorhandler";

export const app = express();

// !middlewares
app.use(express.json());
app.use(cors());

// !routes
app.use("/api/v1/users", userRouter);

// ? error handler
app.use(errorHandler);
app.use(notFound);