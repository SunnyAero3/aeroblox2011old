const API = "https://shiny-flower-e05f.sunnyaero3.workers.dev";


// =========================
// AUTO LOGIN CHECK
// =========================
function checkLogin() {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            if (xhr.responseText.indexOf("LOGGED_IN:") === 0) {

                var username = xhr.responseText.replace("LOGGED_IN:", "");

                // update UI if exists
                var userBox = document.getElementById("userBox");
                var loginBox = document.getElementById("loginBox");

                if (userBox) {
                    userBox.style.display = "block";
                    userBox.innerHTML = "Welcome, " + username;
                }

                if (loginBox) {
                    loginBox.style.display = "none";
                }
            }
        }
    };

    xhr.open("GET", API + "/me", true);
    xhr.send();
}



// =========================
// LOGIN
// =========================
function loginSubmit() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var status = document.getElementById("loginStatus");

    if (username === "" || password === "") {
        if (status) {
            status.style.color = "red";
            status.innerHTML = "Enter username and password";
        }
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200 && xhr.responseText === "LOGIN_OK") {

                window.location = "/aeroblox2011/Games.html";

            } else {

                if (status) {
                    status.style.color = "red";
                    status.innerHTML = "Invalid login";
                }
            }
        }
    };

    xhr.open("POST", API + "/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(
        "username=" + encodeURIComponent(username) +
        "&password=" + encodeURIComponent(password)
    );

    return false;
}



// =========================
// SIGNUP
// =========================
function signupSubmit() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;

    var status = document.getElementById("status");

    if (username === "" || password === "") {
        if (status) {
            status.style.color = "red";
            status.innerHTML = "Please enter username and password";
        }
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200 && xhr.responseText === "SIGNUP_OK") {

                if (status) {
                    status.style.color = "green";
                    status.innerHTML = "Account created!";
                }

                setTimeout(function () {
                    window.location = "/aeroblox2011/Games.html";
                }, 1000);

            } else {

                if (status) {
                    status.style.color = "red";
                    status.innerHTML = xhr.responseText;
                }
            }
        }
    };

    xhr.open("POST", API + "/signup", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(
        "username=" + encodeURIComponent(username) +
        "&password=" + encodeURIComponent(password) +
        "&month=" + encodeURIComponent(month) +
        "&year=" + encodeURIComponent(year)
    );

    return false;
}



// =========================
// LOGOUT
// =========================
function logout() {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            window.location = "/aeroblox2011/index.html";
        }
    };

    xhr.open("GET", API + "/logout", true);
    xhr.send();
}



// =========================
// INIT ON PAGE LOAD
// =========================
window.onload = function () {
    checkLogin();
};
