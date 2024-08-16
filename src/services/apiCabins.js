import supabase from "./supabase";

export default async function () {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return cabins;
}
