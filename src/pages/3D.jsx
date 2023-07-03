import { useEffect } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';
import SceneInit from './lib/SceneInit';

import img1 from '../assets/brian.jpg';
import img2 from '../assets/wood.jpg';
import img3 from '../assets/mahogany.jpg';

function App() {
	const FRAME_PADDING = 1.5;
	useEffect(() => {
		function drawWindow(length, height) {
			let width = 0.5;
			const boxGeometry = new THREE.BoxGeometry(length, height, width);
			const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x99d2ff });

			const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
			test.scene.add(boxMesh);
		}
		function drawSquare(x, y, z, posx, posy) {
			const boxGeometry = new THREE.BoxGeometry(x, y, z);
			// const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });

			const texture = new THREE.TextureLoader().load(img3);
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
			const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
			boxMesh.position.x = posx;
			console.log(x, y, z, posx, posy);
			boxMesh.position.y = posy;
			test.scene.add(boxMesh);
		}
		function drawFrame(length, height) {
			let posx = (length - FRAME_PADDING) / 2;
			let posy = (height - FRAME_PADDING) / 2;
			let width = 1.0;

			drawSquare(length, FRAME_PADDING, width, 0, posy);
			drawSquare(length, FRAME_PADDING, width, 0, -posy);
			drawSquare(FRAME_PADDING, height, width, posx, 0);
			drawSquare(FRAME_PADDING, height, width, -posx, 0);
			drawWindow(length - FRAME_PADDING * 2, height - FRAME_PADDING * 2);
		}

		let heightInches = 10;
		let widthInches = 10;

		const test = new SceneInit('myThreeJsCanvas');
		test.initialize();
		test.animate();
		console.log('passed');
		drawFrame(widthInches, heightInches);
		// drawFrame(20, 40);

		// const boxGeometry1 = new THREE.BoxGeometry(16, 32, 16);
		// const texture = new THREE.TextureLoader().load(img1);
		// texture.wrapS = THREE.RepeatWrapping;
		// texture.wrapT = THREE.RepeatWrapping;
		// texture.repeat.set(2, 2);
		// const material = new THREE.MeshBasicMaterial({ map: texture });
		// const boxMesh1 = new THREE.Mesh(boxGeometry1, material);

		// test.scene.add(boxMesh1);
	}, []);

	return (
		<div className='w-1/2'>
			<canvas id='myThreeJsCanvas' />
		</div>
	);
}

export default App;
