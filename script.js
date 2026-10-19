document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Hamburger Menu Toggle (Scoped to Header .nav)
    const menuToggle = document.querySelector(".nav .bar");
    const navList = document.querySelector(".nav .nav_list");
    const navLinks = document.querySelectorAll(".nav .nav_list a");

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navList.classList.toggle("active");
            menuToggle.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
                navList.classList.remove("active");
                menuToggle.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });

        // Close mobile menu automatically when any navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navList.classList.remove("active");
                menuToggle.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });
    }

    // 2. Dark/Light Mode Toggle Logic with LocalStorage memory
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            if (theme === "dark") {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                themeToggleBtn.textContent = "🌙";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                themeToggleBtn.textContent = "☀️";
            }
        });
    }

    // 3. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // 4. Frontend Contact Form Data Collection
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents page reload

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log("Form Data Collected Successfully:", data);
            alert(`Thank you, ${data.name}! Your message has been received.`);

            contactForm.reset();
        });
    }

    // 5. Dynamic Copyright Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});