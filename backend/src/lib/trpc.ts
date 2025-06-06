import { initTRPC } from "@trpc/server";
import { Express } from "express";
import { type TrpcRouter } from "../router";
import * as trpcExpress from '@trpc/server/adapters/express';
import { AppContext } from "./ctx";

export const trpc = initTRPC.context<AppContext>().create();
export const applyTrpcToExpressApp = (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouter,
) => {
  return expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  );
};
