/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	let scene, camera, renderer, geometry1, geometry2, loader, texture, mesh1, mesh2, rectLightHelper;
	let theta = 0;
	init();
	update();

	function init() {
		scene = new THREE.Scene();

		initCamera();
		initRenderer();
		initMesh();
		initLight();

		addArrowHelper();

		renderer.render(scene, camera);
	}

	function addArrowHelper() {
		const dir = new THREE.Vector3(0, 2, 0);
		dir.normalize();
		const origin = new THREE.Vector3(0, 0, 0);
		const length = 10;
		const hex = 0xffff00;
		const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
		scene.add(arrowHelper);
	}

	function initCamera() {
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.set(0, 0, 70);
	}
	function initRenderer() {
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	}
	function initMesh() {
		geometry1 = new THREE.SphereGeometry(5, 32, 32);
		geometry2 = new THREE.SphereGeometry(5, 32, 32);
		//Lambert材质
		const matStdParams = {
			roughness: 0.044676705160855, // calculated from shininess = 1000
			metalness: 0.0
		};
		const matStdFloor = new THREE.MeshStandardMaterial(matStdParams);
		const material1 = new THREE.MeshLambertMaterial({ color: 0xffffff });
		//Phong材质
		const material2 = new THREE.MeshPhongMaterial({
			color: 0xffff00,
			shininess: 100
		});
		mesh1 = new THREE.Mesh(geometry1, matStdFloor);
		mesh1.position.set(-10, 0, 0);
		scene.add(mesh1);
		mesh2 = new THREE.Mesh(geometry2, matStdFloor);
		mesh2.position.set(10, 0, 0);
		scene.add(mesh2);
	}
	function initLight() {
		// const Amblight = new THREE.AmbientLight(0xff8000)
		// scene.add(Amblight)
		// const directionLight = new THREE.DirectionalLight(0xff8000)
		// directionLight.position.set(-1, 0, 0)
		// scene.add(directionLight)
		light = new THREE.RectAreaLight(0xffffff, 3000, 50, 50);
		light.lookAt(new THREE.Vector3(0, 0, 0));
		const targetObject = new THREE.Object3D();
		scene.add(targetObject);
		light.target = targetObject;
		light.position.set(20, 20, 0);
		rectLightHelper = new THREE.RectAreaLightHelper(light);
		scene.add(light);
		scene.add(rectLightHelper);
		console.log(light.isRectAreaLight);
	}

	// const point = document.getElementById('point')
	// const direction = document.getElementById('direction')
	// const ambient = document.getElementById('ambient')
	// point.addEventListener('click', ()=>{
	// 	scene.remove(light)
	// 	light = new THREE.PointLight(0xff8000, 1)
	// 	scene.add(light)
	// })
	// direction.addEventListener('click', ()=>{
	// 	scene.remove(light)
	// 	light = new THREE.DirectionalLight(0xff8000)
	// 	scene.add(light)
	// })
	// ambient.addEventListener('click', ()=>{
	// 	scene.remove(light)
	// 	light = new THREE.AmbientLight(0xff8000)
	// 	scene.add(light)
	// })

	function update() {
		theta += 0.02;
		light.position.x = -20 * Math.cos(theta);
		light.position.y = 20 * Math.sin(theta);
		light.position.z = 0;
		light.lookAt(new THREE.Vector3(0, 0, 0));
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		rectLightHelper.update();
		renderer.render(scene, camera);
		requestAnimationFrame(update);
	}

/***/ })
/******/ ]);