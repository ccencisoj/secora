function getBarColor(barWidth, positionX) {
  return [positionX * (360/barWidth), 100, 50];
}

export default getBarColor;