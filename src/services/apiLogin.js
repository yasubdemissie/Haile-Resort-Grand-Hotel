import supabase from "./supabase"

export async function login({ userEmail, userPassword }) {
    
let { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  })

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
  
}