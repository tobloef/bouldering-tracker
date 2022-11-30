import { supabase } from "./supabaseClient";
import {
  AnyAttempt,
  Attempt,
  toDbFormat,
} from "./attempt";
import { GymName } from "./gyms";

export type GetAttemptsResponse = Awaited<ReturnType<typeof getAttempts>>

export type DbAttempt = Exclude<GetAttemptsResponse["data"], null>[number];

export async function getAttempts() {
  return supabase
    .from('attempts')
    .select('*');
}

export async function deleteAttempt(id: number) {
  return supabase
    .from('attempts')
    .delete()
    .eq("id", id);
}

export async function createAttempt(attempt: Omit<Attempt<GymName>, "userId" | "id">) {
  const session = await supabase.auth.getSession();
  const userId = session.data.session?.user.id;

  if (userId == null) {
    throw new Error("User session is invalid");
  }

  return supabase
    .from('attempts')
    .insert(toDbFormat({
      ...attempt,
      userId,
    }));
}
