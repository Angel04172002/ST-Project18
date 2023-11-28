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


//Календар изглед
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document
	.querySelector(".calendar-current-date");

const prenexIcons = document
	.querySelectorAll(".calendar-navigation span");

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const manipulate = () => {


	let dayone = new Date(year, month, 1).getDay();


	let lastdate = new Date(year, month + 1, 0).getDate();


	let dayend = new Date(year, month, lastdate).getDay();


	let monthlastdate = new Date(year, month, 0).getDate();


	let lit = "";


	for (let i = dayone; i > 0; i--) {
		lit +=
			`<li class="inactive">${monthlastdate - i + 1}</li>`;
	}


	for (let i = 1; i <= lastdate; i++) {


		let isToday = i === date.getDate()
			&& month === new Date().getMonth()
			&& year === new Date().getFullYear()
			? "active"
			: "";
		lit += `<li class="${isToday}">${i}</li>`;
	}

	
	for (let i = dayend; i < 6; i++) {
		lit += `<li class="inactive">${i - dayend + 1}</li>`
	}


	currdate.innerText = `${months[month]} ${year}`;


	day.innerHTML = lit;
}

manipulate();


prenexIcons.forEach(icon => {


	icon.addEventListener("click", () => {


		month = icon.id === "calendar-prev" ? month - 1 : month + 1;


		if (month < 0 || month > 11) {


			date = new Date(year, month, new Date().getDate());

			year = date.getFullYear();

			month = date.getMonth();
		}

		else {

			date = new Date();
		}


		manipulate();
	});
});
