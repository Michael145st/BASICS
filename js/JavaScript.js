
const url = '/api/courses' // URL на базе REST API

// Функция для выполнения метода GET
function getCourseData() {
fetch('https://64ce50fd8bc4d0443865135c--superlative-florentine-17aa90.netlify.app')
.then(response => response.json())
.then(data => {
displayCourseData(data) // Отображение полученной информации о курсах
})
.catch(error => {
console.error('Ошибка:', error)
})
}

// Функция для отображения полученной информации о курсах
function displayCourseData(courseData) {
	const courseCardsContainer = document.getElementById('courseCardsContainer')

	// Очищаем контейнер перед отображением новых карточек
	courseCardsContainer.innerHTML = ''

	// Создаем карточку курса для каждого элемента в полученных данных
	courseData.forEach(course => {
		const courseCard = document.createElement('div')
		courseCard.classList.add('course-card')

		const courseImage = document.createElement('img')
		courseImage.src = course.image
		courseImage.alt = course.title
		courseCard.appendChild(courseImage)

		const courseInfo = document.createElement('div')
		courseInfo.classList.add('info')

		const courseTitle = document.createElement('h2')
		courseTitle.textContent = course.title
		courseInfo.appendChild(courseTitle)

		const courseDescription = document.createElement('p')
		courseDescription.textContent = course.description
		courseInfo.appendChild(courseDescription)

		
	})
}

// Выполняем метод GET для получения информации о курсах при загрузке страницы
getCourseData()

