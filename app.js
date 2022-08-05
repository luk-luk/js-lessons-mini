const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')
const progress = document.querySelector('#progress')
const form = document.querySelector('#form')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)
modal.addEventListener('change', toggleTech)
form.addEventListener('submit', createTech)

const APP_TITLE = document.title

const technologies = [{
        title: 'HTML',
        description: 'HTML text',
        type: 'html',
        done: true
    },
    {
        title: 'CSS',
        description: 'CSS text',
        type: 'css',
        done: true
    },
    {
        title: 'JavaScript',
        description: 'JavaScript text',
        type: 'js',
        done: true
    },
    {
        title: 'Git',
        description: 'Git text',
        type: 'git',
        done: true
    },
    {
        title: 'REACT',
        description: 'REACT text',
        type: 'react',
        done: false
    }
]

function openCard(event) {
    const data = event.target.dataset //event на клик выводит разные свойства объекта по которому кликнули, здесь находит data
    const tech = technologies.find(t => t.type === data.type) //на клик проходимся по объекту и находим type
    if (!tech) return // если объект по которому кликнули не имеет type, то выходим и ничего не происходит - это места между карточек

    openModal(toModal(tech), tech.title) //вызываем модальное окно и в скобках передаем заготовленный html и заголовок

}

function toModal(tech) {
    const checked = tech.done ? 'checked' : ''
    return `
    <h2>${tech.title}</h2>   
      <p>
        ${tech.description}        
      </p>
      <hr />
      <div>
        <input type="checkbox" id="done" ${checked} data-type = "${tech.type}"/>
        <label for="done">Выучил</label>
      </div>    
    `
}

function toggleTech(event) {
    const type = event.target.dataset.type
    const tech = technologies.find(t => t.type === type)
    tech.done = event.target.checked

    init()
}

function openModal(html, title = APP_TITLE) {
    document.title = `${title} | ${APP_TITLE}`
    modal.innerHTML = html
    modal.classList.add('open')
}

function closeModal() {
    document.title = APP_TITLE
    modal.classList.remove('open')
}

function init() {
    renderCards()
    renderProgress()
}

function renderCards() {
    if (technologies.length === 0) {
        content.innerHTML = '<p class="empty"><h3>Технологий пока нет. Добавьте первую!</h3></p>'
    } else {
        let html = ''
        for (let i = 0; i < technologies.length; i++) {
            const tech = technologies[i]
            html += toCard(tech) //tech - это
        }
        content.innerHTML = html

        // content.innerHTML = technologies.map(toCard).join('') - это упрощенная запись цикла for для вывода из массива данных и их преобразования в html см.выше
    }
}

function renderProgress() {
    const percent = computeProgressPercent()

    let background

    if (percent <= 30) {
        background = '#e75a5a'
    } else if (percent > 30 && percent < 70) {
        background = '#f99415'
    } else {
        background = '#73ba3c'
    }

    //background-color -> progress.style.backgroundColor
    //margin-top -> progress.style.marginTop

    progress.style.background = background
    progress.style.width = percent + '%'
    progress.textContent = percent ? percent + '%' : ''
}

function computeProgressPercent() {
    if (technologies.length === 0) {
        return 0
    }

    let doneCount = 0
    for (let i = 0; i < technologies.length; i++) {
        if (technologies[i].done) doneCount++
    }
    return Math.round((100 * doneCount) / technologies.length)
}

function toCard(tech) {
    // let doneClass = ''

    // if(tech.done === true){
    //     doneClass = 'done'
    // }

    const doneClass = tech.done ? 'done' : '' // это упрощенная запись условия см.выше


    return ` 
    <div class = "card ${doneClass}" data-type = "${tech.type}">
        <h3 data-type = "${tech.type}">${tech.title}</h3>
    </div>
    `
}

function isInvalid(title, description){
    return !title.value || !description.value
}


function createTech(event) {
    event.preventDefault()
    // const title = event.target.title 
    // const discription = event.target.discription
    //ниже эта же запись, только сокращенная
    const {title, description} = event.target // Забираем значения из инпутов
    
    if(isInvalid(title, description)){
       if(!title.value) title.classList.add('invalid')
       if(!description.value) description.classList.add('invalid')

       setTimeout (() => {
        title.classList.remove('invalid')
        description.classList.remove('invalid')
       }, 2000)

        return
    }

    const newTech = {
        title: title.value, 
        description: description.value,
        done: false, // т.к. эта технология не может быть еще выучена
        type: title.value.toLowerCase()
    }

    technologies.push(newTech) //Добавляем новые данные в массив

    description.value = '' //Очищаем ячейки инпутов от введеных слов
    title.value = ''

    init() // вызываем эту функцию чтобы все перерисовалось   


}

init()


