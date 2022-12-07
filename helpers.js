const monthNumber = new Map([
  ["января", ".01."],
  ["февраля", ".02."],
  ["марта", ".03."],
  ["апреля", ".04."],
  ["мая", ".05."],
  ["июня", ".06."],
  ["июля", ".07."],
  ["августа", ".08."],
  ["сентября", ".09."],
  ["октября", ".10."],
  ["ноября", ".11."],
  ["декабря", ".12."],
]);
const shortMonthNumber = new Map([
  ["янв.", ".01."],
  ["фев.", ".02."],
  ["мар.", ".03."],
  ["апр.", ".04."],
  ["май.", ".05."],
  ["июн.", ".06."],
  ["июл.", ".07."],
  ["авг.", ".08."],
  ["сен.", ".09."],
  ["окт.", ".10."],
  ["ноя.", ".11."],
  ["дек.", ".12."],
]);

function getCountDaysInMonth(date) {
  let days = date.split(" ")[0];
  const month = date.split(" ")[1];
  const year = date.split(" ")[2];
  const countDays = monthNumber.get(month)
    ? monthNumber.get(month)
    : shortMonthNumber.get(month);
  console.log(days, month, year);
  console.log(month);
  if (days.length == 1) {
    days = `0${days}`;
  }
  return `${days}${countDays}${year}`;
}

function parseData(inputData) {
  const { src, options } = inputData;
  return src[options];
}

function isExistsTimeZone(date) {
  return date[date.length - 6] === "+" || date[date.length - 6] === "-";
}

function getTimeZone(date) {
  return date.slice(date.length - 6);
}

function getResultWithTimeZone(res, timeZone) {
  return res.slice(0, res.length - 1) + timeZone;
}

function getResult(date) {
  return new Date(date).toISOString();
}

function isFirstYear(date) {
  const year = date.slice(0, 4);
  const isYear = !(
    year.includes("-") ||
    year.includes(".") ||
    year.includes("/") ||
    year.includes('"') ||
    year.includes("«") ||
    year.includes("'")
  );
  return isYear;
}

function getSplitDate(date) {
  const day = date.slice(0, 2);
  const month = date.slice(3, 5) - 1;
  const year = date.slice(6, 10);
  const hour = date.slice(11, 13);
  const seconds = date.slice(14);
  return [day, month, year, hour, seconds];
}

function removeQuotes(date) {
  const quotes = ['"', '"', "»", "«"];
  date = date.replaceAll("'", "");
  date = date.replaceAll('"', "");
  date = date.replaceAll("»", "");
  date = date.replaceAll("«", "");
  // for (const quote of quotes) {
  //   date.replaceAll(quote, "");
  // }
  return date;
}

module.exports = {
  isExistsTimeZone,
  getTimeZone,
  getResultWithTimeZone,
  getResult,
  parseData,
  monthNumber,
  shortMonthNumber,
  isFirstYear,
  getSplitDate,
  removeQuotes,
  getCountDaysInMonth,
};
