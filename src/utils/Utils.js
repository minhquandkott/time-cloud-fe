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
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

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
  const date = `${day.getDate()}`;
  const stringDate = date.length === 1 ? `0${date}` : `${date}`;

  const month = `${day.getMonth() + 1}`;
  const stringMonth = month.length === 1 ? `0${month}` : `${month}`;
  return `${stringDate}-${stringMonth}-${day.getFullYear()}`;
};

export const equalDates = (date1, date2) => {
  return date1.toDateString() === date2.toDateString();
};

export const getDaysOfWeek = (dayInWeek) => {
  let first;
  if (dayInWeek.getDay() === 0) {
    first = dayInWeek.getDate() - 6;
  } else {
    first = dayInWeek.getDate() - (dayInWeek.getDay() - 1);
  }
  let firstDay = new Date(dayInWeek.setDate(first));
  const result = [firstDay];
  for (let i = 1; i < 7; i++) {
    let day = new Date(result[i - 1]);
    day.setDate(day.getDate() + 1);
    result.push(day);
  }
  return result;
};

export const checkDayInWeekNow = (day) => {
  const daysNow = getDaysOfWeek(new Date());
  if (daysNow.some((ele) => equalDates(day, ele))) {
    //* is day in week now
    return 0;
  } else if (daysNow[0] - day > 0) {
    //* is day in pre week
    return -1;
  } else if (daysNow[6] - day < 0) {
    // * is day in next week
    return 1;
  }
};

export const removeSpace = (string) => {
  const regex = /(\s)+/g;
  return string.replaceAll(regex, " ").trim();
};

export const checkDayWithNow = (day) => {
  const now = new Date();
  if (equalDates(day, now)) {
    return 0;
  } else if (now - day > 0) {
    return -1;
  }
  return 1;
};
