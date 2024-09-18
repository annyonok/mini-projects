const mainEl = document.querySelector('.main');

const passwordEl = document.createElement('input');
passwordEl.classList.add('password');
passwordEl.style.width = '250px';
passwordEl.setAttribute('placeholder', 'Сгенерировать пароль');
passwordEl.addEventListener('keypress', (e) => {
    e.preventDefault();
});
passwordEl.addEventListener('focus', (e) => {
    navigator.clipboard.writeText(passwordEl.value);
});

const copyBtn = document.createElement('button');
copyBtn.classList.add('password-button');
copyBtn.innerText = 'Скопировать';
copyBtn.addEventListener('click', (e) => {
    passwordEl.select();
    passwordEl.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(passwordEl.value);
});

const generateBtn = document.createElement('button');
generateBtn.classList.add('password-button');
generateBtn.innerText = 'Сгенерировать';
generateBtn.addEventListener('click', (e) => {
    // Получить значение кнопки с классом.active
    let activeCounter = document.querySelector('.password-counter.active');
    let passwordLength = parseInt(activeCounter.textContent);
    // Вызов функции генерации пароля
    let password = generatePassword(passwordLength);
    passwordEl.value = password;
});

const checkboxWraper = document.createElement('div');
checkboxWraper.classList.add('password-wraper');
checkboxWraper.innerHTML = `
    <div class="checkbox-wrapper">
        <input class="password-checkbox" type="checkbox" checked="true" id="numberchars" /> Numberchars
        <label for="numberchars"></label>
        </div>
        
    <div class="checkbox-wrapper">
        <input class="password-checkbox" type="checkbox" checked="true" id="upperchars" /> Upperchars
        <label for="upperchars"></label>
    </div>

    <div class="checkbox-wrapper">
        <input class="password-checkbox" type="checkbox" checked="true" id="lowerchars" /> Lowerchars
        <label for="lowerchars"></label>
    </div>

    <div class="checkbox-wrapper">
        <input class="password-checkbox" type="checkbox" checked="true" id="symbolchars" /> Symbolchars
        <label for="symbolchars"></label>
    </div>
    `;

const counterChars = document.createElement('div');
counterChars.classList.add('password-length-wraper');
counterChars.innerHTML = `
        <h3 class="password-length">Password length:</h3>
        <button class="password-counter active">8</button>
        <button class="password-counter">12</button>
        <button class="password-counter">24</button>
`;

function generatePassword(passwordLength) {
    const numberChars = '0123456789';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const symbolChars = '!@#$%^&*()_+';
    let allChars = '';

    if (document.getElementById('numberchars').checked) {
        allChars += numberChars;
    }
    if (document.getElementById('upperchars').checked) {
        allChars += upperChars;
    }
    if (document.getElementById('lowerchars').checked) {
        allChars += lowerChars;
    }
    if (document.getElementById('symbolchars').checked) {
        allChars += symbolChars;
    }

    if (allChars.length === 0) {
        alert('Пожалуйста, выберите хотя бы один тип символов');
        return '';
    }

    let randomString = '';

    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * allChars.length);
        randomString += allChars[randomNumber];
    }

    return randomString;
}

mainEl.appendChild(passwordEl);
mainEl.appendChild(copyBtn);
mainEl.appendChild(generateBtn);
mainEl.appendChild(checkboxWraper);

const checkboxes = document.querySelectorAll('.password-checkbox');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
        let password = generatePassword(passwordLength);
        passwordEl.value = password;
    });
});

mainEl.appendChild(counterChars);
const counters = document.querySelectorAll('.password-counter');

counters.forEach((counter) => {
    counter.addEventListener('click', () => {
        // Удалить класс.active у всех кнопок
        counters.forEach((otherCounter) => {
            otherCounter.classList.remove('active');
        });
        // Добавить класс.active только той кнопке, по которой кликнули
        counter.classList.add('active');
        // Получить значение кнопки
        let passwordLength = parseInt(counter.textContent);
        // Генерировать пароль с выбранным количеством символов
        let password = generatePassword(passwordLength);
        passwordEl.value = password;
    });
});
