document.addEventListener('DOMContentLoaded', async function () {
	try {

		const form = document.getElementById("add-pto-form");

		form.addEventListener("submit", handlePtoForm);

		const localStoragePtoData = localStorage.getItem("PtoDate");

		if (localStoragePtoData) {
			const storadgePtoList = JSON.parse(localStoragePtoData);

			const ptoListContainer = document.getElementById("pto-list-container");

			storadgePtoList.forEach(ele => {
				const PtoElement = createPtoElement(new Date(ele.startDate), new Date(ele.endDate));

				ptoListContainer.appendChild(PtoElement);
			})

		}

		// get user
		const res = await fetch('https://jsonplaceholder.typicode.com/users/1');

		const user = await res.json();

		document.getElementById('user-id').querySelector('.content').innerText = user.id;
		document.getElementById('user-username').querySelector('.content').innerText = user.username;
		document.getElementById('user-full-name').querySelector('.content').innerText = user.name;
		document.getElementById('user-email').querySelector('.content').innerText = user.email;
		document.getElementById('user-phone').querySelector('.content').innerText = user.phone;
		document.getElementById('user-website').querySelector('.content').innerText = user.website;
	} catch (e) {
		console.error(e);
	}
});


function handlePtoForm(event) {
	event.preventDefault();

	const formData = new FormData(event.target);

	const startDateInput = formData.get("start-date-input");
	const endDateInput = formData.get("end-date-input");

	if (!startDateInput || !endDateInput) {
		alert("Missing one of dates!");
		return;
	}

	startDate = new Date(startDateInput);
	endDate = new Date(endDateInput);

	if (startDate > endDate) {
		alert("Second date can not be larger!");
		return;
	}

	setCookie(startDate, endDate)

	const newData = {
		userid: document.getElementById("user-id").querySelector(".content").querySelector(".content"),
		startDate: startDate.toDateString(),
		endDate: endDate.toISOString(),
	}

	const localstorage = localStorage.getItem("PtoDate");

	const storagePtoLis = localstorage ? JSON.parse(localstorage) : [];

	storagePtoLis.push(newData);

	const updatedData = JSON.stringify(storagePtoLis);

	localStorage.setItem("PtoDate", updatedData)

	const newPtoElement = createPtoElement(startDate, endDate);

	const ptoListCoontainer = document.getElementById("pto-list-container");

	ptoListCoontainer.appendChild(newPtoElement);

	event.target.reset();
}

function createPtoElement(startDate, endDate) {
	const PtoElement = document.createElement("div");

	PtoElement.classList.add("pto");

	const startDateString = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
	const endDateString = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();

	PtoElement.innerHTML = `
							<h4> Pto Request </h4>
								<div class="pto-request-info">
									<div class="pto-info">
										<label> Start Date</label>
										<label class="content"> ${startDateString} </label>
									</div>
									<div class="pto-info">
										<label> End Date</label>
										<label class="content"> ${endDateString} </label>
									</div>
								</div>
	`

	return PtoElement;
}


function setCookie(startDate, endDate) {

	const expiresDate = new Date();

	expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 60 * 1000);

	const startDateString = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
	const endDateString = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();

	const expires = expiresDate.toUTCString();

	console.log(expires);

	const dates = startDateString + " - " + endDateString;
	console.log(dates);

	document.cookie = "PtoDate=" + dates + ";expires=" + expires + ";Path=/";
}
