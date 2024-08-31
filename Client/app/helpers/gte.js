import Ember from 'ember';

export function gte(params) {
  let [leftSide, rightSide] = params;
  return leftSide >= rightSide;
}

export default Ember.Helper.helper(gte);
