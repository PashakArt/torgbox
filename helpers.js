const { containerRegEx, regExTime } = require("./reg-exps");

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
  date = date.replaceAll("'", "");
  date = date.replaceAll('"', "");
  date = date.replaceAll("»", "");
  date = date.replaceAll("«", "");
  return date;
}

function parseValidDate(date) {
  if (date.length === 10) {
    return getResult(date);
  }
  if (isExistsTimeZone(date)) {
    const timeZone = getTimeZone(date);
    const newDate = date.slice(0, date.length - 6) + "Z";
    const res = new Date(newDate).toISOString();
    return getResultWithTimeZone(res, timeZone);
  }
  if (date[date.length - 1] == "Z") {
    return getResult(date);
  }
  return getResult(date + "Z");
}

function parseInvalidDate(date) {
  let res = "";
  date = removeQuotes(date);
  for (const el of containerRegEx) {
    const matchedDate = date.match(el);
    if (matchedDate) {
      res += matchedDate[0];
      const matchedTime = date.match(regExTime);
      if (matchedTime) {
        res += matchedTime[0];
      }
    }
  }
  // if name of month then 3 index 100% is char
  if (res[3].search(/\d/) == -1) {
    res = getCountDaysInMonth(res);
  }
  if (isFirstYear(res)) {
    return parseValidDate(res);
  }
  const [day, month, year, hour, seconds] = getSplitDate(res);
  res = new Date(year, month, day, hour, seconds);
  return parseValidDate(res);
}

module.exports = {
  parseValidDate,
  isExistsTimeZone,
  getTimeZone,
  getResultWithTimeZone,
  parseData,
  parseInvalidDate,
};
