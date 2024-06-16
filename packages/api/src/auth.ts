import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { GitHub, Google } from "arctic"
import { Lucia, TimeSpan } from "lucia"
import { createDate } from "oslo"
import { alphabet, generateRandomString } from "oslo/crypto"
import { db } from "@acme/db/client"
import {
   emailVerificationCodes,
   sessions,
   type User,
   users,
} from "@acme/db/schema/users"
import { env } from "./env"
import { getCookie } from "hono/cookie"
import type { Context } from "hono"
import { eq } from "@acme/db"

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET)
export const google = new Google(
   env.GOOGLE_CLIENT_ID,
   env.GOOGLE_CLIENT_SECRET,
   env.VITE_SERVER_URL + "/login/google/callback"
)

export const initLucia = () => {
   const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

   const lucia = new Lucia(adapter, {
      sessionCookie: {
         attributes: {
            secure: env.NODE_ENV === "production",
         },
      },
      getUserAttributes: (attributes) => {
         return {
            id: attributes.id,
            email: attributes.email,
            avatarUrl: attributes.avatarUrl,
            firstName: attributes.firstName,
            emailVerified: attributes.emailVerified,
         }
      },
   })

   return lucia
}

export const lucia = initLucia()

export const getAuthSession = async (c: Context) => {
   const sessionId = getCookie(c, lucia.sessionCookieName) ?? null

   if (!sessionId) return { user: null, session: null }

   const { session, user } = await lucia.validateSession(sessionId)

   if (session?.fresh) {
      c.header(
         "Set-Cookie",
         lucia.createSessionCookie(session.id).serialize(),
         {
            append: true,
         }
      )
   }
   if (!session) {
      c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
         append: true,
      })
   }

   return { user, session }
}

export const generateEmailVerificationCode = async ({
   tx,
   userId,
   email,
}: {
   tx: typeof db
   userId: string
   email: string
}) => {
   await tx
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.email, email))

   const code = generateRandomString(6, alphabet("0-9"))

   await tx.insert(emailVerificationCodes).values({
      userId,
      email,
      code,
      expiresAt: createDate(new TimeSpan(5, "m")), // 5 minutes
   })

   return code
}

export type Session = Awaited<ReturnType<typeof getAuthSession>>

declare module "lucia" {
   interface Register {
      Lucia: typeof lucia
      DatabaseUserAttributes: User
   }
}
