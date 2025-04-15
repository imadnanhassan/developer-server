import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("🌟 Portfolio Server is running ");
});

// application products routes
app.use("/api/v1", router);

export default app;
