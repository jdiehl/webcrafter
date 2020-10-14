import { Service } from 'typedi'
import { Collection, CollectionStore } from '../stores/Collection'
import { Menu } from '../models'
import { Config } from './Config'
import { buildCollections, buildStore } from '../helpers/store'

@Service()
export class Store {
  menu!: Collection<Menu>

  private store: CollectionStore

  constructor(config: Config) {
    this.store = buildStore(config.db)
  }

  async start(): Promise<void> {
    await this.store.start()
    buildCollections(this, this.store)
  }

  async stop(): Promise<void> {
    await this.store.stop()
  }

}
