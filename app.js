const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')
const progress = document.querySelector('#progress')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)

const APP_TITLE = document.title

const technologies = [
    {
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
    const data = event.target.dataset
    const tech = technologies.find(t => t.type === data.type)
    if(!tech) return

    openModal('', tech.title)
    
}

function openModal(html, title = APP_TITLE){
    document.title = `${title} | ${APP_TITLE}`
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
            html += toCard(tech)
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
        background = '#f99415e'
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
    if(technologies.length === 0) {
        return 0
    }

    let doneCount = 0
    for(let i = 0; i < technologies.length; i++) {
        if(technologies[i].done) doneCount++             
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

    init()