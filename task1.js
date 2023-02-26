function deepCopyObject(obj) {
  if (typeof obj !== 'object' 
  || typeof obj === 'function' 
  || obj === null) {
    return obj;
  }

if (Array.isArray(obj)) {
        const array = [];
        obj.forEach((element, i) => {
            array[i] = deepCopyObject(element);
        });
        return array;
      }
  let copy = {};
  for (let key in obj) {
    if (key instanceof Object) {
      copy = {...copy, ...deepCopyObject(key)};
    }
    copy[key] = obj[key];
  }
  return copy;
}
