import { Clock } from 'three';

import World from './World';
import Controls from './Controls';
import { makeSatellite, getObjectiveCollisions } from './entities/Satellite';
import { makeMission } from './entities/Mission';

const clock = new Clock();

const update = dt => {
  World.satellites.map(s => s.update(dt));
  //this brax getObjectiveCollisions(World.satellites[0].sat, World.missions[0].blocks);
};

const mainLoop = () => {
  update(clock.getDelta());
  World.render();

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

  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
