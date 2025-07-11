import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/neon-http';
// import { eq } from 'drizzle-orm';
// import { blogPosts } from './db/schema';
  
// const db = drizzle(process.env.DATABASE_URL!);

// async function main() {

//     //INSERT
//   const user: typeof blogPosts.$inferInsert = {
//     poster: 'John',
//     post: 'Hello World',
//   };

//   await db.insert(blogPosts).values(user);
//   console.log('New Blog Post created!')


//   //SELECT 
//   const blogs = await db.select().from(blogPosts);
//   console.log('Getting all Blog Posts from the database: ', blogs)
//   /*
//   const users: {
//     id: number;
//     poster: string;
//     post: string;
//   }[]
//   */

//   //UPDATE
//   await db
//     .update(blogPosts)
//     .set({
//       poster: "Miku",
//     })
//     .where(eq(blogPosts.post, user.post));
//   console.log('Blog Post info updated!')

// //   //DELETE
// //   await db.delete(blogPosts).where(eq(blogPosts.post, user.post));
// //   console.log('Blog Post deleted!')
// }

// main();
