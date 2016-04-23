import R from 'ramda';

import World from './World';

let rightDown = false;
let mousePrev = { x: 0, y: 0 };

const isRightButton = button => button === 2;

const mouseDown = event => {
  if (isRightButton(event.button)) {
    event.preventDefault();
    rightDown = true;
  }
};

const mouseUp = event => {
  if (isRightButton(event.button)) {
    rightDown = false;
  }
};

const mouseMove = ({ screenX, screenY }) => {
  if (rightDown) {
    World.spinCamera(
      (mousePrev.y - screenY) * 0.01,
      (mousePrev.x - screenX) * 0.01,
      0);
  }
  mousePrev.x = screenX;
  mousePrev.y = screenY;
};

export const init = (target) => {
  target.addEventListener('mousedown', mouseDown);
  target.addEventListener('mouseup', mouseUp);
  target.addEventListener('mousemove', mouseMove);
};

export default {
  init,
};
