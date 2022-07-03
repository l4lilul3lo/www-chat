function arrRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function arrUniqueByObjectValue(arr, key) {
  const newArr = [];
  const knownValues = [];

  for (let i = 0; i < arr.length; i++) {
    const currentObj = arr[i];
    if (!knownValues.includes(currentObj[key])) {
      newArr.push(currentObj);
    }
    knownValues.push(currentObj[key]);
  }

  return newArr;
}

function arrCheckObjectValueExists(arr, key, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return true;
    }
  }
  return false;
}

module.exports = {
  arrRandom,
  arrUniqueByObjectValue,
  arrCheckObjectValueExists,
};
