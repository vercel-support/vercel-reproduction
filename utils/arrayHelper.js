const getZeroValues = (array) => {
  let zero = [];

  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    if (element.amount === 0) zero.push(element);
  }

  return zero;
};

const getWorstValueWithIndex = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    if (element.amount > 0) return [element, i];
  }
};

const getWorstValue = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    if (element.amount > 0) return element;
  }

  return false;
};

const getWorstValues = (array) => {
  let result = [];
  let worst;

  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    if (!worst && element.amount > 0) {
      worst = element.amount;
      result.push(element);
    } else if (element.amount === worst) result.push(element);
  }

  return result;
};

const getBestValues = (array) => {
  let result = [];
  let best = array[0];

  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    if (!worst && element.amount > 0) {
      worst = element.amount;
      result.push(element);
    } else if (element.amount === worst) result.push(element);
  }

  return result;
};

module.exports = {
  getZeroValues,
  getWorstValues,
  getBestValues,
  getWorstValue,
  getWorstValueWithIndex,
};

