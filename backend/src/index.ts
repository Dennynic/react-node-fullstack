import express from 'express';
import {trpcRouter} from './router';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';

const PORT = 3005;

const expressApp =  express();
expressApp.use(cors());
expressApp.get("/ping", (req, res) => {
    console.log("Запрос получен!");  
    res.status(200).json({ message: "pong" });  
  });
applyTrpcToExpressApp(expressApp, trpcRouter);


expressApp.listen(PORT, ()=>{
    console.info("Server start at http://localhost:"+PORT)
})
