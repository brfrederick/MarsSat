import R from 'ramda';
import { SphereGeometry, TorusGeometry, MeshLambertMaterial, Mesh, Object3D, Vector3 } from 'three';

const unselectedMat = new MeshLambertMaterial({ color: 0x0fffff, visible: false });
const selectedMat = new MeshLambertMaterial({ color: 0x0fffff });
unselectedMat.shading = 1;
selectedMat.shading = 1;
/**
* Construct a ring to use for selection
* @param {Orbit} Orbit object to update
*/
const update = ({ rotation, data, parent }) => dt => {
  const move = (2 * Math.PI / data.speed) * dt;
  rotation.y += move;
  if (parent.selected) parent.selector.material = selectedMat;
  else parent.selector.material = unselectedMat;

  parent.rotation.x = parent.rotTarget.x;
  parent.rotation.y = parent.rotTarget.y;
};

/**
* Construct a satellite object at an offset to make rotating about planet easy
* @param {Number} radius - radius of orbit
* @param {HEX Value} color - color to tint the satellite
*/
const makeSat = (radius, color) => {
  const geom = new SphereGeometry(0.1, 8, 8);
  const mat = new MeshLambertMaterial({ color });

  const sat = new Mesh(geom, mat);
  sat.position.set(radius, 0, 0);
  sat.type = 'Satellite';

  return sat;
};

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

export const getObjectiveCollisions = (sat, objectives) => {
  const satScan = new Vector3();
  sat.localToWorld(satScan);
  satScan.multiplyScalar(2.2 / 3);

  const objPos = new Vector3();
  return R.filter(o => {
    o.localToWorld(objPos);
    return (satScan.distanceTo(objPos) < 1);
  }, objectives);
};

/**
* Construct a satellite and supporting objects
* @param {Number} radius - radius of orbit
* @param {Number} speed - seconds per rotation
* @param {HEX} color - color of Satellite
*/
export const makeSatellite = (radius, speed = 10, color = 0xffffff) => {
  const sat = makeSat(radius, color);
  const path = makePath(radius, color);
  const target = makeTarget(radius);

  const orbit = new Object3D();
  orbit.add(sat);
  orbit.add(path);
  orbit.add(target);

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
};
