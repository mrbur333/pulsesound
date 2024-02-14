import './index.html'
import './index.scss'
import './components/sphere/sphere.js'

const controlsBtn = document.querySelector(".hero__controls");

controlsBtn.addEventListener('click', () => {
    controlsBtn.classList.toggle('hero__controls--pause')
})