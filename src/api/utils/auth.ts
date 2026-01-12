import { createClient } from "@/utils/supabase/server";
import { UserService } from "../features/users/users.service";

export async function getAuthUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Supabase Auth Error:", error);
  }
  if (!user) {
    console.error("Supabase Auth: No user session found");
  }

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email!,
    name: user.user_metadata?.name || user.user_metadata?.full_name,
  };
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Ensure the user exists in our local database
  await UserService.ensureUserExists(user);

  return user.id;
}
