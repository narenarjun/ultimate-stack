import express, { Response, Request } from "express";
import { currentUser } from "@wowowow/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser });
  }
);

export { router as currentUserRouter };
