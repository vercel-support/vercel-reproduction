const pluralize = (item, word, plural) => {
  return item === 1  ? word : plural
}

const pluralizeConcat = (item, word, plural) => {
  if(item === 0) return `keinen ${word}`
  if(item === 1) return `${item} ${word}`

  return `${item} ${plural}`
}

module.exports = { pluralize, pluralizeConcat }