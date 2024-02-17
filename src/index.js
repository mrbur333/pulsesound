import './index.html'
import './index.scss'
import './components/sphere/sphere.js'

const header = document.querySelector(".header__bg");
const controlsBtn = document.querySelector(".hero__controls");
const menu = document.querySelector(".header__menu");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const links = document.querySelectorAll(".modal__link");
const list = document.querySelectorAll("li");


window.addEventListener('scroll', () => {
    if(window.pageYOffset > 10){
        header.classList.add('header--show')
        header.classList.remove('header--down')
    } else {
        header.classList.add('header--down')
        header.classList.remove('header--show')
    }
})

controlsBtn.addEventListener('click', () => {
    controlsBtn.classList.toggle('hero__controls--pause')
})

menu.addEventListener('click', () => {
    modal.classList.add('modal--show')
    modal.classList.remove('modal--down')

    let delay = 0.3
    list.forEach((item, index)=>{
        list[index].style.transform = `translateX(0vw)`
        list[index].style.transition = `transform ${delay}s ease`
        delay += 0.3
    })
})

close.addEventListener('click', () => {
    modal.classList.remove('modal--show')
    modal.classList.add('modal--down')
    list.forEach((item, index)=>{
        list[index].style.transform = `translateX(-100vw)`
    })
})

links.forEach((item, index)=>{
    links[index].addEventListener('click', () => {
        modal.classList.add('modal--down')
    })
})

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  let options = {
    threshold: [0] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.anim');
  
  for (let elm of elements) {
    observer.observe(elm);
  }