const apiUrl = 'https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food'
const courseCardsContainer = document.getElementById('courseCardsContainer')
const modal = document.getElementById('modal')
const modalConfirm = document.getElementById('modalConfirm')
const createBtn = document.getElementById('createBtn')
const deleteBtn = document.getElementById('deleteBtn')
const closeButton = modal.querySelector('.modal-close')
const closeButtonConfirm = modalConfirm.querySelector('.modal-close')
const confirmButton = document.getElementById('confirmDeleteBtn')
const cancelButton = document.getElementById('cancelDeleteBtn')
const deleteButtonContainer = document.getElementById('deleteButtonContainer')

function fetchJson(url, options) {
	return fetch(url, options).then(response => response.json())
}

function getCourseData() {
	fetchJson(apiUrl)
		.then(displayCourseData)
		.catch(error => console.error('Error fetching data:', error))
}

function displayCourseData(courseData) {
	courseCardsContainer.innerHTML = ''
	courseData.forEach(course => {
		const courseCard = createCourseCard(course)
		courseCardsContainer.appendChild(courseCard)
	})
	updateDeleteButtonVisibility()
}

function createCourseCard(course) {
	const courseCard = document.createElement('div')
	courseCard.className = 'course-card'
	courseCard.dataset.id = course.id

	const courseFoto = document.createElement('div')
	courseFoto.className = 'foto'
	const courseImage = document.createElement('img')
	courseImage.src = course.image
	courseImage.alt = course.title
	courseFoto.appendChild(courseImage)

	const courseSet = document.createElement('button')
	courseSet.className = 'settings-btn'
	courseSet.textContent = 'CHANGE'
	courseSet.addEventListener('click', event => {
		event.stopPropagation()
		openModal(course)
	})

	const courseInfo = document.createElement('div')
	courseInfo.className = 'info'
	courseInfo.innerHTML = `<h2>${course.title}</h2><p>${course.description}</p>`

	courseCard.append(courseFoto, courseInfo, courseSet)
	courseCard.addEventListener('click', handleCourseSelection)

	return courseCard
}

function updateDeleteButtonVisibility() {
	const selectedCourses = document.querySelectorAll('.course-card.selected')
	const deleteButtonText =
		selectedCourses.length === 1 ? '' : `${selectedCourses.length}`
	deleteBtn.style.display = selectedCourses.length > 0 ? 'block' : 'none'
	deleteBtn.textContent = deleteButtonText

	deleteButtonContainer.style.display =
		selectedCourses.length > 0 && modal.style.display !== 'block'
			? 'block'
			: 'none'
}

let selectedCourseCard = null

function openModal(course) {
	selectedCourseCard = course

	const saveButton = document.getElementById('save-btn')
	const [field1, field2, field3] = [
		'courseTitle',
		'courseDescription',
		'courseBild',
	].map(id => document.getElementById(id))
	const modalTitle = modal.querySelector('.create1')
	const isEditMode = course !== null

	field1.value = isEditMode ? course.title : ''
	field2.value = isEditMode ? course.description : ''
	field3.value = isEditMode ? course.image : ''
	modalTitle.textContent = isEditMode ? 'CHANGE COURSE' : 'CREATE NEW COURSE'
	saveButton.textContent = isEditMode ? 'CHANGE' : 'CREATE'

	modal.style.display = 'block'
	closeButton.onclick = closeModal
	window.onclick = event => (event.target === modal ? closeModal() : null)

	saveButton.onclick = () => {
		const updatedCourse = {
			title: field1.value,
			description: field2.value,
			image: field3.value,
		}
		const requestOptions = {
			method: isEditMode ? 'PUT' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedCourse),
		}
		const requestUrl = isEditMode
			? `${apiUrl}/${selectedCourseCard.id}`
			: apiUrl

		fetchJson(requestUrl, requestOptions)
			.then(data => {
				console.log(data)
				closeModal()
				getCourseData()
			})
			.catch(error => console.error('Error saving course:', error))
	}
}

function closeModal() {
	modal.style.display = 'none'
	modalConfirm.style.display = 'none'

	if (selectedCourseCard) {
		const selectedCard = document.querySelector(
			`.course-card[data-id="${selectedCourseCard.id}"]`
		)
		if (selectedCard) {
			selectedCard.classList.remove('selected')
		}

		selectedCourseCard = null
	}

	updateDeleteButtonVisibility()
}

function handleCourseSelection(event) {
	const courseCard = event.target.closest('.course-card')
	if (courseCard) {
		courseCard.classList.toggle('selected')
		updateDeleteButtonVisibility()
	}
}

function deleteSelectedCourses() {
	const selectedCourses = document.querySelectorAll('.course-card.selected')
	if (selectedCourses.length === 0) return
	modalConfirm.style.display = 'block'
	closeButtonConfirm.onclick = closeModal
	confirmButton.onclick = () => {
		modalConfirm.style.display = 'none'
		selectedCourses.forEach(courseCard => {
			deleteCourse(courseCard.dataset.id)
		})
	}
}

function deleteCourse(courseId) {
	const requestUrl = `${apiUrl}/${courseId}`
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	}
	fetchJson(requestUrl, requestOptions)
		.then(data => {
			console.log('Course deleted:', data)
			getCourseData()
		})
		.catch(error => console.error('Error deleting course:', error))
}

cancelButton.addEventListener('click', closeModal)
createBtn.addEventListener('click', () => openModal(null))
modalConfirm.addEventListener('click', event => {
	if (event.target === modalConfirm) {
		closeModal()
	}
})
deleteBtn.addEventListener('click', deleteSelectedCourses)
getCourseData()
