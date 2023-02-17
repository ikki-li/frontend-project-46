import generateStylishView from './stylish.js';
import generatePlainView from './plain.js';
import generateJSONView from './json.js';

const format = (formatName, data) => {
  switch (formatName) {
    case 'plain':
      return generatePlainView(data);
    case 'json':
      return generateJSONView(data);
    case 'stylish':
      return generateStylishView(data);
    default:
      throw new Error(`Formatter "${formatName}" is not found`);
  }
};

export default format;
