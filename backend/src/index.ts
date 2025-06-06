import express from 'express';
import {trpcRouter} from './router';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';
import { createAppContext, AppContext } from "./lib/ctx";

const PORT = 3005;
void (
  async ()=>{
    let ctx: AppContext | null = null;
try {
  ctx = createAppContext();
  const expressApp = express();
  expressApp.use(cors());
  expressApp.get("/ping", (req, res) => {
    console.log("Запрос получен!");
    res.status(200).json({ message: "pong" });
  });
  applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

  expressApp.listen(PORT, () => {
    console.info("Server start at http://localhost:" + PORT);
  });
} catch (error) {
  console.error(error);
  void ctx?.stop();
}
  }
)()
