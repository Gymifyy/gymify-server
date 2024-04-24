import express, { Request, Response, Router } from "express";
import MessageResponse from "../interfaces/MessageResponse";

const router: Router = express.Router();

router.get<{}, MessageResponse>("/", (req: Request, res: Response<MessageResponse>) => {
  res.status(202).json({ message: "Hello World !!!" });
});


export default router;
