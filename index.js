let scene, camera, renderer, geometry1, geometry2, loader, texture, mesh1, mesh2
let theta = 0
init()
update()

function init(){
	scene = new THREE.Scene()

	initCamera()
	initRenderer()
	initMesh()
	initLight()

	renderer.render(scene, camera)
}

function initCamera(){
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000)
	camera.position.set(0, 0, 70)
}
function initRenderer(){
	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
}
function initMesh(){
	geometry1 = new THREE.SphereGeometry( 5, 32, 32 )
	geometry2 = new THREE.SphereGeometry( 5, 32, 32 )
	//Lambert材质
	const material1 = new THREE.MeshLambertMaterial({color: 0xffffff})
	//Phong材质
	const material2 = new THREE.MeshPhongMaterial({
		color: 0xffff00,
		shininess: 100,
	});
	mesh1 = new THREE.Mesh(geometry1, material1)
	mesh1.position.set(-10, 0, 0)
	scene.add(mesh1)
	mesh2 = new THREE.Mesh(geometry2, material2)
	mesh2.position.set(10, 0, 0)
	scene.add(mesh2)
}
function initLight(){
	//平行光
	light = new THREE.DirectionalLight(0xff8000)
	light.position.set(10,0,0)
	scene.add(light)
}

const point = document.getElementById('point')
const direction = document.getElementById('direction')
const ambient = document.getElementById('ambient')
point.addEventListener('click', ()=>{
	scene.remove(light)
	light = new THREE.PointLight(0xff8000, 1)
	scene.add(light)
})
direction.addEventListener('click', ()=>{
	scene.remove(light)
	light = new THREE.DirectionalLight(0xff8000)
	scene.add(light)
})
ambient.addEventListener('click', ()=>{
	scene.remove(light)
	light = new THREE.AmbientLight(0xff8000)
	scene.add(light)
})

function update(){
	theta += 0.02
	light.position.x = -10 * Math.cos(theta)
	light.position.y = 10 * Math.sin(theta)
	light.position.z = 0
	renderer.render(scene, camera)
	requestAnimationFrame(update)
}




