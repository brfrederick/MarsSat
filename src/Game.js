import { Clock } from 'three';

import World from './World';

const clock = new Clock();

const mainLoop = () => {
  const delta = clock.getDelta();
  World.render();
  World.spinCamera(0, 0.5 * delta, 0);

  requestAnimationFrame(mainLoop);
};

export const init = () => {
  World.init();
  clock.start();

  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
