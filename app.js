const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)

const technologies = [
    {title: 'HTML', description: 'HTML text', type: 'html', done: true},
    {title: 'CSS', description: 'CSS text', type: 'css', done: true},
    {title: 'JavaScript', description: 'JavaScript text', type: 'js', done: false},
    {title: 'Git', description: 'Git text', type: 'git', done: false},
    {title: 'REACT', description: 'REACT text', type: 'react', done: false}
]

function openCard() {
    modal.classList.add('open')
}

function closeModal() {
    modal.classList.remove('open')
}

let html = ''
for (let i = 0; i < technologies.length) {

}