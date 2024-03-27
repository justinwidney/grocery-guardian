"use server";

import React from "react";
import { AuthForm } from "../components/AuthForm";
import readUserSession, { readUser } from "../actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createClient } from "~/utils/supabase/server";

export default async function page() {
  const { data } = await readUser();

  if (data.user) {
    redirect("/");
  }

  const supabase = await createClient();

  const posts = await supabase.from("post").select("*");

  console.log(posts, "my posts");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96">
        <AuthForm />
      </div>
    </div>
  );
}
