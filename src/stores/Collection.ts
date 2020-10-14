export interface Collection<T> {
  find(): Promise<T[]>
  findOne(id: string): Promise<T>
  create(input: Partial<T>): Promise<T>
  update(id: string, input: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}

export interface CollectionStore {
  start(): Promise<void>
  stop(): Promise<void>
  collection<T>(name: string): Collection<T>
}
