import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 DINA SUPABASE-uppgifter
const supabase = createClient(
  "https://krlequgukidovnqmvjfr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGVxdWd1a2lkb3ZucW12amZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjAxMzI4NywiZXhwIjoyMDY3NTg5Mjg3fQ.3t0_8CA8EwYB0IxsI9cyEto_iuvyPYbXMgQGO48fDLQ"
);

async function loadUserName() {
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/src/Inlog/html/login.html"; // Skicka till login om inte inloggad
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    document.getElementById("full_name").textContent = "Okänd användare";
  } else {
    document.getElementById("full_name").textContent = `Välkommen, ${profile.full_name}`;
  }
}

loadUserName();

// Öppna meny
document.querySelector(".menu-icon").addEventListener("click", () => {
  const menu = document.getElementById("menu-dropdown");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Stäng meny via kryss
document.getElementById("close-menu").addEventListener("click", () => {
  document.getElementById("menu-dropdown").style.display = "none";
});

// Logga ut-knapp
document.getElementById("logout-button").addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Fel vid utloggning: " + error.message);
  } else {
    window.location.href = "/src/Inlog/html/login.html";
  }
});
