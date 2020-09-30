export function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export const randomColorArray = [
  "FFC156",
  "F37365",
  "4CDA87",
  "80A1D4",
  "75C9C8",
  "0267C1",
  "EFA00B",
  "D65108",
  "591F0A",
];

export const convertSecond = (totalSecond) => {
  let timeRemaining = totalSecond;
  const convertedHour = totalSecond > 3600 ? Math.floor(totalSecond / 3600) : 0;
  timeRemaining = timeRemaining - convertedHour * 3600;
  const convertedMinute =
    timeRemaining > 60 ? Math.floor(timeRemaining / 60) : 0;
  timeRemaining = timeRemaining - convertedMinute * 60;

  const convertedSecond = timeRemaining;
  return {
    second: convertedSecond < 10 ? `0${convertedSecond}` : convertedSecond,
    minute: convertedMinute < 10 ? `0${convertedMinute}` : convertedMinute,
    hour: convertedHour + "",
  };
};

export const convertSecondToHour = (totalSecond) => {
  const hour = totalSecond / 3600;
  const convertedHour = Math.floor(hour);
  const convertedSuffix = Math.ceil(((totalSecond % 3600) / 3600) * 100) / 100;

  return convertedHour + convertedSuffix;
};
