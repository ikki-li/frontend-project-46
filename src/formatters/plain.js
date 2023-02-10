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
    const lines = currentItem.reduce((acc, item) => {
      const { name, type } = item;
      const newPath = `${path}${name}.`;
      if (type === 'nested') {
        const { children } = item;
        acc.push([iter(children, newPath)]);
        return acc;
      }
      const { status } = item;
      switch (status) {
        case 'changed': {
          const { value1, value2 } = item;
          const formattedValue1 = formatValue(value1);
          const formattedValue2 = formatValue(value2);
          acc.push([
            `Property '${path}${name}' was updated. From ${formattedValue1} to ${formattedValue2}`,
          ]);
          return acc;
        }
        case 'added': {
          const { value } = item;
          const formattedValue = formatValue(value);
          acc.push([
            `Property '${path}${name}' was added with value: ${formattedValue}`,
          ]);
          return acc;
        }
        case 'deleted': {
          acc.push([`Property '${path}${name}' was removed`]);
          return acc;
        }
        case 'unchanged': {
          return acc;
        }
        default:
          throw new Error('Type of node is not defined');
      }
    }, []);
    const filteredLines = lines
      .flat()
      .filter((child) => child.length !== 0);
    return [...filteredLines].join('\n');
  };
  return iter(data, '');
};

// eslint-disable-next-line import/prefer-default-export
export { generatePlainView };
