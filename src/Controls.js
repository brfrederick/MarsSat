import R from 'ramda';

import World from './World';

let rightDown = false;
let selectedSat = null;

const mousePrev = { x: 0, y: 0 };
let mouseProjection = { x: 0, y: 0 };

const isRightButton = button => button === 2;

const mouseDown = event => {
  event.preventDefault();

  if (isRightButton(event.button)) rightDown = true;
  else selectedSat = World.getIntersects(mouseProjection);
};

const mouseUp = event => {
  if (isRightButton(event.button)) {
    rightDown = false;
  }
  selectedSat = null;
};

const getMouseProjection = (target, mX, mY) => ({
  x: (mX / target.scrollWidth) * 2 - 1,
  y: -(mY / target.scrollHeight) * 2 + 1,
});

const mouseMove = (target, { offsetX, offsetY }) => {
  if (rightDown) {
    World.spinCamera(
      (mousePrev.y - offsetY) * 0.01,
      (mousePrev.x - offsetX) * 0.01,
      0);
  }
  else if (selectedSat) {
    selectedSat.rotation.x -= (mousePrev.y - offsetY) * 0.01;
    selectedSat.rotation.y += (mousePrev.x - offsetX) * 0.01;
  }
  mousePrev.x = offsetX;
  mousePrev.y = offsetY;
  mouseProjection = getMouseProjection(target, offsetX, offsetY);
};

export const init = (target) => {
  target.addEventListener('mousedown', mouseDown);
  target.addEventListener('mouseup', mouseUp);
  target.addEventListener('mousemove', R.curry(mouseMove)(target));
};

export default {
  init,
};
