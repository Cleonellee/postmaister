const startDate = new Date("2024-01-01");
const today = new Date();

// 🆕 Räkna endast vardagar mellan start och idag
function countWeekdays(start, end) {
  let count = 0;
  const current = new Date(start);

  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) { // 0 = söndag, 6 = lördag
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

const weekdaysPassed = countWeekdays(startDate, today);
const scheduleDay = weekdaysPassed % 4;

const schedulePages = ["a-schedule.html","b-schedule.html","c-schedule.html", "d-schedule.html"];


window.location.href = schedulePages[scheduleDay];



window.location.href = `/src/Inlog/html/${schedulePages[scheduleDay]}`;
function generateWeeklySchedule(startDate = new Date()) {
  const weekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];
  const schemaLabels = ["A", "B", "C", "D"];
  const schedule = [];

  // Start från måndag i aktuell vecka
  const monday = new Date(startDate);
  const day = monday.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // måndag = 1, söndag = 0l
  monday.setDate(monday.getDate() + diff);

  // Räkna ut vilken schemadag det är idag
  const baseDate = new Date("2024-01-01"); // startdatum för cykeln
  const daysSinceStart = Math.floor((monday - baseDate) / (1000 * 60 * 60 * 24));
  const startOffset = daysSinceStart % 4;

  for (let i = 0; i < 5; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    const scheduleIndex = (startOffset + i) % 4;
    const label = schemaLabels[scheduleIndex];

    schedule.push({
      datum: currentDate.toISOString().split("T")[0],
      veckodag: weekdays[i],
      schemadag: `${label}-dag`,
      färg: getColorForLabel(label)
    });
  }

  return schedule;
}

function getColorForLabel(label) {
  switch (label) {
    case "A": return "GUL";
    case "B": return "BLÅ";
    case "C": return "GRÖN";
    case "D": return "ORANGE";
    default: return "";
  }
}
