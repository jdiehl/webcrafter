import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class MenuItem {
  @Field() title!: string
  @Field() link!: string
}

@ObjectType()
export class Menu {
  @Field() readonly id!: string
  @Field() name!: string
  @Field(() => [MenuItem]) items!: MenuItem[]
}
