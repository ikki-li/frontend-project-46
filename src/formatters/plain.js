import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const getPropertName = (propertName, key) => `${propertName}${key}.`;

const iter = (tree, propertName) => tree
  .flatMap((node) => {
    const { key, type } = node;
    switch (type) {
      case 'nested': {
        const { children } = node;
        return iter(children, getPropertName(propertName, key));
      }
      case 'changed': {
        const { value1, value2 } = node;
        return `Property '${propertName}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      }
      case 'added': {
        const { value } = node;
        return `Property '${propertName}${key}' was added with value: ${stringify(value)}`;
      }
      case 'deleted':
        return `Property '${propertName}${key}' was removed`;
      case 'unchanged': {
        return '';
      }
      default:
        throw new Error(`Node type ${type} is not defined`);
    }
  }, [])
  .filter(Boolean);

const formatPlain = (data) => iter(data, '').join('\n');

export default formatPlain;
