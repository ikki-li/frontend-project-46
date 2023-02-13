import generateStylishView from './stylish.js';
import generatePlainView from './plain.js';
import generateJSONView from './json.js';

const chooseFormat = (formatName) => {
  if (formatName === 'plain') {
    return generatePlainView;
  }
  if (formatName === 'json') {
    return generateJSONView;
  }
  if (formatName === 'stylish') {
    return generateStylishView;
  }
  throw new Error('Formatter is not found');
};

export default chooseFormat;
