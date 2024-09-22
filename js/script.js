const headerBurger = document.querySelector('.burger');
const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header_menu');
const body = document.body;

headerBurger.addEventListener('click', () => {
  headerBurger.classList.toggle('active');
  headerMenu.classList.toggle('active');
  body.classList.toggle('locked');
});

const banner = document.querySelector('.banner');
const page = document.querySelector('.page');

document.addEventListener('DOMContentLoaded', () => {
  header.classList.add('loaded');
  banner.classList.add('loaded');

  if (header.classList.contains('loaded') && banner.classList.contains('loaded')) {
    page.classList.add('loaded');
  }
});

// banner/header animation
const bannerText = document.querySelector('.banner_text');
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    header.classList.add('animated');
  }, 10);
});

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight && rect.bottom > 0
  );
}

// Функція для анімації лічильників
function animateCounter(counter) {
  const targetValue = +counter.getAttribute('data-target'); // Отримати кінцеве значення з HTML
  const duration = 2000; // Тривалість анімації в мілісекундах (2 секунди)
  const startValue = 0;
  const stepTime = Math.abs(Math.floor(duration / targetValue)); // Час між збільшенням значення

  let currentValue = startValue;
  const timer = setInterval(() => {
    currentValue += 1;
    counter.textContent = currentValue;

    if (currentValue >= targetValue) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Функція для додавання класу active і запуску анімації лічильників
function checkAnimations() {
  const animatedElements = document.querySelectorAll('.animated');

  animatedElements.forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add('active');

      // Знайти всі лічильники в елементі та анімувати їх
      const counters = el.querySelectorAll('.counter');
      counters.forEach(counter => {
        if (!counter.classList.contains('counting')) {
          counter.classList.add('counting'); // Додаємо клас, щоб уникнути повторної анімації
          animateCounter(counter);
        }
      });
    }
  });
}

// Виклик функції при скролі та завантаженні сторінки
window.addEventListener('scroll', checkAnimations);
window.addEventListener('load', checkAnimations);


const contactFormActive = document.querySelector('.contactFormActive');
const contactForm = document.querySelector('.price_popup');
const contactFormArea = document.querySelector('.price_popup_form');
const priceInfoPopup = document.querySelector('.price_info_popup');
const submitButton = document.querySelector('.submit_button');

contactFormActive.addEventListener('click', (e) => {
  e.preventDefault();
  contactForm.classList.add('active');
});

// Закриваємо форму, якщо клік на фоні (заливці)
contactForm.addEventListener('click', (e) => {
  if (!contactFormArea.contains(e.target)) {
    contactForm.classList.remove('active');
  }
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  const name = contactFormArea.name.value.trim();
  const email = contactFormArea.email.value.trim();
  const phone = contactFormArea.phone.value.trim();

  // Валідація
  if (!name) {
    console.log('Ім\'я не може бути порожнім');
    return;
  }

  if (!validateEmail(email)) {
    console.log('Неправильний формат електронної пошти');
    return;
  }

  if (!(phone)) {
    console.log('Неправильний формат телефону');
    return;
  }

  // Якщо валідація пройшла успішно
  const data = {
    name: name, 
    email: email,
    phoneNum: phone
  };

  console.log(data);

  // Показуємо priceInfoPopup
  priceInfoPopup.classList.add('active');

  // Закриваємо contactForm
  contactForm.classList.remove('active');
});

// Функція для валідації електронної пошти
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Закриваємо priceInfoPopup при натисканні
priceInfoPopup.addEventListener('click', () => {
  priceInfoPopup.classList.remove('active');
});
