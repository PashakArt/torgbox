// function main(inputData) {
//   let date = parseData(inputData);
//   let parsedDate = new Date(date);
//   if (parsedDate != "Invalid Date") {
//     console.log(parseValidDate(date));
//     return parseValidDate(date);
//   }
//   return "1";
//   // return parseInvalidDate(date);
// }

// function parseValidDateV2(date, suffix) {
//   const newDate = date.slice(0, date.length - 6) + "Z";
//   const res = new Date(newDate).toISOString();
//   return res.slice(0, res.length - 1) + suffix;
// }

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
  console.log(date, "-", day, month, year, hour, seconds);
  return [day, month, year, hour, seconds];
}

// function getCountDaysInMonth(date) {
//   let date = date.split(" ");
//   for (const el of date) {
//     if (monthNumber.get(el) || shortMonthNumber.get(el)) {
//       const newEl = helpers.monthNumber.get(el)
//         ? helpers.monthNumber.get(el)
//         : helpers.shortMonthNumber.get(el);
//       date.replace(el, newEl);
//     }
//   }
//   return date;
// }

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
};
