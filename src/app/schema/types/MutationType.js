import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: (_, args) => 'Hello',
    },
  }),
});
