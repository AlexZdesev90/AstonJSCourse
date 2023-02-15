const getNumberRadix = (number, radix) => {
  const throwedErrorMessage = 'Функция getNumberRadix была вызвана с некорректными параметрами';
  if (radix < 2 || radix > 16 || !Number.isInteger(+number) || !(Number(radix))) {
    throw Error(throwedErrorMessage);
  }
  return (+number).toString(radix);
}
