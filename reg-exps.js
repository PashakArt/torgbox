const regExDateStartYear = /\d{4}(-|\/|\.)\d{2}\1\d{2} /;
const regExDateStartDays = /\d{2}(-|\/|\.)\d{2}\1\d{4} /;
const regExDateWithWordMonth =
  /(0?[1-9]|[12][0-9]|3[01]) (янв(?:аря|\.)?|фев(?:раля|\.)?|мар(?:та|\.)?|апр(?:еля|\.)?|мая|июн(?:я|\.)?|июл(?:я|\.)?|авг(?:уста|\.)?|сен(?:тября|\.)?|окт(?:ября|\.)?|ноя(?:бря|\.)?|дек(?:абря|\.)?) (\d{4})/;
const containerRegEx = [
  regExDateStartYear,
  regExDateStartDays,
  regExDateWithWordMonth,
];
const regExTime = /\d{2}(\:)\d{2}/;

module.exports = { containerRegEx, regExTime };
