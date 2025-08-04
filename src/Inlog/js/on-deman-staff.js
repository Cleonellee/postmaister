const SUPABASE_URL = "https://krlequgukidovnqmvjfr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybGVxdWd1a2lkb3ZucW12amZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjAxMzI4NywiZXhwIjoyMDY3NTg5Mjg3fQ.3t0_8CA8EwYB0IxsI9cyEto_iuvyPYbXMgQGO48fDLQ"; // använd din faktiska anon key

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadStaff() {
  const { data, error } = await supabase
    .from('on_demand_staff')
    .select('*')
    .order('area', { ascending: true });

  if (error) {
    console.error('Error:', error)
    return;
  }

  const list = document.getElementById('staff-list');
  list.innerHTML = '';

  data.forEach(row => {
    const div = document.createElement('div');
    div.className = 'schedule-row';
    div.innerHTML = `
      <div>${row.area}</div>
      <div>${row.zip_code}</div>
      <div>${row.vehicle}</div>
      <div>${row.extra}</div>
      <div>${row.available ? 'Tillgänglig' : 'Ej tillgänglig'}</div>
    `;
    list.appendChild(div);
  });
}

loadStaff();
