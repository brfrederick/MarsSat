import { Clock } from 'three';

import World from './World';
import Controls from './Controls';

const clock = new Clock();

const mainLoop = () => {
  const delta = clock.getDelta();
  World.render();

  requestAnimationFrame(mainLoop);
};

export const init = () => {
  World.init();
  Controls.init(document.getElementById('render_target'));
  clock.start();

  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
