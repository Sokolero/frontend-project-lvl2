const getIndent = (depth) => {
  if (depth === 0) {
    return '';
  }
  return `${'  '.repeat(depth)}`;
};

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    return `{\n${Object.keys(value)
      .filter(((key) => value[key] !== undefined))
      .flatMap((key) => {
        return `${getIndent(depth + 1)}"${key}": ${stringify(value[key], depth + 1)}`
      }).join(',\n')}\n${getIndent(depth)}}`
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return `${value}`;
}


// ===============================
function getFormatedNodes(nodes, depth=0) {

  const getFormatedNode = (node, depth) => {
    return `${getIndent(depth)}{\n${
      Object.keys(node).flatMap((key) => {
        if (key === 'children' && node[key] !== null) {
          return `${getIndent(depth + 1)}"children": ${getFormatedNodes(node.children, depth + 1)}`
        } else {
          return `${getIndent(depth + 1)}"${key}": ${stringify(node[key], depth + 1)}`
        }
      }).join(',\n')
    }\n${getIndent(depth)}}`
  }

  return `[\n${nodes.flatMap((node) => getFormatedNode(node, depth + 1)).join(',\n')}\n${getIndent(depth)}]`
}

export default function (nodes) {
  return getFormatedNodes(nodes) + '\n';
}
