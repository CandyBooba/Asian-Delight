document.addEventListener('DOMContentLoaded', function() {
  // Добавляем класс reveal всем секциям кроме hero
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.classList.add('reveal');
  });

  // Функция проверки видимости
  function checkVisibility() {
    // Для секций
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (revealTop < windowHeight - 100) {
        reveal.classList.add('active');
      }
    });

    // Для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (cardTop < windowHeight - 100) {
        card.classList.add('visible');
      }
    });

    // Для отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
      const testimonialTop = testimonial.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (testimonialTop < windowHeight - 100) {
        testimonial.classList.add('visible');
      }
    });

    // Для форм
    const forms = document.querySelectorAll('.feedback-container, .order-service-container');
    forms.forEach(form => {
      const formTop = form.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (formTop < windowHeight - 100) {
        form.classList.add('visible');
      }
    });
  }

  // Проверяем при загрузке и при прокрутке
  window.addEventListener('load', checkVisibility);
  window.addEventListener('scroll', checkVisibility);
  
  // Инициализация
  checkVisibility();
});


document.addEventListener('DOMContentLoaded', function() {
    // Элементы слайдера
    const sliderImages = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow-left');
    const nextArrow = document.querySelector('.slider-arrow-right');
    let currentIndex = 0;
    const intervalTime = 5000; // 5 секунд
    let sliderInterval;
    
    // Функция для показа слайда по индексу
    function showSlide(index) {
        // Корректируем индекс для кругового переключения
        if (index >= sliderImages.length) {
            index = 0;
        } else if (index < 0) {
            index = sliderImages.length - 1;
        }
        
        // Удаляем активные классы
        sliderImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Устанавливаем новый индекс
        currentIndex = index;
        
        // Добавляем активные классы
        sliderImages[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Функция для следующего слайда
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Функция для предыдущего слайда
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Запуск автоматической смены слайдов
    function startSlider() {
        // Сначала очищаем существующий интервал
        clearInterval(sliderInterval);
        // Затем устанавливаем новый
        sliderInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Инициализация слайдера
    function initSlider() {
        showSlide(0);
        startSlider();
        
        // Остановка при наведении
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        // Возобновление при уходе курсора
        slider.addEventListener('mouseleave', startSlider);
        
        // Обработчики для стрелок
        nextArrow.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        prevArrow.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        
        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
    }
    
    // Сброс интервала
    function resetInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Инициализируем слайдер
    initSlider();
});

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const wrapper = this.closest('.card-wrapper');
        wrapper.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const ratingSlider = document.getElementById('feedback-rating');
    const ratingValue = document.getElementById('feedback-rating-value');
    
    // Обновление значения рейтинга
    ratingSlider.addEventListener('input', function() {
        ratingValue.textContent = this.value;
    });
    
    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбрасываем ошибки
        document.querySelectorAll('.feedback-error').forEach(el => {
            el.style.display = 'none';
        });
        
        // Валидация имени
        const nameInput = document.getElementById('feedback-name');
        if (!nameInput.checkValidity()) {
            const error = document.getElementById('feedback-name-error');
            error.textContent = 'Введите корректное имя (2-30 символов, только буквы)';
            error.style.display = 'block';
            return;
        }
        
        // Валидация email (если заполнен)
        const emailInput = document.getElementById('feedback-email');
        if (emailInput.value && !emailInput.checkValidity()) {
            const error = document.getElementById('feedback-email-error');
            error.textContent = 'Введите корректный email';
            error.style.display = 'block';
            return;
        }
        
        // Валидация комментария
        const commentInput = document.getElementById('feedback-comment');
        if (!commentInput.checkValidity()) {
            const error = document.getElementById('feedback-comment-error');
            error.textContent = 'Отзыв должен содержать от 10 до 500 символов';
            error.style.display = 'block';
            return;
        }
        
        // Подготовка данных для вывода
        const formData = {
            name: nameInput.value.trim(),
            rating: ratingSlider.value,
            email: emailInput.value.trim() || 'не указан',
            comment: commentInput.value.trim()
        };
        
        // Вывод данных
        alert(`Спасибо за отзыв, ${formData.name}!\n\n` +
              `Оценка: ${formData.rating}/10\n` +
              `Email: ${formData.email}\n\n` +
              `Ваш отзыв:\n"${formData.comment}"`);
        
        // Сброс формы
        form.reset();
        ratingValue.textContent = '5';
    });
    
    // Защита от ввода кода
    const commentInput = document.getElementById('feedback-comment');
    commentInput.addEventListener('input', function() {
        this.value = this.value.replace(/[<>]/g, '');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderServiceForm');
    const commentInput = document.getElementById('order-comment');
    
    // Защита от ввода кода в комментарий
    commentInput.addEventListener('input', function() {
        this.value = this.value.replace(/[<>]/g, '');
    });

    // Маска для телефона
    const phoneInput = document.getElementById('order-phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Сброс ошибок
        document.querySelectorAll('.order-service-error').forEach(el => {
            el.style.display = 'none';
        });
        
        // Валидация полей
        const fields = [
            { id: 'order-first-name', error: 'order-first-name-error', message: 'Введите корректное имя' },
            { id: 'order-last-name', error: 'order-last-name-error', message: 'Введите корректную фамилию' },
            { id: 'order-phone', error: 'order-phone-error', message: 'Введите телефон в формате +7 (123) 456-78-90' },
            { id: 'order-email', error: 'order-email-error', message: 'Введите корректный email' },
            { id: 'order-date', error: 'order-date-error', message: 'Выберите дату' },
            { id: 'order-service', error: 'order-service-error', message: 'Выберите услугу' }
        ];
        
        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (!input.checkValidity()) {
                document.getElementById(field.error).textContent = field.message;
                document.getElementById(field.error).style.display = 'block';
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Сбор данных
        const formData = {
            firstName: document.getElementById('order-first-name').value.trim(),
            lastName: document.getElementById('order-last-name').value.trim(),
            phone: document.getElementById('order-phone').value.trim(),
            email: document.getElementById('order-email').value.trim(),
            date: document.getElementById('order-date').value,
            service: document.getElementById('order-service').options[document.getElementById('order-service').selectedIndex].text,
            comment: document.getElementById('order-comment').value.trim() || 'нет комментария'
        };
        
        // Вывод данных
        alert(`Заявка принята!\n\n` +
              `Имя: ${formData.firstName} ${formData.lastName}\n` +
              `Телефон: ${formData.phone}\n` +
              `Email: ${formData.email}\n` +
              `Дата: ${new Date(formData.date).toLocaleDateString('ru-RU')}\n` +
              `Услуга: ${formData.service}\n` +
              `Комментарий: ${formData.comment}`);
        
        // Сброс формы
        form.reset();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Плавная прокрутка
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем меню на мобильных
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Прокрутка к секции
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Изменение стиля при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 1)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});


// Добавьте этот код в конец файла script.js
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для кнопки "Посмотреть ассортимент"
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.open('docs/СВЧ лаба 4 я ультанул.pdf', '_blank');
        });
    }
    
    // Обработчик для ссылки "Продукты" в футере
    const productsLink = document.querySelector('.footer-list a[href="#products"]');
    if (productsLink) {
        productsLink.href = 'docs/СВЧ лаба 4 я ультанул.pdf';
        productsLink.target = '_blank';
    }
});