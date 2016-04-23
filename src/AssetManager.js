import Promise from 'bluebird';
import { isNil } from 'ramda';

// import loader from '../lib/ColladaLoader';
import { ObjectLoader } from 'three';
const loader = new ObjectLoader();

// Store assos array of assets
const assets = [];

export const getAsset = path => new Promise((res) => {
  if (!isNil(assets[path])) {
    res(assets[path]);
  }
  else {
    loader.load(path, object => {
      assets[path] = object;
      res(object);
    });
  }
});
