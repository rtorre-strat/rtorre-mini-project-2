import 'dotenv/config';
import { db } from '../index';
import { blogPosts } from '../db/schema';
import Image from "next/image";
import Link from 'next/link';

export default async function Page() {
  const data = await db.select().from(blogPosts);
  console.log('Getting all Blog Posts from the database: ', data)

  return (
    <div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
            <br/>
            <Link type="button" href="/pages/blogs/create" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Make a new Blog Post</Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data.map((info) => (
              <Link key={info.id} href= { `/pages/blogs/read/${info.id}` }>
                <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition transform hover:dark:bg-gray-900 hover:scale-105 scale-100">
                  <div className="flex justify-between items-center mb-5 text-gray-500">
                    <time className="text-gray-500">{`${info.datePosted}`}</time>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{info.title}</h2>
                  <p className="line-clamp-5 min-h-30 max-h-20 mb-5 font-light text-gray-500 dark:text-gray-400">{info.post}</p>
                  <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Image className={`hue-rotate-${info.pfpColor}`}                          src="/user.png"
                          width={55}
                          height={55}
                          alt="Picture of the author"
                        />                          
                      <span className="font-medium dark:text-white">
                              {info.poster}
                          </span>
                      </div>
                      <div className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                          Read more
                          <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      </div>
                  </div>
              </article>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
