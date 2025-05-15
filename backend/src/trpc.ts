import { initTRPC } from "@trpc/server";
import _ from "lodash";
import { loremIpsum, ILoremIpsumParams } from 'lorem-ipsum';
import {z} from 'zod';

const loremOptions: ILoremIpsumParams = {
  count: Math.floor(Math.random() * 7) + 3, 
  units: 'sentences', 
  sentenceLowerBound: 5, 
  sentenceUpperBound: 15, 
  format: "html", 
  random: Math.random 
};

const ideas = _.times(100, (i) => ({
      nick: `cool-idea-nick-${i}`,
       name: `Idea ${i}`,
       description: `Description Idea ${i}`,
       text: loremIpsum(loremOptions)
}))

const trpc = initTRPC.create();
export const trpcRouter = trpc.router({
    getIdeas: trpc.procedure.query(() => {
        return {ideas: ideas.map(i => _.pick(i, ['nick', 'name', 'description']))};
    }),
    getIdea: trpc.procedure.input(
      z.object({
        ideaNick: z.string()
      })
    ).query(({input})=>{
      const idea = ideas.find((idea)=> idea.nick === input.ideaNick)
      return {idea: idea || null}
    })
});

export type TrpcRouter = typeof trpcRouter;