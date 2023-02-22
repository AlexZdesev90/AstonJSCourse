const deleteElementFromArray = (arr, elem) => {
  if ( !(arr instanceof Array) ) {
    throw new Error('Первым аргументом должен быть массив!');
  }
  try {
    if (arr.includes(elem)) {
      const elementIndex = arr.indexOf(elem);
      const copy = [...arr];
      copy.splice(elementIndex, 1);
      return copy;
    }
    return arr;
  } catch (error) {
    return error.message;
  }
};
