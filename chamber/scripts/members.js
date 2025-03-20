
/* ****************************************************
    Directory of Members
***************************************************** */
const baseURL = "https://joseokungu.github.io/wdd231/";
const dataURL = "https://joseokungu.github.io/wdd231/chamber/data/members.json";



async function getMembers() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data);
        displayMembers(data.members);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
getMembers();

const displayMembers = (members) => {
    // console.log(members);
    const cards = document.querySelector("#members");

    members.forEach((member) => {
        // // console.log(week);
        const bizCard = document.createElement("section");
        bizCard.setAttribute("class","member");
        const companyName = document.createElement("h3");
        companyName.textContent = member.company;
        const address = document.createElement("p");
        const address2 = document.createElement("p");
        address.textContent = member.address;
        address2.textContent = `${member.city}, ${member.state} ${member.zip}`;
        const phone = document.createElement("p");
        phone.textContent = member.phone;
        const website = document.createElement("a");
        website.setAttribute("href", `https://${member.website}`);
        website.textContent = member.website;

        const logo = document.createElement("img");
        logo.setAttribute("src", member.logo);
        logo.setAttribute("alt", `${member.company.toLowerCase()}-logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "75");
        logo.setAttribute("height", "auto");

        bizCard.appendChild(logo);
        bizCard.appendChild(companyName);
        bizCard.appendChild(address);
        bizCard.appendChild(address2);
        bizCard.appendChild(phone);
        bizCard.appendChild(website);

        // add the section card to the "cards" div
        cards.appendChild(bizCard);
        
    });
};

const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const display = document.querySelector("article");

gridBtn.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listBtn.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}