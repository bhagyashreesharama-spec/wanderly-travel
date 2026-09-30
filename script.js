/* =========================
   WANDERLY
   LOGIN + REGISTER DEMO
========================= */


/* =========================
   AUTH MODAL
========================= */

function openAuth(type) {

    const modal = document.getElementById("authModal");

    modal.classList.add("active");

    if (type === "login") {
        showLogin();
    } else {
        showRegister();
    }

}


/* Close modal */

function closeAuth() {

    const modal = document.getElementById("authModal");

    modal.classList.remove("active");

    clearAuthMessage();

}


/* =========================
   SHOW REGISTER
========================= */

function showRegister() {

    document.getElementById("registerForm").classList.remove("hidden");

    document.getElementById("loginForm").classList.add("hidden");

    clearAuthMessage();

}


/* =========================
   SHOW LOGIN
========================= */

function showLogin() {

    document.getElementById("registerForm").classList.add("hidden");

    document.getElementById("loginForm").classList.remove("hidden");

    clearAuthMessage();

}


/* =========================
   REGISTER USER
========================= */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;


    if (name === "" || email === "" || password === "") {

        showAuthMessage(
            "Please fill all the fields.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showAuthMessage(
            "Password must be at least 6 characters.",
            "error"
        );

        return;
    }


    /* Get existing users */

    let users =
        JSON.parse(localStorage.getItem("wanderlyUsers")) || [];


    /* Check existing email */

    const existingUser = users.find(
        user => user.email.toLowerCase() === email.toLowerCase()
    );


    if (existingUser) {

        showAuthMessage(
            "This email is already registered.",
            "error"
        );

        return;
    }


    /* Create new user */

    const newUser = {

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);


    /* Save user */

    localStorage.setItem(
        "wanderlyUsers",
        JSON.stringify(users)
    );


    showAuthMessage(
        "Account created successfully! 🎉",
        "success"
    );


    /* Clear form */

    document.querySelector("#registerForm form").reset();


    /* Open login after short delay */

    setTimeout(() => {

        showLogin();

        document.getElementById("loginEmail").value = email;

    }, 1200);

}


/* =========================
   LOGIN USER
========================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    let users =
        JSON.parse(localStorage.getItem("wanderlyUsers")) || [];


    const user = users.find(
        user =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );


    if (!user) {

        showAuthMessage(
            "Email or password is incorrect.",
            "error"
        );

        return;
    }


    /* Save logged-in user */

    localStorage.setItem(
        "wanderlyLoggedInUser",
        JSON.stringify(user)
    );


    showAuthMessage(
        `Welcome back, ${user.name}! ✈️`,
        "success"
    );


    document.querySelector("#loginForm form").reset();


    setTimeout(() => {

        closeAuth();

        updateNavbar();

    }, 1000);

}


/* =========================
   AUTH MESSAGE
========================= */

function showAuthMessage(message, type) {

    const messageBox =
        document.getElementById("authMessage");


    messageBox.textContent = message;


    if (type === "success") {

        messageBox.style.color = "#238636";

    } else {

        messageBox.style.color = "#d93025";

    }

}


function clearAuthMessage() {

    const messageBox =
        document.getElementById("authMessage");

    if (messageBox) {

        messageBox.textContent = "";

    }

}


/* =========================
   UPDATE NAVBAR
========================= */

function updateNavbar() {

    const user =
        JSON.parse(
            localStorage.getItem("wanderlyLoggedInUser")
        );


    const loginButton =
        document.querySelector(".login-btn");

    const registerButton =
        document.querySelector(".register-btn");


    if (!loginButton || !registerButton) {
        return;
    }


    if (user) {

        loginButton.textContent = `Hi, ${user.name.split(" ")[0]} 👋`;

        loginButton.onclick = function () {

            alert(
                `You're logged in as ${user.email}`
            );

        };


        registerButton.textContent = "Logout";

        registerButton.onclick = function () {

            logoutUser();

        };

    } else {

        loginButton.textContent = "Login";

        loginButton.onclick = function () {

            openAuth("login");

        };


        registerButton.textContent = "Register";

        registerButton.onclick = function () {

            openAuth("register");

        };

    }

}


/* =========================
   LOGOUT
========================= */

function logoutUser() {

    localStorage.removeItem(
        "wanderlyLoggedInUser"
    );


    updateNavbar();


    alert("You have been logged out.");

}


/* =========================
   CLOSE MODAL
   WHEN CLICKING OUTSIDE
========================= */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("authModal");


        if (
            event.target === modal &&
            modal.classList.contains("active")
        ) {

            closeAuth();

        }

    }
);


/* =========================
   ESC KEY CLOSE
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAuth();

        }

    }
);


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateNavbar();

    }
);
