import _ from 'lodash';

const indent = (depth, isFull) => {
  const spacesCount = 4;
  return ' '.repeat(isFull ? spacesCount * depth : spacesCount * depth - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  if (Array.isArray(data)) {
    const output = data.map((item) => `${indent(depth + 1, true)}${stringify(item, depth + 1)}`);
    return `[\n${output.join('\n')}\n${indent(depth, true)}]`;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth, true)}}`;
};

const iter = (tree, depth) => tree.map((node) => {
  const { key, type } = node;
  switch (type) {
    case 'nested': {
      const { children } = node;
      const output = iter(children, depth + 1).join('\n');
      return `${indent(depth, false)}  ${key}: {\n${output}\n${indent(depth, true)}}`;
    }
    case 'changed': {
      const { value1, value2 } = node;
      const output1 = `${indent(depth, false)}- ${key}: ${stringify(value1, depth)}`;
      const output2 = `${indent(depth, false)}+ ${key}: ${stringify(value2, depth)}`;
      return `${output1}\n${output2}`;
    }
    case 'added': {
      const { value } = node;
      return `${indent(depth, false)}+ ${key}: ${stringify(value, depth)}`;
    }
    case 'deleted': {
      const { value } = node;
      return `${indent(depth, false)}- ${key}: ${stringify(value, depth)}`;
    }
    case 'unchanged': {
      const { value } = node;
      return `${indent(depth, false)}  ${key}: ${stringify(value, depth)}`;
    }
    default: {
      throw new Error(`Node type ${type} is not defined`);
    }
  }
});

const formatStylish = (data) => {
  const lines = iter(data, 1);
  return `{\n${lines.join('\n')}\n${indent(0, true)}}`;
};

export default formatStylish;
