export function clickOutside(e, element, handler) {
  if (e.target.contains(element.current)) {
    handler();
  }
  return null;
}
