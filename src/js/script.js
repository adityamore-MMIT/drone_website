import * as THREE from 'three';
import { OBJLoader } from 'objLoader';
// control the orbital movement based on scrolling
import {OrbitControls} from 'orbitalControl';
import { Box2 } from 'three';


// Using tween.js
import * as TWEEN from 'tweenJS';

const scene = new THREE.Scene();

        // camera position
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Axes helper
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper)

        // grid helper

        const gridHelper = new THREE.GridHelper(30,100);
        scene.add(gridHelper)
        const loader = new OBJLoader();

        let loadedObject;

        loader.load(
            './drone.obj',
            function (object) {
                console.log('Object loaded successfully!');
                scene.add(object);
                // object.position.set(0, 0, 0);

                // ----------center the object---------

                // Compute the bounding box of the object
                const bbox = new THREE.Box3().setFromObject(object);
                
                // Compute the center of the bounding box
                const center = new THREE.Vector3();
                bbox.getCenter(center);
                // -----------------------------------

                // Move the object so its center is at the origin
                // object.position.sub(center);
                object.position.set(0,0,0);
                
                // scale down
                object.scale.set(0.4,0.4,0.4);

                loadedObject = object;
                animate();
            }
        );

        // lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);
        
        // change position based on scroll
        // let scrollPosition=0;
        // window.addEventListener('scroll',()=>{

        //     const newScrollPosition = window.scrollY;
    
        //     // Calculate the change in scroll position since the last update
        //     const scrollChange = newScrollPosition - scrollPosition;
        
        //     // Update the scroll position variable
        //     scrollPosition = newScrollPosition;
        
        //     // Update the position of the drone based on the scroll change
        //     if (loadedObject) {
        //         loadedObject.position.y += scrollChange;
        //     }
        // })



// window.addEventListener('scroll', function() {
//     // Calculate the amount to rotate based on the scroll position
//     var rotation = window.scrollY * 0.01;
  
//     // Update the cube's rotation
//     loadedObject.rotation.x = rotation;
//     loadedObject.rotation.y = rotation;
//   });


let step = 0
let speed = 0.01;

function animate() {
    console.log("New position: " + loadedObject.position.y);

    // loadedObject.rotation.x = time/1000;
    // loadedObject.rotation.y = time/1000;

    // step += speed;

    // loadedObject.position.y = 10*Math.abs(Math.sin(step));
    requestAnimationFrame(animate);
    // orbital control
    const orbit = new OrbitControls(camera,renderer.domElement);
    orbit.update();

    // set min and max distance
    orbit.minDistance = 0;
    orbit.maxDistance = 5;

    // damping control
    orbit.enableDamping = true; // Enable damping (default is false)
    orbit.dampingFactor = 0.75; // Set the amount of damping (default is 0.05)

    
renderer.render(scene, camera);
    
}

renderer.setAnimationLoop(animate);