import { Mesh, BoxGeometry, MeshLambertMaterial, Object3D } from 'three';

const geom = new BoxGeometry(0.3, 0.2, 0.2);

const makeTarget = (w, h) => {
  const mat = new MeshLambertMaterial({ color: 0x0055FF });
  mat.shading = 1;

  const container = new Object3D();
  container.blocks = [];

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

      container.blocks.push(mesh);
      container.add(pivot);
      pivot.add(mesh);
    }
  }

  return container;
};
/*
// m : mission
const update = m => dt => {
  if (m.numBlocks === 0) {
    // remove UI, mission is complete
  }

  if (m.numBlocks !== m.prevBlocks) {
    // update ui element!
  }
};

const makeUI = numBlocks => {
  const mission = {
    numBlocks,
    prevBlocks: numBlocks,
  };

  mission.update = update(mission);

};
*/
export const makeMission = (rows = 2, columns = 5) => {
  // make game objects
  const target = makeTarget(rows, columns);

  // make ui elements
  // makeUI(rows * columns);

  return target;
};
