function deepCopyObject(obj) {
  let copy = {};
  for (let key in obj) {
    if (key instanceof Object) {
      copy = {...copy, ...deepCopyObject(key)};
    }
    copy[key] = obj[key];
  }
  return copy;
}
