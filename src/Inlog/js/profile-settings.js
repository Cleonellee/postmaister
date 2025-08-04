import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://krlequgukidovnqmvjfr.supabase.co";
const SUPABASE_KEY = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGVxdWd1a2lkb3ZucW12amZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjAxMzI4NywiZXhwIjoyMDY3NTg5Mjg3fQ.3t0_8CA8EwYB0IxsI9cyEto_iuvyPYbXMgQGO48fDLQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
let userId = null;

// 🔁 Hämta användarens data när sidan laddas
window.addEventListener("DOMContentLoaded", async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "/Inlog/html/login.html";
    return;
  }

  userId = session.user.id;

  // Hämta användarens tidigare inställningar
  const { data: settings, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("id", userId)
    .single();

  if (settings) {
    document.getElementById("name").value = settings.name || "";
    document.getElementById("email").value = settings.email || "";
    document.getElementById("phone").value = settings.phone || "";
    document.getElementById("area").value = settings.area || "";
    document.getElementById("vehicle").value = settings.vehicle || "";
    document.getElementById("notify_email").checked = settings.notify_email || false;
    document.getElementById("notify_push").checked = settings.notify_push || false;
    document.getElementById("language").value = settings.language || "sv";
    document.getElementById("dark_mode").checked = settings.dark_mode || false;
  }
});

// 💾 När användaren klickar på "Spara Inställningar"
const form = document.getElementById("settings-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    area: document.getElementById("area").value,
    vehicle: document.getElementById("vehicle").value,
    notify_email: document.getElementById("notify_email").checked,
    notify_push: document.getElementById("notify_push").checked,
    language: document.getElementById("language").value,
    dark_mode: document.getElementById("dark_mode").checked,
  };

  if (!userId) {
    alert("Du måste vara inloggad.");
    return;
  }

  const { error } = await supabase.from("user_settings").upsert({
    id: userId,
    ...user,
  });

  if (error) {
    console.error(error);
    alert("Fel vid uppdatering av profil.");
  } else {
    alert("Inställningar sparade!");
  }
});

// 🚪 Logga ut-knapp
const logoutBtn = document.getElementById("logout-button");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Fel vid utloggning:", error.message);
    } else {
      window.location.href = "/Inlog/html/login.html";
    }
  });
}
