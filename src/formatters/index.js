import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (formatName, data) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data, null, '');
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`Formatter "${formatName}" is not found`);
  }
};

export default format;
