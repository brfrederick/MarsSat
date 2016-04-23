import { Clock } from 'three';

import World from './World';
import Controls from './Controls';
import { makeSatellite } from './entities/Satellite';

const clock = new Clock();

const update = dt => {
  World.satellites.map(s => s.update(dt));
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

  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
