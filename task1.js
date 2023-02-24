Array.prototype.filterArray = function (cb, thisArg = null) {
  let result = [];
  for (let i = 0; i <= this.length; i++) {
    let current = this[i];
      if (cb.call(thisArg, current, i, this)) {
      result.push(current);
    }
  }
  return result;
};
