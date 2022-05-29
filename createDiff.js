
// get array of unique keys depth 1
const unionUniq = (arr1, arr2) => arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0));

const isObject = (value) => typeof value === 'object' && !Array.isArray(value);

// ====== main function =========================
export default function createDiff(obj1, obj2, depth=1) {
  // получаем список уникальных ключей для двух объектов
  // если на входе получены объекты, а не массив или значения
  const getType = (key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return 'node';
    }
    return 'tale';
  }

  const getValue = (value) => value;

  const keys1 = Object.keys(obj1); // [[key, value], [key, value], ...]
  const keys2 = Object.keys(obj2);
  const uniqKeys = unionUniq(keys1, keys2).sort();

  const diff = uniqKeys.map((key) => {
    const type = getType(key);
    const values = type === 'tale'
      ? [getValue(obj1[key]), getValue(obj2[key])]
      : null;
    const children = type === 'node' ? createDiff(obj1[key], obj2[key], depth + 1) : null;
    // console.log({
    //   keyName: key,
    //   type,
    //   values,
    //   children
    // })
    return {
      keyName: key,
      type,
      values,
      children,
      depth
    }
  });

  return diff;
}
