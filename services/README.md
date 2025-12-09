
CREATE A NEW RESOURCE MODULE 'post' for REST API
https://www.elvisduru.com/blog/build-rest-api-with-nestjs-mongodb-mongoose

1. Define the initial structure
nest generate res posts

2. Defining the schema for the data:
You can create your schema in the path src/posts/schemas/post.schema.ts

```
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
```
3. Modify the posts/posts.module.ts to add the post controller and service.

