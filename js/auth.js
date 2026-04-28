const API = "https://shiny-flower-e05f.sunnyaero3.workers.dev";


// =========================
// CHECK LOGIN STATE (ALL PAGES)
// =========================
function checkLogin() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", API + "/me", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            if (xhr.responseText.indexOf("LOGGED_IN:") === 0) {

                var username = xhr.responseText.replace("LOGGED_IN:", "");

                // Top bar / UI update
                var userBox = document.getElementById("userBox");
                if (userBox) {
                    userBox.innerHTML = "Welcome, " + username;
                }

                // Optional: store for UI use
                window.currentUser = username;
            }
        }
    };

    xhr.send();
}


// =========================
// LOGIN
// =========================
function loginSubmit() {

    var usernameEl = document.getElementById("username");
    var passwordEl = document.getElementById("password");
    var status = document.getElementById("status");

    if (!usernameEl.value || !passwordEl.value) {
        if (status) status.innerHTML = "Enter username and password";
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/login", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                window.location = "/aeroblox2011/Games.html";

            } else {

                if (status) status.innerHTML = "Invalid login";
            }
        }
    };

    xhr.send(
        "username=" + encodeURIComponent(usernameEl.value) +
        "&password=" + encodeURIComponent(passwordEl.value)
    );

    return false;
}


// =========================
// SIGNUP
// =========================
function signupSubmit() {

    var usernameEl = document.getElementById("username");
    var passwordEl = document.getElementById("password");
    var genderEl = document.getElementById("gender");
    var monthEl = document.getElementById("month");
    var yearEl = document.getElementById("year");

    var status = document.getElementById("status");

    if (!usernameEl.value || !passwordEl.value) {
        if (status) status.innerHTML = "Fill all required fields";
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/signup", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                window.location = "/aeroblox2011/Login.html";

            } else {

                if (status) status.innerHTML = xhr.responseText;
            }
        }
    };

    xhr.send(
        "username=" + encodeURIComponent(usernameEl.value) +
        "&password=" + encodeURIComponent(passwordEl.value) +
        "&gender=" + encodeURIComponent(genderEl.value || "") +
        "&month=" + encodeURIComponent(monthEl.value || "") +
        "&year=" + encodeURIComponent(yearEl.value || "")
    );

    return false;
}


// =========================
// OPTIONAL: LOGOUT (FUTURE READY)
// =========================
function logout() {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/logout", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            window.location = "/aeroblox2011/index.html";
        }
    };

    xhr.send();
}


// =========================
// INIT ON PAGE LOAD
// =========================
window.onload = function () {
    checkLogin();
};
