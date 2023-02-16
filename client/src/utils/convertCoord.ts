export const convertToRelativeCoord = (x: number) => {
  const viewHeight = window.innerHeight;
  return (x / viewHeight) * 100;
};

export const convertToAbsCoord = (x: number) => {
  const viewHeight = window.innerHeight;
  return (x / 100) * viewHeight;
};
