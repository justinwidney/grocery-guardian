"use server";

import { createClient } from "~/utils/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = createClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

export async function logInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}
