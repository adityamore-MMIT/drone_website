import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

//create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0000FF );
//add gridlines
const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridHelper);

//set up camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0,0,0);
//set up renderer
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// reference to drone model
let loadedObject;


//fetch from localhost
// const loader = new objectLoader();
//object model
const loader = new GLTFLoader();
loader.load(
  "http://localhost:8000/drone.gltf",
  (gltf) => {
    // Called when the model is loaded
    console.log(typeof gltf);

    //center the object
    //compute bounding box


    loadedObject = gltf.scene;
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0x00000
    // });


//create a mesh of loaded object and the material
//     const drone = new THREE.Mesh(gltf.scene.children[0], material);
//     drone.visible = true;
//     const bbox = new THREE.Box3().setFromObject(drone);
//
//
//     const center = new THREE.Vector3();
//     bbox.getCenter(center);
//
//     drone.position.set(0, 0,0);
//     drone.scale.set(0.4,0.4,0.4)
//     drone.scale.multiplyScalar(200)
//

  },
  (xhr) => {
    // Called while the model is loading
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    if(((xhr.loaded / xhr.total) * 100)==100){
      window.alert("Object loaded completely")
    }
  },
  (error) => {
    // Called if there is an error loading the model
    console.error("Error loading object model", error);
  }
);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const drone = new THREE.Mesh( geometry, material );
scene.add( drone );

drone.scale.multiplyScalar(5)

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
function lerp(x: number, y: number, a: number): number {
  return (1 - a) * x + a * y;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start: number, end: number) {
  return (scrollPercent - start) / (end - start);
}

const animationScripts: { start: number; end: number; func: () => void }[] = [];

// add an animation that flashes the drone through 100 percent of scroll
animationScripts.push({
    start: 0,
    end: 101,
    func: () => {
        let g = material.color.g
        g -= 0.05
        if (g <= 0) {
            g = 1.0
        }
        material.color.g = g
    },
})

//add an animation that moves the drone through first 40 percent of scroll
animationScripts.push({
  start: 0,
  end: 40,
  func: () => {
    camera.lookAt(drone.position);
    camera.position.set(0, 1, 2);
    drone.position.z = lerp(-10, 0, scalePercent(0, 40));
    //console.log(drone.position.z)
  },
});

//add an animation that rotates the drone between 40-60 percent of scroll
animationScripts.push({
  start: 40,
  end: 60,
  func: () => {
    camera.lookAt(drone.position);
    camera.position.set(0, 1, 2);
    drone.rotation.z = lerp(0, Math.PI, scalePercent(40, 60));
    //console.log(drone.rotation.z)
  },
});

//add an animation that moves the camera between 60-80 percent of scroll
animationScripts.push({
  start: 60,
  end: 80,
  func: () => {
    camera.position.x = lerp(0, 5, scalePercent(60, 80));
    camera.position.y = lerp(1, 5, scalePercent(60, 80));
    camera.lookAt(drone.position);
    //console.log(camera.position.x + " " + camera.position.y)
  },
});

//add an animation that auto rotates the drone from 80 percent of scroll
animationScripts.push({
  start: 80,
  end: 101,
  func: () => {
    //auto rotate
    drone.rotation.x += 0.01;
    drone.rotation.y += 0.01;
  },
});

function playScrollAnimations() {
  animationScripts.forEach((a) => {
    if (scrollPercent >= a.start && scrollPercent < a.end) {
      a.func();
    }
  });
}

let scrollPercent = 0;

document.body.onscroll = () => {
  //calculate the current scroll progress as a percentage
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight)) *
    100;
  (document.getElementById("scrollProgress") as HTMLDivElement).innerText =
    "Scroll Progress : " + scrollPercent.toFixed(2);
};

const stats = Stats();
document.body.appendChild(stats.dom);

function animate() {
  playScrollAnimations();

  requestAnimationFrame(animate);


  render();

  stats.update();
}
//
function render() {
  renderer.render(scene, camera);
}
//
window.scrollTo({ top: 0, behavior: "smooth" });
animate();
