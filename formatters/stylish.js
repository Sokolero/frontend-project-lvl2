const getIndent = (depth, prefix) => {
  if (depth === 0) {
    return '';
  }
  return `${'    '.repeat(depth - 1)}${prefix} `;
};

// префикс переде ключом есть всегда
function stylishFormat(diff, depth = 1) {
  const getString = (value, depth) => {
    if (value && typeof value === 'object') {
      depth += 1;
      const strings = Object.keys(value).map((key) => `\n${getIndent(depth, ' ')}${key}:${getString(value[key], depth)}`).join('');
      return ` {${strings}\n${getIndent(depth - 1, ' ')}}`;
    }

    return value !== '' ? ` ${value}` : value;
  };

  // линии на ненодовых значениях
  const getLines = (node) => {
    const { fromFirst, fromSecond } = node.values;

    if (fromFirst === fromSecond) {
      return `\n${getIndent(node.depth, ' ')}${node.keyName}:${getString(fromFirst, node.depth)}`;
    }
    const line1 = fromFirst !== undefined
      ? `\n${getIndent(node.depth, '-')}${node.keyName}:${getString(fromFirst, node.depth)}`
      : '';
    const line2 = fromSecond !== undefined
      ? `\n${getIndent(node.depth, '+')}${node.keyName}:${getString(fromSecond, node.depth)}`
      : '';

    return [line1, line2].join('');
  };

  const plainDiff = diff
    .flatMap((node) => {
      if (node.type === 'node') {
        return `\n${getIndent(node.depth, ' ')}${node.keyName}: ${stylishFormat(node.children, depth + 1)}`;
      }
      if (node.type === 'tale') {
        return getLines(node);
      }
    }).join('');

  return `{${plainDiff}\n${getIndent(depth - 1, ' ')}}`;
}

export default function stylish(diff) {
  return `${stylishFormat(diff)}\n`;
}
