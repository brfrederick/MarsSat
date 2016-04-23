import { Clock } from 'three';

import World from './World';

const clock = new Clock();

const mainLoop = () => {
  console.log(clock.getDelta());
  World.render();

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
