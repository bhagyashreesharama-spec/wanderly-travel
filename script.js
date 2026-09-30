// ===============================
// WANDERLY — INTERACTIONS
// ===============================

// Smooth reveal animation when sections enter the screen

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
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ===============================
// CURRENT YEAR IN FOOTER
// ===============================

const footerYear = document.querySelector(".footer-bottom span");

if (footerYear) {
    footerYear.textContent =
        `© ${new Date().getFullYear()} Wanderly. Demo website.`;
}
