import Axios from "axios";

export function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export const randomColorArray = [
  "#eb4d4b",
  "#686de0",
  "#be2edd",
  "#22a6b3",
  "#ff7979",
  "#f9ca24",
  "#05c46b",
  "#485460",
  "#3c40c6",
  "#0be881",
  "#0fbcf9",
  "#5352ed",
  "#7bed9f",
  "#ffa502",
  "#eccc68",
  "#1e90ff",
  "#6D214F",
  "#B33771",
  "#82589F",
];

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const convertSecond = (totalSecond) => {
  let timeRemaining = totalSecond;
  const convertedHour =
    totalSecond >= 3600 ? Math.floor(totalSecond / 3600) : 0;
  timeRemaining = timeRemaining - convertedHour * 3600;
  const convertedMinute =
    timeRemaining >= 60 ? Math.floor(timeRemaining / 60) : 0;
  timeRemaining = timeRemaining - convertedMinute * 60;

  const convertedSecond = timeRemaining;
  return {
    second: convertedSecond < 10 ? `0${convertedSecond}` : convertedSecond,
    minute: convertedMinute < 10 ? `0${convertedMinute}` : convertedMinute,
    hour: convertedHour + "",
  };
};

export const convertSecondToHour = (seconds) => {
  let hours = seconds / 60 / 60;
  let rhours = Math.floor(hours);
  let rminutes = Math.round((hours - rhours) * 60);
  return `${rhours}:${rminutes < 10 ? `0${rminutes}` : rminutes}`;
};

export const convertTime = (totalSecond) => {
  const hour = totalSecond / 3600;
  const convertedHour = Math.floor(hour * 1000);
  return convertedHour / 1000;
};

export const ROLE_LIST = [
  { id: 1, name: "ADMIN", color: "2ECC71" },
  { id: 2, name: "CEO", color: "FFB332" },
  { id: 3, name: "PM", color: "E74C3C" },
  { id: 4, name: "DEV", color: "9B59B6" },
  { id: 5, name: "DESIGNER", color: "1ABC9C" },
  { id: 6, name: "TESTER", color: "E67E22" },
  { id: 7, name: "HR", color: "5962B6" },
  { id: 8, name: "SEO", color: "361D2E" },
  { id: 9, name: "MEMBER", color: "86A397" },
];

export const convertDate = (day) => {
  return `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`;
};
