import { Mesh, BoxGeometry, MeshLambertMaterial, Object3D } from 'three';
import { missionPass, missionFail, remove } from '../World';

const geom = new BoxGeometry(0.4, 0.2, 0.2);

const makeTarget = (w, h) => {
  const mat = new MeshLambertMaterial({ color: 0x0055FF });
  const completeMat = new MeshLambertMaterial({ color: 0x00AA00 });
  mat.shading = 1;

  const container = new Object3D();
  container.blocks = [];
  container.blocksDone = 0;

  let zOffset = 0;
  let yOffset = 0;

  // rows
  for (let i = 0; i < w; i++) {
    zOffset = 0.085 * i;

    // columns
    for (let k = 0; k < h; k++) {
      yOffset = 0.085 * k;

      const pivot = new Object3D();
      pivot.rotation.z = zOffset;
      pivot.rotation.y = yOffset;

      const mesh = new Mesh(geom, mat);
      mesh.position.set(2.2, 0, 0);
      mesh.remove = () => {
        if (mesh.material !== completeMat) {
          container.blocksDone++;
          mesh.material = completeMat;
        }
      };

      container.blocks.push(mesh);
      container.add(pivot);
      pivot.add(mesh);
    }
  }

  container.rotation.x += Math.random() * Math.PI * 2;
  container.rotation.y += Math.random() * Math.PI * 2;

  return container;
};

// m : mission
const update = m => dt => {
  if (m.target.blocks.length <= m.target.blocksDone) {
    // remove UI, mission is complete
    // remove mission from world
    console.log('mission complete');
    missionPass(m);
  }
  else if (m.timeLeft <= 0) {
    // -- GAME OVER --
    console.log('=== GAME OVER ===');
    missionFail(m);
  }
  else {
    // update progress
    // update time left
    m.timeLeft -= dt;

    // update UI
  }
};

const makeUI = () => {

};

export const makeMission = (rows = 2, columns = 5) => {
  // make game objects
  const target = makeTarget(rows, columns);
  target.rotation.y -= Math.PI / 2;
  // target.rotation.z += Math.PI;
  target.rotation.x += Math.PI / 4;

  // make ui elements
  target.rotation.x += Math.PI / 4;
  const ui = makeUI(rows * columns);

  const mission = {
    startBlocks: rows * columns,
    progress: 0,
    timeLeft: 10,
    ui,
    target,
  };

  target.update = update(mission);
  return target;
};
