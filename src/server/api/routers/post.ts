import { useSupabaseRowLevelSecurity } from "@/prisma/extensions";
import { z } from "zod";
import { readUser } from "~/app/(auth)/actions";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createClient } from "~/utils/supabase/server";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const user = await readUser();

    if (!user.data.user) {
      return [];
    }

    console.log("user", user);

    const { success } = await ratelimit.limit(user.data.user?.id);

    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Rate limit exceeded",
      });
    }

    return await ctx.db
      .$extends(
        useSupabaseRowLevelSecurity({
          claimsFn: () => ({
            sub: user.data.user?.id,
          }),
        }),
      )
      .post.findMany();
  }),

  create: privateProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db
        .$extends(
          useSupabaseRowLevelSecurity({
            claimsFn: () => ({
              sub: ctx.userId,
            }),
          }),
        )
        .post.create({
          data: {
            name: input.name,
            creatorId: ctx.userId,
          },
        });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.$extends(useSupabaseRowLevelSecurity()).post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
