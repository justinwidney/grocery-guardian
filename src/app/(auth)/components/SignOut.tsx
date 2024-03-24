import { Button } from "~/components/ui/button";
import { createClient } from "~/utils/supabase/server";

export default function SignOut() {
  const logout = async () => {
    "use server";
    const supabase = await createClient();
  };

  return (
    <div>
      <h1>SignOut</h1>
      <Button>Sign Out</Button>
    </div>
  );
}
