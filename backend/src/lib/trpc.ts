import { initTRPC } from "@trpc/server";
import { Express } from "express";
import { type TrpcRouter } from "../router";
import * as trpcExpress from '@trpc/server/adapters/express';

export const trpc = initTRPC.create();
export const applyTrpcToExpressApp = (
  expressApp: Express,
  trpcRouter: TrpcRouter
) => {
  return expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  );
};
