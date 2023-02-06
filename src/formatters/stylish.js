const generateTreeView = (data) => {
  const indent = ' ';
  const baseSpaceCount = 4;
  const signSpaceCount = 2;
  const iter = (currentItem, depth) => {
    const currentIndentSize = (baseSpaceCount * depth) - signSpaceCount;
    const currentIndent = indent.repeat(currentIndentSize);
    const bracketIndentSize = (baseSpaceCount * depth) - baseSpaceCount;
    const bracketIndent = indent.repeat(bracketIndentSize);
    const lines = currentItem.flatMap(([sign, key, value]) => {
      if (!Array.isArray(value)) {
        return `${currentIndent}${sign} ${key}: ${value}`;
      }
      if (value[0] === 'array') {
        const [, items] = value;
        const indentSizeOfItem = baseSpaceCount * depth + baseSpaceCount;
        const indentOfItem = indent.repeat(indentSizeOfItem);
        const bracketIndentSizeItem = currentIndentSize + signSpaceCount;
        const bracketIndentItem = indent.repeat(bracketIndentSizeItem);
        const formattedItems = items.map((item) => `${indentOfItem}${item}`);
        const formattedValue = ['[', ...formattedItems, `${bracketIndentItem}]`].join('\n');
        return `${currentIndent}${sign} ${key}: ${formattedValue}`;
      }
      return `${currentIndent}${sign} ${key}: ${iter(value, depth + 1)}`;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};
// eslint-disable-next-line import/prefer-default-export
export { generateTreeView };
