import {
  logAction
} from "../logger.js";

// Main Content (Right column)
export function renderMainContent() {
  return logAction(`${renderMainContent.name}()`, () => {
    const main = document.createElement("main");
    main.id = "rightSection";
    main.className = "w-4/5 overflow-y-auto p-3 h-full custom-scrollbar pt-16 pb-0";

    // About Section
    const aboutSection = document.createElement("section");
    aboutSection.id = "section1";
    aboutSection.className =
      "fade-in mb-6 p-3 rounded-lg text-gray-400 leading-relaxed pt-8";
    const aboutContent = document.createElement("div");
    aboutContent.id = "aboutContent";
    aboutSection.appendChild(aboutContent);
    main.appendChild(aboutSection);

    // Experience Section
    const expSection = document.createElement("section");
    expSection.id = "section2";
    expSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    expSection.innerHTML = `
      <br>
      <input type="text" id="experienceSearch" placeholder="Search experiences..."
      class="fancy-search mb-4" />
      <div class="space-y-4 w-full" id="experienceContainer"></div>
    `;
    main.appendChild(expSection);

    //Publications Section
    const pubSection = document.createElement("section");
    pubSection.id = "section3";
    pubSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    pubSection.innerHTML = `
      <br>
      <input type="text" id="publicationSearch" placeholder="Search achievements..." class
      ="fancy-search mb-4" />
      <div class="space-y-4 w-full" id="publicationsContainer"></div>
    `;
    main.appendChild(pubSection);

    // Awards Section
    const awaSection = document.createElement("section");
    awaSection.id = "section4";
    awaSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    awaSection.innerHTML = `
      <br>
      <input type="text" id="awardSearch" placeholder="Search certifications..." class
      ="fancy-search mb-4" />
      <div class="space-y-4 w-full" id="awardsContainer"></div>
    `;
    main.appendChild(awaSection);

    // Projects Section
    const projSection = document.createElement("section");
    projSection.id = "section5";
    projSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    projSection.innerHTML = `
      <br>
      <input type="text" id="projectSearch" placeholder="Search core competencies..." class
      ="fancy-search mb-4" />
      <div class="space-y-4 w-full" id="projectsContainer"></div>
    `;
    main.appendChild(projSection);

    //engagements Section
    const engSection = document.createElement("section");
    engSection.id = "section6";
    engSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    engSection.innerHTML = `
      <br>
      <input type="text" id="engagementSearch" placeholder="Search engagements..." class
      ="fancy-search mb-4" />
      <div class="space-y-4 w-full" id="engagementsContainer"></div>
    `;
    main.appendChild(engSection);
    
    //multiclouds Section
    const mulSection = document.createElement("section");
    mulSection.id = "section7";
    mulSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    mulSection.innerHTML = `
      <br>
      <input type="text" id="multicloudSearch" placeholder="Search multicloud runs..." class
      ="fancy-search mb-4" />
      <div class="space-y-4 w-full" id="multicloudsContainer"></div>
    `;
    main.appendChild(mulSection);        
    
    // Skills Section
    const skillsSection = document.createElement("section");
    skillsSection.id = "section8";
    skillsSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    skillsSection.innerHTML = `
      <br>
      <div class="space-y-4 w-full" id="skillsContainer"></div>
    `;
    main.appendChild(skillsSection);

    // Education Section
    const eduSection = document.createElement("section");
    eduSection.id = "section9";
    eduSection.className = "fade-in mb-10 p-3 border-t border-gray-300 mt-4";
    eduSection.innerHTML = `
      <br>
      <div class="space-y-4 w-full" id="eduContainer"></div>
    `;
    main.appendChild(eduSection);

    // Timeline Section
    const timelineSection = document.createElement("section");
    timelineSection.id = "sectionTimeline";
    timelineSection.className = "fade-in mb-10 p-3 border-t border-gray-300 " +
      "mt-4 relative";
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "toggleSortBtn";
    toggleBtn.className =
      "absolute top-0 right-0 m-4 px-4 py-2 border text-te" +
      "al-500 rounded hover:text-white bg-transparent";
    toggleBtn.textContent = "View Oldest First";
    timelineSection.appendChild(toggleBtn);

    const timelineContainer = document.createElement("div");
    timelineContainer.id = "timelineContainer";
    timelineContainer.className = "timeline-container relative mx-auto";
    timelineSection.appendChild(timelineContainer);
    main.appendChild(timelineSection);

    return main;
  });
}