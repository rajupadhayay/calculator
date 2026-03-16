let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

window.onload = function() {
    display.focus();
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        let cursorPos = display.selectionStart;

        if(button.innerText === "=") {
            let expression = display.value.replace(/÷/g, "/");
            display.value = eval(expression);
        }
        else if(button.innerText === "÷") {
            display.value = display.value.slice(0, cursorPos) + "÷" + display.value.slice(cursorPos);
            display.setSelectionRange(cursorPos + 1, cursorPos + 1);
        }
        else if(button.innerText === "%") {
            display.value = eval(display.value) / 100;
        }
        else if(button.innerText === "clear") {
            display.value = "";
        }
        else if(button.innerText === "cancel") {
            display.value = display.value.slice(0, cursorPos - 1) + display.value.slice(cursorPos);
            display.setSelectionRange(cursorPos - 1, cursorPos - 1);
        }
        else {
            display.value = display.value.slice(0, cursorPos) + button.innerText + display.value.slice(cursorPos);
            let newPos = cursorPos + button.innerText.length;
            display.setSelectionRange(newPos, newPos);
        }

        display.focus();
    });
});

document.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        let expression = display.value.replace(/÷/g, "/");
        display.value = eval(expression);
    }
    else if(e.key === "Escape") {
        e.preventDefault();
        display.value = "";
        display.focus();
    }
});

document.addEventListener("click", function(e) {
    if(e.target !== display) {
        display.focus();
    }
});