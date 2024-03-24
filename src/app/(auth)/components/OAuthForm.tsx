"use client";

import { Button } from "@/src/components/ui/button";
import React from "react";
import { createClient } from "../utils";

export default function OAuthForm() {
  const LoginWithGithub = async () => {
    const supabase = createClient();

    console.log(`Location.origin: ${window.location.origin}`);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
  };

  return (
    <Button onClick={LoginWithGithub} className="w-full">
      Login With Github
    </Button>
  );
}
