let currentOperation = null;
let previousValue = "";
let currentValue = "";
let shouldResetScreen = false;

document.querySelectorAll('table td').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;

        if (buttonText >= '0' && buttonText <= '9') {
            handleNumber(buttonText);
        } else {
            switch (buttonText) {
                case 'C':
                    clear();
                    break;
                case 'CE':
                    clearEntry();
                    break;
                case '⬅':
                    backspace();
                    break;
                case '+':
                case '-':
                case 'X':
                case '/':
                    handleOperation(buttonText);
                    break;
                case '=':
                    calculate();
                    break;
                // Adicione mais casos conforme necessário
            }
        }
        updateDisplay();
    });
});

function handleNumber(number) {
    if (shouldResetScreen || document.querySelector("#painel").innerText === "0") {
        document.querySelector("#painel").innerText = number;
        shouldResetScreen = false;
    } else {
        document.querySelector("#painel").innerText += number;
    }
    currentValue += number;
}

function handleOperation(operation) {
    if (currentOperation !== null) calculate();
    previousValue = currentValue;
    currentValue = "";
    currentOperation = operation;
    shouldResetScreen = true;
}

function calculate() {
    if (currentOperation === null || shouldResetScreen) return;
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'X':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Divisão por zero não é permitida");
                return;
            }
            result = prev / current;
            break;
        // Adicione mais operações conforme necessário
    }
    document.querySelector("#painel").innerText = result.toString();
    currentValue = result.toString();
    currentOperation = null;
}

function clear() {
    document.querySelector("#painel").innerText = "0";
    currentValue = "";
    previousValue = "";
    currentOperation = null;
    shouldResetScreen = true;
}

function clearEntry() {
    document.querySelector("#painel").innerText = "0";
    currentValue = "";
    shouldResetScreen = true;
}

function backspace() {
    document.querySelector("#painel").innerText = document.querySelector("#painel").innerText.slice(0, -1);
    currentValue = currentValue.slice(0, -1);
    if (document.querySelector("#painel").innerText === "") {
        document.querySelector("#painel").innerText = "0";
        shouldResetScreen = true;
    }
}

function updateDisplay() {
    document.querySelector("#painel").innerText = currentValue || "0";
}
