import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// DINA SUPABASE-uppgifter
const supabase = createClient(
  "https://krlequgukidovnqmvjfr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGVxdWd1a2lkb3ZucW12amZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjAxMzI4NywiZXhwIjoyMDY3NTg5Mjg3fQ.3t0_8CA8EwYB0IxsI9cyEto_iuvyPYbXMgQGO48fDLQ"
);

//  Generera unikt anställnings-ID
function generateEmployeeId() {
  return "EMP-" + Math.floor(100000 + Math.random() * 900000);
}

window.signUp = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  // Rätt: endast ett signUp-anrop med redirect
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://127.0.0.1:5500/Inlog/html/verify.html"
    }
  });

  if (signUpError) {
    alert("Registrering misslyckades: " + signUpError.message);
    return;
  }

  // Användaren måste verifiera sin e-post – därför: vänta med profilskapande
  alert("Konto skapat! Kontrollera din e-post för att bekräfta.");
  window.location.href = "/Inlog/html/login.html";
};
