import invBarColor from "utils/invBarColor";

function invColorRange(barWidht, colorRange) {
  const positionsX = [
    invBarColor(barWidht, colorRange[0]),
    invBarColor(barWidht, colorRange[1])
  ];

  return positionsX;
}

export default invColorRange;