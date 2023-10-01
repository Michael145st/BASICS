// Получаем все кнопки навигации
const navButtons = document.querySelectorAll('.btn-nav')

// Получаем все блоки контента
const contentBlocks = document.querySelectorAll('.block')

// Функция, которая добавляет класс "active" к активной кнопке
function setActiveNavButton(index) {
	navButtons.forEach((button, i) => {
		if (i === index) {
			button.classList.add('active')
		} else {
			button.classList.remove('active')
		}
	})
}

// Функция, которая определяет, какой блок в данный момент виден на экране
function determineActiveBlock() {
	const windowHeight = window.innerHeight
	const scrollY = window.scrollY

	contentBlocks.forEach((block, index) => {
		const blockTop = block.getBoundingClientRect().top
		const blockBottom = blockTop + block.clientHeight

		if (blockTop <= windowHeight / 2 && blockBottom >= windowHeight / 2) {
			setActiveNavButton(index)
		}
	})
}

// Слушатель события прокрутки страницы для определения активного блока
window.addEventListener('scroll', determineActiveBlock)

// Вызываем функцию при загрузке страницы для начальной установки активной кнопки
determineActiveBlock()

// Обработчик события клика на кнопки навигации
navButtons.forEach((button, index) => {
	button.addEventListener('click', () => {
		// Используем scrollIntoView для перемещения к соответствующему блоку
		contentBlocks[index].scrollIntoView({ behavior: 'smooth' })
	})
})


console.log("Script is running")
    // Идентификаторы вашего Contentful пространства и токен доступа
    const spaceId = 'fana5mnl0cnv';
    const accessToken = 'TWhWFg5LrI4Bt_hL0hN6FWUrXwuo5QRSMFXw2tzikuI';

    // Создаем клиент Contentful
    const client = contentful.createClient({
        space: spaceId,
        accessToken: accessToken
    });

    // ...

// Функция для загрузки и отображения контента
function loadContent() {
    client.getEntries()
        .then((response) => { 
            console.log(response);
            // Получаем записи (контент) из Contentful
            const projects = response.items;

            // Получаем контейнер для проектов
            const container = document.querySelector('.portfolio-nav-container');

            // Очищаем контейнер
            container.innerHTML = '';

            // Отображаем каждый проект
            projects.forEach((project) => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('portfolio-nav');

                // Используйте правильное имя поля (например, "image") в соответствии с вашей моделью данных Contentful
                const image = project.fields.image;

                // Проверка на наличие изображения перед его использованием
                if (image && image.fields && image.fields.file && image.fields.file.url) {
                    const imageUrl = image.fields.file.url;

                    // Создаем HTML для проекта (подставьте свои поля из Contentful)
                    projectDiv.innerHTML = `
                        <div class="background">
                            <img src="${imageUrl}" alt="${project.fields.title}">
                        </div>
                        <div class="onhover">
                            <h1 class="title">${project.fields.title}</h1>
                            <p class="description">${project.fields.description}</p>
                            <button><a href="${project.fields.link}" target="_blank">Открыть</a></button>
                        </div>
                    `;

                    // Добавляем проект в контейнер
                    container.appendChild(projectDiv);
                }
            });
        })
        .catch(console.error);
}

// ...

    // Загружаем контент при загрузке страницы
    loadContent();
</script>

// Получаем кнопку "Show my skills" и элемент секции skill-container
const showSkillsButton = document.querySelector('.skills')
const skillContainer = document.querySelector('.skills-container')
const foto2 = document.querySelector(".foto2")

// Добавляем обработчик события на кнопку "Show my skills"
showSkillsButton.addEventListener('click', function () {
	// При клике скрываем кнопку
	showSkillsButton.style.display = 'none'
    foto2.style.display = "none"

	// Показываем секцию skill-container
	skillContainer.style.display = 'flex'
})

// Получаем все кнопки slider-nav и изображение
const sliderNavButtons = document.querySelectorAll('.slider-nav')
const sliderImage = document.querySelector('.reviews .portrait')
const sliderItems = document.querySelectorAll('.slider-item')

