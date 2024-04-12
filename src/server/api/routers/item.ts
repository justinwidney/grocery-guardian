import { useSupabaseRowLevelSecurity } from "@/prisma/extensions";
import { z } from "zod";
import { readUser } from "~/app/(auth)/actions";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters
import { TRPCError } from "@trpc/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const item_ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        take: z.number(),
        skip: z.number().optional(),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await readUser();

      if (!user.data.user) {
        throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });
      }

      console.log("user", user);

      const { success } = await item_ratelimit.limit(user.data.user?.id);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Rate limit exceeded",
        });
      }

      const items = await ctx.db
        .$extends(
          useSupabaseRowLevelSecurity({
            claimsFn: () => ({
              sub: user.data.user?.id,
            }),
          }),
        )
        .item.findMany({
          take: input.limit + 1,
          skip: input.skip,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: { id: "asc" },
        });

      console.log("items", items, items.length);

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (items.length > input.limit) {
        const lastItem = items.pop();
        nextCursor = lastItem?.id;
        console.log("nextCursor", nextCursor);
      }
      return {
        items,
        nextCursor,
      };
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
});
