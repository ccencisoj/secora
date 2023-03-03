import getBarColor from "utils/getBarColor";

function getColorRange(barWidht, positionsX) {
  const colorRange = [
    getBarColor(barWidht, positionsX[0]),
    getBarColor(barWidht, positionsX[1])
  ];

  return colorRange;
}

export default getColorRange;