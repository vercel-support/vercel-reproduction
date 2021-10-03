export const mergeArray = (arr1, arr2) => {
  const newArr = arr1.map((item, index) => {
    return item + arr2[index] ?? 0;
  });

  return newArr;
};
