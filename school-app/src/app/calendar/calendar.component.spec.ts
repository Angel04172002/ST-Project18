const events = [];

function addEvent() {
  const name = document.getElementById("event-name").value;
  const date = document.getElementById("event-date").value;
  const time = document.getElementById("event-time").value;

  const event = {
    id: events.length + 1,
    name,
    date,
    time,
  };

  events.push(event);

  updateCalendar();
}

function updateCalendar() {
  const calendarTable = document.querySelector(".calendar table tbody");
  calendarTable.innerHTML = "";
  for (const event of events) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${event.date}</td>
      <td>${event.name}</td>
      <td>${event.time}</td>
      <td>
        <button onclick="deleteEvent(${event.id})">Изтрий</button>
      </td>`;
    calendarTable.appendChild(tr);
  }
}

function deleteEvent(id) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) {
      events.splice(i, 1);
      break;
    }
  }

  updateCalendar();
}
