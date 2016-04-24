import { Clock } from 'three';

import { getAsset } from './AssetManager';
import World from './World';
import Controls from './Controls';
import { makeSatellite, getObjectiveCollisions } from './entities/Satellite';
import { makeMission } from './entities/Mission';

const clock = new Clock();

const update = dt => {
  World.satellites.map(s => s.update(dt));
  World.missions.map(m => m.update(dt));
};

const endGame = () => console.log('endIt');

const mainLoop = () => {
  if (World.fails() >= 3) {
    endGame();
  }
  World.render();
  update(clock.getDelta());

  requestAnimationFrame(mainLoop);
};

export const init = () => {
  World.init();

  Controls.init(document.getElementById('render_target'));
  clock.start();

  makeSatellite(3, 10, 0xFFFFFF)
    .then((sat) => World.addSatellite(sat));

  const mission = makeMission('Alpha', 3, 8);
  World.addMission(mission);

  const mission1 = makeMission('Beta', 2, 5);
  World.addMission(mission1);

  const mission2 = makeMission('Charlie', 7, 3);
  World.addMission(mission2);

  window.onresize = World.resize;

  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
