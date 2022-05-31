import parse from './parsers/index.js';
import format from './formatters/index.js';
import createDiff from './createDiff.js';

// ==============================================================
export default (filepath1, filepath2, formatName = 'stylish') => {
  // передать парсеру пути к файлам
  // вернуть два js объекта соответствующие файлу
  const parsed1 = parse(filepath1); // +
  const parsed2 = parse(filepath2); // +

  // передать вычислителю различий два объекта
  // вернуть одно дерево диффа с узлами описывающими каждый ключ
  // рекурсивно в виде объекта
  const diff = createDiff(parsed1, parsed2); // +

  // передать объект диффа в форматтер с параметром  formatName
  // вернуть строку в формате соответствующем параметру (пока это стайлиш)
  const formated = format(diff, formatName);
  // console.log(formated)

  return formated;
};