// Добавляем обработчик события для каждой кнопки
sliderNavButtons.forEach(function (button, index) {
	button.addEventListener('click', function () {
		// Убираем класс 'selected' у всех кнопок
		sliderNavButtons.forEach(function (btn) {
			btn.classList.remove('selected')
		})

		// Добавляем класс 'selected' только к текущей кнопке
		button.classList.add('selected')

		// Заменяем src атрибут изображения на соответствующий путь
		var imgSrc = sliderItems[index].getAttribute('data-img-src')
		sliderImage.src = imgSrc

		// Скрываем все слайды
		sliderItems.forEach(function (item) {
			item.style.display = 'none'
		})

		// Показываем текущий слайд
		sliderItems[index].style.display = 'flex'
	})
})
// ... (весь предыдущий код)

let currentIndex = 0 // Индекс активного слайда
let autoChangeTimer // Таймер для автоматической смены слайдов

// Функция для смены слайда по индексу
function changeSlide(index) {
	if (index !== currentIndex) {
		// Убираем класс 'selected' у текущей кнопки и скрываем текущий слайд
		sliderNavButtons[currentIndex].classList.remove('selected')
		sliderItems[currentIndex].style.display = 'none'

		// Устанавливаем новый индекс слайда
		currentIndex = index

		// Добавляем класс 'selected' к новой кнопке и показываем новый слайд
		sliderNavButtons[currentIndex].classList.add('selected')
		sliderItems[currentIndex].style.display = 'flex'
	}
}

// Функция для автоматической смены слайдов
function autoChangeSlide() {
    const nextIndex = (currentIndex + 1) % sliderNavButtons.length;
    changeSlide(nextIndex);

    // Обновляем src атрибут изображения на соответствующий путь
    var imgSrc = sliderItems[nextIndex].getAttribute('data-img-src');
    sliderImage.src = imgSrc;
}

// Начинаем автоматическую смену слайдов с интервалом в 2 секунды
autoChangeTimer = setInterval(autoChangeSlide, 2000);

// Длительность показа слайда после клика (в миллисекундах)
const slideShowDurationAfterClick = 8000;

// Обработчик клика на кнопках слайдера
sliderNavButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        clearTimeout(autoChangeTimer); // Остановка текущего таймера

        // Изменяем слайд на тот, на который кликнули
        changeSlide(index);

        // Обновляем src атрибут изображения на соответствующий путь
        var imgSrc = sliderItems[index].getAttribute('data-img-src');
        sliderImage.src = imgSrc;

        // Устанавливаем новый таймер для автоматической смены после заданной задержки
        autoChangeTimer = setTimeout(() => {
            autoChangeSlide();
            // Возобновляем автоматическую смену с интервалом
            autoChangeTimer = setInterval(autoChangeSlide, 2000);
        }, slideShowDurationAfterClick);
    });
});

// Изначально устанавливаем первый слайд и начинаем автоматическую смену
changeSlide(currentIndex);


    // Получаем ссылки на все обязательные элементы ввода
   
	const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const sendButton = document.getElementById('sendButton');

    // Функция для проверки валидности элементов ввода
    function validateInputs() {
        const isValidName = nameInput.value.trim() !== '';
        const isValidEmail = emailInput.value.trim() !== '';
        const isValidMessage = messageTextarea.value.trim() !== '';

        // Присваиваем класс "mana" валидным элементам ввода
        nameInput.classList.toggle('mana', isValidName);
        emailInput.classList.toggle('mana', isValidEmail);
        messageTextarea.classList.toggle('mana', isValidMessage);

        // Проверяем, все ли обязательные поля заполнены
        if (isValidName && isValidEmail && isValidMessage) {
            sendButton.classList.add('mana'); // Если все поля заполнены, присваиваем класс "mana" кнопке
        } else {
            sendButton.classList.remove('mana'); // В противном случае удаляем класс "mana" с кнопки
        }
    }

    // Добавляем слушатели событий на элементы ввода для проверки при изменении
    nameInput.addEventListener('input', validateInputs);
    emailInput.addEventListener('input', validateInputs);
    messageTextarea.addEventListener('input', validateInputs);



	// Получаем кнопку "down" по классу
