"use server";

import React from "react";
import { AuthForm } from "../components/AuthForm";
import readUserSession, { readUser } from "../actions";
import { redirect } from "next/navigation";
import { Toaster } from "~/components/ui/toaster";

export default async function page() {
  const { data } = await readUser();

  if (data.user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96">
        <AuthForm />
        <Toaster />
      </div>
    </div>
  );
}
