const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.sendReset = async function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Password reset email sent.");
  }
};
