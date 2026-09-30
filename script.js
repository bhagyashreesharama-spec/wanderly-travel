/* =========================================
   WANDERLY 2.0
   INTERACTIONS
========================================= */


/* =========================================
   AUTH MODAL
========================================= */

function openAuth(type) {

    const modal = document.getElementById("authModal");

    modal.classList.add("active");

    document.body.classList.add("modal-open");

    if (type === "login") {
        showLogin();
    } else {
        showRegister();
    }
}


function closeAuth() {

    const modal = document.getElementById("authModal");

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

    clearAuthMessage();
}


/* =========================================
   SWITCH AUTH FORMS
========================================= */

function showRegister() {

    document
        .getElementById("registerForm")
        .classList.remove("hidden");

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    clearAuthMessage();
}


function showLogin() {

    document
        .getElementById("registerForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");

    clearAuthMessage();
}


/* =========================================
   REGISTER
========================================= */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;


    if (!name || !email || !password) {

        showAuthMessage(
            "Please fill in all fields.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showAuthMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    let users =
        JSON.parse(
            localStorage.getItem("wanderlyUsers")
        ) || [];


    const emailExists = users.some(
        user =>
            user.email.toLowerCase() ===
            email.toLowerCase()
    );


    if (emailExists) {

        showAuthMessage(
            "This email is already registered.",
            "error"
        );

        return;
    }


    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);


    localStorage.setItem(
        "wanderlyUsers",
        JSON.stringify(users)
    );


    document
        .getElementById("registerForm")
        .querySelector("form")
        .reset();


    showAuthMessage(
        "Account created successfully! ✈️",
        "success"
    );


    setTimeout(() => {

        showLogin();

        document.getElementById("loginEmail").value =
            email;

    }, 1000);
}


/* =========================================
   LOGIN
========================================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const users =
        JSON.parse(
            localStorage.getItem("wanderlyUsers")
        ) || [];


    const user = users.find(
        item =>
            item.email.toLowerCase() ===
            email.toLowerCase() &&
            item.password === password
    );


    if (!user) {

        showAuthMessage(
            "Incorrect email or password.",
            "error"
        );

        return;
    }


    localStorage.setItem(
        "wanderlyLoggedInUser",
        JSON.stringify(user)
    );


    document
        .getElementById("loginForm")
        .querySelector("form")
        .reset();


    showAuthMessage(
        `Welcome back, ${user.name}! ✈️`,
        "success"
    );


    setTimeout(() => {

        closeAuth();

        updateNavbar();

    }, 900);
}


/* =========================================
   AUTH MESSAGE
========================================= */

function showAuthMessage(message, type) {

    const messageBox =
        document.getElementById("authMessage");


    messageBox.textContent = message;


    if (type === "success") {

        messageBox.style.color = "#27834b";

    } else {

        messageBox.style.color = "#c93d2e";
    }
}


function clearAuthMessage() {

    const messageBox =
        document.getElementById("authMessage");


    if (messageBox) {

        messageBox.textContent = "";

    }
}


/* =========================================
   NAVBAR USER STATE
========================================= */

function updateNavbar() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "wanderlyLoggedInUser"
            )
        );


    const loginButton =
        document.querySelector(".nav-login");

    const registerButton =
        document.querySelector(".nav-register");


    if (!loginButton || !registerButton) {
        return;
    }


    if (user) {

        const firstName =
            user.name.split(" ")[0];


        loginButton.textContent =
            `Hi, ${firstName} 👋`;


        loginButton.onclick = function () {

            showUserProfile();

        };


        registerButton.textContent =
            "Logout";


        registerButton.onclick = function () {

            logoutUser();

        };

    } else {

        loginButton.textContent =
            "Login";


        loginButton.onclick = function () {

            openAuth("login");

        };


        registerButton.textContent =
            "Register";


        registerButton.onclick = function () {

            openAuth("register");

        };
    }
}


/* =========================================
   USER PROFILE
========================================= */

function showUserProfile() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "wanderlyLoggedInUser"
            )
        );


    if (!user) {
        openAuth("login");
        return;
    }


    alert(
        `WANDERLY ACCOUNT\n\n` +
        `Name: ${user.name}\n` +
        `Email: ${user.email}\n\n` +
        `You are logged in successfully. ✈️`
    );
}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem(
        "wanderlyLoggedInUser"
    );


    updateNavbar();


    alert(
        "You have been logged out. 👋"
    );
}


/* =========================================
   CLOSE MODAL
   OUTSIDE CLICK
========================================= */

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


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            document
                .getElementById("authModal")
                .classList.contains("active")
        ) {

            closeAuth();

        }
    }
);


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId === "#" ||
                    !document.querySelector(targetId)
                ) {
                    return;
                }


                event.preventDefault();


                document
                    .querySelector(targetId)
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );

    });


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateNavbar();

    }
);
