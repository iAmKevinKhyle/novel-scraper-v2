import express from "express";
import { GET_HOME_CONTENTS } from "../controllers/novel-controllers.js";

const novelRouter = express.Router();

novelRouter.get("/", GET_HOME_CONTENTS);

export default novelRouter;
