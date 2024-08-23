import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

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

export async function addCabin(cabin, id) {

  console.log(cabin, id);

  let cabinStore = supabase.from("cabins");
  const hasImageLink = Boolean(cabin.image?.startsWith?.(supabaseUrl));
  // creating or editing a cabin
  const imageName = `${Math.random()}-${cabin.image?.name}`.replace("/", "");
  const imagePath =  hasImageLink ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;
  // https://ucudndobpeseexpnblkn.supabase.co/storage/v1/object/public/cabin-image/cabin-001.jpg

  // CREATE CABIN
  if (!id)
    cabinStore = cabinStore.insert([{ ...cabin, image: imagePath }]);
  // EDIT CABIN
  if (id)
    cabinStore = cabinStore.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await cabinStore.select().single();
  
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (hasImageLink) return data;
  // upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-image")
    .upload(imageName, cabin.image);

  if (storageError) {
    console.log(storageError);
    await cabinStore.delete().eq("id", data.id);
    throw new Error("Couldn't upload the cabin image");
  }

  return data;
}
