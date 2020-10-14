import { Field, InputType, ObjectType } from 'type-graphql'
import { IsNotEmpty, IsIn, ValidateNested } from 'class-validator'

@ObjectType()
export class PageItem {
  @Field() type!: string
  @Field(() => Object) config!: any
}

@ObjectType()
export class Page {
  static readonly types = ['hero']

  @Field() readonly id!: string
  @Field() name!: string
  @Field(() => [PageItem]) items!: PageItem[]
}

@InputType()
export class PageItemInput {
  @Field() @IsIn(Page.types) type!: string
  @Field(() => Object) config!: any
}

@InputType()
export class PageInput {
  @Field() @IsNotEmpty() name!: string
  @Field(() => [PageItemInput]) @ValidateNested({each: true}) items!: PageItemInput[]
}
