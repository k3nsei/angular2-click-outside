export function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    } else {
      node = node.parentNode;
    }
  }
  return false;
}
