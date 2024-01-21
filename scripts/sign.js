
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const form = document.getElementById("sign-in-form");


function validationEmail() {

    //checking spelling requirements for email
    /* Regex validation for email:
    ^ represents begginig of regex pattern
    $ represents and of regex pattern
    a-z and A-z matches upper or lower letters
    0-9 matches any digit from 0 to 9
    @  is a special character that indicates the start of local part
    \. matches . (dot) in input tab
    Three parts of email are seperated with ([])
    Regex expression that is inside of [] must be correct for validation
    + after [] means that one or more occurrences must be present
    {3,10} matches 3 to 10 digits, in this case lower letters
    */

    /*If email dosen't match required syntax it will give message */
    if (!email.value.match(/^([A-Za-z\._\-0-9]+)[@]([a-zA-Z]+)[\.]([a-z]{3,10})$/)) {

        emailError.innerHTML = "-Please enter a valid email-";
        email.style.borderBottomColor = "red";
        emailError.style.top = "120%";
        return false;
    }

    /*if email is correct input of email stays as before in style */
    emailError.innerHTML = "";
    email.style.borderBottomColor = "";
    return true;

}

function validationPassword() {

    //Password validation :
    //Password needs to be minimum 8 letters so with {8,} this is assigned, but maximal length is not set
    //?=.* checks whole string if there is at least one matching of the condition
    //for example =?.*[a-z] checks the string if there is at least one lower case character
    //[a-zA-Z0-9@$!%*?&]{8,} this regex expression checks that there is minimum 8 characters from which at least one of each (upper,lower case, number, special character) needs to be in match 

    if (!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!&%*?@{})()])[a-zA-Z0-9@$!%*?&{})(]{8,}$/)) {
        passwordError.innerHTML = "-Enter a valid password-";
        password.style.borderBottomColor = "red";
        password.style.top = "120%";

        return false;
    }

    passwordError.innerHTML = "";
    password.style.borderBottomColor = "";

    return true;
}


//function checking that submit rquirements are correct
function validationSign() {

    //event.preventDefault();

    //first checking if the email and password are empty
    //trim() removes all white spaces
    if (email.value.trim() == "" || password.value.trim() == "") {
        window.alert("Email or password is empty !! \n Try again !");
        return false;
    }

    else if (!validationEmail()) {
        window.alert("Email you have enterd is not correct!");
        return false;
    }

    else if (!validationPassword()) {
        //if the password is not long enough and dosen't have all expected charactters show error message in window
        window.alert("Password validation error ! \n\nPassword must contain:\n \tminimum 8 characters \n \t  1 number\n \t 1 uppercase letter\n\t  1 lowercase letter \n \t 1 special character");

        return false;
    }

    return true;
     
}

document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault(); //prevent reloading of page

    validationSign();//checks if functions are true or false to give message to member

    if(validationEmail() && validationPassword()){
    event.preventDefault();
    window.location.href = "main.html";
     //new user
    //email stored to cookie 
    setCookie(email.value);
    }

});


//cookie function by value
function setCookie(value) {
    const exDate = new Date();
    //one day
    exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + exDate.toUTCString();

    // document.cookie = `user= ${value};${expires};Secure;path=/`;
   
    document.cookie = "email=" + value + ";" + expires + ";SameSite=None;Secure;path=/";

}