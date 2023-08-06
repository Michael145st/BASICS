
const url = '/api/courses'; // URL на базе REST API

// Функция для выполнения метода GET
function getCourseData() {
fetch('https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food')
.then(response => response.json())
.then(data => {
displayCourseData(data); // Отображение полученной информации о курсах
})
.catch(error => {
console.error('Ошибка:', error);
});
}

// Функция для отображения полученной информации о курсах
function displayCourseData(courseData) {
const courseCardsContainer = document.getElementById('courseCardsContainer');
courseCardsContainer.classList.add('course-list');


// Очищаем контейнер перед отображением новых карточек
courseCardsContainer.innerHTML = '';

// Создаем карточку курса для каждого элемента в полученных данных
courseData.forEach(course => {
	const courseCard = document.createElement('div');
	courseCard.classList.add('course-card');

	const courseFoto = document.createElement('div');
	courseFoto.classList.add('foto');

	const courseImage = document.createElement('img');
	courseImage.src = course.image;
	courseImage.alt = course.title;
	courseFoto.appendChild(courseImage);

	const courseInfo = document.createElement('div');
	courseInfo.classList.add('info');

	const courseTitle = document.createElement('h2');
	courseTitle.textContent = course.title;
	courseInfo.appendChild(courseTitle);

	const courseDescription = document.createElement('p');
	courseDescription.textContent = course.description;
	courseInfo.appendChild(courseDescription);

	courseCard.appendChild(courseFoto);
	courseCard.appendChild(courseInfo);

	courseCardsContainer.appendChild(courseCard);
});
}

// Выполняем метод GET для получения информации о курсах при загрузке страницы
getCourseData();
