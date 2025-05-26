import { ideas } from "../../lib/ideas";
import { trpc } from "../../lib/trpc";
import _ from "lodash";

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((i) => _.pick(i, ["nick", "name", "description"])),
  };
});
