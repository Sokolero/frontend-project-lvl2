const getIndent = (depth, prefix = ' ') => {
  try {
    return `${' '.repeat(depth * 4 - 2)}${prefix} `;
  } catch (e) {
    if (e instanceof RangeError) {
      return '';
    }
    throw new Error('Indent block error');
  }
};

const getString = (value, depth) => {
  if (value && typeof value === 'object') {
    const strings = Object.keys(value).map((key) => `\n${getIndent(depth + 1)}${key}:${getString(value[key], depth + 1)}`).join('');
    return ` {${strings}\n${getIndent(depth)}}`;
  }

  // return value !== '' ? ` ${value}` : value;
  return ` ${value}`;
};

// префикс переде ключом есть всегда
function stylishFormat(diff, depth = 1) {
  // линии на ненодовых значениях
  const getLines = (node) => {
    const { fromFirst, fromSecond } = node.values;

    if (fromFirst === fromSecond) {
      return `\n${getIndent(node.depth)}${node.keyName}:${getString(fromFirst, node.depth)}`;
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
        return `\n${getIndent(node.depth)}${node.keyName}: ${stylishFormat(node.children, depth + 1)}`;
      }

      return getLines(node);
    }).join('');

  return `{${plainDiff}\n${getIndent(depth - 1)}}`;
}

export default function stylish(diff) {
  return `${stylishFormat(diff)}\n`;
}
