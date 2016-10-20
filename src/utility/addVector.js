export default function (coords, vector) {
  return {
    x: coords.x + vector.x,
    y: coords.y + vector.y,
  };
}
