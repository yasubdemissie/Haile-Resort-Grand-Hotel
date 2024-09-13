import toast from "react-hot-toast";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function login({ userEmail, userPassword }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: Session } = await supabase.auth.getSession();
  if (!Session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Unable to log out");
}

export async function signUp({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error("Could not sign up the user");

  return data;
}

export async function updateUserData({ avatar, password, fullName }) {
  let updatedData;
  if (fullName) updatedData = { data: { fullName: fullName } };
  if (password) updatedData = { password: password };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error("Could not update the user");

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error("Could not upload avatar");
  const filePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  updatedData = { data: { avatar: filePath } };

  // https://ucudndobpeseexpnblkn.supabase.co/storage/v1/object/public/avatars/20220813_121713.jpg?t=2024-09-10T16%3A44%3A29.038Z

  const { data: updateUser, error: error2 } = await supabase.auth.updateUser(
    updatedData
  );

  if (error2) throw new Error("Error updating user avatar url");

  return updateUser;
}
