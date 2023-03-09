import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();

        // camera position
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

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
                object.position.sub(center);
                
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
        let scrollPosition=0;
        window.addEventListener('scroll',()=>{

            const newScrollPosition = window.scrollY;
    
            // Calculate the change in scroll position since the last update
            const scrollChange = newScrollPosition - scrollPosition;
        
            // Update the scroll position variable
            scrollPosition = newScrollPosition;
        
            // Update the position of the drone based on the scroll change
            if (loadedObject) {
                loadedObject.position.y += scrollChange;
            }
        })

        function animate() {
            // update position by moveAmount
            console.log("New position: " + loadedObject.position.y);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }