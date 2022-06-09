import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType('User')
export class UserDto {
  @Field(() => Int)
  public readonly id: number;

  @Field()
  readonly email: string;

  @Field()
  readonly name: string;

  @Field()
  readonly lastLoginAt: Date;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}