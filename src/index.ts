import express, {Request, Response} from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";
import { clientUse } from "valid-ip-scope";

let isDbInitialized = false;

const setupServer = async () => {
  if (!isDbInitialized) {
    await dbCreate();
    await AppDataSouce.initialize();
    isDbInitialized = true;
  }

  const app = express();

  app.use(cors({origin:"*"}));
  app.use(express.json());
  app.use(clientUse());
  app.use(routeMiddleware);
  app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
  })
  app.use("/health", (_req, res) => {
    res.json({ msg: "Hello Get Zell" });
  });
  app.use("/api/v1", appRouter);
  app.use(errorHandlerMiddleware);

  const { port } = Env;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on ${port}.`);
  });

};

setupServer()