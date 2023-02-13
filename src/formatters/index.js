import generateStylishView from './stylish.js';
import generatePlainView from './plain.js';
import generateJSONView from './json.js';

const format = (formatName, data) => {
  if (formatName === 'plain') {
    return generatePlainView(data);
  }
  if (formatName === 'json') {
    return generateJSONView(data);
  }
  if (formatName === 'stylish') {
    return generateStylishView(data);
  }
  throw new Error('Formatter is not found');
};

export default format;
