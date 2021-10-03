const tagMerge = (tag1, tag2) => {
  const merge = tag1;

  for (const key in tag2) {
    if (Object.hasOwnProperty.call(tag2, key)) {
      const element = tag2[key];
      merge[element.name] === undefined 
      ? merge[tag] = amount
      : merge[tag].amount += element.amount
    }
  }

  return merge;
  
}

module.exports = { tagMerge }