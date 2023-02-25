const toString = (data) => {
  switch (typeof data) {
    case 'object':
      return data !== null ? '[complex value]' : data;
    case 'string':
      return `'${data}'`;
    default:
      return data;
  }
};

const iter = (tree, path) => {
  const lines = tree.flatMap((node) => {
    const { key, type } = node;
    const newPath = `${path}${key}.`;
    switch (type) {
      case 'nested': {
        const { children } = node;
        return iter(children, newPath);
      }
      case 'changed': {
        const { value1, value2 } = node;
        return `Property '${path}${key}' was updated. From ${toString(value1)} to ${toString(value2)}`;
      }
      case 'added': {
        const { value } = node;
        return `Property '${path}${key}' was added with value: ${toString(value)}`;
      }
      case 'deleted':
        return `Property '${path}${key}' was removed`;
      case 'unchanged': {
        return '';
      }
      default:
        throw new Error(`Node type ${type} is not defined`);
    }
  }, []);
  return lines.filter((child) => child.length !== 0);
};

const formatPlain = (data) => iter(data, '').join('\n');

export default formatPlain;
