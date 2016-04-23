import R from 'ramda';
// init entry point
import World from './World';
import Game from './Game';

window.onload = () => R.pipe(World.init, Game.init)();
