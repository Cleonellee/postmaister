let currentMonday = getMonday(new Date()); // globalt startvärde

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function getDayName(index) {
  return ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"][index];
}

function getSchemaType(startDate, offset) {
  const baseDate = new Date("2025-07-31"); // B-dag referens
  const current = new Date(startDate);
  current.setDate(current.getDate() + offset);

  const diffDays = Math.floor((current - baseDate) / (1000 * 60 * 60 * 24));
  const weekdaysPassed = countWeekdaysBetween(baseDate, current);
  const cycleIndex = (weekdaysPassed + 1) % 4;

  return ["A", "B", "C", "D"][cycleIndex];
}

function getColorClass(type) {
  return {
    A: "yellow",
    B: "blue",
    C: "green",
    D: "orange"
  }[type] || "";
}

function countWeekdaysBetween(start, end) {
  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

function generateWeekSchedule(startDate) {
  const container = document.getElementById("week-schedule");
  container.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dayName = getDayName(i);
    const type = getSchemaType(startDate, i);
    const colorClass = getColorClass(type);

    const block = document.createElement("div");
    block.className = `day-block ${colorClass}`;
    block.innerHTML = `
      <h3>${dayName} (${date.toLocaleDateString("sv-SE")})</h3>
      <p>${type}-dag – Områden: ${type}1 till ${type}15</p>
    `;
    container.appendChild(block);
  }
}

document.getElementById("prev-week").addEventListener("click", () => {
  currentMonday.setDate(currentMonday.getDate() - 7);
  generateWeekSchedule(currentMonday);
});

document.getElementById("next-week").addEventListener("click", () => {
  currentMonday.setDate(currentMonday.getDate() + 7);
  generateWeekSchedule(currentMonday);
});

generateWeekSchedule(currentMonday);
