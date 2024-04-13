import express from 'express';
import cors from 'cors';


export const app = express();

// !middlewares
app.use(express.json());
app.use(cors());
