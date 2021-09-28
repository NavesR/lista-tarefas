const btnTarefa = document.querySelector('.btn-tarefa')
const inputTarefa = document.querySelector('.input-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
  const li = document.createElement('li')
  return li
}

function criaBotaoApagar(li) {
  li.innerText += ' '
  const botaoApagar = document.createElement('button')
  botaoApagar.innerText = 'Apagar'
  botaoApagar.setAttribute('class', 'apagar')
  li.appendChild(botaoApagar)
}

function criaTarefa(textoInput) {
  const li = criaLi()
  li.innerText = textoInput
  tarefas.appendChild(li)
  limpaInput()
  criaBotaoApagar(li)
  salvarTarefa()
}

function limpaInput() {
  inputTarefa.value = ''
  inputTarefa.focus()
}

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return 
  criaTarefa(inputTarefa.value)
})

inputTarefa.addEventListener('keypress', function(e) {
  if (e.key == 'Enter') {
    if (!inputTarefa.value) return 
    criaTarefa(inputTarefa.value)
  }
})

document.addEventListener('click', function(e) {
  const dis = e.target
  console.log(dis)
  if (dis.classList.contains('apagar')) {
    dis.parentElement.remove()
    salvarTarefa()
  }
})

function salvarTarefa() {
  const liTarefas = tarefas.querySelectorAll('li')
  const listaDeTarefas = []

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText
    tarefaTexto = tarefaTexto.replace('Apagar', '')
    listaDeTarefas.push(tarefaTexto)
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas')
  const listaDeTarefas = JSON.parse(tarefas)
  
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa)
  }
}

adicionaTarefasSalvas()