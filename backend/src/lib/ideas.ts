import _ from "lodash";
import { loremIpsum, ILoremIpsumParams } from 'lorem-ipsum';

const loremOptions: ILoremIpsumParams = {
  count: Math.floor(Math.random() * 7) + 3, 
  units: 'sentences', 
  sentenceLowerBound: 5, 
  sentenceUpperBound: 15, 
  format: "html", 
  random: Math.random 
};

export const ideas = _.times(100, (i) => ({
      nick: `cool-idea-nick-${i}`,
       name: `Idea ${i}`,
       description: `Description Idea ${i}`,
       text: loremIpsum(loremOptions)
}))