
employer();

async function employer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        //json fetch stored in data 
        const data = await response.json();

        //taking selected employer
        const selectEmployer = document.getElementById('employer-select');

        if (selectEmployer) {

            //showing all elements(id) from fetchApi 
            data.forEach((element) => {
                selectEmployer.innerHTML += `<option value="${element.name}" id="${element.id}"> ${element.name} </option>`;
            });
        }
    }

    catch (error) {
        console.error(error);
    }
}

