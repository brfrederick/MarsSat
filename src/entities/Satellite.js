import { SphereGeometry, MeshLambertMaterial, Mesh, Object3D } from 'three';

const geom = new SphereGeometry(0.25, 10, 10);
const mat = new MeshLambertMaterial({ color: 0xffffff });

const update = ({ rotation, data }) => dt => {
  const move = (2 * Math.PI / data.speed) * dt;
  rotation.y += move;
};

export const makeSatellite = (speed = 10) => {
  const sat = new Mesh(geom, mat);
  sat.position.set(6, 0, 0);
  sat.type = 'Satellite';

  const orbit = new Object3D();
  orbit.add(sat);

  const data = {
    speed,
  };
  orbit.data = data;

  const orbitContainer = new Object3D();
  orbitContainer.add(orbit);
  orbitContainer.update = update(orbit);
  return orbitContainer;
};
