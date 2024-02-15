import './index.html'
import './index.scss'
import './components/sphere/sphere.js'

const controlsBtn = document.querySelector(".hero__controls");
const menu = document.querySelector(".header__hamburger");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const links = document.querySelectorAll(".modal__link");



controlsBtn.addEventListener('click', () => {
    controlsBtn.classList.toggle('hero__controls--pause')
})

menu.addEventListener('click', () => {
    modal.classList.add('modal--show')
})

close.addEventListener('click', () => {
    modal.classList.remove('modal--show')
})

links.forEach((item, index)=>{
    links[index].addEventListener('click', () => {
        modal.classList.remove('modal--show')
    })
})
