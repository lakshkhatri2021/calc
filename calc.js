const container = document.querySelector(".buttons");

const buttonLabels = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
];

const display = document.querySelector(".display");

let expression = [];  // Stores the sequence of numbers & operators
let currentInput = "";  // Store the current number being entered

buttonLabels.forEach(label => {
    const button = document.createElement("button");
    button.textContent = label;

    button.addEventListener("click", () => {
        if (!isNaN(label) || label === ".") {
            // If number or decimal
            if (label === "." && currentInput.includes(".")) return;  // Prevent multiple "."
            currentInput += label;
            display.textContent = currentInput;
        } else if (["+", "-", "*", "/"].includes(label)) {
            if (currentInput !== "") {
                expression.push(currentInput, label);  // Store the number and operator
                currentInput = "";
                display.textContent = label;  // Show operator briefly
            }
        } else if (label === "=") {
            if (currentInput !== "") expression.push(currentInput); // Push last number
            if (expression.length >= 3) {
                let result = evaluateExpression(expression);
                display.textContent = result;
                currentInput = String(result);
                expression = [currentInput]; // Store result for further operations
            }
        } else if (label === "C") {
            expression = [];
            currentInput = "";
            display.textContent = "0";
        }
    });

    container.appendChild(button);
});

// Function to evaluate the full expression with proper order of operations
function evaluateExpression(exp) {
    let str = exp.join(" "); // Convert array to string like "5 + 3 * 2"
    return Function(`return ${str}`)(); // Safe alternative to eval()
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
        if (key === "." && currentInput.includes(".")) return;
        currentInput += key;
        display.textContent = currentInput;
    } else if (["+", "-", "*", "/"].includes(key)) {
        if (currentInput !== "") {
            expression.push(currentInput, key);
            currentInput = "";
            display.textContent = key;
        }
    } else if (key === "Enter" || key === "=") {
        if (currentInput !== "") expression.push(currentInput);
        if (expression.length >= 3) {
            let result = evaluateExpression(expression);
            display.textContent = result;
            currentInput = String(result);
            expression = [currentInput];
        }
    } else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "0";
    } else if (key.toLowerCase() === "c") {
        expression = [];
        currentInput = "";
        display.textContent = "0";
    }
});