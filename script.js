
// Завдання 1
//  Отримуємо інформацію про браузер  та операційну систему 
const userInfo = {
    browser: navigator.userAgent,
    os: navigator.platform
};

//  Зберігаємо ці дані у localStorage 
localStorage.setItem('userSystemInfo', JSON.stringify(userInfo));


const savedInfoString = localStorage.getItem('userSystemInfo');
const savedInfo = JSON.parse(savedInfoString);

//  Знаходимо наш елемент у футері і виводимо туди інформацію
const systemInfoElement = document.getElementById('system-info');
if (systemInfoElement) {
    systemInfoElement.innerText = `OS: ${savedInfo.os} | Browser: ${savedInfo.browser}`;
}

// ЗАВДАННЯ 2: Асинхронний JavaScript  - Отримання відгуків


const variantNumber = 7;
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

async function fetchReviews() {
    // Знаходимо контейнер, куди будемо вставляти відгуки
    const container = document.getElementById('reviews-container');
    
    try {
        // Робимо запит до сервера
        const response = await fetch(apiUrl);
        const reviews = await response.json(); 
        
        //  "Loading reviews..."
        container.innerHTML = '';
        
        
        reviews.forEach(review => {
            // Створюємо новий блок  для відгуку
            const reviewElement = document.createElement('div');
            
            // Стилі 
            reviewElement.style.marginBottom = '15px';
            reviewElement.style.padding = '10px';
            reviewElement.style.backgroundColor = '#f4f7f6';
            reviewElement.style.borderLeft = '4px solid #7b52ab';
            
            // ім'я, email, текст 
            reviewElement.innerHTML = `
                <strong style="color: #333; text-transform: capitalize;">${review.name}</strong> 
                <br>
                <a href="mailto:${review.email}" style="font-size: 0.85em; color: #7b52ab;">${review.email}</a>
                <p style="margin-top: 5px; font-size: 0.9em;">"${review.body}"</p>
            `;
            
            // Додаємо блок 
            container.appendChild(reviewElement);
        });
        
    } catch (error) {
        // Якщо сталася помилка  показуємо повідомлення
        console.error('Помилка при завантаженні відгуків:', error);
        container.innerHTML = '<p style="color: red;">Failed to load reviews. Check console for details.</p>';
    }
}

// Викликаємо функцію, щоб вона завантажила відгуки одразу після відкриття сторінки
fetchReviews();



//  Модальне вікно та таймер

const modal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeModal');



setTimeout(() => {
    modal.style.display = 'block';
}, 30000);

// Закриваємо вікно при кліку на хрестик
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закриваємо вікно при кліку мишкою будь-де поза самим білим вікном
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ЗАВДАННЯ 4 перемикач теми

const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// Функція для зміни вигляду сайту
function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-theme');
        themeToggleBtn.innerText = ' Світла тема';
    } else {
        body.classList.remove('dark-theme');
        themeToggleBtn.innerText = ' Темна тема';
    }
}

//  Перевіряємо поточний час 
const currentHour = new Date().getHours();
const isNightTime = currentHour < 7 || currentHour >= 21;

// Перевіряємо, чи не зберіг користувач свій вибір раніше 
const savedTheme = localStorage.getItem('siteTheme');

if (savedTheme === 'dark') {
    setTheme(true);
} else if (savedTheme === 'light') {
    setTheme(false);
} else {
    // Якщо користувач ще нічого не натискав, покладаємось на час
    setTheme(isNightTime);
}

//  Ручне перемикання при натисканні на кнопку
themeToggleBtn.addEventListener('click', () => {
    
    const isCurrentlyDark = body.classList.contains('dark-theme');
    
    if (isCurrentlyDark) {
        setTheme(false); 
        localStorage.setItem('siteTheme', 'light'); // Зберігаємо вибір
    } else {
        setTheme(true); 
        localStorage.setItem('siteTheme', 'dark'); // Зберігаємо вибір
    }
});

