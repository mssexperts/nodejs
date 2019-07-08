const date = require('./date');
const dateTime = require('./date-time');
const email = require('./email');
const multiLineRichText = require('./multi-line-rich-text');
const multipleChoiceCheckBox = require('./multiple-choice-check');
const numeric = require('./numeric');
const singleLineText = require('./single-line-text');
const singleSelect = require('./single-select');
const singleChoiceSelector = require('./single-choice-selector');
const telephone = require('./telephone');
const textLabel = require('./text-label');
const time = require('./time');

module.exports = [
  date,
  dateTime,
  email,
  multiLineRichText,
  multipleChoiceCheckBox,
  numeric,
  singleChoiceSelector,
  singleLineText,
  singleSelect,
  textLabel,
  telephone,
  time,
];
