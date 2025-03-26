let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fonts
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

const initializer = () => {
    // Function calls for highlighting buttons
    highlightRegistry(alignButtons, true);
    highlightRegistry(spacingButtons, true);
    highlightRegistry(formatButtons, false);
    highlightRegistry(scriptButtons, true);

    // Create options for font names
    fontList.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // Font size allows only up to 7
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // Default size
    fontSizeRef.value = 3;
};

// Main logic
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameter
optionsButtons.forEach(button => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
        button.classList.toggle("active");
    });
});

// Highlighter function to handle button highlight states
const highlightRegistry = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            // needsRemoval = true means only one button should be highlighted and others should be normal
            if (needsRemoval) {
                let alreadyActive = button.classList.contains("active");

                // Remove highlight from other buttons
                highlighterRemove(className);
                if (!alreadyActive) {
                    // Highlight clicked button
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

// Remove highlight from all buttons in a group
const highlighterRemove = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// Initialize the editor
initializer();

// Link button functionality
linkButton.addEventListener("click", () => {
    let url = prompt("Enter the URL");
    if (url) {
        modifyText("createLink", false, url);
    }
});

// Populate font options
fontName.addEventListener("change", () => {
    modifyText("fontName", false, fontName.value);
});

// Populate font size options
fontSizeRef.addEventListener("change", () => {
    modifyText("fontSize", false, fontSizeRef.value);
});

// Print button functionality
document.getElementById('print').addEventListener('click', () => {
    let printContents = writingArea.innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = `<div style="padding: 20px;">${printContents}</div>`;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
});

// Color change functionality
document.getElementById("foreColor").addEventListener("change", (event) => {
    modifyText("foreColor", false, event.target.value);
});

document.getElementById("backColor").addEventListener("change", (event) => {
    modifyText("backColor", false, event.target.value);
});

// Format block (headings) functionality
document.getElementById("formatBlock").addEventListener("change", (event) => {
    modifyText("formatBlock", false, event.target.value);
});
