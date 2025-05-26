import { ideas } from "../../lib/ideas";
import { trpc } from "../../lib/trpc";
import { zCreayeIdeaTrpcInput } from "./input";

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreayeIdeaTrpcInput)
  .mutation(({ input }) => {
    const isNickAlready = !!ideas.find(idea => idea.nick === input.nick);
    if(isNickAlready){
        throw Error('Idea with this nick already exists');
    }
    ideas.unshift(input);
    return true;
  });
