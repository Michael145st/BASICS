// Function for the GET method
function getCourseData() {
	fetch('https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food')
		.then(response => response.json())
		.then(data => {
			displayCourseData(data) // show the course information
		})
		.catch(error => {
			console.error('error:', error)
		})
}

// Function to display the course data
function displayCourseData(courseData) {
	const courseCardsContainer = document.getElementById('courseCardsContainer')
	courseCardsContainer.classList.add('course-list')

	// Clear the container before adding new cards
	courseCardsContainer.innerHTML = ''

	// Create course card for each element from the .JSON
	courseData.forEach(course => {
		const courseCard = document.createElement('div')
		courseCard.classList.add('course-card')

		const courseFoto = document.createElement('div')
		courseFoto.classList.add('foto')

		const courseImage = document.createElement('img')
		courseImage.src = course.image
		courseImage.alt = course.title
		courseFoto.appendChild(courseImage)

		const courseSet = document.createElement('button')
		courseSet.classList.add('settings-btn')
		courseSet.textContent = 'CHANGE'
		courseSet.addEventListener('click', function () {
			openModal(course)
		})

		const courseInfo = document.createElement('div')
		courseInfo.classList.add('info')

		const courseTitle = document.createElement('h2')
		courseTitle.textContent = course.title
		courseInfo.appendChild(courseTitle)

		const courseDescription = document.createElement('p')
		courseDescription.textContent = course.description
		courseInfo.appendChild(courseDescription)

		courseCard.appendChild(courseFoto)
		courseCard.appendChild(courseInfo)
		courseCard.appendChild(courseSet)

		courseCardsContainer.appendChild(courseCard)
	})
}

// Open the modal window
function openModal(course) {
	const modal = document.getElementById('modal')
	const closeButton = document.querySelector('.modal-close')
	const saveButton = document.getElementById('save-btn')
	const field1 = document.getElementById('courseTitle')
	const field2 = document.getElementById('courseDescription')
	const field3 = document.getElementById('courseBild')
	const modalTitle = document.querySelector('.create1')

	field1.value = course ? course.title : ''
	field2.value = course ? course.description : ''
	field3.value = course ? course.image : ''
	modalTitle.textContent = course ? 'CHANGE COURSE' : 'CREATE NEW COURSE'
	saveButton.textContent = course ? 'CHANGE' : 'CREATE'

	modal.style.display = 'block'

	closeButton.onclick = function () {
		modal.style.display = 'none'
	}

	window.onclick = function (event) {
		if (event.target === modal) {
			modal.style.display = 'none'
		}
	}

	saveButton.onclick = function () {
		const updatedCourse = {
			title: field1.value,
			description: field2.value,
			image: field3.value,
		}

		const requestOptions = {
			method: course ? 'PUT' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedCourse),
		}

		const requestUrl = course
			? `https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food/${course.id}`
			: 'https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food'

		fetch(requestUrl, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				modal.style.display = 'none'
				getCourseData()
			})
			.catch(error => {
				console.error('error:', error)
			})
	}
}

// Call the GET method
getCourseData()

const createBtn = document.getElementById('createBtn')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close')


// Open the modal window on click Create-Course
createBtn.addEventListener('click', function () {
	openModal(null)
})

// Close the modal window on click cross
closeBtn.addEventListener('click', function () {
	modal.style.display = 'none'
})

// Close the modal window on click outside
window.addEventListener('click', function (event) {
	if (event.target === modal) {
		modal.style.display = 'none'
	}
})
