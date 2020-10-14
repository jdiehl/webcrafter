import http from 'http'
import { AddressInfo } from 'net'
import { Service } from 'typedi'
import { buildExpressServer } from '../helpers/express'
import { buildApolloServer } from '../helpers/graphql'

@Service()
export class Server {
  private server?: http.Server

  // get the server address
  get address(): AddressInfo {
    return this.server?.address() as AddressInfo
  }

  // start the server
  async start(): Promise<void> {

    // build express app
    const app = await buildExpressServer()

    // build and attach apollo server
    const apollo = await buildApolloServer()
    apollo.applyMiddleware({ app })

    // start listening
    return new Promise((resolve) => {
      this.server = app.listen(process.env.PORT || 3000, resolve)
    })
  }

  // stop the server
  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) return
      this.server.close(err => err ? reject(err) : resolve())
    })
  }

}
