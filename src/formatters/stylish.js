import _ from 'lodash';

const indent = (depth, isFull) => {
  const indention = ' ';
  const baseSpaceCount = 4;
  const signSpaceCount = 2;
  const indentSize = isFull === true ? baseSpaceCount * depth
    : baseSpaceCount * depth - signSpaceCount;
  return indention.repeat(indentSize);
};

const stringify = (data, depth) => {
  const currentIndent = indent(depth + 1, true);
  const bracketIndent = indent(depth, true);
  if (!_.isObject(data)) {
    return String(data);
  }
  if (Array.isArray(data)) {
    const itemsView = data.map((item) => `${currentIndent}${stringify(item, depth + 1)}`);
    return `[\n${itemsView.join('\n')}\n${bracketIndent}]`;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const iter = (tree, depth) => {
  const currentIndent = indent(depth, false);
  return tree.map((node) => {
    const { key, type } = node;
    switch (type) {
      case 'nested': {
        const { children } = node;
        const newChildren = iter(children, depth + 1);
        const childrenView = `{\n${newChildren.join('\n')}\n${indent(depth, true)}}`;
        return `${currentIndent}  ${key}: ${childrenView}`;
      }
      case 'changed': {
        const { value1, value2 } = node;
        const output1 = `${currentIndent}- ${key}: ${stringify(value1, depth)}`;
        const output2 = `${currentIndent}+ ${key}: ${stringify(value2, depth)}`;
        return `${output1}\n${output2}`;
      }
      case 'added': {
        const { value } = node;
        return `${currentIndent}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'deleted': {
        const { value } = node;
        return `${currentIndent}- ${key}: ${stringify(value, depth)}`;
      }
      case 'unchanged': {
        const { value } = node;
        return `${currentIndent}  ${key}: ${stringify(value, depth)}`;
      }
      default: {
        throw new Error(`Node type ${type} is not defined`);
      }
    }
  });
};

const formatStylish = (data) => {
  const lines = iter(data, 1);
  return `{\n${lines.join('\n')}\n${indent(0, true)}}`;
};

export default formatStylish;
