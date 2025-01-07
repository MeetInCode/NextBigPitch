import { auth } from "@/auth";
import SearchForm from "@/components/searchform";
import StartupCard,{startupcardtype} from "@/components/startupcard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

/*searchParams is passed as a prop. It's a Promise that resolves to an object containing an optional query string.
The query parameter likely comes from the URL, e.g., https://example.com?query=AI+Startup.*/ 
export default async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query;
  const params = {search : query || null };

  const session = await auth();
  console.log(session ? session.id : "No session ID")
  const posts = await sanityFetch({ query: STARTUPS_QUERY,params });
  console.log(posts)

  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch your startup idea 🚀<br />
        build your network 🌐</h1>
      <p className="sub-heading !max-w-4xl"> submit ideas, vote on pitches and get noticed in virtual competitions</p>
      <SearchForm query={query} ></SearchForm>
    </section>

    <section className="section_container">
      <p className="text-30-semibold">{query ? `search results for "${query}"` : "All startups"}</p>
      <ul className="card_grid">
      {posts.data.length > 0 ? (
       posts.data.map((post: startupcardtype)=> (
        <StartupCard key={post?._id} post={post} />
       ) )
          
      
      ) : (
        <p>No posts available</p>
      )}
        </ul>
    </section>

    <SanityLive/  >
    </>
  );
}


/*
how it works 
User Accesses the Page

URL Example:
https://example.com (no query parameter)
OR https://example.com?query=AI+Startup (with a query parameter).
The Home component is rendered by Next.js.
Fetching the query Parameter

Next.js passes the searchParams as a promise to the Home component.
The promise resolves to the query parameters in the URL. For example:
If URL is https://example.com?query=AI+Startup, then searchParams resolves to { query: "AI Startup" }.
If no query is provided (https://example.com), then searchParams resolves to {}.
Query Extraction


const query = (await searchParams).query;
The query is extracted from the resolved object.
It could be a string (e.g., "AI Startup") or undefined if no query is provided.
Rendering the Page

The Home component renders:
Static content (heading, subheading).
The SearchForm component with the query passed as a prop.
The SearchForm pre-fills the input field with the value of query (if present).
 */