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
      const fullPath = `'${parentPath}${node.keyName}'`;
      if (node.values[0] === undefined) {
        return `Property ${fullPath} was added with value: ${getValue(node.values[1])}\n`
      }
      if (node.values[1] === undefined) {
        return `Property ${fullPath} was removed\n`;
      }
      if (node.values[0] !== node.values[1]) {
        return `Property ${fullPath} was updated. From ${getValue(node.values[0])} to ${getValue(node.values[1])}\n`
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
