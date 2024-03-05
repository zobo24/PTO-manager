//api fetch
async function employer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        //json fetch stored in data 
        const data = await response.json();

        //emp stored in array
        const employers = [];

        //objects of employer pushed to an array
        data.forEach(element => {

            const Object = {
                id: element.id,
                name: element.name,
                email: element.email,
                pto: []
            };

            employers.push(Object);

        });
        //directly stored to local storage when function called
        localStorage.setItem("employers", JSON.stringify(employers));
        return employers;
    }

    catch (error) {
        console.error(error);
    }
}


//employers[] => array where are stored fetched  employers from the server

function renderEmployersToSelectorOnScreeen() {

    const jsonEmp = localStorage.getItem("employers");

    //if array is empty,  call the api and fill it with data and put it in selector
    if (!jsonEmp) {
        employer().then(element => {

            const selector = document.getElementById("employer-select");

            element.forEach(person => {
                //option presents  each person on screen and data is sent to profile 
                const option = document.createElement("option");
                option.value = person.id;
                option.text = person.name;
                selector.appendChild(option);
                profile(person.id);

            });
        });
    }
    else {
        //employer is already created 
        //for easier data handaling employer profile is created again and alreday created ones loaded to selector again
        const elements = JSON.parse(jsonEmp);
        const selector = document.getElementById("employer-select");

        elements.forEach(person => {
            //option presents  each person on screen and data is sent to profile 
            const option = document.createElement("option");
            option.value = person.id;
            option.text = person.name;
            selector.appendChild(option);
            profile(person.id);
            loadCreatedProfiles(person.id);
        });
    }

}

renderEmployersToSelectorOnScreeen();

//creating profile for each person from selector that is givien by it's id
function profile(id) {

    //from array of employers get  the one that matches id from select box
    const selectedProfile = JSON.parse(localStorage.getItem('employers'));

    //create labels for name,id,email and pto to be dynamically sent to the parent profile 

    //new employer has new div
    const Container = document.createElement("div");
    Container.classList.add("profile");
    Container.id = "profile" + id;

    const nameLabel = document.createElement("p");
    nameLabel.classList.add("name-label");
    nameLabel.textContent = selectedProfile[id - 1].name;

    const emailLabel = document.createElement("p");
    emailLabel.classList.add("email");
    emailLabel.textContent = selectedProfile[id - 1].email;

    //id label part of object but not shown on display 
    const idLabel = document.createElement("p");

    const ptos = document.createElement("div");
    ptos.id = "ptos" + id;


    Container.appendChild(nameLabel);
    Container.appendChild(emailLabel);
    Container.appendChild(ptos);

    //data sent to the body of page
    document.body.appendChild(Container);

}

//to existing person new pto will be added
//each person can have multiple ptos
function loadCreatedProfiles(id) {

    const selectedProfile = JSON.parse(localStorage.getItem('employers'));
    //get profile by id to which pto will be added
    const profile = document.getElementById("profile" + id);
    //get container of ptos so that new one can be added to existing array of ptos
    const ptosContainer = document.getElementById("ptos" + id);

    ptosContainer.innerHTML = "";

    //to know order in array of ptos past,current and future label of pto will be created
    const pastPto = document.createElement("p");
    pastPto.classList.add("pto-label-past");
    pastPto.id = "pastPto" + id;
    pastPto.textContent = "Past Pto:";
    pastPto.style.display = "none";

    const currentPto = document.createElement("p");
    currentPto.classList.add("pto-label-current");
    currentPto.id = "currentPto" + id;
    currentPto.textContent = "Current Pto:"
    currentPto.style.display = "none";

    const futurePto = document.createElement("p");
    futurePto.classList.add("pto-label-future");
    futurePto.id = "futurePto" + id;
    futurePto.textContent = "Future Pto:";
    futurePto.style.display = "none";

    ptosContainer.appendChild(pastPto);
    ptosContainer.appendChild(currentPto);
    ptosContainer.appendChild(futurePto);

    profile.style.display = "";

    selectedProfile[id - 1].pto.forEach(pto => {

        const startDate = new Date(pto.startDate);
        const endDate = new Date(pto.endDate);

        const ptosContainer = PtoContainer(startDate, endDate, id);
        const current_date = new Date();

        //pto is created and now that pto needs to be positioned in the array of ptos container, added after existing
        if (current_date > endDate) {
            pastPto.style.display = "";
            pastPto.insertAdjacentElement("beforeend", ptosContainer);
        }
        else if (current_date >= startDate && current_date <= endDate) {
            currentPto.style.display = "";
            currentPto.insertAdjacentElement("beforeend", ptosContainer);
        }
        else {
            futurePto.style.display = "";
            futurePto.insertAdjacentElement("beforeend", ptosContainer);
        }

    });
}

