import stylish from './stylish';
import plain from './plain';

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
