import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeclient";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  // Callbacks are functions that are executed after successful authentication by NextAuth
  callbacks: {
    // The signIn callback is called whenever a user signs in
    async signIn({
      user: { name, email, image },
      profile,
    }) {
      // If there is no profile, return false to deny access
      if (!profile) {
        return false;
      }

      const { id, login, bio } = profile;

      // Check if the user already exists in the database
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      // If the user does not exist, create a new user in the database
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      // Return true to allow the sign-in
      return true;
    },
    // The jwt callback is called whenever a JWT token is created or updated
    async jwt({ token, account, profile }) {
      // If account and profile are available, fetch the user from the database
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        // Add the user's ID to the token
        token.id = user?._id;
      }

      // Return the token
      return token;
    },
    // The session callback is called whenever a session is checked or created
    async session({ session, token }) {
      // Add the user's ID from the token to the session
      Object.assign(session, { id: token.id });
      // Return the session
      return session;
    },
  },
})