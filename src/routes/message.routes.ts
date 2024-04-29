import express from "express";
import { getMessages, sendMessages } from "../controllers/message.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id", verifyAccessToken, getMessages);
router.post("/send/:id", verifyAccessToken, sendMessages);

export default router;
