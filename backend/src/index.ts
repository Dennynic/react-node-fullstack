import express from 'express';
import {trpcRouter} from './trpc';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';

const PORT = 3005;

const expressApp =  express();
expressApp.use(cors());
expressApp.get("/ping", (req, res) => {
    console.log("Запрос получен!");  
    res.status(200).json({ message: "pong" });  
  });
expressApp.use('/trpc', trpcExpress.createExpressMiddleware({
    router: trpcRouter
}))

expressApp.listen(PORT, ()=>{
    console.info("Server start at http://localhost:"+PORT)
})