const downButton = document.querySelector('.down');

// Получаем блок "about me" по атрибуту data-index
const aboutMeBlock = document.querySelector('.block[data-index="1"]');

// Добавляем обработчик события клика на кнопку "down"
downButton.addEventListener('click', function () {
    // Используем метод scrollIntoView для плавной прокрутки к блоку "about me"
    aboutMeBlock.scrollIntoView({ behavior: 'smooth' });
});

// Получаем кнопку "hireme" по классу
const hireMeButton = document.querySelector('.hireme');

// Получаем блок "service" по атрибуту data-index
const serviceBlock = document.querySelector('.block[data-index="5"]');

// Добавляем обработчик события клика на кнопку "hireme"
hireMeButton.addEventListener('click', function () {
    // Используем метод scrollIntoView для плавной прокрутки к блоку "service"
    serviceBlock.scrollIntoView({ behavior: 'smooth' });
});
// Получаем кнопку "arrow" по классу
const arrowButton = document.querySelector('.arrow');

// Добавляем обработчик события клика на кнопку "arrow"
arrowButton.addEventListener('click', function () {
    // Используем метод scrollIntoView для плавной прокрутки к началу страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Получаем элемент футера по тегу
const footer = document.querySelector('footer');

// Получаем кнопку "unten" по классу
const untenButton = document.querySelector('.unten');
const footerText = document.querySelector('.b3')
// Функция для проверки видимости футера
function isFooterVisible() {
    const footerRect = footer.getBoundingClientRect();
    return footerRect.top < window.innerHeight && footerRect.bottom >= 0;
}

// Функция для установки класса "active" на кнопке "unten" в зависимости от видимости футера
function updateUntenButton() {
    if (isFooterVisible()) {
        untenButton.classList.add('active');
        footerText.classList.add('active')
        arrowButton.classList.add('active')
    } else {
        untenButton.classList.remove('active');
        footerText.classList.remove('active')
        arrowButton.classList.remove('active')
    }
}

// Добавляем слушатель события прокрутки страницы
window.addEventListener('scroll', updateUntenButton);

// Устанавливаем начальное состояние кнопки "unten" при загрузке страницы
updateUntenButton();

// Добавляем слушатель события прокрутки страницы
window.addEventListener('scroll', updateUntenButton)

// Устанавливаем начальное состояние кнопки "unten" при загрузке страницы
updateUntenButton()

document.addEventListener('DOMContentLoaded', function () {
	const scrollbarTrack = document.getElementById('scrollbar-track')

	const updateScrollbarColor = () => {
		const scrollPercentage =
			(window.scrollY /
				(document.documentElement.scrollHeight - window.innerHeight)) *
			100
		const newColor = `linear-gradient(to bottom, #84212e ${scrollPercentage}%, transparent 0%)`

		scrollbarTrack.style.background = newColor
		scrollbarTrack.style.opacity = '1' // Показываем элемент
	}

	window.addEventListener('scroll', updateScrollbarColor)
	updateScrollbarColor() // Обновляем цвет дорожки скроллбара при загрузке страницы
})

const portfolioItems = document.querySelectorAll('.portfolio-nav')

// Добавляем обработчик события клика для каждой карточки
portfolioItems.forEach(item => {
	item.addEventListener('click', () => {
		// Проверяем, есть ли класс "open" у текущей карточки
		const isOpen = item.classList.contains('open')

		// Удаляем класс "open" у всех карточек
		portfolioItems.forEach(item => {
			item.classList.remove('open')
		})

		// Если класс "open" не был у текущей карточки, добавляем его
		if (!isOpen) {
			item.classList.add('open')
		}
	})
})
