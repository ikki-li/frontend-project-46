import _ from 'lodash';

const generatePlainView = (data) => {
  const iter = (currentItem, path) => {
    let lastValue;
    const lines = currentItem.reduce((acc, item) => {
      const [sign, key, value] = item;
      let preparedValue;
      switch (typeof value) {
        case 'object':
          if (value !== null) {
            preparedValue = '[complex value]';
          } else {
            preparedValue = null;
          }
          break;
        case 'string':
          preparedValue = `'${value}'`;
          break;
        default:
          preparedValue = value;
      }
      const previousString = acc.length !== 0 ? _.last(acc).join() : '';
      const newPath = `${path}${key}.`;
      const arrayIdentifier = Array.isArray(value) ? value[0] : '';

      if (previousString.includes(key)) {
        acc.pop();
        acc.push([`Property '${path}${key}' was updated. From ${lastValue} to ${preparedValue}`]);
      }
      if (sign === '+' && !previousString.includes(key)) {
        acc.push([`Property '${path}${key}' was added with value: ${preparedValue}`]);
      }
      if (sign === '-') {
        acc.push([`Property '${path}${key}' was removed`]);
      }
      if (Array.isArray(value)
        && arrayIdentifier !== 'array') {
        const descendant = iter(value, newPath);
        if (descendant) {
          acc.push([iter(value, newPath)]);
        }
      }
      lastValue = preparedValue;
      return acc;
    }, []);
    const flatLines = lines.flat();
    return [...flatLines].join('\n');
  };
  return iter(data, '');
};

// eslint-disable-next-line import/prefer-default-export
export { generatePlainView };
