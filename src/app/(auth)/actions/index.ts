"use server";

import { createClient } from "~/utils/supabase/server";

export default async function readUserSession() {
  const supabase = createClient();
  return supabase.auth.getSession();
}

export async function readUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}
