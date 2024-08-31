import Ember from 'ember';

export function eq(params) {
  let [leftSide, rightSide] = params;
  return leftSide === rightSide;
}

export default Ember.Helper.helper(eq);
