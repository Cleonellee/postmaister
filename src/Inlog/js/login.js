const SUPABASE_URL = "https://krlequgukidovnqmvjfr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGVxdWd1a2lkb3ZucW12amZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjAxMzI4NywiZXhwIjoyMDY3NTg5Mjg3fQ.3t0_8CA8EwYB0IxsI9cyEto_iuvyPYbXMgQGO48fDLQ";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

window.login = async function () {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    alert("Logged in successfully!");
    // Här kan du skicka vidare till dashboard:
    window.location.href = "/src/Inlog/html/dashboard.html";
  }
};

window.register = async function () {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Registration failed: " + error.message);
  } else {
    alert("Account created. Check your email.");
  }
};

window.forgotPassword = async function () {
  const email = document.getElementById("username").value;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    alert("Error sending reset email: " + error.message);
  } else {
    alert("Password reset email sent!");
  }
};