//container consists of pto that is assigned to specific id profile
function PtoContainer(startDate, endDate, id) {

    let img = "";

    if (summer(startDate)) {
        img = "../images/summer.jpg";
    }

    else if (autumn(startDate)) {
        img = "../images/autmn.jpg";
    }
    else if (winter(startDate)) {
        img = "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/49/2048x1365/gallery-1481299207-gettyimages-553790585-1.jpg?resize=640:*";
    }
    else if (spring(startDate)) {
        img = "https://cdn.shopify.com/s/files/1/0778/2679/files/bio_urn_trees_f3534a23-d838-4a12-87fc-4dcd5071ed8c_1024x1024.jpg?v=1584304157";
    }

    startDateDispayFormat = startDate.toLocaleDateString();
    endDateDisplayFormat = endDate.toLocaleDateString();

    const pto = document.createElement("div");
    pto.classList.add("pto-container");

    //background image of pto for container
    const ptoImage = document.createElement("img");
    ptoImage.classList.add("pto-image");
    ptoImage.src = img;
    ptoImage.alt = "pto image";

    //wanted date and delete button display format part of pto content
    const contentPto = document.createElement("div");
    contentPto.classList.add("content-pto");

    const dateInfo = document.createElement("p");
    dateInfo.textContent = `${startDateDispayFormat} - ${endDateDisplayFormat}`;
    contentPto.classList.add("dateInfo");
    contentPto.appendChild(dateInfo);
    
    const delButtonImg = document.createElement("img");
    delButtonImg.src = "../images/delete-button.png";
    delButtonImg.alt = "pto-delete-image";
    delButtonImg.classList.add("pto-delete-image");
    contentPto.appendChild(delButtonImg);
    
    //image and content displayed
    pto.appendChild(ptoImage);
    pto.appendChild(contentPto);

    //givig  the delete functionnality to the delete button
    delButtonImg.addEventListener("click", () => {
        const jsonEmp = localStorage.getItem('employers');
        employers = JSON.parse(jsonEmp);

        //to make sure that is deleted right pto , in local storage dateInfo will be checked
        employers[id - 1].pto = employers[id - 1].pto.filter(pto => {
            return !(pto.startDate === startDate.toISOString() && pto.endDate === endDate.toISOString());
        });

        localStorage.setItem('employers', JSON.stringify(employers));

        loadCreatedProfiles(id);
    });

    return pto;
}

function summer(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    //from 21.6 to 20.9
    if ((day >= 21 && month == 6) || (day < 23 && month == 9) || (month > 6 && month < 9)) {
        return true;
    }

    else
        return false;
}

function autumn(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    //from 23.9 to 21.12
    if ((day >= 23 && month == 9) || (day < 21 && month == 12) || (month > 9 && month < 12)) {
        return true;
    }

    else
        return false;
}

function winter(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    //from 21.12 to 21.3
    if ((day >= 21 && month == 12) || (day < 21 && month == 3) || (month < 3)) {
        return true;
    }

    else
        return false;
}

function spring(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    //from 21.3 to 21.6
    if ((day >= 21 && month == 3) || (day < 21 && month == 6) || (month > 3 && month < 6)) {
        return true;
    }

    else
        return false;
}

const addPtoButton = document.querySelector(".addPto");
addPtoButton.addEventListener("click", () => {
    const wantedId = document.getElementById("employer-select").value;

    if (wantedId === "") {
        window.alert("Select employer !!");
    }
    else if (!localStorage.getItem("startDate")) {
        window.alert("Select starting date in first calendar !!");
    }
    else if (!localStorage.getItem("endDate")) {
        window.alert("Select ending date in second calendar !!");
    }
    else {
        newPto(wantedId);
    }

});

//function that adds new Pto to the wanted employer 
function newPto(idEmployer) {
    const startDate = new Date(localStorage.getItem('startDate'));
    const endDate = new Date(localStorage.getItem('endDate'));

    //start date needs to be before an end date
    if (startDate > endDate) {
        window.alert("Start date needs to be before an end  date !!\n\nPlease try again.");
        return;
    }

    const jsonEmp = localStorage.getItem("employers");
    const employers = JSON.parse(jsonEmp);

    //new pto added to an object of employer in the array of ptos
    employers[idEmployer - 1].pto.push({
        startDate: startDate,
        endDate: endDate
    });

    localStorage.setItem("employers", JSON.stringify(employers));
    loadCreatedProfiles(idEmployer);

}
