import _ from 'lodash';

const indent = ' ';
const baseSpaceCount = 4;
const signSpaceCount = 2;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indentSize = baseSpaceCount * (depth + 1);
  const curIndent = indent.repeat(indentSize);
  const bracketIndentSize = baseSpaceCount * depth;
  const bracketIndent = indent.repeat(bracketIndentSize);
  if (Array.isArray(value)) {
    const itemsView = value.map((item) => {
      if (_.isObject(item)) {
        return stringify(item, depth + 1);
      }
      return `${curIndent}${item}`;
    });
    return ['[', ...itemsView, `${bracketIndent}]`].join('\n');
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${curIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const generateStylishView = (data) => {
  const iter = (currentItem, depth) => {
    const currentIndentSize = baseSpaceCount * depth - signSpaceCount;
    const currentIndent = indent.repeat(currentIndentSize);
    const bracketIndentSize = baseSpaceCount * depth - baseSpaceCount;
    const bracketIndent = indent.repeat(bracketIndentSize);

    const lines = currentItem.map((node) => {
      const { key, type } = node;
      switch (type) {
        case 'nested': {
          const { children } = node;
          const childrenView = iter(children, depth + 1);
          return `${currentIndent}  ${key}: ${childrenView}`;
        }
        case 'changed': {
          const { value1, value2 } = node;
          const formattedValue1 = stringify(value1, depth);
          const formattedValue2 = stringify(value2, depth);
          return `${currentIndent}- ${key}: ${formattedValue1}\n${currentIndent}+ ${key}: ${formattedValue2}`;
        }
        case 'added': {
          const { value } = node;
          const formattedValue = stringify(value, depth);
          return `${currentIndent}+ ${key}: ${formattedValue}`;
        }
        case 'deleted': {
          const { value } = node;
          const formattedValue = stringify(value, depth);
          return `${currentIndent}- ${key}: ${formattedValue}`;
        }
        case 'unchanged': {
          const { value } = node;
          const formattedValue = stringify(value, depth);
          return `${currentIndent}  ${key}: ${formattedValue}`;
        }
        default: {
          throw new Error(`Node type ${type} is not defined`);
        }
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};

export default generateStylishView;
