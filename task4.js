function getUniqArray(arr) {
  const THROWED_ERROR_MESSAGE = `
  В getUniqArray был передан невалидный параметр.
  Аргумент arr должен быть массивом чисел
  `;
  try {
    const isArrayCorrect = arr
      .some((element) => !Number.isFinite(element));
    if (isArrayCorrect) {
      throw new Error(THROWED_ERROR_MESSAGE);
    } else {
      return [...new Set(arr)];
    }
  }
  catch (error) {
    return error.message;
  }
}
