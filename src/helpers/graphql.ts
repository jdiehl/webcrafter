import { resolve } from 'path'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, AuthChecker } from 'type-graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { Container } from 'typedi'

export class JSONObject {}

export async function buildApolloServer(authChecker?: AuthChecker): Promise<ApolloServer> {
  const resolvers: any = [resolve(__dirname, '../resolvers/**/*.ts')]
  const container = Container
  const scalarsMap = [{ type: Object, scalar: GraphQLJSON }]

  // build the graphql schema
  const schema = await buildSchema({ resolvers, authChecker, container, scalarsMap })

  // create the apollo server
  return new ApolloServer({ schema })
}
