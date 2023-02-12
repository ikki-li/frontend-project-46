import _ from 'lodash';

const indent = ' ';
const baseSpaceCount = 4;
const signSpaceCount = 2;

const formatObject = (object, depth) => {
  const indentSize = baseSpaceCount * (depth + 1);
  const curIndent = indent.repeat(indentSize);
  const bracketIndentSize = baseSpaceCount * depth;
  const bracketIndent = indent.repeat(bracketIndentSize);
  if (Array.isArray(object)) {
    const itemsView = object.map((item) => {
      if (_.isObject(item)) {
        return formatObject(item, depth + 1);
      }
      return `${curIndent}${item}`;
    });
    return ['[', ...itemsView, `${bracketIndent}]`].join('\n');
  }
  const keys = Object.keys(object);
  const lines = keys.map((key) => {
    const value = object[key];
    const formattedValue = _.isObject(value) ? formatObject(value, depth + 1) : value;
    return `${curIndent}${key}: ${formattedValue}`;
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const generateTreeView = (data) => {
  const iter = (currentItem, depth) => {
    const currentIndentSize = (baseSpaceCount * depth) - signSpaceCount;
    const currentIndent = indent.repeat(currentIndentSize);
    const bracketIndentSize = (baseSpaceCount * depth) - baseSpaceCount;
    const bracketIndent = indent.repeat(bracketIndentSize);
    const lines = currentItem.map((node) => {
      const {
        name,
        type,
        values,
        status,
        children,
      } = node;
      if (type === 'nested') {
        const childrenView = iter(children, depth + 1);
        return `${currentIndent}  ${name}: ${childrenView}`;
      }
      if (status === 'changed') {
        const [value1, value2] = values;
        const formattedValue1 = _.isObject(value1)
          ? formatObject(value1, depth)
          : value1;
        const formattedValue2 = _.isObject(value2)
          ? formatObject(value2, depth)
          : value2;
        return `${currentIndent}- ${name}: ${formattedValue1}\n${currentIndent}+ ${name}: ${formattedValue2}`;
      }
      const [value] = values;
      const formattedValue = _.isObject(value)
        ? formatObject(value, depth)
        : value;
      switch (status) {
        case 'added': {
          return `${currentIndent}+ ${name}: ${formattedValue}`;
        }
        case 'deleted': {
          return `${currentIndent}- ${name}: ${formattedValue}`;
        }
        case 'unchanged': {
          return `${currentIndent}  ${name}: ${formattedValue}`;
        }
        default: {
          throw new Error('Type of node is not defined');
        }
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};

export { generateTreeView };
