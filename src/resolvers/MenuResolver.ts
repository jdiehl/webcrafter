import { Resolver, Query, Arg } from 'type-graphql'
import { Menu, MenuItem } from '../models'

const store: any = {}

@Resolver()
export class MeasurementExtension {

  @Query(() => [Menu])
  async menus(): Promise<Menu[]> {
    return store.menu.find()
  }

}
