if (window.location.pathname === "/wdd231/chamber/directory.html" || window.location.pathname === "/chamber/directory.html") {
    getCopyrightYear();
    getLastModified();
}

// console.log("Path: " + window.location.pathname);

// Display the copyright year
function getCopyrightYear() {
    const year = new Date().getFullYear();
    document.getElementById("cYear").innerHTML = `&copy; ${year}`;
}

// Display the last modified date of the page
function getLastModified() {
    const lastModified = new Date(document.lastModified).toGMTString();
    document.getElementById("lastModified").innerHTML = `Last Modified: ${lastModified}`;
}

// Toggle Dark/Light Mode
function screenMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");

    const sections = document.querySelectorAll(
        "main, div.info, div.spotlights, div.event, div.event-card, section.style5, article.card, div.weather-info, div.form-wrapper, section.member, section.member a, div.form-wrapper, form label.top input, form label.sbs, form fieldset, form legend, form label.top"
    );
    sections.forEach((section) => {
        section.classList.toggle("dark-mode");
    });
}

// ********* Page Visits Counter *********
function updatePageVisitsCounter() {
    const msToDays = 84600000;
    let lastVisit = window.localStorage.getItem("numDiscoverPage");
    const visitsDisplay = document.querySelector(".latest-visit");

    // Calculate the time difference between visits
    var currentTime = new Date();
    var previousVisit = new Date(lastVisit);
    var timeDifference = currentTime.getTime() - previousVisit.getTime();
    var daysDifference = timeDifference / msToDays;

    // Display message based on time difference
    if (lastVisit != null) {
        if (daysDifference > 0 && daysDifference < 1) {
            visitsDisplay.textContent = `Back so soon! Awesome!`;
        } else if (Math.floor(daysDifference) === 1) {
            visitsDisplay.textContent = `You last visited 1 day ago.`;
        } else {
            visitsDisplay.textContent = `You last visited ${Math.floor(daysDifference)} days ago.`;
        }
    } else {
        visitsDisplay.textContent = `Welcome! Let us know if you have any questions.`;
    }
    // store the new visit count total into localStorage
    localStorage.setItem("numDiscoverPage", new Date());

    // console.log("Current Time: " + currentTime);
    // console.log("Previous Visit: " + previousVisit);
    // console.log("Time Difference: " + timeDifference);
    // console.log("Days Difference: " + daysDifference);
}

function testUpdatePageVisitsCounter() {
    // Set a fake previous visit date for testing purposes
    const fakePreviousVisitDate = new Date("2024-02-22T22:33:34");
    window.localStorage.setItem("numDiscoverPage", fakePreviousVisitDate);

    // Call the updatePageVisitsCounter function
    updatePageVisitsCounter();

    // Check if the message displayed matches the expected message
    const message1 = "Welcome! Let us know if you have any questions.";
    const message2 = "Back so soon! Awesome!";
    const message3 = "You last visited 1 day ago.";
    const message4 = "You last visited 2 days ago.";

    const expectedMessage = message4;
    const displayedMessage = document.querySelector(".latest-visit").textContent;
    if (displayedMessage === expectedMessage) {
        console.log("Test passed: Page visits counter updated correctly.");
    } else {
        console.error("Test failed: Page visits counter not updated correctly.");
        console.error("Expected message:", expectedMessage);
        console.error("Displayed message:", displayedMessage);
    }

    // Clean up: remove the fake previous visit date from localStorage
    window.localStorage.removeItem("numDiscoverPage");
}
// Call the test function to test the updatePageVisitsCounter function
// testUpdatePageVisitsCounter();

// ********* Banner *********
function initBanner() {
    var banner = document.getElementById("banner");
    var closeBannerBtn = document.getElementById("closeBanner");

    // Check if today is Monday, Tuesday, or Wednesday
    var today = new Date();
    var dayOfWeek = today.getDay();
    // var dayOfWeek = 1; // for testing purposes
    var isBannerVisible = dayOfWeek >= 1 && dayOfWeek <= 3;

    // Set initial visibility
    banner.classList.toggle("banner", isBannerVisible);
    banner.classList.toggle("banner-hide", !isBannerVisible);

    // Close the banner when the close button is clicked
    closeBannerBtn.addEventListener("click", function () {
        banner.classList.add("banner-hide");
    });
}
/* ****************************************************
    Spotlight Members
***************************************************** */

async function getSpotLightMembers() {
    const dataURL = "https://joseokungu.github.io/wdd231/chamber/data/members.json";
    try {
        const response = await fetch(dataURL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data);
        displaySpotlightMembers(data.members);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function displaySpotlightMembers(members) {
    // console.log(members);

    let topMembers = members.filter((member) => member.membership === "Silver" || member.membership === "Gold");

    let randomMembers = topMembers.sort(() => 0.5 - Math.random()).slice(0, 4);

    const spotlights = document.querySelector(".cards");

    randomMembers.forEach((member) => {
        const spotlight = document.createElement("article");
        spotlight.classList.add("card");
    
       let status = member.membership === "Silver" ? "silver" : "gold";

        spotlight.innerHTML = `
        <h3 class="card-header ${status}">${member.membership} Member</h3>
        <div class="card-body">
        <img src="${member.logo}" alt="${member.company.toLowerCase()}-logo" loading="lazy" width=75 height=auto>
        <div class="contact-info">
            <address>
                ${member.address}
                <br />
                ${member.city}, ${member.state} ${member.zip}
            </address>
            <div>
                <a href=${member.website} target="_blank">${member.website}</a>
            </div>
        </div>
        </div>
    `;

        spotlights.appendChild(spotlight);
    });
}