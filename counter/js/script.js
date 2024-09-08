const items = document.querySelectorAll('.countdown__item > h4');
const countdownElement = document.querySelector('.countdown');

//Назначаем дату отсчета
let countdownDate = new Date(2025, 8, 2, 12, 45).getTime();

function getCountdownTime() {
    //Получаем текущее время
    const now = new Date().getTime();

    //Найти разницу времени
    const distance = countdownDate - now;

    //1с = 1000мс
    //1м = 60с
    //1ч = 60м
    //1д = 24ч

    //Создаем переменные в милисекундах
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    //Подсчет для дней, часов, минут и секунд
    let days = Math.floor(distance / oneDay);
    let hours = Math.floor((distance % oneDay) / oneHour);
    let minutes = Math.floor((distance % oneHour) / oneMinute);
    let seconds = Math.floor((distance % oneMinute) / 1000);

    //Создаем массив с переменными
    const values = [days, hours, minutes, seconds];
    
    //Добавляем значение переменных на страницу
    items.forEach(function (item, index) {
        item.textContent = (values[index]);
    });

    if (distance < 0) {
        clearInterval(countdown);
        countdownElement.innerHTML = `<h4 class="expired">Время вышло</h4>`
    }
}

//Обновление счетчика каждую секунду
let countdown = setInterval(getCountdownTime, 1000);

//Инициализация текущего времени
getCountdownTime();