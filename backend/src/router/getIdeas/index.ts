import { trpc } from "../../lib/trpc";
import _ from "lodash";

export const getIdeasTrpcRoute = trpc.procedure.query(async ({ctx}) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      name: true,
      nick: true,
      description: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
 
  return {ideas}
})
