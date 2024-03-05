

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


//taking first from current_date2
const currentDate2 = document.querySelector(".current-date2");
daysTag2 = document.querySelector(".days2");
prevNextIcon2 = document.querySelectorAll(".icons2 span");

//ul element
const week_list2 = document.createElement('ul');
week_list2.className = 'weeks2';

//variables for second ending date calendar
let date2 = new Date();
currentYear2 = date2.getFullYear();
currentMonth2 = date2.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const months2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const week2 = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];


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
        liTag += `<li class="Other">${i}</li>`;
    }

    //same as for begining, bbut showing days of nexxt month
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }


    //shows month and year inside calendar_header
    currentDate.innerText = ` ${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;

    const Other = document.querySelectorAll(".Other");

    Other.forEach(day => {
        day.addEventListener("click", () => {

            Other.forEach(day => {
                day.removeAttribute("id");
            })

            day.setAttribute("id", "selecteddate");

            const selectedDate = new Date(`${currentYear}-${currentMonth + 1}-${day.textContent}`);



            //selected date will be start date stored in localStorage for other functions to use
            localStorage.setItem("startDate", selectedDate);
        })
    })

}

const renderCalendar2 = () => {

    let firstDayofMonth2 = new Date(currentYear2, currentMonth2, 0).getDay();

    let lastDateofMonth2 = new Date(currentYear2, currentMonth2 + 1, 0).getDate();

    let lastDayofMonth2 = new Date(currentYear2, currentMonth2, lastDateofMonth2 - 1).getDay();
    let lastDateofLastMonth2 = new Date(currentYear2, currentMonth2, 0).getDate();

    liTag2 = "";

    for (let i = firstDayofMonth2; i > 0; i--) {
        liTag2 += `<li class="inactive">${lastDateofLastMonth2 - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth2; i++) {
        let Today2 = i === date2.getDate() && currentMonth2 === new Date().getMonth() && currentYear2 === new Date().getFullYear() ? "active" : "";

        liTag2 += `<li class="Other2">${i}</li>`;
    }

    for (let i = lastDayofMonth2; i < 6; i++) {
        liTag2 += `<li class=inactive>${i - lastDayofMonth2 + 1}</li>`;
    }

    currentDate2.innerText = `${months2[currentMonth2]} ${currentYear2}`;
    daysTag2.innerHTML = liTag2;

    //choosing day

    const Other2 = document.querySelectorAll(".Other2");

    Other2.forEach(day => {
        day.addEventListener("click", () => {

            Other2.forEach(day => {
                day.removeAttribute("id");
            })

            day.setAttribute("id", "selecteddate2");

            const selectedDate2 = new Date(`${currentYear2}-${currentMonth2 + 1}-${day.textContent}`);


            localStorage.setItem("endDate", selectedDate2);

        });
    });

}

//creating li elements and append them to ul element
week.forEach(day => {
    const listItem = document.createElement(`li`);
    listItem.textContent = day;
    week_list.appendChild(listItem);
});

week2.forEach(day => {
    const listItem = document.createElement(`li`);
    listItem.textContent = day;
    week_list2.appendChild(listItem);
});


//ul element appended to existing html element
//document.body.appendChild(week_list);

//divb with specific class
const calendarElement = document.querySelector(`.calendar`);
//ul into class
calendarElement.insertBefore(week_list, daysTag);

const calendarElement2 = document.querySelector(`.calendar2`);
calendarElement2.insertBefore(week_list2, daysTag2);

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

prevNextIcon2.forEach(icon2 => {
    icon2.addEventListener("click", () => {

        currentMonth2 = icon2.id === "prev" ? currentMonth2 - 1 :
            currentMonth2 + 1;

        if (currentMonth2 > 11) { currentMonth2 = 2; currentYear2 += 1; }

        if (currentMonth2 < 0) { currentMonth2 = 11; currentYear2 -= 1; }

        renderCalendar2();
    });
});



renderCalendar();
renderCalendar2();

localStorage.setItem("endDate", "");
localStorage.setItem("startDate", "");