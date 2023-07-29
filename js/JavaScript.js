const button = document.querySelector("#button");
const content = document.querySelector("#card");

button.addEventListener("click", function () {
content.classList.toggle("content-hidden");

if (content.classList.contains("content-hidden"))
{button.textContent = "SHOW"}

else {button.textContent = "HIDE"}

})





const headers = document.querySelectorAll("[data-name='accordeon-title']")

headers.forEach(function (item) 
{
item.addEventListener("click", showContent)
function showContent() {
 this.nextElementSibling.classList.toggle("hidden");
}
})



// Получение элементов, необходимых для работы
const buttons = document.querySelectorAll('.button-nav');
const tabs = document.querySelectorAll('.tab');

// Функция для скрытия всех табов и деактивации кнопок
function hideTabs() {
  tabs.forEach(tab => {
    tab.classList.add('hidden');
  });

  buttons.forEach(button => {
    button.classList.remove('fo');
  });
}

// Функция для отображения выбранного таба и активации кнопки
function showTab(tabId) {
  const tab = document.getElementById(tabId);
  const button = document.querySelector(`[data-tab="${tabId}"]`);

  tab.classList.remove('hidden');
  button.classList.add('fo');
}

// Обработчик события при клике на кнопку
buttons.forEach(button => {
  button.addEventListener('click', () => {
    hideTabs();
    const tabId = button.getAttribute('data-tab');
    showTab(tabId);
  });
});

window.onload = function () {
	var modalContainer = document.getElementById('modal-container')
	var acceptBtn = document.getElementById('accept-btn')

	acceptBtn.onclick = function () {
		modalContainer.style.display = 'none'
		// Здесь можно добавить логику сохранения соглашения в куки или локальное хранилище
	}

	// Проверяем, есть ли у пользователя уже сохраненное соглашение по обработке персональных данных
	var cookieConsent = checkCookieConsent()

	if (!cookieConsent) {
		modalContainer.style.display = 'flex'
	}

	function checkCookieConsent() {
		// Здесь можно добавить логику проверки наличия сохраненного соглашения в куках или локальном хранилище
		// Возвращаем true, если соглашение есть, и false в противном случае
		return false
	}
}

document
	.getElementById('contactForm')
	.addEventListener('submit', function (event) {
		event.preventDefault() // Предотвращаем отправку формы по умолчанию

		var firstName = document.getElementById('firstName').value
		var lastName = document.getElementById('lastName').value
		var phoneNumber = document.getElementById('phoneNumber').value
		var comment = document.getElementById('comment').value

		// Создаем объект FormData для отправки данных формы на сервер
		var formData = new FormData()
		formData.append('firstName', firstName)
		formData.append('lastName', lastName)
		formData.append('phoneNumber', phoneNumber)
		formData.append('comment', comment)

		// Делаем AJAX запрос на сервер для отправки данных формы
		var xhr = new XMLHttpRequest()
		xhr.open('POST', 'send_email.php', true)
		xhr.onload = function () {
			if (xhr.status === 200) {
				alert('Форма успешно отправлена!')
				document.getElementById('contactForm').reset() // Очищаем форму после успешной отправки
			} else {
				alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
			}
		}
		xhr.send(formData)
	})
