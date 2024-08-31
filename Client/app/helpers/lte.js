import Ember from 'ember';

export function lte(params) {
  let [leftSide, rightSide] = params;
  return leftSide <= rightSide;
}

export default Ember.Helper.helper(lte);
