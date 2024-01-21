
//by clicking log out button going to index.html
document.getElementById("log_out").addEventListener("click",function(event){

    event.preventDefault();
    signOut();
    //redirecting to the index page
    window.location.href = "../index.html";
});

function signOut() {
    //cookie delted by expiring date
    document.cookie = "email=;expires=Thu, 01 Jan 1970 00:00:01 UTC;SameSite=None;Secure; path=/";
}
