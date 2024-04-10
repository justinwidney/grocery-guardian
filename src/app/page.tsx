"use client";

import Link from "next/link";
import "~/styles/globals.css";

import { CreatePost } from "~/app/_components/create-post";

import { api } from "~/trpc/react";

import {
  DecorateProcedure,
  UseTRPCQueryResult,
} from "@trpc/react-query/shared";
import { appRouter } from "~/server/api/root";
import { Suspense } from "react";
import Image from "next/image";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingSpinner } from "~/components/icons/loading";
import { toast } from "~/components/ui/use-toast";
import { Toaster } from "~/components/ui/toaster";

dayjs.extend(relativeTime);

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2"></div>

        <Suspense fallback={<LoadingSpinner />}>
          <CrudShowcase />
        </Suspense>
      </div>
      <Toaster />
    </main>
  );
}

async function CrudShowcase() {
  //const latestPost = await api.post.getLatest();

  const { data, isError } = api.post.getAll.useQuery(void {}, {
    retry: 0,
  });

  if (isError) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <CreatePost />
      <div className="w-full max-w-xs">
        <div>
          {data?.map((post) => (
            <div key={post.id} className="flex items-center gap-2">
              <p>{post.name}</p>
              <p>{dayjs(post.createdAt).fromNow()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
