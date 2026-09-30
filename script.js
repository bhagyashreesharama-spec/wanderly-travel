// =====================================
// WANDERLY
// Website interactions
// =====================================


// ==============================
// SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll(
    ".section-heading, .destination-card, .trip-card, .about-content, .booking-content"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ==============================
// NAVBAR SCROLL EFFECT
// ==============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ==============================
// FOOTER YEAR
// ==============================

const footerYear = document.querySelector(".footer-bottom span");

if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} Wanderly. Demo website.`;

}
