//taking first from current_date
const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

//ul element
const week_list = document.createElement('ul');
week_list.className = 'weeks';

//getting new date, current year and month
let date = new Date();
currentYear = date.getFullYear();
currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const renderCalendar = () => {
    //first day of month
    let firstDayofMonth = new Date(currentYear, currentMonth, 0).getDay();
    //0 at the end tells program to make object for last day of next month
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    //last dayy of current month
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth - 1).getDay();
    //last date of previous month
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    liTag = "";

    //showing last days of previous month at the begining if days match the same week
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    //showing all dates in this month
    for (let i = 1; i <= lastDateofMonth; i++) {
        //if 3 arguments match that li is active
        let Today = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${Today}">${i}</li>`;
    }

    //same as for begining, bbut showing days of nexxt month
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }


    //shows month and year inside calendar_header
    currentDate.innerText = ` ${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}

//creating li elements and append them to ul element
week.forEach(day => {
    const listItem = document.createElement(`li`);
    listItem.textContent = day;
    week_list.appendChild(listItem);
});

//ul element appended to existing html element
//document.body.appendChild(week_list);

//divb with specific class
const calendarElement = document.querySelector(`.calendar`);
//ul into class
calendarElement.insertBefore(week_list, daysTag);

prevNextIcon.forEach(icon => {
    //click event on both click in calendar_header
    icon.addEventListener("click", () => {
        //decrement current month bby 1 if previous icon clicked else increment
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        //with this if we go out of array , next array is managed to be logic , no unsigned arguments
        if (currentMonth > 11) { currentMonth = 0; currentYear += 1; }

        if (currentMonth < 0) { currentMonth = 11; currentYear -= 1; }

        renderCalendar();
    });
});

renderCalendar();
