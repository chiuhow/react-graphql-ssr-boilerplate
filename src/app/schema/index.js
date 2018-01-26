import { GraphQLSchema } from 'graphql';
import query from './types/QueryType';
import mutation from './types/MutationType';

export default new GraphQLSchema({
  query,
  mutation,
});
