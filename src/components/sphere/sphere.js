import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass';
import mainSound from '../../assets/music/Beats.mp3';


const hero = document.querySelector(".hero__sphere");
let windowWidth = window.innerWidth;
let windowHeight= window.innerHeight;
const controlsBtn = document.querySelector(".hero__controls");
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
hero.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	windowWidth / windowHeight,
	0.1,
	1000
);

const params = {
	red: 0.1,
	green: 0.3,
	blue: 1.0,
	threshold: 0.25,
	strength: 0.35,
	radius: 1.0
}

renderer.outputColorSpace = THREE.SRGBColorSpace;

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(windowWidth, windowHeight));
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const outputPass = new OutputPass();
bloomComposer.addPass(outputPass);

camera.position.set(0, -2, 14);
camera.lookAt(0, 0, 0);

const uniforms = {
	u_time: {type: 'f', value: 0.0},
	u_frequency: {type: 'f', value: 0.0},
	u_red: {type: 'f', value: 0.1},
	u_green: {type: 'f', value: 0.3},
	u_blue: {type: 'f', value: 1.0}
}

const mat = new THREE.ShaderMaterial({
	uniforms,
	vertexShader: document.getElementById('vertexshader').textContent,
	fragmentShader: document.getElementById('fragmentshader').textContent
});


let radius = 1.2;
let detail = 8;
if(windowWidth >= 1200) {
	radius = 3;
	detail = 25;
} else if (windowWidth >= 500) {
	radius = 2.5;
	detail = 15;
}

let geo = new THREE.IcosahedronGeometry(radius, detail );
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);
mesh.material.wireframe = true;

const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./assets/Beats.mp3', function(buffer) {
	sound.setBuffer(buffer);
	sound.setLoop(true);

	controlsBtn.addEventListener('click', function() {
		if(!sound.isPlaying){
			sound.play();
		} else if(sound.isPlaying){
			sound.pause();
		}
	});

});

const analyser = new THREE.AudioAnalyser(sound, 32);

let scrolledHeight = 0;
window.addEventListener('scroll', function() {
	let clientPosition = document.documentElement.scrollTop;
	scrolledHeight = (windowHeight - clientPosition) * 0.01;
});

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', function(e) {
	let windowHalfX = windowWidth / 2;
	let windowHalfY = windowHeight / 2;
	mouseX = (e.clientX - windowHalfX) / 100;
	mouseY = (e.clientY - windowHalfY) / 100;
});

const clock = new THREE.Clock();
function animate() {
	camera.position.x += (mouseX - camera.position.x) * .05;
	camera.position.y += (-mouseY - camera.position.y) * 0.5;
	camera.lookAt(scene.position);
	uniforms.u_time.value = clock.getElapsedTime();
	if(sound.isPlaying){
		uniforms.u_frequency.value = analyser.getAverageFrequency();
	} 
	
    bloomComposer.render();
	requestAnimationFrame(animate);
}
animate();



window.addEventListener('resize', function() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(windowWidth, windowHeight);
	bloomComposer.setSize(windowWidth, windowHeight);
});