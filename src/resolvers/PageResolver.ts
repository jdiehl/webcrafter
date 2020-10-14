import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Store } from '../services/Store'
import { Page, PageInput } from '../models'

@Resolver()
export class MeasurementExtension {

  constructor(private store: Store) {}

  @Query(() => [Page])
  async pages(): Promise<Page[]> {
    return this.store.page.find()
  }

  @Query(() => Page)
  async page(@Arg('id') id: string): Promise<Page> {
    return this.store.page.findOne(id)
  }

  @Mutation(() => Page)
  async createPage(@Arg('input') input: PageInput): Promise<Page> {
    return this.store.page.create(input)
  }

  @Mutation(() => Page)
  async updatePage(@Arg('id') id: string, @Arg('input') input: PageInput): Promise<Page> {
    return this.store.page.update(id, input)
  }

  @Mutation(() => Boolean)
  async deletePage(@Arg('id') id: string): Promise<boolean> {
    await this.store.page.delete(id)
    return true
  }

}
