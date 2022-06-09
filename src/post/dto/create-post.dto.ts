import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class CreatePostDto {
  @Field(() => ID)
  public readonly id!: number;
  @Field()
  readonly title: string;
  @Field()
  readonly body: string;
}
