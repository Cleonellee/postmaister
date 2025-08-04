const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.resetPassword = async function () {
  const newPassword = document.getElementById("new-password").value;

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Password updated!");
    window.location.href = "login.html";
  }
};
