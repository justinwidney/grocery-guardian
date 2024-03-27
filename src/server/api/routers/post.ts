import { useSupabaseRowLevelSecurity } from "@/prisma/extensions";
import { z } from "zod";
import { readUser } from "~/app/(auth)/actions";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "~/utils/supabase/server";

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

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const supabase = createClient();

      const user = await readUser();

      if (user.data.user) {
        return ctx.db.post.create({
          data: {
            name: input.name,
            creatorId: user.data.user?.id,
          },
        });
      } else {
        console.log("User is not a creator");
        return;
      }
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.$extends(useSupabaseRowLevelSecurity()).post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
