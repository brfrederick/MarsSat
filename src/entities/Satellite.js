import { SphereGeometry, TorusGeometry, MeshLambertMaterial, Mesh, Object3D } from 'three';

const geom = new SphereGeometry(0.25, 10, 10);
const mat = new MeshLambertMaterial({ color: 0xffffff });
mat.shading = 1;

const pathGeom = new TorusGeometry(6, 0.05, 16, 100);
const pathMat = new MeshLambertMaterial({ color: 0x0fffff });
pathMat.shading = 1;

const targetGeom = new TorusGeometry(6, 0.25, 10, 100);

const update = ({ rotation, data }) => dt => {
  const move = (2 * Math.PI / data.speed) * dt;
  rotation.y += move;
};

export const makeSatellite = (speed = 10) => {
  const sat = new Mesh(geom, mat);
  sat.position.set(6, 0, 0);
  sat.type = 'Satellite';

  const path = new Mesh(pathGeom, pathMat);
  path.rotation.x += Math.PI / 2;
  path.type = 'Path';

  const target = new Mesh(targetGeom);
  target.visible = false;

  const orbit = new Object3D();
  orbit.add(sat);
  orbit.add(path);
  orbit.add(target);

  const data = {
    speed,
  };
  orbit.data = data;

  const container = new Object3D();
  container.add(orbit);
  container.update = update(orbit);
  container.selector = target;

  return container;
};
