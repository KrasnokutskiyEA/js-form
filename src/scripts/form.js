// ф-ия собирает данные введены в форму
function serializeForm (formNode) {
  return new FormData(formNode)
}

// ф-ия отправки данных на сервер
async function sendData (data) {
  return await fetch('/api/apply/', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data
  })
}

// ф-ия скрывает/отображает спиннер
function toggleLoader () {
  const loader = document.getElementById('loader')
  loader.classList.toggle('hidden')
}

// ф-ия блокирует кнопку отправки формы
function checkValidity (event) {
  const formNode = event.target.form
  const isValid = formNode.checkValidity() // стандартный метод

  formNode.querySelector('button').disabled = !isValid
}

// ф-ия обработки ответа от сервера (200-ОК)
function onSuccess (formNode) {
  alert('Ваша заявка отправлена!')
  formNode.classList.toggle('hidden')
}

// ф-ия обработки ответа от сервера (ошибка)
function onError (error) {
  alert(error.message)
}

// ф-ия обработки отправки формы
async function handleFormSubmit (event) {
  // 1 - Просим форму не отправлять данные самостоятельно
  event.preventDefault()

  // 2 - собираем данные формы
  const data = serializeForm(event.target)

  // 3 - отправим данные на сервер
  toggleLoader()
  const { status, error } = await sendData(data)
  toggleLoader()

  // 4 - обработка ответа от сервера
  status === 200 ? onSuccess(event.target) : onError(error)
}

// 1 шаг - найдем форму
const applicantForm = document.getElementById('form')

// 2 шаг - повесим на нее обработчик блокирующий кнопку отправки формы
applicantForm.addEventListener('input', checkValidity)

// 3 шаг - повесим на нее обработчик событий
applicantForm.addEventListener('submit', handleFormSubmit)
