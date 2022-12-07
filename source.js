const helpers = require("./helpers");

function mainV2(inputData) {
  let date = helpers.parseData(inputData);
  let parsedDate = new Date(date);
  if (parsedDate != "Invalid Date") {
    return parseValidDate(date);
  }
  if (helpers.isExistsTimeZone(date)) {
    const timeZone = helpers.getTimeZone(date);
    const newDate = date.slice(0, date.length - 6);
    const res = parseValidDate(newDate);
    return helpers.getResultWithTimeZone(res, timeZone);
  }
  return parseInvalidDate(date);
}

function parseValidDate(date) {
  if (date.length === 10) {
    return helpers.getResult(date);
  }
  if (helpers.isExistsTimeZone(date)) {
    const timeZone = helpers.getTimeZone(date);
    const newDate = date.slice(0, date.length - 6) + "Z";
    const res = new Date(newDate).toISOString();
    return helpers.getResultWithTimeZone(res, timeZone);
  }
  if (date[date.length - 1] === "Z") {
    return helpers.getResult(date);
  }
  const newDate = date + "Z";
  return helpers.getResult(newDate);
}

// function parseInvalidDate(date) {
//   let arr = date.split(" ");
//   // console.log(arr);
//   let res = "";
//   for (const el of arr) {
//     if (el.search(/\d/) != -1) {
//       res += el.length > 5 ? `${el} ` : el;
//     }
//     if (helpers.monthNumber.get(el) || helpers.shortMonthNumber.get(el)) {
//       res += helpers.monthNumber.get(el)
//         ? helpers.monthNumber.get(el)
//         : helpers.shortMonthNumber.get(el);
//     }
//   }
//   console.log(res);

//   if (helpers.checkYear(res.slice(0, 4))) {
//     return parseValidDate(res);
//   }
//   // console.log(date, " - ", res.trim());

//   // if (helpers.checkYear(res.slice(0, 4))) {
//   //   // let date = res.split
//   // }
//   // console.log(parseValidDate(res));
//   // try {
//   //   console.log(parseValidDate(res));
//   //   return parseValidDate(res);
//   // } catch (err) {}
//   return "1";
// }

function parseInvalidDate(date) {
  let res = "";
  date = helpers.removeQuotes(date);
  const regDateStartYear = /\d{4}(-|\/|\.)\d{2}\1\d{2} /;
  const regDateStartDays = /\d{2}(-|\/|\.)\d{2}\1\d{4} /;
  const regDateWithWordMonth =
    /(0?[1-9]|[12][0-9]|3[01]) (янв(?:аря|\.)?|фев(?:раля|\.)?|мар(?:та|\.)?|апр(?:еля|\.)?|мая|июн(?:я|\.)?|июл(?:я|\.)?|авг(?:уста|\.)?|сен(?:тября|\.)?|окт(?:ября|\.)?|ноя(?:бря|\.)?|дек(?:абря|\.)?) (\d{4})/;
  const arr = [regDateStartYear, regDateStartDays, regDateWithWordMonth];
  const regTime = /\d{2}(\:)\d{2}/;
  for (const el of arr) {
    const matchedDate = date.match(el);
    if (matchedDate) {
      res += matchedDate[0];
      const matchedTime = date.match(regTime);
      if (matchedTime) {
        res += matchedTime[0];
      }
    }
  }
  // if name of month then 3 index 100% is char
  if (res[3].search(/\d/) === -1) {
    res = helpers.getCountDaysInMonth(res);
    console.log(res);
  }
  if (helpers.isFirstYear(res)) {
    return parseValidDate(res);
  }
  const [day, month, year, hour, seconds] = helpers.getSplitDate(res);
  res = new Date(year, month, day, hour, seconds);
  // console.log(res, parseValidDate(res));
  return parseValidDate(res);

  // const newDate = new Date(res)
  // console.log(res, "-", parseValidDate(res));
  // return parseValidDate(res);
  // console.log(date, "-", date.match(regOnlyDateStartYear));
  // console.log(date, "-", date.match(regOnlyDateStartDays));
}

module.exports = mainV2;

// 1) Получить дату
// 2) Преобразовывается ли полученная дата к обьекту Date
// 3) Если да - то работать с ним
//     Иначе

// дата парсится с изменением во времени на часы, указанные в конце, пример +07:00

// а если выписывать все числа, а затем упаковывать их в время?
