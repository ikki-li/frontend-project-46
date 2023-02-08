import _ from 'lodash';

const generateJsonView = (data) => {
  let lastValue;
  const lines = data.reduce((acc, item) => {
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
    const arrayIdentifier = Array.isArray(value) ? value[0] : '';

    if (previousString.includes(key)) {
      acc.pop();
      acc.push([
        `"${key}":"was updated.From ${lastValue} to ${preparedValue}"`,
      ]);
    }
    if (sign === '+' && !previousString.includes(key)) {
      acc.push([
        `"${key}":"was added with value:${preparedValue}"`,
      ]);
    }
    if (sign === '-') {
      acc.push([`"${key}":"was removed"`]);
    }
    if (Array.isArray(value) && arrayIdentifier !== 'array') {
      const descendant = generateJsonView(value);
      if (descendant !== '{}') {
        acc.push([[`"${key}":${descendant}`].join()]);
      }
    }
    lastValue = preparedValue;
    return acc;
  }, []);
  return `{${lines.join(',')}}`;
};

// eslint-disable-next-line import/prefer-default-export
export { generateJsonView };
