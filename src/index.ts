import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(cors({origin: '*'}))

app.use(express.json());

app.use("/", router);

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
