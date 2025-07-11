// import { useParams } from 'next/navigation'
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { blogComments } from '../../../../../db/schema';
import { db } from '../../../../../index';
import { redirect, RedirectType } from 'next/navigation';



export default async function DynamicRoute({params}) {
    const data = await db.select().from(blogComments).where(eq(blogComments.id, params.data));
    async function UpdateBlog(formData: FormData) {
    "use server";

    await db.update(blogComments)
    .set({
      title: formData.get("user"),
      commenter: formData.get("user"),
      comment: formData.get("message"),
      updated: true
      })
      .where(eq(blogComments.id, params.data));
      redirect(`/`, RedirectType.replace);
  }
  
    async function DeleteBlog() {
      "use server";
      await db.delete(blogComments).where(eq(blogComments.id, params.data));
      redirect('/', RedirectType.replace);

  }

// //   console.log('Blog Post deleted!')
  // await db.select().from(blogPosts).where(db`${blogPosts.id} = 1 and ${blogPosts.poster} = 'Miku'`);

  return (
    <div>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Edit your Comment</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Change the details of your Comment.</p>
          {data.map((info) => (
            <form key={info.id} action={UpdateBlog} className="space-y-8">
                <div>
                  <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>                
                  <input defaultValue={`${info.commenter}`} type="text" id="user" name="user" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="username" required></input>
                  <br/>
                  
                  <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Profile Picture Color:</label>                 
                  <button value="130" type="button" radioGroup="color" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
                  <button value="0" type="button" radioGroup="color" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Blue</button>
                  <button value="220" type="button" radioGroup="color" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
                  <button value="310" type="button" radioGroup="color" className="text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-teal-400 dark:hover:bg-teal-500 dark:focus:ring-teal-600">Teal</button>
                  <button value="180" type="button" radioGroup="color" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                  <button value="80" type="button" radioGroup="color" className="text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-200 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-400 dark:hover:bg-pink-500 dark:focus:ring-pink-600">Pink</button>
                  <button value="40" type="button" radioGroup="color" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
                    <br/>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
                        <textarea defaultValue={`${info.comment}`} id="message" name="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="blog"></textarea>
                    </div>
                </div>
                <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save Changes</button>
                <br/>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={DeleteBlog}>Delete Comment</button>
            </form>
          ))}
      </div>
    </div>
  )
}


