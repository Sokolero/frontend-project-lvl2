const getValue = (value) => {
  if (value !== null && typeof value === 'object') {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

export default function plainFormat(diff, parentPath='') {
  // вернуть список строк на каждую ноду и лист
  const getStringFromNode = (node, parentPath) => {

    if (node.type === 'tale') {
      const {fromFirst, fromSecond} = node.values;
      const fullPath = `'${parentPath}${node.keyName}'`;

      if (fromFirst === undefined) {
        return `Property ${fullPath} was added with value: ${getValue(fromSecond)}\n`
      }
      if (fromSecond === undefined) {
        return `Property ${fullPath} was removed\n`;
      }
      if (fromFirst !== fromSecond) {
        return `Property ${fullPath} was updated. From ${getValue(fromFirst)} to ${getValue(fromSecond)}\n`
      }
      return '';
    }

    if (node.type === 'node') {
      return plainFormat(node.children, `${parentPath}${node.keyName}.`)
    }
  }

  const diffList = diff.flatMap((node) => {
    return `${getStringFromNode(node, parentPath)}`;
  });

  return diffList.join('')
}
