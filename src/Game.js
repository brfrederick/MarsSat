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

const mainLoop = () => {
  World.render();
  update(clock.getDelta());

  requestAnimationFrame(mainLoop);
};

export const init = () => {
  World.init();

  Controls.init(document.getElementById('render_target'));
  clock.start();

  const sat = makeSatellite(3, 10, 0xFFFFFF);
  World.addSatellite(sat);

  const mission = makeMission();
  World.addMission(mission);

  window.onresize = World.resize;

  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
