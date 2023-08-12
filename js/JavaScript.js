
const url = '/api/courses'; // URL on base REST API

// Function für die Methode GET
function getCourseData() {
fetch('https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food')
.then(response => response.json())
.then(data => {
displayCourseData(data); // zeigen die Information an Courses
})
.catch(error => {
console.error('Ошибка:', error);
});
}

// Fuction für das Anzeigen von den kommenden Infirmationen 
function displayCourseData(courseData) {
const courseCardsContainer = document.getElementById('courseCardsContainer');
courseCardsContainer.classList.add('course-list');


// machen den Container lehr bevor neue Karten kommen 
courseCardsContainer.innerHTML = '';

// erstellen course-card für jeden Element aus .JSON
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

// machen die Methode-GET
getCourseData();



// UPDATE

const createBtn = document.getElementById("createBtn");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("modal-close")[0];
const form = document.querySelector("input[type='text']");
const submitBtn = document.getElementById("submitBtn");

// offnen den Fenster on click Create-Course
createBtn.addEventListener('click', function() {
modal.style.display = "block";
});

// schliesen den Fenster on click kreuz
closeBtn.addEventListener('click', function() {
modal.style.display = "none";
});

// schliesen den Fenster on click raus
window.addEventListener('click', function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
});


submitBtn.addEventListener('click', function () {
	const courseTitle = document.getElementById('courseTitle').value
	const courseDescription = document.getElementById('courseDescription').value
	const courseBild = document.getElementById('courseBild').value

	const data = {
		title: courseTitle,
		description: courseDescription,
		img:  courseBild,
	}

	

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}

	fetch(
		'https://60a3d1917c6e8b0017e27fad.mockapi.io/api/v1/food',
		requestOptions
	)
		.then(response => response.json())
		.then(result => console.log(result))
		.then(submitBtn.textContent = 'gemacht')
		.catch(error => console.log('Error:', error))
})

