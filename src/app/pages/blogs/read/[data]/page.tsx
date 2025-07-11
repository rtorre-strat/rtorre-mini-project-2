// import { useParams } from 'next/navigation'
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { blogPosts, blogComments } from '../../../../../db/schema';
import { db } from '../../../../../index';
import Image from "next/image";
import Link from 'next/link';



export default async function DynamicRoute({params}) {
  const data = await db.select().from(blogPosts).where(eq(blogPosts.id, params.data));
  const comments = await db.select().from(blogComments).where(eq(blogComments.blogId, params.data));
  
  return (
    <div>
      <ul>
        {data.map((info) => (
          <div key={info.id} className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="pt-5 mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                      <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <Image className={`hue-rotate-${info.pfpColor}`}                          
                                              src="/user.png"
                                              width={50}
                                              height={50}
                                            alt="Picture of the author"
                                            />                           
                          <div className="pl-5">
                              <div>
                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{info.poster}</a>
                                    <Link className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button" href= { `/pages/blogs/edit/${info.id}` }>
                                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 25 4.03125 C 24.234375 4.03125 23.484375 4.328125 22.90625 4.90625 L 13 14.78125 L 12.78125 15 L 12.71875 15.3125 L 12.03125 18.8125 L 11.71875 20.28125 L 13.1875 19.96875 L 16.6875 19.28125 L 17 19.21875 L 17.21875 19 L 27.09375 9.09375 C 28.246094 7.941406 28.246094 6.058594 27.09375 4.90625 C 26.515625 4.328125 25.765625 4.03125 25 4.03125 Z M 25 5.96875 C 25.234375 5.96875 25.464844 6.089844 25.6875 6.3125 C 26.132813 6.757813 26.132813 7.242188 25.6875 7.6875 L 16 17.375 L 14.28125 17.71875 L 14.625 16 L 24.3125 6.3125 C 24.535156 6.089844 24.765625 5.96875 25 5.96875 Z M 4 8 L 4 28 L 24 28 L 24 14.8125 L 22 16.8125 L 22 26 L 6 26 L 6 10 L 15.1875 10 L 17.1875 8 Z"/></svg>
                                        <span className="sr-only">Blog settings</span>
                                    </Link>
                              </div>
                              <p className="text-base text-gray-500 dark:text-gray-400"><time>{`${info.datePosted}`}</time></p>
                          </div>
                      </div>
                  </address>
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{info.title}</h1>
              </header>
              <p className="lead">{info.post}</p>
            </article>
        </div>
        ))}
      </ul>

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
            <Link type="button" href={`/pages/blogs/createComment/${params.data}`} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Add a Comment</Link>
        </div>
        {comments.map((info) => (
        <article key={info.id} className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <Image className={`hue-rotate-${info.pfpColor}`}                          
                      src="/user.png"
                      width={30}
                      height={30}
                     alt="Picture of the author"
                     />  
                    <div className="pl-5 text-sm text-gray-600 dark:text-gray-400 mr-3">
                    <p>{info.commenter}</p>
                    <time>{`${info.datePosted}`}</time>
                    </div>
                </div>



                <Link className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button" href= { `/pages/blogs/editComment/${info.id}` }>
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 25 4.03125 C 24.234375 4.03125 23.484375 4.328125 22.90625 4.90625 L 13 14.78125 L 12.78125 15 L 12.71875 15.3125 L 12.03125 18.8125 L 11.71875 20.28125 L 13.1875 19.96875 L 16.6875 19.28125 L 17 19.21875 L 17.21875 19 L 27.09375 9.09375 C 28.246094 7.941406 28.246094 6.058594 27.09375 4.90625 C 26.515625 4.328125 25.765625 4.03125 25 4.03125 Z M 25 5.96875 C 25.234375 5.96875 25.464844 6.089844 25.6875 6.3125 C 26.132813 6.757813 26.132813 7.242188 25.6875 7.6875 L 16 17.375 L 14.28125 17.71875 L 14.625 16 L 24.3125 6.3125 C 24.535156 6.089844 24.765625 5.96875 25 5.96875 Z M 4 8 L 4 28 L 24 28 L 24 14.8125 L 22 16.8125 L 22 26 L 6 26 L 6 10 L 15.1875 10 L 17.1875 8 Z"/></svg>
                    <span className="sr-only">Comment settings</span>
                </Link>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{info.comment}.</p>
          </article>
        ))}
        </div>
        </section>
    </div>
  )
}
