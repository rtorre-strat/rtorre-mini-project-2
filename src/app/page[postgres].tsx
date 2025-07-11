import postgres from 'postgres';

export type blogs = {
  id: string;
  message: string;
}
const sql = postgres('postgresql://neondb_owner:npg_yH91KmSkhBrw@ep-dark-silence-a1yf0dx1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { ssl: 'require' });

async function getData() {
  const response = await sql`SELECT * FROM blogPosts`;
  return response as unknown as blogs[];
}

// async function submitInfo(message: string) {
//   await sql("INSERT INTO blogs VALUES ${message};");
// }

export default async function Page() {
  const data = await getData();

  async function create(formData: FormData) {
    "use server";
    const message = formData.get("message");
    await sql`INSERT INTO blogs (message) VALUES (${message})`;
  }

  return (
    <div>
      <ul>
        {data.map((info) => (
          <li key={info.id}>{info.message}</li>
        ))}
      </ul>
      {/* <p>This is my house y&apos;all!</p>
      <>{data.map(home => <div>{home.message}</div>)}</> */}
      <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
          <form action={create} className="space-y-8">
              <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
                  <input type="text" id="message" name="message" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required>
                  </input>
              </div>
              <button type="submit">Send message</button>
          </form>
      </div>
      </section>
    </div>
  );
}
