import R from 'ramda';
import { SphereGeometry, TorusGeometry, MeshLambertMaterial, Mesh, Object3D, Vector3 } from 'three';
import World from '../World';
import { getAsset } from '../AssetManager';

const unselectedMat = new MeshLambertMaterial({ color: 0x0fffff, visible: false });
const selectedMat = new MeshLambertMaterial({ color: 0x0fffff, transparent: true, opacity: 0.3 });

unselectedMat.shading = 1;
selectedMat.shading = 1;

export const getObjectiveCollisions = (sat, objectives) => {
  const satScan = new Vector3();
  sat.localToWorld(satScan);
  satScan.multiplyScalar(2.2 / 3);

  const objPos = new Vector3();
  return (R.filter(o => {
    objPos.setFromMatrixPosition(o.matrixWorld);
    return (satScan.distanceTo(objPos) < 0.2);
  }, objectives));
};

/**
* Construct a ring to use for selection
* @param {satellite}
* @param {Orbit} Orbit object to update
*/
const update = s => dt => {
  const move = (2 * Math.PI / s.data.speed) * dt;
  s.rotation.y += move;
  if (s.parent.selected) s.parent.selector.material = selectedMat;
  else s.parent.selector.material = unselectedMat;

  s.parent.rotation.x = s.parent.rotTarget.x;
  s.parent.rotation.y = s.parent.rotTarget.y;

  const hits = World.missions.map(m => getObjectiveCollisions(s.sat, m.blocks));
  hits.forEach(blocks => blocks.map(block => block.remove()));
};

/**
* Construct a satellite object at an offset to make rotating about planet easy
* @param {Number} radius - radius of orbit
* @param {HEX Value} color - color to tint the satellite
*/
const makeSat = (radius) =>
  getAsset('https://rawgithub.com/brfrederick/SpaceApps2016/gh-pages/assets/models/satellite.json')
    .then(asset => {
      const sat = asset;
      sat.position.set(radius, 0, 0);
      sat.type = 'Satellite';
      sat.rotation.z += Math.PI / 2;
      sat.rotation.y -= Math.PI / 3;
      sat.scale.set(0.3, 0.3, 0.3);

      return sat;
    });

/**
* Construct a ring to show the path of a satellite
* @param {Number} radius - radius of orbit
* @param {HEX Value} color - color to tint the path torus
*/
const makePath = (radius, color) => {
  const geom = new TorusGeometry(radius, 0.01, 10, 100);
  const mat = new MeshLambertMaterial({ color });
  mat.shading = 1;

  const path = new Mesh(geom, mat);
  path.rotation.x += Math.PI / 2;
  path.type = 'Path';

  return path;
};

/**
* Construct a ring to use for selection
* @param {Number} radius - radius of orbit
*/
const makeTarget = radius => {
  const geom = new TorusGeometry(radius, 0.25, 10, 100);

  const target = new Mesh(geom, unselectedMat);
  target.type = 'selector';
  target.rotation.x += Math.PI / 2;

  return target;
};

/**
* Construct a satellite and supporting objects
* @param {Number} radius - radius of orbit
* @param {Number} speed - seconds per rotation
* @param {HEX} color - color of Satellite
*/
export const makeSatellite = (radius, speed = 10, color = 0xffffff) =>
  makeSat(radius, color)
    .then(sat => {
      const path = makePath(radius, color);
      const target = makeTarget(radius);

      const orbit = new Object3D();
      orbit.add(sat);
      orbit.add(path);
      orbit.add(target);
      orbit.sat = sat;

      orbit.data = {
        speed,
      };

      const container = new Object3D();
      container.add(orbit);
      container.update = update(orbit);
      container.selector = target;
      container.sat = sat;
      container.rotTarget = new Vector3(0, 0, 0);
      target.parent = container;
      orbit.parent = container;

      return container;
    });
