import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function addCabin(cabin) {
  
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
