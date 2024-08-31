// helpers/range.js
import Ember from 'ember';

export function range([start, end]) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export default Ember.Helper.helper(range);
