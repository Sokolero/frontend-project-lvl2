import parse from './parsers';
import path from 'node:path';

function union(arr1, arr2) {
  return arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0));
}

const getNodeType = (value) => {
  typeof value === 'Object' && Array.isArray(value);
}

function createDiff(obj1, obj2) {
  // получаем список уникальных ключей для двух объектов
  // если на входе получены объекты, а не массив или значения

  switch (expression) {
    case expression:

      break;
    default:

  }
  const keys1 = Object.keys(obj1); // [[key, value], [key, value], ...]
  const keys2 = Object.keys(obj2);
  const uniqKeys = union(keys1, keys2).sort();


}


export default function genDiff(filepath1, filepath2, formatName='stylish') {
  // передать парсеру пути к файлам
    // вернуть два js объекта соответствующие файлу
  const parsed1 = parse(filepath1); // t
  const parsed2 = parse(filepath2); // t

  // передать вычислителю различий два объекта
    // вернуть одно дерево диффа с узлами описывающими каждый ключ
    // рекурсивно в виде объекта
  const diff = createDiff(parsed1, parsed2);


  // передать объект диффа в форматтер с параметром  formatName
    // вернуть строку в формате соответствующем параметру (пока это стайлиш)
  return format(diff, formatName);
}
