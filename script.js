let result = document.querySelector('.result');
let numbers = document.querySelector('.numbers');
let operators = document.querySelector('.operators');
let equal = document.querySelector('.equal');

numbers.addEventListener('click', (e) => {
    if (e.target !== numbers) {
        result.textContent += e.target.textContent;
    }
});

operators.addEventListener('click', (e) => {
    if (e.target !== operators) {
        result.textContent += e.target.textContent;
    }
});

equal.addEventListener('click', () => {
    try {
        result.textContent = eval(result.textContent);
    } catch {
        result.textContent = 'Error';
    }
});

    