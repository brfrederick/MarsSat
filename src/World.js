import THREE, { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

const scene = new Scene();
const renderer = new WebGLRenderer();

let camera;

const makeCamera = () =>
  new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

const setupStaticObjs = () => {
  const geometry = new THREE.SphereGeometry(5, 10, 10);
  const material = new THREE.MeshLambertMaterial({ color: 0xaa4444 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(1, 1, 1);
  scene.add(light);

};

export const init = () => {
  const target = document.getElementById('render_target');

  camera = makeCamera();
  camera.position.z = 20;

  setupStaticObjs();

  // Set render options
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  target.appendChild(renderer.domElement);
};

export const render = () => renderer.render(scene, camera);

export default {
  init,
  render,
};
