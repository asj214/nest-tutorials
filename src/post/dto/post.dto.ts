import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserDto } from "src/user/dto/user.dto";

@ObjectType('PostDetail')
export class PostDto {
  @Field(() => Int)
  public readonly id: number;

  @Field(() => UserDto)
  public user?: UserDto;

  @Field()
  readonly title: string;

  @Field()
  readonly body: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
