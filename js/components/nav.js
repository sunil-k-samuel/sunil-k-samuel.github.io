import { debounce } from "../utils/debounce.js";
import {
    logAction
} from "../logger.js";

// A flag to disable scroll-based nav updates temporarily.
let disableScrollNavUpdate = false;

export function scrollToSection(id) {
    logAction(`${scrollToSection.name}()`, () => {
        const section = document.getElementById(id);
        if (section) {
            // Disable scroll-based nav updates while we're scrolling.
            disableScrollNavUpdate = true;
            section.scrollIntoView({ behavior: "smooth" });
            updateActiveNav(id);
            // Re-enable scroll-based nav updates after a delay.
            setTimeout(() => {
                disableScrollNavUpdate = false;
            }, 800);
        }
    });
}

export function updateActiveNav(activeId) {
    logAction(`${updateActiveNav.name}()`, () => {
        const navButtons = document.querySelectorAll(".nav-button");
        navButtons.forEach(btn => btn.classList.remove("nav-active"));
        const target = document.getElementById("btn-" + activeId);
        if (target) target.classList.add("nav-active");
    });
}

export function updateNavOnScroll(rightSection) {
    // Do not log this method
    // If a nav click triggered a scroll, skip the update
    if (disableScrollNavUpdate) return;

    const sections = document.querySelectorAll(".fade-in");
    const navButtons = document.querySelectorAll(".nav-button");
    let closestSectionIndex = 0;
    let minDistance = Infinity;
    const containerRect = rightSection.getBoundingClientRect();
    const scrollBottom = rightSection.scrollTop + rightSection.clientHeight;
    const scrollHeight = rightSection.scrollHeight;

    if (scrollBottom >= scrollHeight - 5) {
        navButtons.forEach(btn => btn.classList.remove("nav-active"));
        navButtons[sections.length - 1].classList.add("nav-active");
        return;
    }

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top);
        if (distance < minDistance) {
            minDistance = distance;
            closestSectionIndex = index;
        }
    });

    navButtons.forEach(btn => btn.classList.remove("nav-active"));
    navButtons[closestSectionIndex].classList.add("nav-active");
}

export function initNav(rightSection) {
    logAction(`${initNav.name}()`, () => {
        // Update nav on document scroll
        document.addEventListener("scroll", debounce(() => {
            // Skip updating if a nav button click initiated the scroll.
            if (disableScrollNavUpdate) return;

            const sections = document.querySelectorAll(".fade-in");
            const navButtons = document.querySelectorAll(".nav-button");
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    navButtons.forEach(btn => btn.classList.remove("nav-active"));
                    navButtons[index].classList.add("nav-active");
                }
            });
        }, 100));

        // Update nav on rightSection scroll
        let ticking = false;
        rightSection.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateNavOnScroll(rightSection);
                    ticking = false;
                });
                ticking = true;
            }
        });
    });
}

// Sidebar (Left column)
export function renderSidebar() {
    return logAction(`${renderSidebar.name}()`, () => {
        const aside = document.createElement("aside");
        aside.id = "leftSidebar";
        aside.className = "w-1/5 overflow-y-auto text-white p-3 flex flex-col pt-16 pb-0";

        // Header Section
        const header = document.createElement("header");
        header.className = "mb-8";

        const h2 = document.createElement("h2");
        h2.id = "siteName";
        h2.className = "text-5xl font-extrabold dark:text-white";
        header.appendChild(h2);

        header.appendChild(document.createElement("br"));

        const jobTitle = document.createElement("p");
        jobTitle.id = "jobTitle";
        jobTitle.className = "mb-4 text-2xl font-bold text-gray-300";
        header.appendChild(jobTitle);

        const exp = document.createElement("p");
        exp.id = "exp";
        exp.className = "mb-4 text-2xl font-bold text-gray-300";
        header.appendChild(exp);

        const tagline = document.createElement("p");
        tagline.id = "tagline";
        tagline.className = "tagline mb-2 text-2xl font-normal italic min-h-[2.5rem] truncate";
        header.appendChild(tagline);

        aside.appendChild(header);

        // Navigation Bar
        const nav = document.createElement("nav");
        nav.className = "fancy-nav";

        const navButtons = [
            {
                id: "btn-section1", icon: "fas fa-user",
                text: "About", section: "section1"
            },
            {
                id: "btn-section2", icon: "fas fa-briefcase",
                text: "Experience", section: "section2"
            },
            {
                id: "btn-section3", icon: "fas fa-scroll",
                text: "Achievements", section: "section3"
            },    
            {
                id: "btn-section4", icon: "fas fa-award",
                text: "Certifications", section: "section4"
            },  
            {
                id: "btn-section5", icon: "fas fa-tools",
                text: "Core Competencies", section: "section5"
            },
            {
                id: "btn-section6", icon: "fas fa-award",
                text: "C-Level Engagement", section: "section6"
            },
            {
                id: "btn-section7", icon: "fas fa-award",
                text: "Multicloud Runs", section: "section7"
            },                    
            {
                id: "btn-section8", icon: "fas fa-chart-bar",
                text: "Technical Skills", section: "section8"
            },
            {
                id: "btn-section9", icon: "fas fa-graduation-cap",
                text: "Education", section: "section9"
            },
            {
                id: "btn-sectionTimeline", icon: "fas fa-stream",
                text: "Timeline", section: "sectionTimeline"
            },
        ];

        navButtons.forEach((btnData) => {
            const button = document.createElement("button");
            button.className = "nav-button";
            button.id = btnData.id;
            button.setAttribute("onclick", `scrollToSection('${btnData.section}')`);
            button.innerHTML = `<i class="${btnData.icon}"></i> ${btnData.text}`;
            nav.appendChild(button);
        });

        // Resume Link
        const resumeLink = document.createElement("a");
        resumeLink.className = "nav-button";
        resumeLink.id = "btn-resume";
        resumeLink.href = "resume.pdf";
        resumeLink.target = "_blank";
        resumeLink.setAttribute("aria-label", "resume");
        resumeLink.setAttribute("title", "View Resume");
        resumeLink.innerHTML = `<i class="fas fa-file-alt"></i> Resume`;
        nav.appendChild(resumeLink);

        // Coverletter Link
        const coverletterLink = document.createElement("a");
        coverletterLink.className = "nav-button";
        coverletterLink.id = "btn-coverletter";
        coverletterLink.href = "coverletter.pdf";
        coverletterLink.target = "_blank";
        coverletterLink.setAttribute("aria-label", "coverletter");
        coverletterLink.setAttribute("title", "View coverletter");
        coverletterLink.innerHTML = `<i class="fas fa-file-alt"></i> Cover letter`;
        nav.appendChild(coverletterLink);

        // Recommendations Link
        const RecommendationsLink = document.createElement("a");
        RecommendationsLink.className = "nav-button";
        RecommendationsLink.id = "btn-Recommendations";
        RecommendationsLink.href = "recommendations.pdf";
        RecommendationsLink.target = "_blank";
        RecommendationsLink.setAttribute("aria-label", "RecommendationsLink");
        RecommendationsLink.setAttribute("title", "View RecommendationsLink");
        RecommendationsLink.innerHTML = `<i class="fas fa-file-alt"></i> Recommendations`;
        nav.appendChild(RecommendationsLink);

        aside.appendChild(nav);

        // Social Icons Container
        const socialContainer = document.createElement("div");
        socialContainer.id = "socialContainer";
        socialContainer.className = "my-4 social-icons";
        aside.appendChild(socialContainer);

        return aside;
    });
}