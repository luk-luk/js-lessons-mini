const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)

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
        done: false
    },
    {
        title: 'Git',
        description: 'Git text',
        type: 'git',
        done: false
    },
    {
        title: 'REACT',
        description: 'REACT text',
        type: 'react',
        done: false
    }
]



function openCard() {
    modal.classList.add('open')
}

function closeModal() {
    modal.classList.remove('open')
}

function init() {
    if (technologies.length === 0) {
        content.innerHTML = '<p class="empty"><h3>Технологий пока нет. Добавьте первую!</h3></p>'
    } else {
        let html = ''
        for (let i = 0; i < technologies.length; i++) {
            const tech = technologies[i]
            html += toCard(tech)
        } 
        content.innerHTML = html

        // content.innerHTML = technologies.map(toCard).join('')
    }
}

function toCard(tech) {
    // let doneClass = ''

    // if(tech.done === true){
    //     doneClass = 'done'
    // }

    const doneClass = tech.done ? 'done' : ''


    return ` 
    <div class = "card ${doneClass}">
        <h3>${tech.title}</h3>
    </div>
    `
}

    init()