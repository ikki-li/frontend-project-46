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
    const lines = currentItem.flatMap((item) => {
      const {
        name,
        type,
        values,
        status,
        children,
      } = item;
      const newPath = `${path}${name}.`;
      if (type === 'nested') {
        return iter(children, newPath);
      }
      switch (status) {
        case 'changed': {
          const [value1, value2] = values;
          const formattedValue1 = formatValue(value1);
          const formattedValue2 = formatValue(value2);
          return `Property '${path}${name}' was updated. From ${formattedValue1} to ${formattedValue2}`;
        }
        case 'added': {
          const [value] = values;
          const formattedValue = formatValue(value);
          return `Property '${path}${name}' was added with value: ${formattedValue}`;
        }
        case 'deleted':
          return `Property '${path}${name}' was removed`;
        case 'unchanged': {
          return '';
        }
        default:
          throw new Error('Type of node is not defined');
      }
    }, []);
    const filteredLines = lines.filter((child) => child.length !== 0);
    return [...filteredLines].join('\n');
  };
  return iter(data, '');
};

export { generatePlainView };
