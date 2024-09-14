import express from "express";
import cors from "cors";
import novelRouter from "./routes/novel-routes.js";
import genreRouter from "./routes/genre-routes.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/novel", novelRouter);
app.use("/", (req, res, next) => {
  res.send({ message: "Welcome to Novel Scrapper V2" });
});

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
