import stylish from './stylish.js';
import plain from './plain.js';
import json from './json-formatter.js';

const getFormater = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return {
        format: (diff) => stylish(diff)
      }
    case 'plain':
      return {
        format: (diff) => plain(diff)
      }
    case 'json':
      return {
        format: (diff) => json(diff)
      }
    default:
      return (diff) => stylish(diff);
  }
}


export default function format(diff, formatName) {
  // choice formater function by formatName
  const formater = getFormater(formatName);
  // apply formater at diff
  return formater.format(diff)
  // return string
}
