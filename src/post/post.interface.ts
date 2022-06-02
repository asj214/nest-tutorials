import { UserData } from "src/user/user.interface";
import { PostEntity } from "./entities/post.entity";

interface PostData {
  id: number;
  title: string;
  body?: string;
  createdAt?: Date
  updatedAt?: Date
  user?: UserData;
}

export interface PostRO {
  post: PostEntity;
}

export interface PostsRO {
  posts: PostEntity[];
  count: number;
}
