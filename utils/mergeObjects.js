const mergeObjects = (object1, object2) => {
  const merged = object1 ?? {};

  for (const key in object2) {
    if (Object.hasOwnProperty.call(object2, key)) {
      const { name, amount } = object2[key];
      merged[key] === undefined
        ? (merged[key] = { name, amount })
        : (merged[key].amount += amount);
    }
  }

  return merged;
};

module.exports = { mergeObjects };
