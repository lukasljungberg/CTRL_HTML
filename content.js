let searchBox;
let searchQuery = "";

function createSearchBox() {
    searchBox = document.createElement("div");
    searchBox.id = "search-box";
    searchBox.innerHTML = `<input type="text" id="search-input" placeholder="Search...">`;
    document.body.appendChild(searchBox);

    // Handle keydown event for live search
    setInterval(() => { document.getElementById("search-input").focus() }, 1000);

    document.getElementById("search-input").addEventListener("keydown", function (e) {
        searchQuery = e.target.value;
        if (e.key === "Enter") {
            // Find and click the first matching element when Enter is pressed
            clickMatchingElement();
        } else {
            highlightElements();
        }
    });
}

function highlightElements() {
    const allElements = document.querySelectorAll("body *");
    let matchingElements = [];

    // Clear previous outlines
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight", "green-outline", "yellow-outline");
    });

    // Loop through all elements to check if they contain the search query
    allElements.forEach(el => {
        if (el.innerText && el.innerText.includes(searchQuery)) {
            // Check if the element is a link or button and contains the search query
            let closestElement = el.closest('a, button, input');
            if (closestElement && closestElement.innerText.includes(searchQuery)) {
                matchingElements.push(closestElement);
                closestElement.classList.add("highlight", "yellow-outline");
            }
        }
    });

    // If exactly one element has the yellow outline, change it to green
    if (document.querySelectorAll('.yellow-outline').length === 1) {
        const yellowElement = document.querySelector('.yellow-outline');
        yellowElement.classList.remove("yellow-outline");
        yellowElement.classList.add("green-outline");
    }
}

function clickMatchingElement() {
    const yellowElement = document.querySelector('.yellow-outline');
    const greenElement = document.querySelector('.green-outline');
    if (greenElement) {
        // Click the element that has the yellow outline (now green if it's the only one)
        greenElement.click();
    }
    if (yellowElement) {
        // Click the element that has the yellow outline (now green if it's the only one)
        yellowElement.click();
    }
}

function toggleSearchBox() {
    if (!searchBox) {
        createSearchBox();
    }

    searchBox.style.display = (searchBox.style.display === "none" || searchBox.style.display === "") ? "block" : "none";
}

chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === "toggle-search-box") {
        toggleSearchBox();
    }
});
