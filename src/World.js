import R from 'ramda';
import THREE, { Scene, PerspectiveCamera, WebGLRenderer, Raycaster } from 'three';

import { getAsset } from './AssetManager';

const renderDOM = document.getElementById('render_container');

const scene = new Scene();
const renderer = new WebGLRenderer({ antialias: true });
const raycaster = new Raycaster();
const mouseCastVector = new THREE.Vector2(0, 0);

const satellites = [];
const missions = [];

let score = 0;
let fails = 0;
let camera;
let camHolder;

export const spinCamera = (x, y, z) => {
  camHolder.rotation.x += x;
  camHolder.rotation.y += y;
  camHolder.rotation.z += z;
};

export const getIntersects = ({ x, y }) => {
  mouseCastVector.set(x, y);
  raycaster.setFromCamera(mouseCastVector, camera);
  return raycaster
    .intersectObjects(R.map((s) => s.selector, satellites))[0].object.parent;
};

const makeCamera = () =>
  new PerspectiveCamera(45, renderDOM.clientWidth / renderDOM.clientHeight, 1, 1000);

export const addSatellite = sat => {
  scene.add(sat);
  satellites.push(sat);
};

export const addMission = mission => {
  scene.add(mission);
  missions.push(mission);
};

export const removeMission = mission => {
  scene.remove(mission.target);

  const index = missions.indexOf(mission);
  missions.splice(index, 1);
};

export const missionPass = mission => {
  score++;
  removeMission(mission);
};

export const missionFail = mission => {
  fails++;
  console.log(fails);
  removeMission(mission);
};

const setupStaticObjs = () => {
  const geometry = new THREE.SphereGeometry(5, 20, 20);
  const material = new THREE.MeshPhongMaterial({ color: 0xaa4444 });
  material.shading = 1;

  getAsset('/MarsSat/assets/models/planet.json')
  .then(asset => {
    asset.position.y -= 2.2;
    asset.scale.set(5.7, 5.7, 5.7);
    scene.add(asset);
  });

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0x444444));
};

export const resize = () => {
  camera.aspect = renderDOM.clientWidth / renderDOM.clientHeight;
  camera.left = renderDOM.clientWidth / -32;
  camera.right = renderDOM.clientWidth / 32;
  camera.top = renderDOM.clientHeight / 32;
  camera.bottom = renderDOM.clientHeight / -32;
  camera.updateProjectionMatrix();
  renderer.setSize(renderDOM.clientWidth, renderDOM.clientHeight);
};

export const render = () => renderer.render(scene, camera);

export const init = () => {

  camera = makeCamera();
  camera.lookAt(new THREE.Vector3());
  camHolder = new THREE.Object3D();
  camHolder.add(camera);
  camera.position.z = 10;
  scene.add(camHolder);

  setupStaticObjs();

  // Set render options
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(renderDOM.clientWidth, renderDOM.clientHeight);
  document.querySelector('#render_target').appendChild(renderer.domElement);
};


export default {
  init,
  render,
  satellites,
  missions,
  spinCamera,
  addSatellite,
  addMission,
  getIntersects,
  resize,
  score: () => score,
  fails: () => fails,
};
