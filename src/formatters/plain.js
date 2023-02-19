const formatValue = (value) => {
  switch (typeof value) {
    case 'object':
      return value !== null ? '[complex value]' : value;
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const generatePlainView = (data) => {
  const iter = (currentItem, path) => {
    const lines = currentItem.flatMap((node) => {
      const { key, type } = node;
      const newPath = `${path}${key}.`;
      switch (type) {
        case 'nested': {
          const { children } = node;
          return iter(children, newPath);
        }
        case 'changed': {
          const { value1, value2 } = node;
          const formattedValue1 = formatValue(value1);
          const formattedValue2 = formatValue(value2);
          return `Property '${path}${key}' was updated. From ${formattedValue1} to ${formattedValue2}`;
        }
        case 'added': {
          const { value } = node;
          const formattedValue = formatValue(value);
          return `Property '${path}${key}' was added with value: ${formattedValue}`;
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
    const filteredLines = lines.filter((child) => child.length !== 0);
    return [...filteredLines].join('\n');
  };
  return iter(data, '');
};

export default generatePlainView;
