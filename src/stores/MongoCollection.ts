import { ObjectId, MongoClient, Db as MongoDb, Collection as MongoDBCollection } from 'mongodb'
import { Collection, CollectionStore } from './Collection'

export class MongoCollection<T> implements Collection<T> {

  constructor(private collection: MongoDBCollection) {}

  async find(): Promise<T[]> {
    const docs = await this.collection.find().toArray()
    return docs.map(doc => this.convert(doc))
  }

  async findOne(id: string): Promise<T> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id) })
    if (!doc) throw new Error(`Could not find document with id ${id}`)
    return this.convert(doc)
  }

  async create(input: Partial<T>): Promise<T> {
    const { insertedId } = await this.collection.insertOne(input)
    const doc = await this.findOne(insertedId)
    if (!doc) throw new Error(`Could not create document`)
    return doc
  }

  async update(id: string, input: Partial<T>): Promise<T> {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: input })
    const doc = await this.findOne(id)
    if (!doc) throw new Error(`Could not update document with id ${id}`)
    return doc
  }

  async delete(id: string): Promise<void> {
    const { deletedCount } = await this.collection.deleteOne({ _id: new ObjectId(id) })
    if (deletedCount !== 1) throw new Error(`Could not delete document with id ${id}`)
  }

  private convert(doc: T): T {
    (doc as any).id = (doc as any)._id.toString()
    return doc
  }

}

export class MongoStore implements CollectionStore {
  private client!: MongoClient
  private db!: MongoDb

  constructor(private url: URL) {}

  async start(): Promise<void> {
    this.client = await MongoClient.connect(this.url.toString(), { useUnifiedTopology: true, useNewUrlParser: true })
    this.db = this.client.db()
  }

  async stop(): Promise<void> {
    return this.client.close()
  }

  collection<T>(name: string): Collection<T> {
    return new MongoCollection(this.db.collection(name))
  }

}
