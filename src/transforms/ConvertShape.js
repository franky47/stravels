
export const arrayToObject = (array = [], key = 'id') => {
  const obj = {}
  for (const element of array) {
    if (element.hasOwnProperty(key)) {
      obj[element[key]] = element
    }
  }
  return obj
}
