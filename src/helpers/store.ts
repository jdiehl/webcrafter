import { CollectionStore } from '../stores/Collection'
import { MongoStore } from '../stores/MongoCollection'

export function buildStore(url: URL): CollectionStore {
  switch (url.protocol) {
    case 'mongodb:': return new MongoStore(url)
    default: throw new Error(`Invalid DB URL: ${url}`)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildCollections(target: any, store: CollectionStore, keys: string[]): void {
  for (const key of keys) {
    target[key] = store.collection(key)
  }
}
