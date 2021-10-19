function createLaneMap(initial) {
  for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);

  return laneMap;
}

export {
  createLaneMap,
}