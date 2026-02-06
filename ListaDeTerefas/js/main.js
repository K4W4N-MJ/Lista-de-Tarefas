const inputTarefa = document.querySelector('.input-nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaButaoApagar(li) {
    li.innerText += ' '
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('Title', 'apagar Essa')
    li.appendChild(botaoApagar)
}

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li)
    limpaInput()
    criaButaoApagar(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
})

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
})

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus()

}

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefas()
    }

});


function salvarTarefas() {
    const pegarTarefas = tarefas.querySelectorAll('li')
    const listaTarefa = []

    for (let tarefa of pegarTarefas) {
        let tarefatext = tarefa.innerText;
        tarefatext = tarefatext.replace('Apagar', '').trim()
        listaTarefa.push(tarefatext)
        
    }
    const tarefasJSON = JSON.stringify(listaTarefa)
    localStorage.setItem('tarefas', tarefasJSON)
 
}
 function lerTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const ListadeTarefas = JSON.parse(tarefas)

    for ( let tarefa of ListadeTarefas){
         criaTarefa(tarefa)
    }
 }

lerTarefasSalvas()