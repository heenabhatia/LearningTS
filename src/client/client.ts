import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let mesh, meshes;

const ambient = new THREE.AmbientLight( 0x0000ff, 1 );
        scene.add( ambient );

let loader = new GLTFLoader();
        loader.load( 'textures/ninja.gltf', function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.scale.set(0.5,0.5,0.5);
            scene.add( mesh );
//             mesh.position.z = 10;
//             renderer.render( scene, camera );
//             animate();
//             meshes.push(mesh);
        });

const controls = new OrbitControls(camera, renderer.domElement)

const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: texture, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
// scene.add(cube)

camera.position.z = 2

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)
cubeFolder.open()
const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 10, 0.01)
cameraFolder.open()

var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
};

function render() {
    renderer.render(scene, camera)
}
animate();
