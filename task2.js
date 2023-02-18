function getInterval(arr, from, to) {
  const errorMessages = [
    `В функцию getInterval были переданы невалидные параметры.
    Параметр arr должен содержать только числовые значения`,
    `В функцию getInterval были переданы невалидные параметры.
    Параметр from должен быть числом`,
    `В функцию getInterval были переданы невалидные параметры.
    Параметр to должен быть числом`,
  ];
  try {
    if (arr.some((element) =>!Number.isFinite(element))) {
      throw new Error(errorMessages[0]);
    }
    if (!Number.isFinite(from)) {
      throw new Error(errorMessages[1]);
    }
    if (!Number.isFinite(to)) {
      throw new Error(errorMessages[2]);
    }
    return res = arr.reduce((array, element) => {
        let condition = (to >= element && element >= from)
        ? (to >= element && element >= from)
        : from >= element && element >= to;
        array = condition ? [...array, element] : array;
        return array;
    }, []);
  }
  catch(err){
      return err.message;
  }
}
