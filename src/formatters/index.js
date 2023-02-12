import { generateTreeView } from './stylish.js';
import { generatePlainView } from './plain.js';
import { generateJsonView } from './json.js';

const chooseFormat = (formatName) => {
  if (formatName === 'plain') {
    return generatePlainView;
  }
  if (formatName === 'json') {
    return generateJsonView;
  }
  if (formatName === 'stylish') {
    return generateTreeView;
  }
  throw new Error('Formatter is not found');
};

export { chooseFormat };
