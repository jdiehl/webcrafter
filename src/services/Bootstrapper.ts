import { Service } from 'typedi'
import { Config } from './Config'
import { Server } from './Server'
import { Store } from './Store'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json')

@Service()
export class Bootstrapper {

  constructor(private config: Config, private server: Server, private store: Store) {}

  async start(): Promise<void> {
    await this.store.start()
    await this.server.start()
    this.logStart()
  }

  async stop(): Promise<void> {
    await this.server.stop()
    await this.store.stop()
  }

  private logStart() {
    console.log(`${pkg.name} (v${pkg.version}) started...`)
    console.log(`  PORT=${this.config.port}`)
    console.log(`  DB=${this.config.db}`)
  }

}
