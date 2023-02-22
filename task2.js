const addElementsToArray = (arr, index) => (...elements) => {
  if (index && (Math.sign(index) === -1 || !Number.isInteger(index))) {
    throw new Error(' the index cannot be a negative number or a fractional number ');
  }
  try {
    const copy = [...arr];
      if (index === undefined) {
      return [...copy, ...elements];
    }
    copy.splice(index, 0, ...elements);
    return copy;
  } catch (error) {
  return error.message;
  }
};
