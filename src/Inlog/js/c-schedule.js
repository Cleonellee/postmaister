const SUPABASE_URL = "https://krlequgukidovnqmvjfr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGVxdWd1a2lkb3ZucW12amZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjAxMzI4NywiZXhwIjoyMDY3NTg5Mjg3fQ.3t0_8CA8EwYB0IxsI9cyEto_iuvyPYbXMgQGO48fDLQ";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadSchedule() {
  const { data, error } = await supabase
    .from("c_schedule")
    .select("*")
    .order("time", { ascending: true });

  const container = document.getElementById("schedule-rows");
  if (error) {
    container.innerHTML = "<p>Kunde inte ladda schema.</p>";
    console.error(error);
    return;
  }

  data.forEach(row => {
    const el = document.createElement("div");
    el.classList.add("schedule-row");
    el.innerHTML = `
      <div>${row.time}</div>
      <div>${row.area}</div>
      <div>${row.zip_code}</div>
      <div>${row.vehicle}</div>
      <div>${row.main || '-'}</div>
      <div>${row.extra || '-'}</div>
    `;
    container.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", loadSchedule);
