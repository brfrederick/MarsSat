import World from './World';

const mainLoop = dt => {
  console.log(dt);
  World.render();

  requestAnimationFrame(mainLoop);
};

export const init = () => {
  World.init();
  requestAnimationFrame(mainLoop);
};

export default {
  init,
};
