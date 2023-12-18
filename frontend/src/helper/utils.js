export function checkObjectPropsIsEmpty(obj) {
  for (let prop in obj) {
    if (obj[prop] === '') {
      return true;
    }
  }
  return false;
}
